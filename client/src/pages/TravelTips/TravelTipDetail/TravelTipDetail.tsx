import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowBack, Favorite, FavoriteBorder, Comment, Edit, Delete, Share } from '@mui/icons-material';
import { useAuth } from '../../Login/hooks/AuthContext';
import { fetchTravelTipById, deleteTravelTip } from '../service/travelTipsService';
import { useTravelTipActions } from '../hooks/useTravelTipActions';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import CommentSection from '../../../components/CommentSection/CommentSection';
import { formatDate } from '../../../utils/destinationUtils';
import type { TravelTip, User } from '../../../types/travelTip';
import styles from './TravelTipDetailPage.module.css';

const TravelTipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [tip, setTip] = useState<TravelTip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentUsers, setCommentUsers] = useState<Record<string, User>>({});
  const [isDeleting, setDeleting] = useState(false);

  const { isLiked, likesCount, handleLike } = useTravelTipActions(
    tip?._id ?? '',
    tip?.likes ?? [],
  );

  const loadTravelTip = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchTravelTipById(id);
      setTip(data);

      const userIds = Array.from(
        new Set(
          data.comments
            .filter(c => typeof c.user === 'string')
            .map(c => c.user as string),
        ),
      );
      if (userIds.length) fetchCommentUsers(userIds);
    } catch (err: any) {
      setError(err.message ?? 'Error loading tip');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchCommentUsers = async (ids: string[]) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const responseMap: Record<string, User> = {};
    await Promise.all(
      ids.map(async uid => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/profile/${uid}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (res.ok) {
            const u = await res.json();
            responseMap[uid] = { _id: u._id, first_name: u.first_name, last_name: u.last_name };
          }
        } catch (e) {
          console.error('User fetch error', e);
        }
      }),
    );
    setCommentUsers(responseMap);
  };

  useEffect(() => {
    void loadTravelTip();
  }, [loadTravelTip]);

  const handleDelete = async () => {
    if (!tip || !confirm('Sure to delete?')) return;
    setDeleting(true);
    try {
      await deleteTravelTip(tip._id);
      navigate('/travel-tips');
    } catch (err: any) {
      alert(err.message ?? 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const handleLikeClick = async () => {
    if (!isAuthenticated) return navigate('/login');
    await handleLike();
    if (tip) setTip(await fetchTravelTipById(tip._id));
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: tip?.title,
          text: tip?.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Copied to clipboard!');
      }
    } catch (e) {
      console.error('Share error', e);
    }
  };

  const initials = tip
    ? `${tip.created_by.first_name?.[0] ?? ''}${tip.created_by.last_name?.[0] ?? ''}`.toUpperCase()
    : 'UN';
  const authorName = tip
    ? `${tip.created_by.first_name ?? 'Unknown'} ${tip.created_by.last_name ?? 'User'}`
    : 'Unknown User';
  const isOwner = user && tip?.created_by?._id === user.id;

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error || !tip) {
    return (
      <ErrorMessage
        title="Not found"
        message={error}
        onRetry={() => (
          <Link to="/travel-tips" className={styles.btn}>
            <ArrowBack /> Back
          </Link>
        )}
      />
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.btn} onClick={() => navigate('/travel-tips')}>
          <ArrowBack /> Tips
        </button>
        <div className={styles.headerActions}>
          <button onClick={handleShare} className={styles.iconBtn}><Share /></button>
          {isOwner && (
            <>
              <button
                onClick={() => navigate(`/travel-tips/${id}/edit`)}
                className={styles.iconBtn}
              ><Edit /></button>
              <button
                onClick={handleDelete}
                className={styles.iconBtn}
                disabled={isDeleting}
              >
                {isDeleting ? <div className={styles.spinner} /> : <Delete />}
              </button>
            </>
          )}
        </div>
      </header>

      <article className={styles.article}>
        <span className={styles.category}>Travel Tip</span>
        <h1 className={styles.title}>{tip.title}</h1>
        <div className={styles.meta}>
          <div className={styles.author}>
            <div className={styles.avatar}>{tip.created_by.profile_picture
              ? <img src={tip.created_by.profile_picture} alt="avatar" />
              : initials
            }</div>
            <div>
              <div className={styles.authorName}>{authorName}</div>
              <time className={styles.publishDate}>{formatDate(tip.createdAt)}</time>
            </div>
          </div>
          <div className={styles.readTime}>
            {Math.ceil(tip.description.length / 200)} min read
          </div>
        </div>

        <div className={styles.content}>
          {tip.description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className={styles.actions}>
          <button onClick={handleLikeClick} className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}>
            {isLiked ? <Favorite /> : <FavoriteBorder />} {likesCount}
          </button>

          <div className={styles.commentCount}>
            <Comment /> {tip.comments.length}
          </div>
        </div>

        <CommentSection
          destinationId={tip._id}
          comments={tip.comments}
          commentUsers={commentUsers}
          onCommentSubmit={loadTravelTip}
          type="travel-tip"
        />
      </article>
    </div>
  );
};

export default TravelTipDetailPage;