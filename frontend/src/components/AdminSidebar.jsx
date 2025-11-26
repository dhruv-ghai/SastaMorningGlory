import { NavLink, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api.js';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      navigate('/admin/login');
    } catch (err) {
      navigate('/admin/login');
    }
  };

  const navItems = [
    { to: '/admin/articles', label: 'Articles', icon: '📰' },
    { to: '/admin/articles/new', label: 'New Article', icon: '✏️' },
    { to: '/admin/comments', label: 'Comments', icon: '💬' }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link to="/admin/articles" className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-box">
            <span className="admin-sidebar-logo-text">SMG</span>
          </div>
          <div>
            <h2 className="admin-sidebar-title">Admin Panel</h2>
            <p className="admin-sidebar-subtitle">Sasta Morning Glory</p>
          </div>
        </Link>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link
          to="/"
          target="_blank"
          className="admin-nav-item"
        >
          <span className="admin-nav-icon">🌐</span>
          <span>View Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="admin-nav-item"
          style={{width: '100%', textAlign: 'left'}}
        >
          <span className="admin-nav-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
