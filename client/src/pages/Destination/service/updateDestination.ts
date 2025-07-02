export const fetchDestinationById = async (id: string, token: string) => {
  const response = await fetch(`http://localhost:8000/api/destinations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Destination not found');
  }

  return response.json();
};

export const updateDestinationById = async (id: string, token: string, updateData: Record<string, unknown>) => {
  const response = await fetch(`http://localhost:8000/api/destinations/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to update destination');
  }

  return response.json();
};
