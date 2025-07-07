import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Person, Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../../pages/Login/hooks/AuthContext';
import type { TravelTip } from '../../types/travelTip';
import { deleteTravelTip } from '../../pages/TravelTips/service/travelTipsService';
import { formatDate } from '../../utils/destinationUtils';
import styles from './TravelTipCard.module.css';

interface TravelTipCardProps {
  tip: TravelTip;
  onLikeUpdate?: () => void;
  onDelete?: () => void;
  onEdit?: (tip: TravelTip) => void;
}

const TravelTipCard: React.FC<TravelTipCardProps> = ({ tip, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const getAuthorName = () => {
    if (!tip.created_by) return 'Unknown User';
    return `${tip.created_by.first_name || 'Unknown'} ${tip.created_by.last_name || 'User'}`;
  };

  const isOwner = user && tip.created_by && user.id === tip.created_by._id;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this travel tip?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteTravelTip(tip._id);
      onDelete?.();
    } catch (error: any) {
      alert(error.message || 'Failed to delete travel tip');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    onEdit?.(tip);
  };

  const handleReadMore = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/travel-tips/${tip._id}` } });
    } else {
      navigate(`/travel-tips/${tip._id}`);
    }
  };

  const truncateDescription = (description: string, maxLength: number = 120) => {
    return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
  };

  return (
    <div className={styles.tipCard}>
      <div className={styles.cardHeader}>
        <span className={styles.readTime}>
          {Math.ceil(tip.description.length / 200)} min read
        </span>
        {isOwner && (
          <div className={styles.ownerActions}>
            <button onClick={handleEdit} className={styles.editButton} title="Edit tip">
              <Edit />
            </button>
            <button 
              onClick={handleDelete} 
              className={styles.deleteButton} 
              disabled={isDeleting}
              title="Delete tip"
            >
              {isDeleting ? <div className={styles.spinner} /> : <Delete />}
            </button>
          </div>
        )}
      </div>

      <h3 className={styles.tipTitle}>{tip.title}</h3>
      
      <p className={styles.tipDescription}>
        {truncateDescription(tip.description)}
      </p>

      <div className={styles.cardFooter}>
        <div className={styles.authorInfo}>
          <div className={styles.authorAvatar}>
            {tip.created_by?.profile_picture ? (
              <img 
                src={tip.created_by.profile_picture} 
                alt="Author" 
                className={styles.authorImage}
              />
            ) : (
              <Person className={styles.authorIcon} />
            )}
          </div>
          <div className={styles.authorDetails}>
            <span className={styles.authorName}>{getAuthorName()}</span>
            <span className={styles.publishDate}>{formatDate(tip.createdAt)}</span>
          </div>
        </div>

        <div className={styles.cardActions}>
          <div className={styles.actionButtons}>
            <button onClick={handleReadMore} className={styles.readMoreButton}>
              Read More
              <ArrowForward className={styles.buttonIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTipCard;