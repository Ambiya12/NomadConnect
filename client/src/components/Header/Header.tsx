import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Explore, Menu, Close } from '@mui/icons-material';
import { useAuth } from '../../pages/Login/hooks/AuthContext';
import ProfileMenu from '../ProfileMenu';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link
              to="/destinations"
              className={`${styles.navLink} ${
                isActive("/destinations") ? styles.navLinkActive : ""
              }`}
            >
              Destinations
            </Link>
            <Link
              to="/travel-tips"
              className={`${styles.navLink} ${
                isActive("/travel-tips") ? styles.navLinkActive : ""
              }`}
            >
              Travel Tips
            </Link>
            <Link
              to="/about"
              className={`${styles.navLink} ${
                isActive("/about") ? styles.navLinkActive : ""
              }`}
            >
              About Us
            </Link>

            {!isLoading &&
              (isAuthenticated ? (
                <ProfileMenu />
              ) : (
                <Link to="/login" className={styles.loginButton}>
                  Login
                </Link>
              ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobileMenu} />
      )}

      {/* Mobile Sidebar */}
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
            <Link
              to="/destinations"
              className={`${styles.sidebarLink} ${
                isActive("/destinations") ? styles.sidebarLinkActive : ""
              }`}
              onClick={closeMobileMenu}
            >
              Destinations
            </Link>
            <Link
              to="/travel-tips"
              className={`${styles.sidebarLink} ${
                isActive("/travel-tips") ? styles.sidebarLinkActive : ""
              }`}
              onClick={closeMobileMenu}
            >
              Travel Tips
            </Link>
            <Link
              to="/about"
              className={`${styles.sidebarLink} ${
                isActive("/about") ? styles.sidebarLinkActive : ""
              }`}
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
          </nav>

          <div className={styles.sidebarAuth}>
            {!isLoading &&
              (isAuthenticated ? (
                <div className={styles.profileMenuWrapper}>
                  <ProfileMenu />
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className={styles.sidebarLoginButton}
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;