import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Public, Save, ArrowBack } from "@mui/icons-material";
import { useAuth } from "../../Login/hooks/AuthContext";
import { fetchTravelTipById, updateTravelTip } from "../service/travelTipsService";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import type { TravelTip, CreateTravelTipPayload } from "../../../types/travelTip";
import styles from "./EditTravelTipPage.module.css";

const EditTravelTipPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateTravelTipPayload>({
    title: "",
    description: "",
  });

  const [tip, setTip] = useState<TravelTip | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (id) {
      fetchTip();
    }
  }, [id, isAuthenticated]);

  const fetchTip = async () => {
    try {
      const tipData = await fetchTravelTipById(id!);
      if (user?.id !== tipData.created_by?._id) {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateTravelTip(id!, formData);
      navigate(`/travel-tips/${id}`, {
        state: { message: "Travel tip updated successfully!" },
      });
    } catch (err: any) {
      alert(err.message || "Failed to update travel tip.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;
  if (loading) return <LoadingSpinner message="Loading travel tip..." />;
  if (error || !tip)
    return (
      <ErrorMessage
        title="Travel tip not found"
        message={error}
        onRetry={() => navigate("/travel-tips")}
      />
    );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <button
            onClick={() => navigate(`/travel-tips/${id}`)}
            className={styles.backButton}
          >
            <ArrowBack className={styles.icon} />
            Back to Tip
          </button>
          <div className={styles.headerContent}>
            <Public className={styles.headerIcon} />
            <h1 className={styles.title}>Edit Your Travel Tip</h1>
            <p className={styles.subtitle}>Update your travel wisdom</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
              required
              disabled={isSubmitting}
              placeholder="Catchy title..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              required
              disabled={isSubmitting}
              rows={10}
              placeholder="Share your travel wisdom..."
            />
            <p className={styles.helpText}>
              Share actionable, specific insights that can truly help other
              travelers.
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(`/travel-tips/${id}`)}
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
              <Save className={styles.icon} />
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTravelTipPage;
