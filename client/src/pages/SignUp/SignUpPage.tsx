import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, CloudUpload, Person } from '@mui/icons-material';

import styles from './SignUpPage.module.css';
import { registerUser } from './service/signUpService';

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    profilePicture: null as File | null
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Profile picture must be less than 5MB');
        return;
      }

      setFormData({
        ...formData,
        profilePicture: file
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicturePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setFormData({
      ...formData,
      profilePicture: null
    });
    setProfilePicturePreview(null);
    
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.bio,
        formData.profilePicture
      );
      
      console.log('Registration successful:', response);

      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
      }
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      
      navigate('/login', { 
        state: { message: 'Account created successfully! Please log in.' }
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err : any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.leftContent}>
          <h1 className={styles.leftTitle}>
            Start your journey with fellow explorers
          </h1>
          <p className={styles.leftDescription}>
            Share your travel stories, discover hidden gems, and connect with a community that values authentic experiences over tourist traps.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.featureDot}></span>
              Share your hidden discoveries
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureDot}></span>
              Get local insider tips
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureDot}></span>
              Connect with like-minded travelers
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <div className={styles.mobileHeader}>
            <h1 className={styles.mobileTitle}>
              Join Nomad Connect
            </h1>
            <p className={styles.mobileSubtitle}>
              Create your account and start exploring
            </p>
          </div>

          <div className={styles.desktopHeader}>
            <h2 className={styles.desktopTitle}>Sign Up</h2>
            <p className={styles.desktopSubtitle}>Create your nomad account</p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.profilePictureSection}>
              <label className={styles.profilePictureLabel}>Profile Picture (Optional)</label>
              <div className={styles.profilePictureContainer}>
                {profilePicturePreview ? (
                  <div className={styles.profilePicturePreview}>
                    <img 
                      src={profilePicturePreview} 
                      alt="Profile preview" 
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      onClick={removeProfilePicture}
                      className={styles.removeButton}
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className={styles.profilePicturePlaceholder}>
                    <Person className={styles.placeholderIcon} />
                  </div>
                )}
                
                <div className={styles.uploadButtonContainer}>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className={styles.fileInput}
                    disabled={isLoading}
                  />
                  <label htmlFor="profilePicture" className={styles.uploadButton}>
                    <CloudUpload className={styles.uploadIcon} />
                    {profilePicturePreview ? 'Change Photo' : 'Upload Photo'}
                  </label>
                </div>
              </div>
              <p className={styles.uploadHint}>
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>

            <div className={styles.nameRow}>
              <div className={styles.nameField}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.nameField}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <textarea
                name="bio"
                placeholder="Tell us about yourself (optional)"
                value={formData.bio}
                onChange={handleInputChange}
                className={styles.bioTextarea}
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`${styles.input} ${styles.passwordInput}`}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
                disabled={isLoading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`${styles.input} ${styles.passwordInput}`}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.passwordToggle}
                disabled={isLoading}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className={styles.loginPrompt}>
            <p className={styles.loginText}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className={styles.loginLink}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;