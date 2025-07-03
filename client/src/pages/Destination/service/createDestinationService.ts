import type { CreateDestinationPayload } from '../../../types/destination';

const API_URL = import.meta.env.VITE_API_URL;

export const createDestination = async (submitData: FormData): Promise<CreateDestinationPayload> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  const response = await fetch(`${API_URL}/api/destinations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: submitData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create destination");
  }

  return result;
};
