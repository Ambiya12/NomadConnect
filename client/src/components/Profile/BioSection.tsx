import React, { useState } from 'react';
import { Edit, Save, Close } from '@mui/icons-material';
import styles from './BioSection.module.css';

interface BioSectionProps {
  bio: string;
  onUpdateBio: (bio: string) => Promise<void>;
}

const BioSection: React.FC<BioSectionProps> = ({ bio, onUpdateBio }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(bio);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onUpdateBio(bioText);
      setIsEditing(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message || 'Failed to update bio');
      setBioText(bio); 
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setBioText(bio);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.bioEditContainer}>
        <textarea
          value={bioText}
          onChange={(e) => setBioText(e.target.value)}
          className={styles.bioTextarea}
          placeholder="Tell us about yourself..."
          rows={3}
          maxLength={150}
          disabled={isSaving}
        />
        <div className={styles.bioActions}>
          <button
            onClick={handleSave}
            className={styles.saveBioButton}
            disabled={isSaving}
          >
            <Save className={styles.buttonIcon} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            className={styles.cancelBioButton}
            disabled={isSaving}
          >
            <Close className={styles.buttonIcon} />
            Cancel
          </button>
        </div>
        <div className={styles.charCount}>
          {bioText.length}/150
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bioDisplay}>
      <p className={styles.bioText}>
        {bio}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className={styles.editBioButton}
      >
        <Edit className={styles.buttonIcon} />
        Edit Bio
      </button>
    </div>
  );
};

export default BioSection;