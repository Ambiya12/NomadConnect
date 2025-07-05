import type { PublicUserProfile } from '../../../types/profile';
import type { Destination } from '../../../types/destination';
import type { UserStats } from '../../../types/profile';

const API_URL = import.meta.env.VITE_API_URL;

const handleFetchError = (response: Response, notFoundMessage: string, defaultMessage: string): void => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(notFoundMessage);
    }
    throw new Error(defaultMessage);
  }
};

export const fetchPublicUserProfile = async (userId: string): Promise<PublicUserProfile> => {
  const response = await fetch(`${API_URL}/api/user/${userId}`);
  handleFetchError(response, 'User profile not found', 'Failed to fetch user profile');

  const data = await response.json();
  
  return {
    _id: data._id,
    first_name: data.first_name,
    last_name: data.last_name,
    profile_picture: data.profile_picture,
    bio: data.bio,
  };
};

export const fetchPublicUserDestinations = async (userId: string): Promise<{ destinations: Destination[]; stats: UserStats }> => {
  const response = await fetch(`${API_URL}/api/destinations`);
  handleFetchError(response, '', 'Failed to fetch destinations');

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