import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import "./loginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { login } = useFirebase();

  // Verificar si hay credenciales guardadas
  useEffect(() => {
    const savedEmail = localStorage.getItem("bullabank_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de entrada
    if (!email || !password) {
      setError("Por favor complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Autenticación con Firebase usando el contexto
      const userCredential = await login(email, password);

      // Manejar "recordarme"
      if (rememberMe) {
        localStorage.setItem("bullabank_email", email);
      } else {
        localStorage.removeItem("bullabank_email");
      }

      console.log("Usuario autenticado:", userCredential.user);

      // Redirigir al dashboard después de iniciar sesión
      navigate("/dashboard");
    } catch (error) {
      console.error("Error de autenticación:", error);

      // Manejo específico de errores de Firebase
      switch (error.code) {
        case "auth/invalid-email":
          setError("Formato de correo electrónico inválido");
          break;
        case "auth/user-disabled":
          setError("Esta cuenta ha sido deshabilitada");
          break;
        case "auth/user-not-found":
          setError("No existe una cuenta con este correo electrónico");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        case "auth/too-many-requests":
          setError("Demasiados intentos fallidos. Intente más tarde");
          break;
        default:
          setError("Error al iniciar sesión. Por favor intente nuevamente");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-header">
          <h1>Bienvenido a BullaBank</h1>
          <p>Ingrese sus credenciales para acceder a su cuenta</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              disabled={loading}
              required
            />
          </div>

          <div className="form-footer">
            <div className="remember-forgot">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="remember">Recordarme</label>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="forgot-link"
                disabled={loading}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>

        <div className="signup-link">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
