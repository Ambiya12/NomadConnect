import { useState, useEffect } from 'react';
import { useAuth } from '../../Login/hooks/AuthContext';
import { fetchUserProfile, updateUserBio } from '../services/profileService';
import type { UserProfile } from '../../../types/profile';

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

export const useProfile = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    await handleAsyncOperation(async () => {
      const profile = await fetchUserProfile();
      setUserProfile(profile);
    }, setLoading, setError);
  };

  const updateBio = async (bio: string): Promise<void> => {
    await handleAsyncOperation(async () => {
      const updatedProfile = await updateUserBio(bio);
      setUserProfile(updatedProfile);
    }, setLoading, setError);
  };

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  return {
    userProfile,
    loading,
    error,
    updateBio,
    refetch: loadProfile,
  };
};