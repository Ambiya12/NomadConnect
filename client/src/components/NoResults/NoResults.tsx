import React from "react";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import styles from "./NoResults.module.css";

interface NoResultsProps {
  isAuthenticated: boolean;
}

const NoResults: React.FC<NoResultsProps> = ({ isAuthenticated }) => {
  return (
    <div className={styles.noResults}>
      <h3>No destinations found</h3>
      <p>
        Try adjusting your search criteria or be the first to share a hidden
        gem!
      </p>
      {isAuthenticated && (
        <Link to="/create-destination" className={styles.addDestinationButton}>
          <Add className={styles.buttonIcon} />
          Share Your Hidden Gem
        </Link>
      )}
    </div>
  );
};

export default NoResults;
