import React, { useState } from "react";
import { Close, Save } from "@mui/icons-material";
import { createTravelTip } from "../../pages/TravelTips/service/travelTipsService";
import type { CreateTravelTipPayload } from "../../types/travelTip";
import styles from "./CreateTipModal.module.css";

interface CreateTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTipModal: React.FC<CreateTipModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateTravelTipPayload>({
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createTravelTip(formData);
      onSuccess();
      onClose();
      setFormData({
        title: "",
        description: "",
      });
    } catch (error: any) {
      alert(error.message || "Failed to create travel tip");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Share Your Travel Tip</h2>
          <button
            onClick={handleClose}
            className={styles.closeButton}
            disabled={isSubmitting}
          >
            <Close />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Give your tip a catchy title..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Share your travel wisdom... What did you learn? What would you do differently? What insider tips can you share?"
              rows={8}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={
                isSubmitting || !formData.title || !formData.description
              }
            >
              <Save className={styles.buttonIcon} />
              {isSubmitting ? "Publishing..." : "Share Tip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTipModal;
