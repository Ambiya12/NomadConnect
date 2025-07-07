import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock, Login, PersonAdd } from '@mui/icons-material';
import styles from './AuthPrompt.module.css';

interface AuthPromptProps {
  title?: string;
  message?: string;
  showSignUp?: boolean;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ 
  title = "Login Required",
  message = "Please log in to access this content and join our community of travelers.",
  showSignUp = true
}) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <Lock className={styles.lockIcon} />
        </div>
        
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        
        <div className={styles.actions}>
          <Link 
            to="/login" 
            state={{ from: location.pathname }}
            className={styles.loginButton}
          >
            <Login className={styles.buttonIcon} />
            Login
          </Link>
          
          {showSignUp && (
            <Link 
              to="/signup" 
              state={{ from: location.pathname }}
              className={styles.signupButton}
            >
              <PersonAdd className={styles.buttonIcon} />
              Create Account
            </Link>
          )}
        </div>
        
        <div className={styles.benefits}>
          <h3 className={styles.benefitsTitle}>Join our community to:</h3>
          <ul className={styles.benefitsList}>
            <li>Discover hidden gems from real travelers</li>
            <li>Share your own travel experiences</li>
            <li>Get insider tips and local recommendations</li>
            <li>Connect with like-minded explorers</li>
            <li>Save and organize your favorite destinations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPrompt;