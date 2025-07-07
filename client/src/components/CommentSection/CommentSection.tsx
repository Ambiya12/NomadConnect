import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../pages/Login/hooks/AuthContext";
import type { Comment, User } from "../../types/destination";
import { formatDate } from "../../utils/destinationUtils";
import styles from "./CommentSection.module.css";

interface CommentSectionProps {
  destinationId: string;
  comments: Comment[];
  commentUsers: { [key: string]: User };
  onCommentSubmit: () => void;
  type?: 'destination' | 'travel-tip'; 
}

const CommentSection: React.FC<CommentSectionProps> = ({
  destinationId,
  comments,
  commentUsers,
  onCommentSubmit,
  type = 'destination', 
}) => {
  const { isAuthenticated } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const submitComment = async (id: string, comment: string): Promise<boolean> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    
    const endpoint = type === 'travel-tip' 
      ? `${API_URL}/api/travel-tips/${id}/comment`
      : `${API_URL}/api/destinations/${id}/comment`;
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });
      return response.ok;
    } catch (error) {
      console.error("Error adding comment:", error);
      return false;
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmittingComment(true);
      const success = await submitComment(destinationId, newComment);
      if (success) {
        setNewComment("");
        onCommentSubmit();
      }
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const getCommentUser = (comment: Comment): User | null => {
    if (
      comment.user &&
      typeof comment.user === "object" &&
      comment.user !== null
    ) {
      return comment.user;
    } else if (comment.user && typeof comment.user === "string") {
      return commentUsers[comment.user] || null;
    }
    return null;
  };

  const getCommentUserInitials = (commentUser: User | null): string => {
    if (!commentUser) return "?";
    const firstInitial = commentUser.first_name?.charAt(0)?.toUpperCase() || "";
    const lastInitial = commentUser.last_name?.charAt(0)?.toUpperCase() || "";
    return firstInitial + lastInitial || "?";
  };

  const getCommentUserName = (commentUser: User | null): string => {
    if (!commentUser) return "Anonymous User";
    const firstName = commentUser.first_name || "";
    const lastName = commentUser.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || "Anonymous User";
  };

  const getPlaceholderText = () => {
    return type === 'travel-tip' 
      ? "Share your thoughts about this travel tip..."
      : "Share your thoughts about this destination...";
  };

  const getLoginPromptText = () => {
    return type === 'travel-tip'
      ? "to share your thoughts about this travel tip."
      : "to share your thoughts about this destination.";
  };

  return (
    <div className={styles.commentsSection}>
      <h2 className={styles.commentsTitle}>Comments ({comments.length})</h2>
      {isAuthenticated ? (
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={getPlaceholderText()}
            className={styles.commentInput}
            rows={3}
            disabled={isSubmittingComment}
          />
          <button
            type="submit"
            className={styles.submitCommentButton}
            disabled={isSubmittingComment || !newComment.trim()}
          >
            {isSubmittingComment ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className={styles.loginPrompt}>
          <p>
            <Link to="/login" className={styles.loginLink}>
              Login
            </Link>{" "}
            {getLoginPromptText()}
          </p>
        </div>
      )}

      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment, index) => {
            const commentUser = getCommentUser(comment);
            return (
              <div key={comment._id || index} className={styles.comment}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentAvatar}>
                    {getCommentUserInitials(commentUser)}
                  </div>
                  <div className={styles.commentMeta}>
                    <span className={styles.commentAuthor}>
                      {getCommentUserName(commentUser)}
                    </span>
                    <span className={styles.commentDate}>
                      {formatDate(comment.date)}
                    </span>
                  </div>
                </div>
                <p className={styles.commentText}>{comment.comment}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;