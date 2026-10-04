import { Link, useLocation } from 'react-router-dom';
import { getBrandProjectsPath } from '../../../routes/paths';
import './MainNavigation.scss';

const navigationItems = [
  { to: '/', label: '01. Profile' },
  { to: getBrandProjectsPath('crossfire-legends'), label: '02. Branding Projects' },
  { to: '/contact', label: '03. Contact' },
];

function MainNavigation({ isOpen, onNavigate }) {
  const { pathname } = useLocation();

  return (
    <nav
      id="main-navigation"
      className={`main-navigation${isOpen ? ' main-navigation--open' : ''}`}
      aria-label="Main navigation"
    >
      {navigationItems.map(({ to, label }) => {
        const isProjectsLink = to === getBrandProjectsPath('crossfire-legends');
        const isActive = isProjectsLink
          ? pathname === '/projects' || pathname.startsWith('/projects/')
          : pathname === to;

        return (
          <Link
            key={label}
            to={to}
            onClick={onNavigate}
            aria-current={isActive ? 'page' : undefined}
            className={`main-navigation__link${isActive ? ' main-navigation__link--active' : ''}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default MainNavigation;
