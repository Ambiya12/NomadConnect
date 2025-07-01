import React from "react";
import { LocationOn } from "@mui/icons-material";
import type { Location } from "../../types/destination";
import styles from "./LocationCard.module.css";

interface LocationCardProps {
  city: string;
  country: string;
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({
  city,
  country,
  location,
}) => {
  return (
    <div className={styles.mapCard}>
      <h3 className={styles.mapTitle}>Location</h3>
      <div className={styles.mapPlaceholder}>
        <LocationOn className={styles.mapIcon} />
        <p>
          {city}, {country}
        </p>
        {location.coordinates && (
          <p className={styles.coordinates}>
            {location.coordinates[1].toFixed(4)},{" "}
            {location.coordinates[0].toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
