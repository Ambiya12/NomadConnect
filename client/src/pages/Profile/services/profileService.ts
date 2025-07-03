import type { UserProfile } from '../../../types/profile';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
};

export const updateUserBio = async (bio: string): Promise<UserProfile> => {
  const token = localStorage.getItem('token');
  const response = await fetch('${API_URL}/api/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bio }),
  });

  if (!response.ok) {
    throw new Error('Failed to update bio');
  }

  return response.json();
};