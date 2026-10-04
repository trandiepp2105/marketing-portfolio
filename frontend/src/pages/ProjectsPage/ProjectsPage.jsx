import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BrandIntro from '../../components/projects/BrandIntro/BrandIntro';
import BrandSelector from '../../components/projects/BrandSelector/BrandSelector';
import PortfolioSectionTitle from '../../components/projects/PortfolioSectionTitle/PortfolioSectionTitle';
import ProjectsSection from '../../components/projects/ProjectsSection/ProjectsSection';
import ImageLightbox from '../../components/shared/ImageLightbox/ImageLightbox';
import { getBrands, getBrandBySlug } from '../../services/brandService';
import { getProjectsByBrand } from '../../services/projectService';
import './ProjectsPage.scss';

function ProjectsPage() {
  const { brandSlug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    setPageData(null);
    setSelectedAsset(null);
    setError('');

    Promise.all([getBrands(), getBrandBySlug(brandSlug), getProjectsByBrand(brandSlug)])
      .then(([brands, brand, projects]) => {
        if (isCurrent) {
          setPageData({ brands, brand, projects });
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError('Project information could not be loaded. Please try again.');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [brandSlug]);

  const openLightbox = useCallback((asset) => {
    setSelectedAsset(asset);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedAsset(null);
  }, []);

  useEffect(() => {
    document.title = pageData?.brand
      ? `${pageData.brand.name} | Ly Gia Huy`
      : 'Branding Projects | Ly Gia Huy';
  }, [pageData]);

  if (error) {
    return (
      <div className="projects-page__message projects-page__message--error" role="alert">
        {error}
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="projects-page__message" role="status">
        Loading project portfolio…
      </div>
    );
  }
  if (!pageData.brand) {
    return (
      <div className="projects-page__message">
        <h1>Brand not found</h1>
        <p>This brand is not part of the portfolio.</p>
        <Link to="/projects">View available brands</Link>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <section className="projects-page__experience" aria-label="Work experiences">
        <PortfolioSectionTitle as="h1" className="projects-page__experience-title">
          Kinh nghiệm làm việc / Work experiences
        </PortfolioSectionTitle>
        <BrandIntro brand={pageData.brand} />
        <BrandSelector brands={pageData.brands} activeSlug={brandSlug} />
      </section>
      <ProjectsSection
        brand={pageData.brand}
        projects={pageData.projects}
        onAssetSelect={openLightbox}
      />
      <ImageLightbox image={selectedAsset} onClose={closeLightbox} />
    </div>
  );
}

export default ProjectsPage;
