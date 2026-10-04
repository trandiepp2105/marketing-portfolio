import BrandCard from '../BrandCard/BrandCard';
import './BrandSelector.scss';

function BrandSelector({ brands, activeSlug }) {
  return (
    <nav className="brand-selector" aria-label="Select a brand portfolio">
      {brands.map((brand) => (
        <BrandCard key={brand.slug} brand={brand} isActive={brand.slug === activeSlug} />
      ))}
    </nav>
  );
}

export default BrandSelector;
