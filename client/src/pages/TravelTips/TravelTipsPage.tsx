import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { useAuth } from '../Login/hooks/AuthContext';
import { useTravelTips } from './hooks/useTravelTips';
import TravelTipCard from '../../components/TravelTips/TravelTipCard';
import CreateTipModal from '../../components/TravelTips/CreateTipModal';
import EditTipModal from '../../components/TravelTips/EditTipModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import type { TravelTip } from '../../types/travelTip';
import styles from './TravelTipsPage.module.css';

const TravelTipsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { travelTips, loading, error, refetch } = useTravelTips();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<TravelTip | null>(null);

  const handleCreateSuccess = () => {
    refetch();
  };

  const handleEditSuccess = () => {
    refetch();
    setEditingTip(null);
  };

  const handleEdit = (tip: TravelTip) => {
    setEditingTip(tip);
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner message="Loading travel tips..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Error loading travel tips"
        message={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.container}>

      <section className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>
            Real advice from real explorers
          </h1>
          <p className={styles.subtitle}>
            Travel smart, stay local, and discover insider tips from fellow nomads
          </p>
          
        </div>
      </section>

      <section className={styles.tipsSection}>
        <div className={styles.tipsContainer}>
          {travelTips.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No travel tips yet</h3>
              <p>Be the first to share your travel wisdom with the community!</p>
              {isAuthenticated && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className={styles.addFirstTipButton}
                >
                  <Add className={styles.buttonIcon} />
                  Share First Tip
                </button>
              )}
            </div>
          ) : (
            <>
              {!isAuthenticated && (
                <div className={styles.authNotice}>
                  <p>
                    <Link to="/login" className={styles.authLink}>Login</Link> or{' '}
                    <Link to="/signup" className={styles.authLink}>sign up</Link> to view detailed travel tips, like posts, and share your own travel wisdom with the community.
                  </p>
                </div>
              )}
            <div className={styles.tipsGrid}>
              {travelTips.map((tip) => (
                <TravelTipCard
                  key={tip._id}
                  tip={tip}
                  onLikeUpdate={refetch}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
            </>
          )}
        </div>
      </section>

      <section className={styles.newsletterSection}>
        <div className={styles.newsletterContainer}>
          <h2 className={styles.newsletterTitle}>
            Get Weekly Travel Tips
          </h2>
          <p className={styles.newsletterDescription}>
            Join thousands of travelers getting insider tips delivered to their inbox every week.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
            />
            <button className={styles.subscribeButton}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <CreateTipModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      <EditTipModal
        isOpen={isEditModalOpen}
        tip={editingTip}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTip(null);
        }}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default TravelTipsPage;