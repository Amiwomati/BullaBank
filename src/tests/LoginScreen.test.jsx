import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginScreen from "../LoginScreen/loginScreen";

// Mock de Firebase Auth
jest.mock("../Firebase/client.js", () => ({
  auth: {},
}));

// Mock de firebase/auth
jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderLoginScreen = () => {
    return render(
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    );
  };

  test("should render login form correctly", () => {
    renderLoginScreen();

    expect(screen.getByText("Bienvenido a BullaBank")).toBeInTheDocument();
    expect(
      screen.getByText("Ingrese sus credenciales para acceder a su cuenta")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Correo Electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Iniciar Sesión" })
    ).toBeInTheDocument();
  });

  test("should show error when fields are empty", async () => {
    renderLoginScreen();

    const submitButton = screen.getByRole("button", { name: "Iniciar Sesión" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Por favor complete todos los campos")
      ).toBeInTheDocument();
    });
  });

  test("should handle input changes correctly", () => {
    renderLoginScreen();

    const emailInput = screen.getByLabelText("Correo Electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("should handle remember me checkbox", () => {
    renderLoginScreen();

    const rememberCheckbox = screen.getByLabelText("Recordarme");

    expect(rememberCheckbox).not.toBeChecked();

    fireEvent.click(rememberCheckbox);

    expect(rememberCheckbox).toBeChecked();
  });

  test("should load saved email from localStorage", () => {
    localStorage.setItem("bullabank_email", "saved@example.com");

    renderLoginScreen();

    const emailInput = screen.getByLabelText("Correo Electrónico");
    const rememberCheckbox = screen.getByLabelText("Recordarme");

    expect(emailInput.value).toBe("saved@example.com");
    expect(rememberCheckbox).toBeChecked();
  });

  test("should show loading state during login", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderLoginScreen();

    const emailInput = screen.getByLabelText("Correo Electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");
    const submitButton = screen.getByRole("button", { name: "Iniciar Sesión" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Iniciando sesión...")).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("should handle successful login", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "123", email: "test@example.com" },
    });

    renderLoginScreen();

    const emailInput = screen.getByLabelText("Correo Electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");
    const submitButton = screen.getByRole("button", { name: "Iniciar Sesión" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("should handle login error", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockRejectedValue({
      code: "auth/user-not-found",
    });

    renderLoginScreen();

    const emailInput = screen.getByLabelText("Correo Electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");
    const submitButton = screen.getByRole("button", { name: "Iniciar Sesión" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("No existe una cuenta con este correo electrónico")
      ).toBeInTheDocument();
    });
  });

  test("should save email to localStorage when remember me is checked", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: "123", email: "test@example.com" },
    });

    renderLoginScreen();

    const emailInput = screen.getByLabelText("Correo Electrónico");
    const passwordInput = screen.getByLabelText("Contraseña");
    const rememberCheckbox = screen.getByLabelText("Recordarme");
    const submitButton = screen.getByRole("button", { name: "Iniciar Sesión" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(rememberCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "bullabank_email",
        "test@example.com"
      );
    });
  });
});
