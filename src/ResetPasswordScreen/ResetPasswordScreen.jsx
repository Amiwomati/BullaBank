import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import "./ResetPasswordScreen.css";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { resetPassword } = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor ingrese su correo electrónico");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      
      await resetPassword(email);
      
      setMessage("Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña");
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      
      switch (error.code) {
        case "auth/invalid-email":
          setError("Formato de correo electrónico inválido");
          break;
        case "auth/user-not-found":
          setError("No existe una cuenta con este correo electrónico");
          break;
        default:
          setError("Error al enviar el correo de restablecimiento. Por favor intente nuevamente");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form-container">
        <div className="reset-password-header">
          <h1>Restablecer Contraseña</h1>
          <p>Ingrese su correo electrónico para recibir instrucciones</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form className="reset-password-form" onSubmit={handleSubmit}>
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

          <button type="submit" className="reset-button" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Instrucciones"}
          </button>
        </form>

        <div className="links-container">
          <Link to="/login" className="back-link">Volver a Iniciar Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
