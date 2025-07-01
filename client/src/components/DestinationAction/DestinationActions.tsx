import React from "react";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder, Comment } from "@mui/icons-material";
import { useAuth } from "../../pages/Login/hooks/AuthContext";
import styles from "./DestinationActions.module.css";

interface DestinationActionsProps {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: () => void;
}

const DestinationActions: React.FC<DestinationActionsProps> = ({
  isLiked,
  likesCount,
  commentsCount,
  onLike,
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    onLike();
  };

  return (
    <div className={styles.actions}>
      <button
        onClick={handleLike}
        className={`${styles.actionButton} ${isLiked ? styles.liked : ""}`}
      >
        {isLiked ? <Favorite /> : <FavoriteBorder />}
        {likesCount} {likesCount === 1 ? "Like" : "Likes"}
      </button>
      <div className={styles.commentCount}>
        <Comment className={styles.commentIcon} />
        {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
      </div>
    </div>
  );
};

export default DestinationActions;
