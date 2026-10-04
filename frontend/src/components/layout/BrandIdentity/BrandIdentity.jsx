import { Link } from 'react-router-dom';
import './BrandIdentity.scss';

function BrandIdentity() {
  return (
    <Link className="brand-identity" to="/" aria-label="Ly Gia Huy, home">
      <span className="brand-identity__mark" aria-hidden="true">
        H
      </span>
      <span className="brand-identity__copy">
        <span className="brand-identity__name">LÝ GIA HUY</span>
        <span className="brand-identity__role">GAME MARKETING</span>
      </span>
    </Link>
  );
}

export default BrandIdentity;
