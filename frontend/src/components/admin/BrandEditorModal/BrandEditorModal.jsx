import { useEffect, useState } from 'react';
import './BrandEditorModal.scss';

const emptyBrand = {
  name: '',
  projectName: '',
  companyName: '',
  category: '',
  slug: '',
  description: '',
  thumbnail: '',
  icon: '',
};

function createSlug(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Shows the brand creation form and returns its draft to the dashboard. */
function BrandEditorModal({ onClose, onSave }) {
  const [brand, setBrand] = useState(emptyBrand);
  const [slugWasEdited, setSlugWasEdited] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  function updateField(fieldName, value) {
    setBrand((currentBrand) => {
      const updatedBrand = { ...currentBrand, [fieldName]: value };

      if (fieldName === 'name') {
        updatedBrand.projectName = currentBrand.projectName || value;
        updatedBrand.slug = slugWasEdited ? currentBrand.slug : createSlug(value);
      }

      return updatedBrand;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newBrand = {
      ...brand,
      slug: createSlug(brand.slug),
      thumbnailAlt: `${brand.name} campaign cover`,
      iconAlt: `${brand.name} logo`,
    };

    onSave(newBrand);
  }

  return (
    <div
      className="brand-editor-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        aria-labelledby="brand-editor-title"
        aria-modal="true"
        className="brand-editor"
        role="dialog"
      >
        <header className="brand-editor__header">
          <div>
            <span className="brand-editor__eyebrow">
              <i /> BRAND PROFILE
            </span>
            <h2 id="brand-editor-title">Add a brand</h2>
            <p>Create the brand card that appears in your portfolio.</p>
          </div>
          <button
            aria-label="Close add brand form"
            className="brand-editor__close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>

        <form className="brand-editor__form" onSubmit={handleSubmit}>
          <div className="brand-editor__fields">
            <div className="brand-editor__section-heading">
              <span>01</span>
              <div>
                <strong>Brand details</strong>
                <small>Basic information and portfolio label</small>
              </div>
            </div>

            <div className="brand-editor__field-grid">
              <label className="brand-editor__field">
                Brand name <b>*</b>
                <input
                  autoFocus
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="e.g. Crossfire: Legends"
                  required
                  value={brand.name}
                />
              </label>
              <label className="brand-editor__field">
                Company / publisher
                <input
                  onChange={(event) => updateField('companyName', event.target.value)}
                  placeholder="e.g. VNG"
                  value={brand.companyName}
                />
              </label>
              <label className="brand-editor__field">
                Portfolio project name
                <input
                  onChange={(event) => updateField('projectName', event.target.value)}
                  placeholder="Name shown on the brand card"
                  value={brand.projectName}
                />
              </label>
              <label className="brand-editor__field">
                Category
                <input
                  onChange={(event) => updateField('category', event.target.value)}
                  placeholder="e.g. FPS Mobile Esports"
                  value={brand.category}
                />
              </label>
              <label className="brand-editor__field brand-editor__field--wide">
                URL slug <b>*</b>
                <div className="brand-editor__slug-input">
                  <span>/projects/</span>
                  <input
                    onChange={(event) => {
                      setSlugWasEdited(true);
                      updateField('slug', event.target.value);
                    }}
                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                    placeholder="brand-name"
                    required
                    value={brand.slug}
                  />
                </div>
              </label>
              <label className="brand-editor__field brand-editor__field--wide">
                Short description
                <textarea
                  onChange={(event) => updateField('description', event.target.value)}
                  placeholder="Describe this brand and your work with it..."
                  rows="3"
                  value={brand.description}
                />
              </label>
            </div>

            <div className="brand-editor__section-heading brand-editor__section-heading--media">
              <span>02</span>
              <div>
                <strong>Brand imagery</strong>
                <small>Add the card cover and a compact brand icon</small>
              </div>
            </div>

            <div className="brand-editor__field-grid">
              <label className="brand-editor__field brand-editor__field--wide">
                Cover image URL
                <input
                  onChange={(event) => updateField('thumbnail', event.target.value)}
                  placeholder="https://..."
                  type="url"
                  value={brand.thumbnail}
                />
              </label>
              <label className="brand-editor__field brand-editor__field--wide">
                Brand icon URL
                <input
                  onChange={(event) => updateField('icon', event.target.value)}
                  placeholder="https://..."
                  type="url"
                  value={brand.icon}
                />
              </label>
            </div>
          </div>

          <aside className="brand-editor__preview">
            <span className="brand-editor__preview-label">CARD PREVIEW</span>
            <article className="brand-editor__preview-card">
              <div className="brand-editor__preview-cover">
                {brand.thumbnail ? <img src={brand.thumbnail} alt="" /> : <span>Cover image</span>}
                <span className="brand-editor__preview-category">
                  {brand.category || 'CATEGORY'}
                </span>
              </div>
              <div className="brand-editor__preview-content">
                <div className="brand-editor__preview-identity">
                  {brand.icon ? <img src={brand.icon} alt="" /> : <span>＋</span>}
                  <div>
                    <strong>{brand.name || 'Brand name'}</strong>
                    <small>{brand.projectName || 'Portfolio project name'}</small>
                  </div>
                </div>
                <p>{brand.description || 'Your short brand introduction will appear here.'}</p>
                <span className="brand-editor__preview-action">
                  SELECT BRAND PROJECT <b>⌄</b>
                </span>
              </div>
            </article>
            <p className="brand-editor__preview-help">
              This is a visual preview of the brand selector card.
            </p>
          </aside>

          <footer className="brand-editor__footer">
            <span>
              <i /> Draft changes are local to this preview
            </span>
            <div>
              <button className="brand-editor__cancel" onClick={onClose} type="button">
                Cancel
              </button>
              <button className="admin-button admin-button--primary" type="submit">
                Add brand <span>→</span>
              </button>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default BrandEditorModal;
