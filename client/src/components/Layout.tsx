import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Explore } from "@mui/icons-material";
import { useAuth } from "../pages/Login/hooks/AuthContext";
import ProfileMenu from "./ProfileMenu";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.minHScreen}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.logo}>
            <Explore className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Nomad</span>
              <span className={styles.logoTitle}>Connect</span>
            </div>
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/destinations"
              className={`${styles.navLink} ${
                isActive("/destinations") ? styles.navLinkActive : ""
              }`}
            >
              Destination
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
              About us
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
        </div>

        <nav className={styles.mobileNav}>
          <Link
            to="/destinations"
            className={`${styles.navLink} ${
              isActive("/destinations") ? styles.navLinkActive : ""
            }`}
          >
            Destination
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
            About us
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
