import { useState, useEffect } from 'react';
import { fetchPublicUserProfile, fetchPublicUserDestinations } from '../services/publicProfileService';
import type { PublicUserProfile, UserStats } from '../../../types/profile';
import type { Destination } from '../../../types/destination';

const handleAsyncOperation = async (operation: () => Promise<void>, setLoading: (state: boolean) => void, setError: (message: string) => void): Promise<void> => {
  try {
    setLoading(true);
    setError('');
    await operation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    setError(err.message || 'An error occurred');
  } finally {
    setLoading(false);
  }
};

export const usePublicProfile = (userId: string) => {
  const [userProfile, setUserProfile] = useState<PublicUserProfile | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [stats, setStats] = useState<UserStats>({ totalDestinations: 0, totalLikes: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    if (!userId) {
      setError('Invalid user ID');
      setLoading(false);
      return;
    }

    await handleAsyncOperation(async () => {
      const profile = await fetchPublicUserProfile(userId);
      setUserProfile(profile);

      const { destinations: userDestinations, stats: userStats } = await fetchPublicUserDestinations(userId);
      setDestinations(userDestinations);
      setStats(userStats);
    }, setLoading, setError);
  };

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  return {
    userProfile,
    destinations,
    stats,
    loading,
    error,
    refetch: loadProfile,
  };
};