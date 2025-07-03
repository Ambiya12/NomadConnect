import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Public, Save, ArrowBack } from '@mui/icons-material';
import { useAuth } from '../../Login/hooks/AuthContext';
import { CountryDropdown } from 'react-country-region-selector';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import type { Destination } from '../../../types/destination';
import { fetchDestinationById, updateDestinationById } from '../service/updateDestination';
import styles from './EditDestination.module.css';

const EditDestinationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [destination, setDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    city: '',
    address: '',
    tags: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (id) {
      fetchDestination();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate, id]);

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = await fetchDestinationById(id!, token!);

      setDestination(data);
      setFormData({
        name: data.name,
        description: data.description,
        country: data.country,
        city: data.city,
        address: data.address || '',
        tags: data.tags.join(', ')
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to load destination');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCountryChange = (country: string) => {
    setFormData({
      ...formData,
      country
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const updateData = {
        name: formData.name,
        description: formData.description,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        tags: tagsArray
      };

      await updateDestinationById(id!, token!, updateData);

      navigate('/profile', {
        state: { message: 'Destination updated successfully!' },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error updating destination:', error);
      alert(error.message || 'Failed to update destination. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner message="Loading destination..." />;
  }

  if (error || !destination) {
    return (
      <ErrorMessage
        title="Destination not found"
        message={error}
        onRetry={() => navigate('/profile')}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <button
            onClick={() => navigate('/profile')}
            className={styles.backButton}
          >
            <ArrowBack className={styles.buttonIcon} />
            Back to Profile
          </button>
          
          <div className={styles.headerContent}>
            <Public className={styles.headerIcon} />
            <h1 className={styles.title}>Edit Your Destination</h1>
            <p className={styles.subtitle}>
              Update your hidden gem details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Destination Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Name of your destination"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Country *</label>
            <div className={styles.selectContainer}>
              <CountryDropdown
                value={formData.country}
                onChange={handleCountryChange}
                className={styles.select}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>City *</label>
            <input
              type="text"
              name="city"
              placeholder="City or area name"
              value={formData.city}
              onChange={handleInputChange}
              className={styles.input}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Full address (optional)"
              value={formData.address}
              onChange={handleInputChange}
              className={styles.input}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="beach, hidden, sunset, local (separate with commas)"
              value={formData.tags}
              onChange={handleInputChange}
              className={styles.input}
              disabled={isSubmitting}
            />
            <p className={styles.helpText}>
              Add tags to help travelers find your spot. Separate multiple tags with commas.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description *</label>
            <textarea
              name="description"
              placeholder="Tell us what makes this place special..."
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={6}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !formData.name || !formData.description || !formData.country || !formData.city}
            >
              <Save className={styles.buttonIcon} />
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDestinationPage;