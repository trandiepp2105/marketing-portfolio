import { Link } from 'react-router-dom';
import './ReturnLinks.scss';

function ReturnLinks() {
  return (
    <nav className="return-links" aria-label="Return to portfolio pages">
      <Link to="/">← Back to 01. Profile</Link>
      <span aria-hidden="true">|</span>
      <Link to="/projects/crossfire-legends">← Back to 02. Branding Projects</Link>
    </nav>
  );
}

export default ReturnLinks;
