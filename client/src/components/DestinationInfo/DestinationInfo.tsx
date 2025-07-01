import React from "react";
import { LocationOn } from "@mui/icons-material";
import type { Destination } from "../../types/destination";
import styles from "./DestinationInfo.module.css";

interface DestinationInfoProps {
  destination: Destination;
}

const DestinationInfo: React.FC<DestinationInfoProps> = ({ destination }) => {
  return (
    <>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{destination.name}</h1>
        <div className={styles.locationInfo}>
          <LocationOn className={styles.locationIcon} />
          <span className={styles.locationText}>
            {destination.city}, {destination.country}
          </span>
        </div>
      </div>

      {destination.tags.length > 0 && (
        <div className={styles.tags}>
          {destination.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.description}>
        <p>{destination.description}</p>
      </div>
    </>
  );
};

export default DestinationInfo;
