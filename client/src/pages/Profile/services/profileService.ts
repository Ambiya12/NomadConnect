import type { UserProfile } from '../../../types/profile';

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8000/api/profile/', {
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
  const response = await fetch('http://localhost:8000/api/profile', {
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