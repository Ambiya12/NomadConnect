import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete, Favorite, Comment, CameraAlt, Add } from '@mui/icons-material';
import type { Destination } from '../../types/destination';
import { getImageUrl } from '../../utils/destinationUtils';
import styles from './DestinationsGrid.module.css';

interface DestinationsGridProps {
  destinations: Destination[];
  deleteLoading: string | null;
  onEdit: (destinationId: string) => void;
  onDelete: (destinationId: string) => Promise<void>;
}

const DestinationsGrid: React.FC<DestinationsGridProps> = ({
  destinations,
  deleteLoading,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleDestinationClick = (destinationId: string) => {
    navigate(`/destination/${destinationId}`);
  };

  const handleDelete = async (destinationId: string) => {
    try {
      await onDelete(destinationId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || 'Failed to delete destination');
    }
  };

  if (destinations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <CameraAlt style={{ fontSize: '1.5rem' }} />
        </div>
        <h3>Share Your Adventures</h3>
        <p>Start building your travel portfolio by sharing your favorite destinations and hidden gems with the community.</p>
        <button 
          onClick={() => navigate('/create-destination')}
          className={styles.addFirstDestinationButton}
        >
          <Add style={{ fontSize: '1rem' }} />
          Share First Destination
        </button>
      </div>
    );
  }

  return (
    <div className={styles.destinationsGrid}>
      {destinations.map((destination) => (
        <div 
          key={destination._id} 
          className={styles.destinationCard}
          onClick={() => handleDestinationClick(destination._id)}
        >
          <div className={styles.imageContainer}>
            <img
              src={
                destination.images.length > 0
                  ? getImageUrl(destination.images[0])
                  : 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400'
              }
              alt={destination.name}
              className={styles.destinationImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayStats}>
                <div className={styles.overlayStat}>
                  <Favorite className={styles.overlayIcon} />
                  <span>{destination.likes.filter(like => like !== null).length}</span>
                </div>
                <div className={styles.overlayStat}>
                  <Comment className={styles.overlayIcon} />
                  <span>{destination.comments.length}</span>
                </div>
              </div>
            </div>
            <div className={styles.cardActions}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(destination._id);
                }}
                className={styles.actionButton}
                title="Edit destination"
              >
                <Edit className={styles.actionIcon} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(destination._id);
                }}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                disabled={deleteLoading === destination._id}
                title="Delete destination"
              >
                {deleteLoading === destination._id ? (
                  <div className={styles.spinner} />
                ) : (
                  <Delete className={styles.actionIcon} />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationsGrid;