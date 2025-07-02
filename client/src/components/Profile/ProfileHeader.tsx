import React from 'react';
import { getImageUrl } from '../../utils/destinationUtils';
import styles from './ProfileHeader.module.css';
import type { UserProfile, UserStats } from '../../types/profile';

interface ProfileHeaderProps {
  userProfile: UserProfile;
  stats: UserStats;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfile, stats }) => {
  const getInitials = () => {
    return `${userProfile.first_name.charAt(0)}${userProfile.last_name.charAt(0)}`.toUpperCase();
  };

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          {userProfile.profile_picture ? (
            <img
              src={getImageUrl(userProfile.profile_picture)}
              alt="Profile"
              className={styles.profileImage}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling!.textContent = getInitials();
              }}
            />
          ) : null}
          {!userProfile.profile_picture && getInitials()}
        </div>
      </div>
      
      <div className={styles.profileInfo}>
        <div className={styles.nameSection}>
          <h1 className={styles.fullName}>
            {userProfile.first_name.toLowerCase()}{userProfile.last_name.toLowerCase()}
          </h1>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.totalDestinations}</span>
            <span className={styles.statLabel}>destinations</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.totalLikes}</span>
            <span className={styles.statLabel}>likes</span>
          </div>
        </div>
        {userProfile.bio && (
          <div className={styles.bio}>
            {userProfile.bio}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;