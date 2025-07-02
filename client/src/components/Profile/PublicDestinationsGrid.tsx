import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Favorite, Comment, ExploreOff } from '@mui/icons-material';
import type { Destination } from '../../types/destination';
import { getImageUrl } from '../../utils/destinationUtils';
import styles from './PublicDestinationsGrid.module.css';

interface PublicDestinationsGridProps {
  destinations: Destination[];
  userName: string;
}

const PublicDestinationsGrid: React.FC<PublicDestinationsGridProps> = ({
  destinations,
  userName,
}) => {
  const navigate = useNavigate();

  const handleDestinationClick = (destinationId: string) => {
    navigate(`/destination/${destinationId}`);
  };

  if (destinations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <ExploreOff style={{ fontSize: '1.5rem' }} />
        </div>
        <h3>No Adventures Yet</h3>
        <p>{userName} hasn't shared any destinations with the community yet.</p>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicDestinationsGrid;