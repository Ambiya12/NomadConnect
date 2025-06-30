import React, { useState, useRef, useEffect } from "react";
import { Person, Language, Logout, ExpandMore } from "@mui/icons-material";
import { useAuth } from "../pages/Login/hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileMenu.module.css";

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsOpen(false);
      navigate("/");
    }
  };

  const getInitials = () => {
    if (!user) return "U";
    return `${user.first_name.charAt(0)}${user.last_name.charAt(
      0
    )}`.toUpperCase();
  };

  if (!user) return null;

  return (
    <div className={styles.profileMenu} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.profileButton}
      >
        <div className={styles.avatar}>{getInitials()}</div>
        <span className={styles.userName}>{user.first_name}</span>
        <ExpandMore
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
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

          <div className={styles.divider}></div>

          <div className={styles.menuItems}>
            <button className={styles.menuItem}>
              <Person className={styles.menuIcon} />
              <span>Profile</span>
            </button>

            <button className={styles.menuItem}>
              <Language className={styles.menuIcon} />
              <span>Language</span>
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
      )}
    </div>
  );
};

export default ProfileMenu;
