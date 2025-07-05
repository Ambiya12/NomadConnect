import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Explore, Menu, Close } from '@mui/icons-material';
import { useAuth } from '../../pages/Login/hooks/AuthContext';
import ProfileMenu from '../ProfileMenu';
import styles from './Header.module.css';

const navItems = [
  { path: '/destinations', label: 'Destinations' },
  { path: '/travel-tips', label: 'Travel Tips' },
  { path: '/about', label: 'About Us' },
];

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <Link to="/" className={styles.logo} onClick={onClick}>
    <Explore className={styles.logoIcon} />
    <div className={styles.logoText}>
      <span className={styles.logoTitle}>Nomad</span>
      <span className={styles.logoTitle}>Connect</span>
    </div>
  </Link>
);

const NavLinks = ({
  onClick,
  activePath,
  isMobile = false,
}: {
  onClick?: () => void;
  activePath: string;
  isMobile?: boolean;
}) => (
  <>
    {navItems.map(({ path, label }) => (
      <Link
        key={path}
        to={path}
        onClick={onClick}
        className={`${isMobile ? styles.sidebarLink : styles.navLink} ${
          activePath === path
            ? isMobile
              ? styles.sidebarLinkActive
              : styles.navLinkActive
            : ''
        }`}
      >
        {label}
      </Link>
    ))}
  </>
);

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Logo onClick={() => setIsMobileMenuOpen(false)} />

          <nav className={styles.desktopNav}>
            <NavLinks activePath={location.pathname} />
            {!isLoading &&
              (isAuthenticated ? (
                <ProfileMenu />
              ) : (
                <Link to="/login" className={styles.loginButton}>
                  Login
                </Link>
              ))}
          </nav>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)} />
          <aside className={`${styles.mobileSidebar} ${styles.sidebarOpen}`}>
            <div className={styles.sidebarContent}>
              <div className={styles.sidebarHeader}>
                <Logo onClick={() => setIsMobileMenuOpen(false)} />
              </div>
              <nav className={styles.sidebarNav}>
                <NavLinks activePath={location.pathname} isMobile onClick={() => setIsMobileMenuOpen(false)} />
              </nav>
              <div className={styles.sidebarAuth}>
                {!isLoading &&
                  (isAuthenticated ? (
                    <div onClick={() => setIsMobileMenuOpen(false)}>
                      <ProfileMenu />
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className={styles.sidebarLoginButton}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;