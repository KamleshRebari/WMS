import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const menus = {
  admin: [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/workers', label: 'Add Workers' },
    { to: '/admin/records', label: 'Records' },
    { to: '/admin/slots', label: 'Manage Slots' },
    { to: '/admin/groups', label: 'Groups & Location' }
  ],
  supervisor: [{ to: '/supervisor', label: 'Supervisor Dashboard' }],
  worker: [{ to: '/worker', label: 'My Attendance' }]
};

export default function Layout({ title, children }) {
  const { user, logout } = useAuth();

  return (
    <div className="shell">
      <aside className="sidebar">
        <h2>WMS</h2>
        {menus[user?.role]?.map((item) => (
          <NavLink key={item.to} to={item.to} className="menu-link">
            {item.label}
          </NavLink>
        ))}
      </aside>
      <main>
        <header className="topbar">
          <h3>{title}</h3>
          <div className="profile-box">
            <span>{user?.name}</span>
            <Link to="#" onClick={logout}>
              Logout
            </Link>
          </div>
        </header>
        <section>{children}</section>
      </main>
    </div>
  );
}
