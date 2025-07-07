import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Public, Save, ArrowBack } from "@mui/icons-material";
import { useAuth } from "../../Login/hooks/AuthContext";
import {
  fetchTravelTipById,
  updateTravelTip,
} from "../service/travelTipsService";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import type {
  TravelTip,
  CreateTravelTipPayload,
} from "../../../types/travelTip";
import styles from "./EditTravelTipPage.module.css";

const EditTravelTipPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tip, setTip] = useState<TravelTip | null>(null);
  const [formData, setFormData] = useState<CreateTravelTipPayload>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (id) {
      fetchTravelTip();
    }
  }, [isAuthenticated, navigate, id]);

  const fetchTravelTip = async () => {
    try {
      setLoading(true);
      const tipData = await fetchTravelTipById(id!);

      // Check if user owns this tip
      if (user && tipData.created_by && user.id !== tipData.created_by._id) {
        navigate("/travel-tips");
        return;
      }

      setTip(tipData);
      setFormData({
        title: tipData.title,
        description: tipData.description,
      });
    } catch (err: any) {
      setError(err.message || "Failed to load travel tip");
    } finally {
      setLoading(false);
    }
  };

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
    setIsSubmitting(true);

    try {
      await updateTravelTip(id!, formData);
      navigate(`/travel-tips/${id}`, {
        state: { message: "Travel tip updated successfully!" },
      });
    } catch (error: any) {
      console.error("Error updating travel tip:", error);
      alert(error.message || "Failed to update travel tip. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner message="Loading travel tip..." />;
  }

  if (error || !tip) {
    return (
      <ErrorMessage
        title="Travel tip not found"
        message={error}
        onRetry={() => navigate("/travel-tips")}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <button
            onClick={() => navigate(`/travel-tips/${id}`)}
            className={styles.backButton}
          >
            <ArrowBack className={styles.buttonIcon} />
            Back to Tip
          </button>

          <div className={styles.headerContent}>
            <Public className={styles.headerIcon} />
            <h1 className={styles.title}>Edit Your Travel Tip</h1>
            <p className={styles.subtitle}>Update your travel wisdom</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Give your tip a catchy title..."
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description *</label>
            <textarea
              name="description"
              placeholder="Share your travel wisdom... What did you learn? What would you do differently? What insider tips can you share?"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={12}
              required
              disabled={isSubmitting}
            />
            <p className={styles.helpText}>
              Share detailed insights that will help fellow travelers. The more
              specific and actionable your advice, the more valuable it will be.
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate(`/travel-tips/${id}`)}
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
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTravelTipPage;
