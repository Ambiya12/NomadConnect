import React, { useState, useRef, useEffect } from 'react';
import { Person, Logout, ExpandMore } from '@mui/icons-material';
import { useAuth } from '../pages/Login/hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileMenu.module.css';

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (isMobile) {
        document.addEventListener('touchstart', handleClickOutside);
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  const handleSignOut = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsOpen(false);
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
  };

  if (!user) return null;

  return (
    <div 
      className={styles.profileMenu} 
      ref={menuRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.profileButton}
      >
        <div className={styles.avatar}>
          {getInitials()}
        </div>
        <span className={styles.userName}>
          {user.first_name}
        </span>
        <ExpandMore className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} />
      </button>

      {isOpen && (
        <>
          {isMobile && (
            <div 
              className={styles.mobileBackdrop}
              onClick={() => setIsOpen(false)}
            />
          )}
          
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <div className={styles.avatarLarge}>
              {getInitials()}
            </div>
            <div className={styles.userDetails}>
              <p className={styles.fullName}>
                {user.first_name} {user.last_name}
              </p>
              <p className={styles.email}>
                {user.email}
              </p>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.menuItems}>
            <button className={styles.menuItem} onClick={handleProfileClick}>
              <Person className={styles.menuIcon} />
              <span>Profile</span>
            </button>

            <div className={styles.divider}></div>

            <button 
              className={`${styles.menuItem} ${styles.signOutItem}`}
              onClick={handleSignOut}
            >
              <Logout className={styles.menuIcon} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;