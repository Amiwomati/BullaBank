import React, { useState } from "react";
import "./loginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // Here you would typically handle authentication logic
    console.log("Logging in with:", { email, password });
    setError("");
    // Reset form
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h1>Welcome to BullaBank</h1>
          <p>Enter your credentials to access your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-footer">
            <div className="remember-forgot">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#forgot" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Log In
            </button>
          </div>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="#signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
