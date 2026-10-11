import { useEffect, useMemo, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import BrandEditorModal from '../../components/admin/BrandEditorModal/BrandEditorModal';
import AdminSidebar from '../../components/admin/AdminSidebar/AdminSidebar';
import ProjectEditorModal from '../../components/admin/ProjectEditorModal/ProjectEditorModal';
import {
  createBrand,
  getBrands,
  saveBrandOrder,
  setBrandVisibility,
} from '../../services/brandService';
import { getContact } from '../../services/contactService';
import {
  seedBundledProfileIfMissing,
  seedInitialPortfolioContent,
} from '../../services/portfolioAdminService';
import { createProject, getProjects, swapProjectOrder } from '../../services/projectService';
import { hasStoredProfile } from '../../services/profileService';
import { auth, isFirebaseConfigured } from '../../services/firebaseClient';
import './AdminDashboard.scss';

const pageDetails = {
  '/admin': {
    eyebrow: 'WORKSPACE OVERVIEW',
    title: 'Tổng quan',
    description: 'Theo dõi và quản lý nội dung portfolio của bạn.',
  },
  '/admin/brands': {
    eyebrow: 'CONTENT LIBRARY',
    title: 'Brands',
    description: 'Quản lý thương hiệu và các dự án liên quan.',
  },
  '/admin/projects': {
    eyebrow: 'CONTENT LIBRARY',
    title: 'Projects',
    description: 'Tất cả case study đang xuất hiện trong portfolio.',
  },
  '/admin/contact': {
    eyebrow: 'PORTFOLIO SETTINGS',
    title: 'Contact information',
    description: 'Thông tin hiển thị trên trang liên hệ của bạn.',
  },
};

function AdminDashboard() {
  const location = useLocation();
  const [brands, setBrands] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState(null);
  const [isProfileStored, setIsProfileStored] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [notice, setNotice] = useState('');
  const [loadError, setLoadError] = useState(false);
  const [isSeedingContent, setIsSeedingContent] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isBrandEditorOpen, setIsBrandEditorOpen] = useState(false);
  const [isUpdatingBrandOrder, setIsUpdatingBrandOrder] = useState(false);
  const [updatingVisibilitySlug, setUpdatingVisibilitySlug] = useState('');
  const [isProjectEditorOpen, setIsProjectEditorOpen] = useState(false);
  const [defaultProjectBrand, setDefaultProjectBrand] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [activeDragProjectId, setActiveDragProjectId] = useState('');
  const lastSwapTargetIdRef = useRef('');
  const pendingReorderRef = useRef(Promise.resolve());

  const activePath = location.pathname.replace(/\/$/, '') || '/admin';
  const page = pageDetails[activePath] ?? pageDetails['/admin'];

  useEffect(() => {
    let isCurrent = true;

    Promise.all([getBrands({ includeHidden: true }), getProjects(), getContact(), hasStoredProfile()])
      .then(([brandData, projectData, contactData, profileIsStored]) => {
        if (isCurrent) {
          setBrands(brandData);
          setProjects(projectData);
          setContact(contactData);
          setIsProfileStored(profileIsStored);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setLoadError(true);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const brandBySlug = useMemo(() => new Map(brands.map((brand) => [brand.slug, brand])), [brands]);

  const sortedProjects = useMemo(() => {
    const brandOrder = new Map(brands.map((brand, index) => [brand.slug, index]));

    return [...projects].sort((firstProject, secondProject) => {
      const brandDifference =
        (brandOrder.get(firstProject.brandSlug) ?? Number.MAX_SAFE_INTEGER) -
        (brandOrder.get(secondProject.brandSlug) ?? Number.MAX_SAFE_INTEGER);

      if (brandDifference !== 0) {
        return brandDifference;
      }

      return Number(firstProject.order) - Number(secondProject.order);
    });
  }, [brands, projects]);

  const visibleProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return sortedProjects.filter((project) => {
      const projectBrand = brandBySlug.get(project.brandSlug);
      const matchesBrand = selectedBrand === 'all' || project.brandSlug === selectedBrand;
      const matchesSearch =
        !normalizedSearch ||
        project.title.toLowerCase().includes(normalizedSearch) ||
        projectBrand?.name.toLowerCase().includes(normalizedSearch);

      return matchesBrand && matchesSearch;
    });
  }, [brandBySlug, searchTerm, selectedBrand, sortedProjects]);

  const canReorderProjects = selectedBrand !== 'all' && searchTerm.trim() === '';

  function showPreviewNotice() {
    setNotice('Chức năng chỉnh sửa/xóa nội dung chưa được triển khai.');
    window.setTimeout(() => setNotice(''), 3600);
  }

  async function handleSignOut() {
    await signOut(auth);
  }

  async function handleBrandSave(newBrand) {
    try {
      await createBrand(newBrand);
      setBrands((currentBrands) => [...currentBrands, newBrand]);
      setIsBrandEditorOpen(false);
      setNotice(`${newBrand.name} đã được lưu vào Firestore.`);
    } catch (error) {
      setNotice(`Không thể lưu brand: ${error.message}`);
    }
    window.setTimeout(() => setNotice(''), 5000);
  }

  async function handleBrandVisibilityToggle(brand) {
    const nextVisibility = brand.isVisible === false;
    setUpdatingVisibilitySlug(brand.slug);

    try {
      await setBrandVisibility(brand.slug, nextVisibility);
      setBrands((currentBrands) =>
        currentBrands.map((currentBrand) =>
          currentBrand.slug === brand.slug
            ? { ...currentBrand, isVisible: nextVisibility }
            : currentBrand,
        ),
      );
      setNotice(
        nextVisibility
          ? `${brand.name} and its projects are visible on the portfolio.`
          : `${brand.name} and its projects are hidden from the portfolio.`,
      );
    } catch (error) {
      setNotice(`Không thể cập nhật trạng thái brand: ${error.message}`);
    } finally {
      setUpdatingVisibilitySlug('');
      window.setTimeout(() => setNotice(''), 5000);
    }
  }

  async function handleBrandReorder(brandSlug, direction) {
    if (isUpdatingBrandOrder) {
      return;
    }

    const sourceIndex = brands.findIndex((brand) => brand.slug === brandSlug);
    const targetIndex = sourceIndex + direction;

    if (sourceIndex < 0 || targetIndex < 0 || targetIndex >= brands.length) {
      return;
    }

    const reorderedBrands = [...brands];
    [reorderedBrands[sourceIndex], reorderedBrands[targetIndex]] = [
      reorderedBrands[targetIndex],
      reorderedBrands[sourceIndex],
    ];

    setBrands(reorderedBrands);
    setIsUpdatingBrandOrder(true);

    try {
      await saveBrandOrder(reorderedBrands);
      setNotice('Thứ tự hiển thị brand đã được lưu vào Firestore.');
    } catch (error) {
      setBrands(await getBrands({ includeHidden: true }));
      setNotice(`Không thể lưu thứ tự brand: ${error.message}`);
    } finally {
      setIsUpdatingBrandOrder(false);
      window.setTimeout(() => setNotice(''), 5000);
    }
  }

  function openProjectEditor(brandSlug = '') {
    setDefaultProjectBrand(brandSlug);
    setIsProjectEditorOpen(true);
  }

  async function handleProjectSave(newProject) {
    try {
      await createProject(newProject);
      setProjects((currentProjects) => [...currentProjects, newProject]);
      setIsProjectEditorOpen(false);
      const selectedBrandName = brandBySlug.get(newProject.brandSlug)?.name || 'Brand';
      setNotice(`${newProject.title} đã được lưu vào ${selectedBrandName} trong Firestore.`);
    } catch (error) {
      setNotice(`Không thể lưu project: ${error.message}`);
    }
    window.setTimeout(() => setNotice(''), 5000);
  }

  async function handleSeedInitialContent() {
    setIsSeedingContent(true);
    setNotice('Đang nhập nội dung mẫu vào Firestore…');

    try {
      await seedInitialPortfolioContent();
      const [brandData, projectData, contactData, profileIsStored] = await Promise.all([
        getBrands(),
        getProjects(),
        getContact(),
        hasStoredProfile(),
      ]);
      setBrands(brandData);
      setProjects(projectData);
      setContact(contactData);
      setIsProfileStored(profileIsStored);
      setNotice('Đã nhập dữ liệu portfolio ban đầu vào Firestore.');
    } catch (error) {
      setNotice(`Không thể nhập dữ liệu: ${error.message}`);
    } finally {
      setIsSeedingContent(false);
      window.setTimeout(() => setNotice(''), 5000);
    }
  }

  async function handleSaveProfileToFirestore() {
    setIsSavingProfile(true);
    setNotice('Đang lưu profile vào Firestore…');

    try {
      const profileWasCreated = await seedBundledProfileIfMissing();
      setIsProfileStored(true);
      setNotice(
        profileWasCreated
          ? 'Profile đã được lưu vào Firestore.'
          : 'Profile đã có trong Firestore; dữ liệu hiện tại được giữ nguyên.',
      );
    } catch (error) {
      setNotice(`Không thể lưu profile: ${error.message}`);
    } finally {
      setIsSavingProfile(false);
      window.setTimeout(() => setNotice(''), 5000);
    }
  }

  function reorderBrandProjects(sourceProjectId, targetProjectId) {
    if (!sourceProjectId || !targetProjectId || sourceProjectId === targetProjectId) {
      return;
    }

    const sourceProject = projects.find((project) => project.id === sourceProjectId);
    const targetProject = projects.find((project) => project.id === targetProjectId);

    if (!sourceProject || !targetProject || sourceProject.brandSlug !== targetProject.brandSlug) {
      return;
    }

    setProjects((currentProjects) => {
      const brandSlug = sourceProject.brandSlug;
      const brandProjects = currentProjects
        .filter((project) => project.brandSlug === brandSlug)
        .sort(
          (firstProject, secondProject) => Number(firstProject.order) - Number(secondProject.order),
        );
      const sourceIndex = brandProjects.findIndex((project) => project.id === sourceProjectId);
      const targetIndex = brandProjects.findIndex((project) => project.id === targetProjectId);

      if (sourceIndex < 0 || targetIndex < 0) {
        return currentProjects;
      }

      const sourceOrder = brandProjects[sourceIndex].order;
      const targetOrder = brandProjects[targetIndex].order;

      return currentProjects.map((project) => {
        if (project.id === sourceProjectId) {
          return { ...project, order: targetOrder };
        }

        if (project.id === targetProjectId) {
          return { ...project, order: sourceOrder };
        }

        return project;
      });
    });

    const brandName = brandBySlug.get(sourceProject.brandSlug)?.name || 'brand';
    pendingReorderRef.current = pendingReorderRef.current
      .then(() => swapProjectOrder(sourceProject, targetProject))
      .then(() => {
        setNotice(`Thứ tự project của ${brandName} đã được lưu vào Firestore.`);
      })
      .catch(async (error) => {
        setNotice(`Không thể lưu thứ tự project: ${error.message}`);
        try {
          setProjects(await getProjects());
        } catch {
          setLoadError(true);
        }
      });
    window.setTimeout(() => setNotice(''), 5000);
  }

  function handleProjectDoubleClick(projectId) {
    if (!canReorderProjects) {
      return;
    }

    setSelectedProjectId(projectId);
    const project = projects.find((item) => item.id === projectId);
    setNotice(`Đã chọn “${project?.title}”. Giữ chuột và kéo project lên hoặc xuống.`);
    window.setTimeout(() => setNotice(''), 3600);
  }

  function handleProjectPointerDown(event, projectId) {
    if (
      !canReorderProjects ||
      event.button !== 0 ||
      event.target.closest('button, a, input, select, textarea')
    ) {
      return;
    }

    if (selectedProjectId !== projectId) {
      return;
    }

    event.preventDefault();
    setActiveDragProjectId(projectId);
    lastSwapTargetIdRef.current = '';
    const tableBody = event.currentTarget.closest('tbody');

    if (tableBody?.setPointerCapture) {
      tableBody.setPointerCapture(event.pointerId);
    }
  }

  function handleProjectPointerMove(event) {
    if (!activeDragProjectId || !canReorderProjects) {
      return;
    }

    const hoveredRow = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest('[data-project-id]');
    const targetProjectId = hoveredRow?.dataset.projectId;

    if (!targetProjectId || targetProjectId === activeDragProjectId) {
      lastSwapTargetIdRef.current = '';
      return;
    }

    if (targetProjectId === lastSwapTargetIdRef.current) {
      return;
    }

    const sourceProject = projects.find((project) => project.id === activeDragProjectId);
    const targetProject = projects.find((project) => project.id === targetProjectId);

    if (sourceProject?.brandSlug === targetProject?.brandSlug) {
      lastSwapTargetIdRef.current = targetProjectId;
      reorderBrandProjects(activeDragProjectId, targetProjectId);
    } else {
      lastSwapTargetIdRef.current = '';
    }
  }

  function finishProjectDrag() {
    setActiveDragProjectId('');
    lastSwapTargetIdRef.current = '';
  }

  function renderContent() {
    if (loadError) {
      return <div className="admin-dashboard__empty">Không thể tải dữ liệu xem trước.</div>;
    }

    if (!contact) {
      return <div className="admin-dashboard__empty">Đang tải nội dung portfolio...</div>;
    }

    if (activePath === '/admin/brands') {
      return (
        <section className="admin-dashboard__brand-grid" aria-label="Brand list">
          {brands.map((brand, brandIndex) => {
            const brandProjectCount = projects.filter(
              (project) => project.brandSlug === brand.slug,
            ).length;

            return (
              <article
                className={`admin-brand-card${brand.isVisible === false ? ' admin-brand-card--hidden' : ''}`}
                key={brand.slug}
              >
                <div className="admin-brand-card__cover">
                  {brand.thumbnail ? (
                    <img src={brand.thumbnail} alt={brand.thumbnailAlt || ''} />
                  ) : (
                    <span className="admin-brand-card__cover-placeholder">BRAND COVER</span>
                  )}
                  <span className="admin-brand-card__category">{brand.category}</span>
                  <span className="admin-brand-card__order" aria-label={`Brand order ${brandIndex + 1}`}>
                    {String(brandIndex + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="admin-brand-card__body">
                  <div className="admin-brand-card__identity">
                    {brand.icon ? (
                      <img src={brand.icon} alt={brand.iconAlt || ''} />
                    ) : (
                      <span className="admin-brand-card__icon-placeholder">
                        {brand.name.slice(0, 1)}
                      </span>
                    )}
                    <div>
                      <h2>
                        {brand.name}
                        {brand.isVisible === false && (
                          <span className="admin-brand-card__hidden-label">Hidden</span>
                        )}
                      </h2>
                      <p>
                        {brand.companyName} · /{brand.slug}
                      </p>
                    </div>
                  </div>
                  <p className="admin-brand-card__description">{brand.description}</p>
                  <div className="admin-brand-card__footer">
                    <span>{brandProjectCount} projects</span>
                    <div className="admin-brand-card__actions">
                      <button
                        aria-label={`Move ${brand.name} up`}
                        disabled={brandIndex === 0 || isUpdatingBrandOrder}
                        onClick={() => handleBrandReorder(brand.slug, -1)}
                        title="Move brand up"
                        type="button"
                      >
                        ↑
                      </button>
                      <button
                        aria-label={`Move ${brand.name} down`}
                        disabled={brandIndex === brands.length - 1 || isUpdatingBrandOrder}
                        onClick={() => handleBrandReorder(brand.slug, 1)}
                        title="Move brand down"
                        type="button"
                      >
                        ↓
                      </button>
                      <button
                        aria-label={`${brand.isVisible === false ? 'Show' : 'Hide'} ${brand.name}`}
                        disabled={updatingVisibilitySlug === brand.slug}
                        onClick={() => handleBrandVisibilityToggle(brand)}
                        type="button"
                      >
                        {updatingVisibilitySlug === brand.slug
                          ? 'Saving…'
                          : brand.isVisible === false
                            ? 'Show brand'
                            : 'Hide brand'}
                      </button>
                      <button
                        aria-label={`Add project to ${brand.name}`}
                        onClick={() => openProjectEditor(brand.slug)}
                        type="button"
                      >
                        ＋ Add project
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          <button
            className="admin-brand-card__add"
            onClick={() => setIsBrandEditorOpen(true)}
            type="button"
          >
            <span>＋</span>
            <strong>Add a brand</strong>
            <small>Create a new brand profile</small>
          </button>
        </section>
      );
    }

    if (activePath === '/admin/projects') {
      return (
        <section className="admin-panel admin-projects" aria-label="Project list">
          <div className="admin-projects__toolbar">
            <label className="admin-search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search projects"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects or brands..."
                type="search"
                value={searchTerm}
              />
            </label>
            <label className="admin-select-label">
              <span className="admin-dashboard__sr-only">Filter by brand</span>
              <select
                aria-label="Filter by brand"
                onChange={(event) => setSelectedBrand(event.target.value)}
                value={selectedBrand}
              >
                <option value="all">All brands</option>
                {brands.map((brand) => (
                  <option key={brand.slug} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="admin-button admin-button--primary"
              onClick={() => openProjectEditor()}
              type="button"
            >
              <span aria-hidden="true">＋</span> Add project
            </button>
          </div>
          <div className="admin-projects__reorder-hint" role="status">
            <span aria-hidden="true">⠿</span>
            {selectedBrand === 'all'
              ? 'Chọn một brand để kéo thả project và thay đổi thứ tự.'
              : searchTerm.trim()
                ? 'Xóa nội dung tìm kiếm để bật sắp xếp thứ tự project.'
                : selectedProjectId
                  ? `Đã chọn project. Giữ chuột và kéo lên hoặc xuống trong ${brandBySlug.get(selectedBrand)?.name || 'brand này'}; thả chuột để dừng.`
                  : `Double click một project rồi giữ và kéo lên hoặc xuống trong ${brandBySlug.get(selectedBrand)?.name || 'brand này'}.`}
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">PROJECT</th>
                  <th scope="col">BRAND</th>
                  <th scope="col">CAMPAIGN HIGHLIGHT</th>
                  <th scope="col">ORDER</th>
                  <th scope="col">
                    <span className="admin-dashboard__sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody
                onPointerCancel={finishProjectDrag}
                onPointerMove={handleProjectPointerMove}
                onPointerUp={finishProjectDrag}
              >
                {visibleProjects.map((project) => {
                  const projectBrand = brandBySlug.get(project.brandSlug);

                  return (
                    <tr
                      className={[
                        selectedProjectId === project.id ? 'admin-table__row--selected' : '',
                        activeDragProjectId === project.id ? 'admin-table__row--dragging' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      data-project-id={project.id}
                      key={project.id}
                      onDoubleClick={() => handleProjectDoubleClick(project.id)}
                      onPointerDown={(event) => handleProjectPointerDown(event, project.id)}
                    >
                      <td>
                        <div className="admin-project-title">
                          <img src={project.media.thumbnail} alt="" />
                          <span>
                            <strong>{project.title}</strong>
                            <small>ID: {project.id}</small>
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="admin-brand-pill">
                          <img src={projectBrand?.icon} alt="" />
                          {projectBrand?.name || project.brandSlug}
                        </span>
                      </td>
                      <td>
                        <span className="admin-project-summary">{project.campaignSpotlight}</span>
                      </td>
                      <td>
                        <span
                          className={`admin-order${canReorderProjects ? ' admin-order--draggable' : ''}`}
                          title={
                            canReorderProjects
                              ? 'Drag this row to change the project order'
                              : undefined
                          }
                        >
                          {canReorderProjects && <span aria-hidden="true">⠿</span>}
                          {String(project.order).padStart(2, '0')}
                        </span>
                      </td>
                      <td>
                        <div className="admin-project-actions">
                          {canReorderProjects && (
                            <>
                              <button
                                aria-label={`Move ${project.title} up`}
                                className="admin-icon-button admin-project-actions__move"
                                disabled={project.order <= 1}
                                onClick={() =>
                                  reorderBrandProjects(
                                    project.id,
                                    visibleProjects[visibleProjects.indexOf(project) - 1]?.id,
                                  )
                                }
                                title="Move up"
                                type="button"
                              >
                                ↑
                              </button>
                              <button
                                aria-label={`Move ${project.title} down`}
                                className="admin-icon-button admin-project-actions__move"
                                disabled={project.order >= visibleProjects.length}
                                onClick={() =>
                                  reorderBrandProjects(
                                    project.id,
                                    visibleProjects[visibleProjects.indexOf(project) + 1]?.id,
                                  )
                                }
                                title="Move down"
                                type="button"
                              >
                                ↓
                              </button>
                            </>
                          )}
                          <button
                            aria-label={`Edit ${project.title}`}
                            className="admin-icon-button"
                            onClick={showPreviewNotice}
                            type="button"
                          >
                            •••
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {visibleProjects.length === 0 && (
                  <tr>
                    <td className="admin-table__empty" colSpan="5">
                      Không tìm thấy project phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="admin-table-footnote">
            Showing {visibleProjects.length} of {projects.length} projects
          </div>
        </section>
      );
    }

    if (activePath === '/admin/contact') {
      return (
        <section className="admin-panel admin-contact-panel">
          <div className="admin-contact-panel__intro">
            <span className="admin-contact-panel__icon">✉</span>
            <div>
              <h2>Public contact details</h2>
              <p>These details are visible to visitors on your contact page.</p>
            </div>
            <span className="admin-status">
              <i /> PUBLISHED
            </span>
          </div>
          <div className="admin-contact-form">
            <label>
              Email address
              <input readOnly value={contact.email} />
            </label>
            <label>
              Phone number
              <input readOnly value={contact.phoneDisplay} />
            </label>
            <label className="admin-contact-form__wide">
              Location
              <input readOnly value={contact.location} />
            </label>
            <label className="admin-contact-form__wide">
              LinkedIn profile
              <input readOnly value={contact.linkedIn} />
            </label>
            <label className="admin-contact-form__wide">
              Availability status
              <input readOnly value={contact.availability} />
            </label>
          </div>
          <div className="admin-contact-panel__actions">
            <span>
              Last updated just now <i>·</i> Changes are shown on your public portfolio
            </span>
            <button
              className="admin-button admin-button--primary"
              onClick={showPreviewNotice}
              type="button"
            >
              Edit contact info
            </button>
          </div>
        </section>
      );
    }

    return (
      <>
        <section className="admin-stats" aria-label="Portfolio statistics">
          <article className="admin-stat-card">
            <span className="admin-stat-card__icon admin-stat-card__icon--orange">◇</span>
            <span className="admin-stat-card__label">TOTAL BRANDS</span>
            <strong>{brands.length.toString().padStart(2, '0')}</strong>
            <small>Active in your portfolio</small>
          </article>
          <article className="admin-stat-card">
            <span className="admin-stat-card__icon admin-stat-card__icon--blue">▤</span>
            <span className="admin-stat-card__label">TOTAL PROJECTS</span>
            <strong>{projects.length.toString().padStart(2, '0')}</strong>
            <small>Across all brands</small>
          </article>
          <article className="admin-stat-card">
            <span className="admin-stat-card__icon admin-stat-card__icon--green">↗</span>
            <span className="admin-stat-card__label">PORTFOLIO STATUS</span>
            <strong className="admin-stat-card__published">Published</strong>
            <small>
              <i /> Live and available
            </small>
          </article>
        </section>

        <section className="admin-panel admin-recent-panel">
          <div className="admin-panel__heading">
            <div>
              <h2>Recent projects</h2>
              <p>Your latest portfolio content at a glance.</p>
            </div>
            <Link to="/admin/projects">
              View all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="admin-recent-list">
            {projects.slice(0, 4).map((project) => {
              const projectBrand = brandBySlug.get(project.brandSlug);

              return (
                <article className="admin-recent-row" key={project.id}>
                  <img className="admin-recent-row__image" src={project.media.thumbnail} alt="" />
                  <div className="admin-recent-row__title">
                    <strong>{project.title}</strong>
                    <small>{project.id.toUpperCase()}</small>
                  </div>
                  <span className="admin-brand-pill">
                    <img src={projectBrand?.icon} alt="" />
                    {projectBrand?.name || project.brandSlug}
                  </span>
                  <span className="admin-status">
                    <i /> PUBLISHED
                  </span>
                  <button
                    className="admin-icon-button"
                    type="button"
                    aria-label={`Edit ${project.title}`}
                    onClick={showPreviewNotice}
                  >
                    •••
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="admin-quick-links" aria-label="Quick actions">
          <div>
            <span>✦</span>
            <p>
              <strong>Keep your portfolio fresh</strong>
              <small>Update a brand or add your latest campaign work.</small>
            </p>
          </div>
          <Link className="admin-button admin-button--subtle" to="/admin/brands">
            Manage brands <span aria-hidden="true">→</span>
          </Link>
        </section>
      </>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-dashboard__main">
        <header className="admin-topbar">
          <div className="admin-topbar__breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>{page.title}</strong>
          </div>
          <div className="admin-topbar__right">
            <span className="admin-preview-tag">
              <i /> FIRESTORE CONTENT
            </span>
            {isFirebaseConfigured && brands.length === 0 && projects.length === 0 && (
              <button
                className="admin-button admin-button--subtle"
                disabled={isSeedingContent}
                onClick={handleSeedInitialContent}
                type="button"
              >
                {isSeedingContent ? 'Importing…' : 'Import current portfolio data'}
              </button>
            )}
            {isFirebaseConfigured && !isProfileStored && (
              <button
                className="admin-button admin-button--subtle"
                disabled={isSavingProfile}
                onClick={handleSaveProfileToFirestore}
                type="button"
              >
                {isSavingProfile ? 'Saving profile…' : 'Save profile to Firebase'}
              </button>
            )}
            <a className="admin-view-site" href="/" target="_blank" rel="noreferrer">
              View portfolio <span aria-hidden="true">↗</span>
            </a>
            <button className="admin-signout" onClick={handleSignOut} type="button">
              Sign out
            </button>
          </div>
        </header>

        <div className="admin-dashboard__content">
          <div className="admin-page-heading">
            <div>
              <span className="admin-page-heading__eyebrow">
                <i /> {page.eyebrow}
              </span>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
            </div>
            {activePath === '/admin/brands' && (
              <button
                className="admin-button admin-button--primary"
                onClick={() => setIsBrandEditorOpen(true)}
                type="button"
              >
                <span aria-hidden="true">＋</span> Add brand
              </button>
            )}
          </div>
          {notice && (
            <div className="admin-notice" role="status">
              {notice}
            </div>
          )}
          {renderContent()}
          <footer className="admin-dashboard__footer">
            CONTENT STUDIO <span>·</span> LY GIA HUY PORTFOLIO <span>·</span> 2026
          </footer>
        </div>
      </main>
      {isBrandEditorOpen && (
        <BrandEditorModal onClose={() => setIsBrandEditorOpen(false)} onSave={handleBrandSave} />
      )}
      {isProjectEditorOpen && (
        <ProjectEditorModal
          brands={brands}
          defaultBrandSlug={defaultProjectBrand}
          onClose={() => setIsProjectEditorOpen(false)}
          onSave={handleProjectSave}
          projects={projects}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
