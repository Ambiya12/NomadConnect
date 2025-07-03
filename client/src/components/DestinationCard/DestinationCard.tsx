import React from "react";
import { Link } from "react-router-dom";
import { ArrowForward, Person, LocationOn } from "@mui/icons-material";
import type { Destination } from "../../types/destination";
import styles from "./DestinationCard.module.css";
import { formatDate, getImageUrl } from "../../utils/destinationUtils";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {

  return (
    <div className={styles.destinationCard}>
      <div className={styles.imageContainer}>
        <img
          src={
        destination.images.length > 0
          ? getImageUrl(destination.images[0])
          : ""
          }
          alt={destination.name}
          className={styles.destinationImage}
          onError={(e) => {
        (e.target as HTMLImageElement).src = "";
          }}
        />
        <div className={styles.imageOverlay}></div>
        <div className={styles.destinationName}>
          <h3>{destination.name}</h3>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.locationInfo}>
          <LocationOn className={styles.locationIcon} />
          <span className={styles.locationText}>
            {destination.city}, {destination.country}
          </span>
        </div>

        <div className={styles.authorInfo}>
          <Person className={styles.authorIcon} />
          <span className={styles.authorText}>
            Published by {destination.created_by.first_name}{" "}
            {destination.created_by.last_name}
          </span>
          <span className={styles.publishDate}>
            • {formatDate(destination.created_at)}
          </span>
        </div>

        {destination.tags.length > 0 && (
          <div className={styles.tags}>
            {destination.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
            {destination.tags.length > 3 && (
              <span className={styles.tag}>
                +{destination.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <p className={styles.description}>
          {destination.description.length > 120
            ? `${destination.description.substring(0, 120)}...`
            : destination.description}
        </p>

        <div className={styles.cardActions}>
          <div className={styles.stats}>
            <span className={styles.likesCount}>
              {destination.likes.filter((like) => like !== null).length} likes
            </span>
            <span className={styles.commentsCount}>
              {destination.comments.length} comments
            </span>
          </div>

          <Link
            to={`/destination/${destination._id}`}
            className={styles.readMoreButton}
          >
            Read More
            <ArrowForward className={styles.buttonIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
