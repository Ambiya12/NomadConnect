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

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsOpen(false);
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const getInitials = () =>
    user ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase() : 'U';

  if (!user) return null;

  return (
    <div className={styles.profileMenu} ref={menuRef}>
      <button onClick={toggleDropdown} className={styles.profileButton}>
        <div className={styles.avatar}>{getInitials()}</div>
        <span className={styles.userName}>{user.first_name}</span>
        <ExpandMore
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <div className={styles.avatarLarge}>{getInitials()}</div>
            <div className={styles.userDetails}>
              <p className={styles.fullName}>
                {user.first_name} {user.last_name}
              </p>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.menuItems}>
            <button className={styles.menuItem} onClick={handleProfileClick}>
              <Person className={styles.menuIcon} />
              <span>Profile</span>
            </button>

            <div className={styles.divider} />

            <button
              className={`${styles.menuItem} ${styles.signOutItem}`}
              onClick={handleSignOut}
            >
              <Logout className={styles.menuIcon} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;