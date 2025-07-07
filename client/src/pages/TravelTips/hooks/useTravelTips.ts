import { useState, useEffect } from 'react';
import { fetchTravelTips } from '../service/travelTipsService';
import type { TravelTip } from '../../../types/travelTip';

export const useTravelTips = () => {
  const [travelTips, setTravelTips] = useState<TravelTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTravelTips = async () => {
    try {
      setLoading(true);
      setError('');
      const tips = await fetchTravelTips();
      setTravelTips(tips);
    } catch (err: any) {
      console.error('Error fetching travel tips:', err);
      setError(err.message || 'Failed to load travel tips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTravelTips();
  }, []);

  return {
    travelTips,
    loading,
    error,
    refetch: loadTravelTips,
  };
};