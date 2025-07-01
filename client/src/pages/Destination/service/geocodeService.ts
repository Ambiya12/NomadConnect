export const getCoordinatesForLocation = async (country: string, city: string, address: string): Promise<[number, number]> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/geocode?country=${encodeURIComponent(country)}&city=${encodeURIComponent(city)}&address=${encodeURIComponent(address)}`
    );
    const result = await response.json();

    if (response.ok && result.coordinates) {
      return result.coordinates; 
    }
    return [0, 0];
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return [0, 0]; 
  }
};
