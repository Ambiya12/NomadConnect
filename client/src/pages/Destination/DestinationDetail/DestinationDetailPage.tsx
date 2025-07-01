import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { useDestinationDetail } from "../service/useDestinationDetail";
import { useLikes } from "../service/useLikes";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import DestinationHeader from "../../../components/DestinationHeader/DestinationHeader";
import ImageGallery from "../../../components/ImageGallery/ImageGallery";
import DestinationInfo from "../../../components/DestinationInfo/DestinationInfo";
import DestinationActions from "../../../components/DestinationAction/DestinationActions";
import AuthorCard from "../../../components/AuthorCard/AuthorCard";
import LocationCard from "../../../components/LocationCard/LocationCard";
import CommentSection from "../../../components/CommentSection/CommentSection";
import styles from "./DestinationDetailPage.module.css";

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { destination, loading, error, commentUsers, refetch } =
    useDestinationDetail(id);
  const { isLiked, likesCount, handleLike } = useLikes(
    destination?._id || "",
    destination?.likes || []
  );

  if (loading) {
    return <LoadingSpinner message="Loading destination..." />;
  }

  if (error || !destination) {
    return (
      <ErrorMessage
        title="Destination not found"
        message={error}
        onRetry={() => (
          <Link to="/destinations" className={styles.backButton}>
            <ArrowBack className={styles.buttonIcon} />
            Back to Destinations
          </Link>
        )}
      />
    );
  }

  return (
    <div className={styles.container}>
      <DestinationHeader
        destinationName={destination.name}
        destinationDescription={destination.description}
      />

      <ImageGallery images={destination.images} name={destination.name} />

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <DestinationInfo destination={destination} />

          <DestinationActions
            isLiked={isLiked}
            likesCount={likesCount}
            commentsCount={destination.comments.length}
            onLike={handleLike}
          />
        </div>

        <div className={styles.sidebar}>
          <AuthorCard
            author={destination.created_by}
            publishDate={destination.created_at}
          />

          <LocationCard
            city={destination.city}
            country={destination.country}
            location={destination.location}
          />
        </div>
      </div>

      <CommentSection
        destinationId={destination._id}
        comments={destination.comments}
        commentUsers={commentUsers}
        onCommentSubmit={refetch}
      />
    </div>
  );
};

export default DestinationDetailPage;
