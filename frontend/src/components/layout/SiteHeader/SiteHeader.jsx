import { useState } from 'react';
import BrandIdentity from '../BrandIdentity/BrandIdentity';
import MainNavigation from '../MainNavigation/MainNavigation';
import './SiteHeader.scss';

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <BrandIdentity />
        <button
          className="site-header__menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          <span className="site-header__menu-icon" aria-hidden="true">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
        <MainNavigation isOpen={isMenuOpen} onNavigate={closeMenu} />
      </div>
    </header>
  );
}

export default SiteHeader;
