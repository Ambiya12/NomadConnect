import React from "react";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <h1 className={styles.title}>{message}</h1>
      </div>
    </div>
  );
};

export default LoadingSpinner;
