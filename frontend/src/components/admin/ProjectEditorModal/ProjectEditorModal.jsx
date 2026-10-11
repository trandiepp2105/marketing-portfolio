import { useEffect, useState } from 'react';
import './ProjectEditorModal.scss';

function getNextOrder(projects, brandSlug) {
  const brandOrders = projects
    .filter((project) => project.brandSlug === brandSlug)
    .map((project) => Number(project.order) || 0);

  return brandOrders.length > 0 ? Math.max(...brandOrders) + 1 : 1;
}

function createInitialDraft(defaultBrandSlug, projects) {
  return {
    brandSlug: defaultBrandSlug || '',
    title: '',
    campaignSpotlight: '',
    mediaUrl: '',
    mediaThumbnail: '',
    mediaAlt: '',
    scopeText: '',
    learningsText: '',
    assets: [],
    results: [{ value: '', label: '' }],
    order: defaultBrandSlug ? getNextOrder(projects, defaultBrandSlug) : 1,
  };
}

/** Collects project case-study fields and returns a portfolio-shaped project. */
function ProjectEditorModal({ brands, projects, defaultBrandSlug = '', onClose, onSave }) {
  const [draft, setDraft] = useState(() => createInitialDraft(defaultBrandSlug, projects));

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const selectedBrand = brands.find((brand) => brand.slug === draft.brandSlug);

  function updateDraft(fieldName, value) {
    setDraft((currentDraft) => ({ ...currentDraft, [fieldName]: value }));
  }

  function handleBrandChange(event) {
    const brandSlug = event.target.value;
    setDraft((currentDraft) => ({
      ...currentDraft,
      brandSlug,
      order: getNextOrder(projects, brandSlug),
    }));
  }

  function updateResult(resultIndex, fieldName, value) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      results: currentDraft.results.map((result, index) =>
        index === resultIndex ? { ...result, [fieldName]: value } : result,
      ),
    }));
  }

  function addResult() {
    setDraft((currentDraft) => ({
      ...currentDraft,
      results: [...currentDraft.results, { value: '', label: '' }],
    }));
  }

  function removeResult(resultIndex) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      results: currentDraft.results.filter((_, index) => index !== resultIndex),
    }));
  }

  function addAsset() {
    setDraft((currentDraft) => ({
      ...currentDraft,
      assets: [...currentDraft.assets, { title: '', thumbnail: '', image: '', alt: '' }],
    }));
  }

  function updateAsset(assetIndex, fieldName, value) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      assets: currentDraft.assets.map((asset, index) =>
        index === assetIndex ? { ...asset, [fieldName]: value } : asset,
      ),
    }));
  }

  function removeAsset(assetIndex) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      assets: currentDraft.assets.filter((_, index) => index !== assetIndex),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newProject = {
      id: `project-${Date.now()}`,
      brandSlug: draft.brandSlug,
      order: Number(draft.order),
      title: draft.title.trim(),
      campaignSpotlight: draft.campaignSpotlight.trim(),
      media: {
        url: draft.mediaUrl.trim(),
        thumbnail: draft.mediaThumbnail.trim(),
        alt: draft.mediaAlt.trim() || draft.title.trim(),
      },
      assets: draft.assets
        .filter((asset) => asset.title.trim() || asset.image.trim() || asset.thumbnail.trim())
        .map((asset) => ({
          title: asset.title.trim(),
          thumbnail: asset.thumbnail.trim(),
          image: asset.image.trim() || asset.thumbnail.trim(),
          alt: asset.alt.trim() || asset.title.trim(),
        })),
      scope: draft.scopeText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      learnings: draft.learningsText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      results: draft.results
        .filter((result) => result.value.trim() || result.label.trim())
        .map((result) => ({ value: result.value.trim(), label: result.label.trim() })),
    };

    onSave(newProject);
  }

  return (
    <div
      className="project-editor-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        aria-labelledby="project-editor-title"
        aria-modal="true"
        className="project-editor"
        role="dialog"
      >
        <header className="project-editor__header">
          <div>
            <span className="project-editor__eyebrow">
              <i /> CASE STUDY
            </span>
            <h2 id="project-editor-title">Add a project</h2>
            <p>Add a campaign to a brand and build its case-study content.</p>
          </div>
          <button
            aria-label="Close add project form"
            className="project-editor__close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>

        <form className="project-editor__form" onSubmit={handleSubmit}>
          <div className="project-editor__fields">
            <div className="project-editor__section-heading">
              <span>01</span>
              <div>
                <strong>Project details</strong>
                <small>Choose its brand and set the display order</small>
              </div>
            </div>

            <div className="project-editor__field-grid">
              <label className="project-editor__field">
                Brand <b>*</b>
                <select onChange={handleBrandChange} required value={draft.brandSlug}>
                  <option value="" disabled>
                    Select a brand
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.slug} value={brand.slug}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="project-editor__field">
                Display order
                <input
                  min="1"
                  onChange={(event) => updateDraft('order', event.target.value)}
                  type="number"
                  value={draft.order}
                />
              </label>
              <label className="project-editor__field project-editor__field--wide">
                Project title <b>*</b>
                <input
                  onChange={(event) => updateDraft('title', event.target.value)}
                  placeholder="Campaign or project name"
                  required
                  value={draft.title}
                />
              </label>
              <label className="project-editor__field project-editor__field--wide">
                Campaign spotlight <b>*</b>
                <textarea
                  onChange={(event) => updateDraft('campaignSpotlight', event.target.value)}
                  placeholder="Summarize the campaign idea, execution, and audience impact..."
                  required
                  rows="3"
                  value={draft.campaignSpotlight}
                />
              </label>
            </div>

            <div className="project-editor__section-heading project-editor__section-heading--next">
              <span>02</span>
              <div>
                <strong>Campaign media</strong>
                <small>Hero video and thumbnail shown in the project showcase</small>
              </div>
            </div>
            <div className="project-editor__field-grid">
              <label className="project-editor__field project-editor__field--wide">
                Main media URL <b>*</b>
                <input
                  onChange={(event) => updateDraft('mediaUrl', event.target.value)}
                  placeholder="YouTube, Vimeo, or campaign link"
                  required
                  type="url"
                  value={draft.mediaUrl}
                />
              </label>
              <label className="project-editor__field project-editor__field--wide">
                Thumbnail image URL <b>*</b>
                <input
                  onChange={(event) => updateDraft('mediaThumbnail', event.target.value)}
                  placeholder="https://..."
                  required
                  type="url"
                  value={draft.mediaThumbnail}
                />
              </label>
              <label className="project-editor__field project-editor__field--wide">
                Image description
                <input
                  onChange={(event) => updateDraft('mediaAlt', event.target.value)}
                  placeholder="Describe the campaign image for accessibility"
                  value={draft.mediaAlt}
                />
              </label>
            </div>

            <div className="project-editor__section-heading project-editor__section-heading--next">
              <span>03</span>
              <div>
                <strong>Project gallery</strong>
                <small>Optional supporting campaign assets</small>
              </div>
              <button className="project-editor__inline-add" onClick={addAsset} type="button">
                ＋ Add asset
              </button>
            </div>
            {draft.assets.length > 0 && (
              <div className="project-editor__repeat-list">
                {draft.assets.map((asset, index) => (
                  <fieldset className="project-editor__repeat-card" key={`asset-${index}`}>
                    <legend>Asset {String(index + 1).padStart(2, '0')}</legend>
                    <button
                      aria-label={`Remove asset ${index + 1}`}
                      className="project-editor__remove"
                      onClick={() => removeAsset(index)}
                      type="button"
                    >
                      ×
                    </button>
                    <div className="project-editor__field-grid">
                      <label className="project-editor__field project-editor__field--wide">
                        Asset title
                        <input
                          onChange={(event) => updateAsset(index, 'title', event.target.value)}
                          placeholder="e.g. Campaign livestream"
                          value={asset.title}
                        />
                      </label>
                      <label className="project-editor__field project-editor__field--wide">
                        Image URL
                        <input
                          onChange={(event) => updateAsset(index, 'image', event.target.value)}
                          placeholder="https://..."
                          type="url"
                          value={asset.image}
                        />
                      </label>
                      <label className="project-editor__field project-editor__field--wide">
                        Thumbnail URL <small>(optional; uses image URL if empty)</small>
                        <input
                          onChange={(event) => updateAsset(index, 'thumbnail', event.target.value)}
                          placeholder="https://..."
                          type="url"
                          value={asset.thumbnail}
                        />
                      </label>
                      <label className="project-editor__field project-editor__field--wide">
                        Image description
                        <input
                          onChange={(event) => updateAsset(index, 'alt', event.target.value)}
                          placeholder="Describe this image"
                          value={asset.alt}
                        />
                      </label>
                    </div>
                  </fieldset>
                ))}
              </div>
            )}

            <div className="project-editor__section-heading project-editor__section-heading--next">
              <span>04</span>
              <div>
                <strong>Work and outcomes</strong>
                <small>One item per line; add measurable results below</small>
              </div>
            </div>
            <div className="project-editor__field-grid">
              <label className="project-editor__field project-editor__field--wide">
                Scope of work
                <textarea
                  onChange={(event) => updateDraft('scopeText', event.target.value)}
                  placeholder={'Campaign planning and operations\nKOL booking and coordination'}
                  rows="3"
                  value={draft.scopeText}
                />
              </label>
              <label className="project-editor__field project-editor__field--wide">
                Key learnings
                <textarea
                  onChange={(event) => updateDraft('learningsText', event.target.value)}
                  placeholder={'Audience insight or campaign learning\nWhat worked well and why'}
                  rows="3"
                  value={draft.learningsText}
                />
              </label>
            </div>
            <div className="project-editor__results-heading">
              <strong>Results and metrics</strong>
              <button className="project-editor__inline-add" onClick={addResult} type="button">
                ＋ Add result
              </button>
            </div>
            <div className="project-editor__repeat-list">
              {draft.results.map((result, index) => (
                <div className="project-editor__result-row" key={`result-${index}`}>
                  <label className="project-editor__field">
                    Value
                    <input
                      onChange={(event) => updateResult(index, 'value', event.target.value)}
                      placeholder="e.g. 9.72M"
                      value={result.value}
                    />
                  </label>
                  <label className="project-editor__field">
                    Label
                    <input
                      onChange={(event) => updateResult(index, 'label', event.target.value)}
                      placeholder="e.g. INTERACTIONS"
                      value={result.label}
                    />
                  </label>
                  {draft.results.length > 1 && (
                    <button
                      aria-label={`Remove result ${index + 1}`}
                      className="project-editor__remove"
                      onClick={() => removeResult(index)}
                      type="button"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <aside className="project-editor__preview">
            <span className="project-editor__preview-label">SHOWCASE PREVIEW</span>
            <article className="project-editor__preview-card">
              <div className="project-editor__preview-image">
                {draft.mediaThumbnail ? (
                  <img src={draft.mediaThumbnail} alt="" />
                ) : (
                  <span>Campaign media</span>
                )}
                <span className="project-editor__preview-glow" />
              </div>
              <div className="project-editor__preview-content">
                <span className="project-editor__preview-brand">
                  {selectedBrand?.name || 'SELECT A BRAND'}
                </span>
                <h3>{draft.title || 'Your project title'}</h3>
                <p>{draft.campaignSpotlight || 'Your campaign summary will be shown here.'}</p>
                <div className="project-editor__preview-metrics">
                  {draft.results
                    .filter((result) => result.value || result.label)
                    .slice(0, 2)
                    .map((result, index) => (
                      <span key={`preview-result-${index}`}>
                        <strong>{result.value || '—'}</strong>
                        <small>{result.label || 'RESULT'}</small>
                      </span>
                    ))}
                  {draft.results.every((result) => !result.value && !result.label) && (
                    <span>
                      <strong>—</strong>
                      <small>CAMPAIGN RESULT</small>
                    </span>
                  )}
                </div>
              </div>
            </article>
            <p className="project-editor__preview-help">
              This preview follows the case-study layout on the Projects page.
            </p>
          </aside>

          <footer className="project-editor__footer">
            <span>
              <i /> Project will be added to the selected brand in this preview
            </span>
            <div>
              <button className="project-editor__cancel" onClick={onClose} type="button">
                Cancel
              </button>
              <button className="admin-button admin-button--primary" type="submit">
                Add project <span>→</span>
              </button>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default ProjectEditorModal;
