import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../Login/hooks/AuthContext';
import { likeTravelTip, addComment } from '../service/travelTipsService';

export const useTravelTipActions = (tipId: string, initialLikes: string[]) => {
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(
    user && initialLikes ? initialLikes.includes(user.id) : false
  );
  const [likesCount, setLikesCount] = useState(
    initialLikes ? initialLikes.filter(like => like !== null).length : 0
  );

  React.useEffect(() => {
    if (initialLikes) {
      setIsLiked(user ? initialLikes.includes(user.id) : false);
      setLikesCount(initialLikes.filter(like => like !== null).length);
    }
  }, [initialLikes, user]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const response = await likeTravelTip(tipId);
      setIsLiked(!isLiked);
      setLikesCount(response.likes);
    } catch (error) {
      console.error('Error liking travel tip:', error);
    }
  };

  const handleAddComment = async (comment: string): Promise<boolean> => {
    if (!isAuthenticated) {
      return false;
    }

    try {
      return await addComment(tipId, comment);
    } catch (error) {
      console.error('Error adding comment:', error);
      return false;
    }
  };

  return {
    isLiked,
    likesCount,
    handleLike,
    handleAddComment,
  };
};