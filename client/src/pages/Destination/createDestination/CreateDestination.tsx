import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Public, CloudUpload } from '@mui/icons-material';
import { useAuth } from '../../Login/hooks/AuthContext';
import { getCoordinatesForLocation } from '../service/geocodeService';
import { CountryDropdown } from 'react-country-region-selector';
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

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        photos: Array.from(e.target.files)
      });
    }
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
      const coordinates = await getCoordinatesForLocation(formData.country, formData.city, formData.address);
  
      const location = {
        type: "Point",
        coordinates: coordinates,
      };
  
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("country", formData.country);
      submitData.append("city", formData.city);
      submitData.append("address", formData.address); 
      submitData.append("location", JSON.stringify(location));
  
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      submitData.append("tags", JSON.stringify(tagsArray));
  
      formData.photos.forEach((photo) => {
        submitData.append("images", photo);
      });
  
      const result = await createDestination(submitData);
  
      console.log("Destination created successfully:", result);
  
      navigate("/destinations", {
        state: { message: "Your hidden gem has been submitted successfully!" },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error submitting destination:", error);
      alert(error.message || "Failed to submit destination. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Public className={styles.headerIcon} />
          <h1 className={styles.title}>Contribute Your Hidden Gem</h1>
          <p className={styles.subtitle}>
            Share your discovered spot with fellow explorers<br />
            and make a traveler's day!
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Spot Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Name of your hidden gem"
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
            <label className={styles.label}>Address *</label>
            <input
              type="text"
              name="address"
              placeholder="Full address"
              value={formData.address}
              onChange={handleInputChange}
              className={styles.input}
              required
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
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Add tags to help travelers find your spot. Separate multiple tags with commas.
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>What Makes This Spot Unique? *</label>
            <textarea
              name="description"
              placeholder="Tell us what makes this place special. What should travelers know? What's the best time to visit? Any insider tips?"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={6}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Upload Photos</label>
            <div className={styles.uploadContainer}>
              <input
                type="file"
                id="photos"
                name="photos"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className={styles.fileInput}
                disabled={isSubmitting}
              />
              <label htmlFor="photos" className={styles.uploadButton}>
                <CloudUpload className={styles.uploadIcon} />
                Browse Files
              </label>
              {formData.photos.length > 0 && (
                <div className={styles.filePreview}>
                  <p className={styles.fileCount}>
                    {formData.photos.length} file{formData.photos.length > 1 ? 's' : ''} selected
                  </p>
                  <div className={styles.fileList}>
                    {formData.photos.map((file, index) => (
                      <div key={index} className={styles.fileName}>
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !formData.name || !formData.description || !formData.country || !formData.city}
          >
            {isSubmitting ? 'Submitting Spot...' : 'Submit Spot'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDestinationPage;