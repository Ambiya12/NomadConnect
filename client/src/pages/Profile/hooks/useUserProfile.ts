import { useState, useEffect } from 'react';
import { useAuth } from '../../Login/hooks/AuthContext';
import { fetchUserDestinations, deleteDestination } from '../services/destinationService';
import type { Destination } from '../../../types/destination';
import type { UserStats } from '../../../types/profile';

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

export const useUserDestinations = () => {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [stats, setStats] = useState<UserStats>({ totalDestinations: 0, totalLikes: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const loadDestinations = async () => {
    if (!user) return;

    await handleAsyncOperation(async () => {
      const { destinations: userDestinations, stats: userStats } = await fetchUserDestinations(user.id);
      setDestinations(userDestinations);
      setStats(userStats);
    }, setLoading, setError);
  };

  const handleDeleteDestination = async (destinationId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this destination?')) {
      return;
    }

    await handleAsyncOperation(async () => {
      setDeleteLoading(destinationId);
      await deleteDestination(destinationId);

      const deletedDest = destinations.find(dest => dest._id === destinationId);
      setDestinations(prev => prev.filter(dest => dest._id !== destinationId));

      if (deletedDest) {
        setStats(prev => ({
          totalDestinations: prev.totalDestinations - 1,
          totalLikes: prev.totalLikes - deletedDest.likes.filter(like => like !== null).length,
        }));
      }
    }, () => setDeleteLoading(null), setError);
  };

  useEffect(() => {
    if (user) {
      loadDestinations();
    }
  }, [user]);

  return {
    destinations,
    stats,
    loading,
    error,
    deleteLoading,
    handleDeleteDestination,
    refetch: loadDestinations,
  };
};