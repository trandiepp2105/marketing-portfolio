import './BrandIntro.scss';

function BrandIntro({ brand }) {
  return (
    <header className="brand-intro">
      <div className="brand-intro__inner">
        <div className="brand-intro__copy">
          <h2 id="brand-intro-title">
            <span>{brand.projectName || brand.name}</span>
            {brand.companyName && <strong>{brand.companyName}</strong>}
          </h2>
        </div>
        <p className="brand-intro__description">{brand.description}</p>
      </div>
    </header>
  );
}

export default BrandIntro;
