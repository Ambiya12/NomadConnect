import type { TravelTip, CreateTravelTipPayload } from '../../../types/travelTip';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTravelTips = async (): Promise<TravelTip[]> => {
  const response = await fetch(`${API_URL}/api/travel-tips`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch travel tips');
  }
  
  return response.json();
};

export const fetchTravelTipById = async (id: string): Promise<TravelTip> => {
  const response = await fetch(`${API_URL}/api/travel-tips/${id}`);
  
  if (!response.ok) {
    throw new Error('Travel tip not found');
  }
  
  return response.json();
};

export const createTravelTip = async (tipData: CreateTravelTipPayload): Promise<TravelTip> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/api/travel-tips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tipData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create travel tip');
  }

  return response.json();
};

export const updateTravelTip = async (id: string, tipData: Partial<CreateTravelTipPayload>): Promise<TravelTip> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/api/travel-tips/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tipData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update travel tip');
  }

  return response.json();
};

export const deleteTravelTip = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/api/travel-tips/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete travel tip');
  }
};

export const likeTravelTip = async (id: string): Promise<{ likes: number }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/api/travel-tips/${id}/like`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to like travel tip');
  }

  return response.json();
};

export const addComment = async (id: string, comment: string): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/api/travel-tips/${id}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });

  return response.ok;
};