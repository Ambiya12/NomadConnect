import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Explore, Menu, Close } from '@mui/icons-material';
import { useAuth } from '../../pages/Login/hooks/AuthContext';
import ProfileMenu from '../ProfileMenu';
import styles from './Header.module.css';

const navItems = [
  { label: 'Destinations', path: '/destinations' },
  { label: 'Travel Tips', path: '/travel-tips' },
  { label: 'About Us', path: '/about' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const renderNavLinks = (type: 'desktop' | 'sidebar') =>
    navItems.map(({ label, path }) => {
      const activeClass =
        type === 'desktop' ? styles.navLinkActive : styles.sidebarLinkActive;
      const baseClass = type === 'desktop' ? styles.navLink : styles.sidebarLink;

      return (
        <Link
          key={path}
          to={path}
          onClick={type === 'sidebar' ? closeMobileMenu : undefined}
          className={`${baseClass} ${isActive(path) ? activeClass : ''}`}
        >
          {label}
        </Link>
      );
    });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
            <Explore className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Nomad</span>
              <span className={styles.logoTitle}>Connect</span>
            </div>
          </Link>

          <nav className={styles.desktopNav}>
            {renderNavLinks('desktop')}
            {!isLoading && (
              isAuthenticated ? (
                <ProfileMenu />
              ) : (
                <Link to="/login" className={styles.loginButton}>
                  Login
                </Link>
              )
            )}
          </nav>

          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobileMenu} />
      )}

      <aside className={`${styles.mobileSidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <Link to="/" className={styles.sidebarLogo} onClick={closeMobileMenu}>
              <Explore className={styles.logoIcon} />
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>Nomad</span>
                <span className={styles.logoTitle}>Connect</span>
              </div>
            </Link>
          </div>

          <nav className={styles.sidebarNav}>
            {renderNavLinks('sidebar')}
          </nav>

          <div className={styles.sidebarAuth}>
            {!isLoading && (
              isAuthenticated ? (
                <div className={styles.profileMenuWrapper}>
                  <ProfileMenu />
                </div>
              ) : (
                <Link to="/login" className={styles.sidebarLoginButton} onClick={closeMobileMenu}>
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
