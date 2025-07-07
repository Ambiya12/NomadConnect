import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Public, CloudUpload } from '@mui/icons-material';
import { CountryDropdown } from 'react-country-region-selector';
import { useAuth } from '../../Login/hooks/AuthContext';
import { getCoordinatesForLocation } from '../service/geocodeService';
import { createDestination } from '../service/createDestinationService';
import styles from './CreateDestination.module.css';

const CreateDestinationPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    city: '',
    address: '',
    tags: '',
    photos: [] as File[]
  });

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (country: string) => {
    setFormData({ ...formData, country });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photos: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const coordinates = await getCoordinatesForLocation(
        formData.country,
        formData.city,
        formData.address
      );

      const location = {
        type: 'Point',
        coordinates
      };

      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      const data = new FormData();
      ['name', 'description', 'country', 'city', 'address'].forEach(key =>
        data.append(key, (formData as any)[key])
      );
      data.append('location', JSON.stringify(location));
      data.append('tags', JSON.stringify(tags));
      formData.photos.forEach(photo => data.append('images', photo));

      await createDestination(data);
      navigate('/destinations', {
        state: { message: 'Your hidden gem has been submitted successfully!' }
      });
    } catch (err: any) {
      alert(err.message || 'Submission failed. Try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Public className={styles.icon} />
          <h1>Contribute Your Hidden Gem</h1>
          <p>Share your discovered spot with fellow explorers and make a traveler's day!</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {[
            { label: 'Spot Name *', name: 'name', placeholder: 'Name of your hidden gem' },
            { label: 'City *', name: 'city', placeholder: 'City or area name' },
            { label: 'Address *', name: 'address', placeholder: 'Full address' }
          ].map(field => (
            <div key={field.name} className={styles.group}>
              <label>{field.label}</label>
              <input
                name={field.name}
                placeholder={field.placeholder}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
          ))}

          <div className={styles.group}>
            <label>Country *</label>
            <CountryDropdown
              value={formData.country}
              onChange={handleCountryChange}
              disabled={isSubmitting}
              className={styles.select}
            />
          </div>

          <div className={styles.group}>
            <label>Tags</label>
            <input
              name="tags"
              placeholder="beach, hidden, sunset, local"
              value={formData.tags}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <small>Add tags separated by commas to help others find your spot.</small>
          </div>

          <div className={styles.group}>
            <label>What Makes This Spot Unique? *</label>
            <textarea
              name="description"
              placeholder="Why is this place special? Best time to visit? Insider tips?"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className={styles.group}>
            <label>Upload Photos</label>
            <div className={styles.upload}>
              <input
                type="file"
                id="photos"
                name="photos"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <label htmlFor="photos">
                <CloudUpload /> Browse Files
              </label>
              {formData.photos.length > 0 && (
                <div className={styles.preview}>
                  <p>{formData.photos.length} file(s) selected</p>
                  <ul>
                    {formData.photos.map((file, i) => (
                      <li key={i}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

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
            {isSubmitting ? 'Submitting...' : 'Submit Spot'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDestinationPage;