import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PublicProfileHeader from '../../components/Profile/PublicProfileHeader';
import PublicDestinationsGrid from '../../components/Profile/PublicDestinationsGrid';
import { usePublicProfile } from './hooks/usePublicProfile';
import styles from './Profile.module.css';

const PublicProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { userProfile, destinations, stats, loading, error } = usePublicProfile(userId!);

  if (loading) return <LoadingSpinner message="Loading profile..." />;

  if (error || !userProfile) {
    return (
      <ErrorMessage
        title="Profile not found"
        message={
          error ||
          "This user's profile could not be found. The user may not exist or their profile may be private."
        }
        onRetry={() => navigate(-1)}
      />
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <ArrowBack className={styles.icon} /> Back
      </button>

      <div className={styles.content}>
        <PublicProfileHeader userProfile={userProfile} stats={stats} />

        <section className={styles.section}>
          <h2 className={styles.title}>Destinations</h2>
          <PublicDestinationsGrid destinations={destinations} userName={userProfile.first_name} />
        </section>
      </div>
    </div>
  );
};

export default PublicProfilePage;