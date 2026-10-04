import { Link } from 'react-router-dom';
import './SiteFooter.scss';

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__identity">
          <strong>LY GIA HUY</strong>
          <span>Game Marketing Portfolio</span>
        </div>
        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link to="/">Profile</Link>
          <Link to="/projects/crossfire-legends">Branding Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <small>© 2025 LY GIA HUY. ALL RIGHTS RESERVED.</small>
      </div>
    </footer>
  );
}

export default SiteFooter;
