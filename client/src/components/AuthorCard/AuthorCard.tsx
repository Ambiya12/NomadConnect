import React from 'react';
import { CalendarToday } from '@mui/icons-material';
import type { User } from '../../types/destination';
import { formatDate } from '../../utils/destinationUtils';
import styles from './AuthorCard.module.css';

interface AuthorCardProps {
  author: User;
  publishDate: string;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, publishDate }) => {
  const getInitials = () => {
    return `${author.first_name.charAt(0)}${author.last_name.charAt(0)}`.toUpperCase();
  };

  return (
    <div className={styles.authorCard}>
      <div className={styles.authorHeader}>
        <div className={styles.authorAvatar}>
          {getInitials()}
        </div>
        <div className={styles.authorInfo}>
          <h3 className={styles.authorName}>
            {author.first_name} {author.last_name}
          </h3>
          <p className={styles.authorRole}>Travel Explorer</p>
        </div>
      </div>
      <div className={styles.publishInfo}>
        <CalendarToday className={styles.dateIcon} />
        <span>Published {formatDate(publishDate)}</span>
      </div>
    </div>
  );
};

export default AuthorCard;