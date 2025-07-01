import React from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Error",
  message,
  onRetry,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
