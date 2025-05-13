import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signup } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!email || !password || !confirmPassword || !name) {
      setError("Por favor complete todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Registrar usuario con Firebase
      await signup(email, password, { displayName: name });
      
      // Redirigir al dashboard después del registro exitoso
      navigate("/dashboard");
    } catch (error) {
      console.error("Error de registro:", error);
      
      // Manejo específico de errores de Firebase
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Este correo electrónico ya está en uso");
          break;
        case "auth/invalid-email":
          setError("Formato de correo electrónico inválido");
          break;
        case "auth/weak-password":
          setError("La contraseña es demasiado débil");
          break;
        default:
          setError("Error al crear la cuenta. Por favor intente nuevamente");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-header">
          <h1>Crear Cuenta en BullaBank</h1>
          <p>Complete el formulario para registrarse</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese su nombre completo"
              disabled={loading}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme su contraseña"
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <div className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
