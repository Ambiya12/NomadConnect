import React, { useState, useEffect } from "react";
import { Close, Save } from "@mui/icons-material";
import { updateTravelTip } from "../../pages/TravelTips/service/travelTipsService";
import type { TravelTip, CreateTravelTipPayload } from "../../types/travelTip";
import styles from "./CreateTipModal.module.css";

interface EditTipModalProps {
  isOpen: boolean;
  tip: TravelTip | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditTipModal: React.FC<EditTipModalProps> = ({
  isOpen,
  tip,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateTravelTipPayload>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (tip) {
      setFormData({
        title: tip.title,
        description: tip.description,
      });
    }
  }, [tip]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tip) return;

    setIsSubmitting(true);

    try {
      await updateTravelTip(tip._id, formData);
      onSuccess();
      onClose();
    } catch (error: any) {
      alert(error.message || "Failed to update travel tip");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen || !tip) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Edit Travel Tip</h2>
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
              placeholder="Share your travel wisdom..."
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
              {isSubmitting ? "Updating..." : "Update Tip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTipModal;
