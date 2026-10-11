import { Link, NavLink } from 'react-router-dom';
import './AdminSidebar.scss';

const navigationItems = [
  { label: 'Tổng quan', path: '/admin', icon: 'grid', end: true },
  { label: 'Brands', path: '/admin/brands', icon: 'layers' },
  { label: 'Projects', path: '/admin/projects', icon: 'folder' },
  { label: 'Contact', path: '/admin/contact', icon: 'mail' },
];

function NavigationIcon({ name }) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    folder: (
      <>
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2h6.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/** Provides dashboard navigation and portfolio identity. */
function AdminSidebar() {
  return (
    <aside className="admin-sidebar" aria-label="Admin navigation">
      <Link className="admin-sidebar__brand" to="/admin">
        <span className="admin-sidebar__mark">LH</span>
        <span>
          <strong>Huy Portfolio</strong>
          <small>CONTENT STUDIO</small>
        </span>
      </Link>

      <p className="admin-sidebar__caption">WORKSPACE</p>
      <nav className="admin-sidebar__nav" aria-label="Dashboard">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`
            }
            end={item.end}
            key={item.path}
            to={item.path}
          >
            <NavigationIcon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__bottom">
        <span className="admin-sidebar__avatar">LH</span>
        <span className="admin-sidebar__user">
          <strong>Ly Gia Huy</strong>
          <small>Portfolio owner</small>
        </span>
        <span className="admin-sidebar__status" aria-label="Online" />
      </div>
    </aside>
  );
}

export default AdminSidebar;
