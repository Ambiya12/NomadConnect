import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack, Share } from "@mui/icons-material";
import styles from "./DestinationHeader.module.css";

interface DestinationHeaderProps {
  destinationName?: string;
  destinationDescription?: string;
}

const DestinationHeader: React.FC<DestinationHeaderProps> = ({
  destinationName,
  destinationDescription,
}) => {
  const navigate = useNavigate();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: destinationName,
          text: destinationDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className={styles.header}>
      <button
        onClick={() => navigate("/destinations")}
        className={styles.backButton}
      >
        <ArrowBack className={styles.buttonIcon} />
        Back to Destinations
      </button>
      <button onClick={handleShare} className={styles.shareButton}>
        <Share className={styles.buttonIcon} />
        Share
      </button>
    </div>
  );
};

export default DestinationHeader;
