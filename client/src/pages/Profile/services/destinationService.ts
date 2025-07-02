import type { Destination } from '../../../types/destination';
import type { UserStats } from '../../../types/profile';

export const fetchUserDestinations = async (userId: string): Promise<{ destinations: Destination[]; stats: UserStats }> => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/destinations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch destinations');
  }

  const allDestinations = await response.json();
  const userDestinations = allDestinations.filter(
    (dest: Destination) => dest.created_by._id === userId
  );

  const totalLikes = userDestinations.reduce(
    (sum: number, dest: Destination) => sum + dest.likes.filter(like => like !== null).length,
    0
  );

  const stats: UserStats = {
    totalDestinations: userDestinations.length,
    totalLikes,
  };

  return { destinations: userDestinations, stats };
};

export const deleteDestination = async (destinationId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8000/api/destinations/${destinationId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete destination');
  }
};