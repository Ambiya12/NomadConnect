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

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTip, setSelectedTip] = useState<TravelTip | null>(null);

  if (loading) return <LoadingSpinner message="Loading travel tips..." />;
  if (error) return <ErrorMessage title="Error" message={error} onRetry={refetch} />;

  const openEditModal = (tip: TravelTip) => {
    setSelectedTip(tip);
    setShowEditModal(true);
  };

  return (
    <div className={styles.container}>
      <section className={styles.headerSection}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>Real advice from real explorers</h1>
          <p className={styles.subtitle}>
            Travel smart, stay local, and discover insider tips from fellow nomads.
          </p>

          {isAuthenticated && (
            <button
              className={styles.addTipButton}
              onClick={() => setShowCreateModal(true)}
            >
              <Add fontSize="small" /> Share Tip
            </button>
          )}
        </div>
      </section>

      <main className={styles.mainContent}>
        {travelTips.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No tips available</h2>
            <p>Be the first to share something helpful.</p>
          </div>
        ) : (
          <>
            {!isAuthenticated && (
              <div className={styles.authNotice}>
                <p>
                  <Link to="/login">Login</Link> or{' '}
                  <Link to="/signup">Sign up</Link> to like and share tips.
                </p>
              </div>
            )}

            <div className={styles.grid}>
              {travelTips.map((tip) => (
                <TravelTipCard
                  key={tip._id}
                  tip={tip}
                  onEdit={() => openEditModal(tip)}
                  onDelete={refetch}
                  onLikeUpdate={refetch}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <section className={styles.newsletter}>
        <h2>Subscribe for Weekly Tips</h2>
        <p>Join thousands of travelers getting curated advice each week.</p>
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <CreateTipModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={refetch}
      />

      <EditTipModal
        isOpen={showEditModal}
        tip={selectedTip}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTip(null);
        }}
        onSuccess={() => {
          refetch();
          setSelectedTip(null);
        }}
      />
    </div>
  );
};

export default TravelTipsPage;
