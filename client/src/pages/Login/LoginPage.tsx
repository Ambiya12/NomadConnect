import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "./hooks/AuthContext";
import { loginUser } from "./service/loginService";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(formData.email, formData.password);
      login(response.user, response.accessToken, response.refreshToken);
      navigate("/destinations");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.leftContent}>
          <h1 className={styles.leftTitle}>
            Join the community of explores sharing hidden gems
          </h1>
          <p className={styles.leftDescription}>
            Connect with fellow travelers, discover authentic experiences, and
            share your own hidden discoveries with explorers around the world.
          </p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <div className={styles.mobileHeader}>
            <h1 className={styles.mobileTitle}>Welcome Back</h1>
            <p className={styles.mobileSubtitle}>
              Sign in to access your nomad community
            </p>
          </div>
          <div className={styles.desktopHeader}>
            <h2 className={styles.desktopTitle}>Login</h2>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`${styles.input} ${styles.passwordInput}`}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
                disabled={isLoading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            <div className={styles.forgotPassword}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className={styles.signupPrompt}>
            <p className={styles.signupText}>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.signupLink}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
