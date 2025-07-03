/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { Destination, User } from "../../../types/destination";

const API_URL = import.meta.env.VITE_API_URL;

export const useDestinationDetail = (id: string | undefined) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentUsers, setCommentUsers] = useState<{ [key: string]: User }>({});

  const fetchDestination = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/destinations/${id}`
      );

      if (!response.ok) {
        throw new Error("Destination not found");
      }

      const data = await response.json();
      setDestination(data);

      const userIds = data.comments
        .filter(
          (comment: any) => comment.user && typeof comment.user === "string"
        )
        .map((comment: any) => comment.user as string);

      if (userIds.length > 0) {
        await fetchCommentUsers(userIds);
      }
    } catch (err: any) {
      console.error("Error fetching destination:", err);
      setError(err.message || "Failed to load destination");
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentUsers = async (userIds: string[]) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const uniqueUserIds = [...new Set(userIds)];
      const usersMap: { [key: string]: User } = {};

      for (const userId of uniqueUserIds) {
        try {
          const response = await fetch(
            `${API_URL}/api/profile/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            usersMap[userId] = {
              _id: userData._id,
              first_name: userData.first_name,
              last_name: userData.last_name,
            };
          }
        } catch (error) {
          console.error(`Error fetching user ${userId}:`, error);
        }
      }

      setCommentUsers(usersMap);
    } catch (error) {
      console.error("Error fetching comment users:", error);
    }
  };

  useEffect(() => {
    fetchDestination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    destination,
    loading,
    error,
    commentUsers,
    refetch: fetchDestination,
  };
};
