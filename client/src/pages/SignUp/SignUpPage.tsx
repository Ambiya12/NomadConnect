import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Visibility, VisibilityOff, CloudUpload, Person } from "@mui/icons-material";
import { registerUser } from "./service/signUpService";
import styles from "./SignUpPage.module.css";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    profilePicture: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Invalid image file.");
    if (file.size > 5 * 1024 * 1024) return setError("Max size is 5MB.");

    setFormData((prev) => ({ ...prev, profilePicture: file }));

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removePicture = () => {
    setFormData((prev) => ({ ...prev, profilePicture: null }));
    setPreview(null);
    const input = document.getElementById("profilePicture") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await registerUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.bio,
        formData.profilePicture
      );

      localStorage.setItem("token", res.accessToken || "");
      localStorage.setItem("refreshToken", res.refreshToken || "");

      navigate("/login", {
        state: {
          message: "Account created successfully! Please log in.",
          from: location.state?.from,
        },
      });
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Sign Up</h2>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label>Profile Picture (Optional)</label>
          <div className={styles.pictureWrapper}>
            {preview ? (
              <>
                <img src={preview} alt="Preview" className={styles.preview} />
                <button type="button" onClick={removePicture} disabled={loading}>×</button>
              </>
            ) : (
              <div className={styles.placeholder}><Person /></div>
            )}
          </div>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            hidden
            disabled={loading}
          />
          <label htmlFor="profilePicture" className={styles.upload}>
            <CloudUpload />
            {preview ? "Change Photo" : "Upload Photo"}
          </label>
        </div>

        <div className={styles.row}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <textarea
          name="bio"
          placeholder="Bio (optional)"
          value={formData.bio}
          onChange={handleChange}
          rows={3}
          disabled={loading}
        />

        <div className={styles.password}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={loading}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>

        <div className={styles.password}>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} disabled={loading}>
            {showConfirm ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div className={styles.login}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;