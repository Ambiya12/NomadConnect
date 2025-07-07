import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Public, Save, ArrowBack } from '@mui/icons-material';
import { useAuth } from '../../Login/hooks/AuthContext';
import { CountryDropdown } from 'react-country-region-selector';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { fetchDestinationById, updateDestinationById } from '../service/updateDestination';
import styles from './EditDestination.module.css';

const EditDestinationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
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
      (async () => {
        await loadDestination();
      })();
    }
  }, [id, isAuthenticated, navigate]);

  const loadDestination = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = await fetchDestinationById(id!, token!);
      setFormData({
        name: data.name,
        description: data.description,
        country: data.country,
        city: data.city,
        address: data.address || '',
        tags: data.tags.join(', '),
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load destination');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (country: string) =>
    setFormData(prev => ({ ...prev, country }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      await updateDestinationById(id!, token!, { ...formData, tags: tagsArray });

      navigate('/profile', {
        state: { message: 'Destination updated successfully!' }
      });
    } catch (error: any) {
      alert(error.message || 'Failed to update destination');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;
  if (loading) return <LoadingSpinner message="Loading destination..." />;
  if (error) {
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
          <button onClick={() => navigate('/profile')} className={styles.backButton}>
            <ArrowBack className={styles.icon} />
            Back to Profile
          </button>
          <div className={styles.headerContent}>
            <Public className={styles.iconLarge} />
            <h1 className={styles.title}>Edit Your Destination</h1>
            <p className={styles.subtitle}>Update your hidden gem details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {[
            { name: 'name', label: 'Destination Name *', type: 'text', required: true },
            { name: 'city', label: 'City *', type: 'text', required: true },
            { name: 'address', label: 'Address', type: 'text' },
            { name: 'tags', label: 'Tags', type: 'text', help: 'Separate multiple tags with commas.' }
          ].map(({ name, label, type, required, help }) => (
            <div key={name} className={styles.formGroup}>
              <label className={styles.label}>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className={styles.input}
                required={!!required}
                disabled={isSubmitting}
              />
              {help && <p className={styles.helpText}>{help}</p>}
            </div>
          ))}

          <div className={styles.formGroup}>
            <label className={styles.label}>Country *</label>
            <CountryDropdown
              value={formData.country}
              onChange={handleCountryChange}
              className={styles.select}
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
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
              className={styles.cancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submit}
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.description ||
                !formData.country ||
                !formData.city
              }
            >
              <Save className={styles.icon} />
              {isSubmitting ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDestinationPage;