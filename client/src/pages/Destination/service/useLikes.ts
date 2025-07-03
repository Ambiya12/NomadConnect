import { useState, useEffect } from "react";
import { useAuth } from "../../Login/hooks/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useLikes = (destinationId: string, initialLikes: string[]) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    if (user) {
      setIsLiked(initialLikes.includes(user.id));
      setLikesCount(initialLikes.filter((like) => like !== null).length);
    }
  }, [initialLikes, user]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/destinations/${destinationId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLiked(!isLiked);
        setLikesCount(data.likes);
      }
    } catch (error) {
      console.error("Error liking destination:", error);
    }
  };

  return {
    isLiked,
    likesCount,
    handleLike,
  };
};
