import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "./hooks/AuthContext";
import { loginUser } from "./service/loginService";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { user, accessToken, refreshToken } = await loginUser(formData.email, formData.password);
      login(user, accessToken, refreshToken);

      const redirectTo = location.state?.from || "/destinations";
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.left}>
        <h1 className={styles.title}>Join the community of explorers sharing hidden gems</h1>
        <p className={styles.description}>
          Connect with fellow travelers, discover authentic experiences, and share your own discoveries.
        </p>
      </aside>

      <main className={styles.right}>
        <div className={styles.card}>
          <header className={styles.header}>
            <h2>Welcome Back</h2>
            <p>Sign in to access your nomad community</p>
          </header>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              className={styles.input}
            />

            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className={styles.toggle}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className={styles.submit}>
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className={styles.signup}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;