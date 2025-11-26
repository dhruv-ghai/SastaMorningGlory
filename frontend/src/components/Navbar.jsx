import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const sections = [
  { label: 'National', slug: 'national' },
  { label: 'International', slug: 'international' },
  { label: 'Jammu & Kashmir', slug: 'jammu-kashmir' },
  { label: 'Politics', slug: 'politics' },
  { label: 'Business', slug: 'business' },
  { label: 'Technology', slug: 'technology' },
  { label: 'Entertainment', slug: 'entertainment' },
  { label: 'Sports', slug: 'sports' }
];

const extraLinks = [
  { label: 'Weather', to: '/weather' },
  { label: 'Markets', to: '/markets' },
  { label: 'Puzzles', to: '/puzzles' }
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-top-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-box">
              <span className="navbar-logo-text">SMG</span>
            </div>
            <div className="hidden md:block">
              <div className="navbar-brand-text">Sasta Morning Glory</div>
            </div>
          </Link>
          
          <div className="navbar-actions">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="navbar-search-btn"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '1.25rem', height: '1.25rem'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <NavLink to="/admin/login" className="navbar-admin-link hidden md:block">
              Admin
            </NavLink>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <div className="search-bar-inner">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search news..."
                className="search-input"
                autoFocus
              />
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <nav className="navbar-menu">
        <div className="navbar-menu-inner">
          {sections.map((section) => (
            <NavLink
              key={section.slug}
              to={`/category/${section.slug}`}
              className={({ isActive }) => `navbar-menu-item ${isActive ? 'active' : ''}`}
            >
              {section.label}
            </NavLink>
          ))}
          {extraLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar-menu-item ${isActive ? 'active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="navbar-ad">
        <div className="navbar-ad-inner">
          <div className="navbar-ad-box">
            <span className="navbar-ad-text">Advertisement</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
