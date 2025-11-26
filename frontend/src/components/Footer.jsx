const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Explore': [
      { label: 'Home', href: '/' },
      { label: 'National', href: '/category/national' },
      { label: 'International', href: '/category/international' },
      { label: 'Politics', href: '/category/politics' },
      { label: 'Business', href: '/category/business' },
      { label: 'Technology', href: '/category/technology' },
    ],
    'News': [
      { label: 'Sports', href: '/category/sports' },
      { label: 'Entertainment', href: '/category/entertainment' },
      { label: 'Jammu & Kashmir', href: '/category/jammu-kashmir' },
    ],
    'About': [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
    'Follow Us': [
      { label: 'Twitter', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'YouTube', href: '#' },
    ]
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="footer-column-title">{title}</h3>
              <ul className="footer-links">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-about">
          <h3 className="footer-about-title">About Sasta Morning Glory</h3>
          <p className="footer-about-text">
            Sasta Morning Glory is your trusted source for breaking news, in-depth analysis, and comprehensive coverage 
            of national and international events. We bring you the latest updates from politics, business, technology, 
            sports, entertainment, and more. Our mission is to deliver accurate, timely, and unbiased news to keep you 
            informed and engaged with the world around you.
          </p>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <span>© {currentYear} Sasta Morning Glory</span>
              <span>All rights reserved</span>
            </div>
            <div className="footer-bottom-links">
              <a href="/about" className="footer-bottom-link">About Us</a>
              <span className="footer-bottom-separator">|</span>
              <a href="/contact" className="footer-bottom-link">Contact</a>
              <span className="footer-bottom-separator">|</span>
              <a href="/privacy" className="footer-bottom-link">Privacy</a>
              <span className="footer-bottom-separator">|</span>
              <a href="/terms" className="footer-bottom-link">Terms</a>
            </div>
          </div>
          <p className="footer-disclaimer">
            Sasta Morning Glory is committed to providing quality journalism and maintaining the highest standards of 
            editorial integrity. For editorial inquiries, please contact our newsroom.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
