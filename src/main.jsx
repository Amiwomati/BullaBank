import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import LoginScreen from "./LoginScreen/loginScreen";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/*" element={<App />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </FirebaseProvider>
  </React.StrictMode>
);
