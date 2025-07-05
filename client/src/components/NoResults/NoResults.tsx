import React from "react";
import styles from "./NoResults.module.css";

interface NoResultsProps {
  isAuthenticated: boolean;
}

const NoResults: React.FC<NoResultsProps> = () => {
  return (
    <div className={styles.noResults}>
      <h3>No destinations found</h3>
      <p>
        Try adjusting your search criteria or be the first to share a hidden
        gem!
      </p>
    </div>
  );
};

export default NoResults;
