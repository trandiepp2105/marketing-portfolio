import { Link } from 'react-router-dom';
import { getBrandProjectsPath } from '../../../routes/paths';
import './BrandCard.scss';

function BrandCard({ brand, isActive }) {
  return (
    <article className={`brand-card${isActive ? ' brand-card--active' : ''}`}>
      <Link
        className="brand-card__select-link"
        to={getBrandProjectsPath(brand.slug)}
        aria-label={`Select ${brand.name} brand project`}
        aria-current={isActive ? 'page' : undefined}
      />
      <div className="brand-card__cover">
        <img src={brand.thumbnail} alt={brand.thumbnailAlt} loading="lazy" />
        {isActive && (
          <span className="brand-card__active-label">
            <span aria-hidden="true" />
            Active selection
          </span>
        )}
        <span className="brand-card__category">{brand.category}</span>
      </div>
      <div className="brand-card__body">
        <div className="brand-card__identity">
          <img className="brand-card__icon" src={brand.icon} alt="" loading="lazy" />
          <div className="brand-card__copy">
            <h2>{brand.name}</h2>
            <span>
              {brand.category} {'//'} VNGGames
            </span>
          </div>
        </div>
        <p className="brand-card__description">{brand.description}</p>
        <Link
          className={`brand-card__action${isActive ? ' brand-card__action--primary' : ''}`}
          to={getBrandProjectsPath(brand.slug)}
        >
          <span>{isActive ? 'Start game!' : 'Select brand project'}</span>
          <span className="brand-card__action-icon" aria-hidden="true">
            {isActive ? 'sports_esports' : 'keyboard_arrow_down'}
          </span>
        </Link>
      </div>
    </article>
  );
}

export default BrandCard;
