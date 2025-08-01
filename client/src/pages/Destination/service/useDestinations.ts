import { useState, useEffect } from "react";
import type { Destination } from "../../../types/destination";

const API_URL = import.meta.env.VITE_API_URL;

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/api/destinations`);

      if (!response.ok) {
        throw new Error("Failed to fetch destinations");
      }

      const data = await response.json();
      setDestinations(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error fetching destinations:", err);
      setError(err.message || "Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return {
    destinations,
    loading,
    error,
    refetch: fetchDestinations,
  };
};
