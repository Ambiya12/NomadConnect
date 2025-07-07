import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowBack, Favorite, FavoriteBorder, Comment, Edit, Delete, Share } from '@mui/icons-material';
import { useAuth } from '../../Login/hooks/AuthContext';
import { fetchTravelTipById, deleteTravelTip } from '../service/travelTipsService';
import { useTravelTipActions } from '../hooks/useTravelTipActions';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CommentSection from '../../../components/CommentSection/CommentSection';
import type { TravelTip, User } from '../../../types/travelTip';
import { formatDate } from '../../../utils/destinationUtils';
import styles from './TravelTipDetailPage.module.css';

const TravelTipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [tip, setTip] = useState<TravelTip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentUsers, setCommentUsers] = useState<{ [key: string]: User }>({});
  const [isDeleting, setIsDeleting] = useState(false);

  const { isLiked, likesCount, handleLike } = useTravelTipActions(
    tip?._id || '',
    tip?.likes || []
  );

  useEffect(() => {
    if (id) {
      loadTravelTip();
    }
  }, [id]);

  const loadTravelTip = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const tipData = await fetchTravelTipById(id);
      setTip(tipData);
      
      const userIds = tipData.comments
        .filter((comment: any) => comment.user && typeof comment.user === 'string')
        .map((comment: any) => comment.user as string);

      if (userIds.length > 0) {
        await fetchCommentUsers(userIds);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load travel tip');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentUsers = async (userIds: string[]) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const uniqueUserIds = [...new Set(userIds)];
      const usersMap: { [key: string]: User } = {};

      for (const userId of uniqueUserIds) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

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
      console.error('Error fetching comment users:', error);
    }
  };

  const handleDelete = async () => {
    if (!tip || !window.confirm('Are you sure you want to delete this travel tip?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteTravelTip(tip._id);
      navigate('/travel-tips');
    } catch (error: any) {
      alert(error.message || 'Failed to delete travel tip');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await handleLike();
    if (tip) {
      const updatedTip = await fetchTravelTipById(tip._id);
      setTip(updatedTip);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tip?.title,
          text: tip?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getAuthorInitials = () => {
    if (!tip?.created_by) return 'UN';
    const firstName = tip.created_by.first_name || '';
    const lastName = tip.created_by.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'UN';
  };

  const getAuthorName = () => {
    if (!tip?.created_by) return 'Unknown User';
    return `${tip.created_by.first_name || 'Unknown'} ${tip.created_by.last_name || 'User'}`;
  };

  const isOwner = user && tip?.created_by && user.id === tip.created_by._id;

  if (loading) {
    return <LoadingSpinner message="Loading travel tip..." />;
  }

  if (error || !tip) {
    return (
      <ErrorMessage
        title="Travel tip not found"
        message={error}
        onRetry={() => (
          <Link to="/travel-tips" className={styles.backButton}>
            <ArrowBack className={styles.buttonIcon} />
            Back to Travel Tips
          </Link>
        )}
      />
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          onClick={() => navigate('/travel-tips')}
          className={styles.backButton}
        >
          <ArrowBack className={styles.buttonIcon} />
          Travel Tips
        </button>
        
        <div className={styles.headerActions}>
          <button onClick={handleShare} className={styles.shareButton}>
            <Share className={styles.buttonIcon} />
          </button>
          
          {isOwner && (
            <>
              <button
                onClick={() => navigate(`/travel-tips/${id}/edit`)}
                className={styles.editButton}
              >
                <Edit className={styles.buttonIcon} />
              </button>
              <button
                onClick={handleDelete}
                className={styles.deleteButton}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <div className={styles.spinner} />
                ) : (
                  <Delete className={styles.buttonIcon} />
                )}
              </button>
            </>
          )}
        </div>
      </header>

      <article className={styles.article}>
        <div className={styles.articleHeader}>
          <span className={styles.category}>Travel Tip</span>
          <h1 className={styles.title}>{tip.title}</h1>
          
          <div className={styles.meta}>
            <div className={styles.author}>
              <div className={styles.authorAvatar}>
                {tip.created_by?.profile_picture ? (
                  <img 
                    src={tip.created_by.profile_picture} 
                    alt="Author" 
                    className={styles.authorImage}
                  />
                ) : (
                  getAuthorInitials()
                )}
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{getAuthorName()}</span>
                <time className={styles.publishDate}>{formatDate(tip.createdAt)}</time>
              </div>
            </div>
            <div className={styles.readTime}>
              {Math.ceil(tip.description.length / 200)} min read
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {tip.description.split('\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleLikeClick}
            className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
          >
            {isLiked ? <Favorite /> : <FavoriteBorder />}
            <span>{likesCount}</span>
          </button>
          
          <div className={styles.commentCount}>
            <Comment className={styles.commentIcon} />
            <span>{tip.comments.length}</span>
          </div>
        </div>
      </article>

      <CommentSection
        destinationId={tip._id}
        comments={tip.comments}
        commentUsers={commentUsers}
        onCommentSubmit={() => loadTravelTip()}
        type="travel-tip"
      />
    </div>
  );
};

export default TravelTipDetailPage;