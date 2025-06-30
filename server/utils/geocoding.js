import axios from "axios";

export const getCoordinatesForLocation = async (country, city) => {
  try {
    const apiKey = process.env.OPENCAGE_API_KEY; 
    const query = `${city}, ${country}`;
    const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
      params: {
        q: query,
        key: apiKey,
      },
    });

    const results = response.data.results;
    if (results.length > 0) {
      const location = results[0].geometry;
      return [location.lng, location.lat]; 
    }
    return [0, 0];
  } catch (error) {
    console.error("Error fetching coordinates from OpenCage:", error);
    return [0, 0]; 
  }
};