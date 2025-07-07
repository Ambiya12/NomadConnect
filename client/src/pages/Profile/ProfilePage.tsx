import React, { useEffect } from 'react';
import { useAuth } from '../Login/hooks/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import DestinationsGrid from '../../components/Profile/DestinationsGrid';
import { useProfile } from './hooks/useProfile';
import { useUserDestinations } from './hooks/useUserProfile';
import styles from './Profile.module.css';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { userProfile, loading: profileLoading, error: profileError } = useProfile();
  const {
    destinations,
    stats,
    loading: destinationsLoading,
    error: destinationsError,
    deleteLoading,
    handleDeleteDestination,
  } = useUserDestinations();

  useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const loading = profileLoading || destinationsLoading;
  const error = profileError || destinationsError;

  if (loading) return <LoadingSpinner message="Loading your profile..." />;

  if (error) {
    return (
      <ErrorMessage
        title="Error loading profile"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!user || !userProfile) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ProfileHeader userProfile={userProfile} stats={stats} />

        <section className={styles.section}>
          <h2 className={styles.title}>Destinations</h2>
          <DestinationsGrid
            destinations={destinations}
            deleteLoading={deleteLoading}
            onEdit={(id) => navigate(`/edit-destination/${id}`)}
            onDelete={handleDeleteDestination}
          />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;