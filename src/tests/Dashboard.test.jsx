import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

// Mock de Firebase Context
const mockFirebaseContext = {
  currentUser: {
    uid: "123",
    email: "test@example.com",
    displayName: "Test User",
  },
  logout: jest.fn(),
  getCollection: jest.fn(),
  createDocument: jest.fn(),
};

jest.mock("../contexts/FirebaseContext", () => ({
  useFirebase: () => mockFirebaseContext,
}));

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  test("should render dashboard with user information", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("BullaBank")).toBeInTheDocument();
      expect(
        screen.getByText("Bienvenido a tu Banca en Línea")
      ).toBeInTheDocument();
      expect(screen.getByText("test")).toBeInTheDocument(); // part of email before @
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });
  });

  test("should render sidebar navigation", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("Inicio")).toBeInTheDocument();
      expect(screen.getByText("Mis Cuentas")).toBeInTheDocument();
      expect(screen.getByText("Transferencias")).toBeInTheDocument();
      expect(screen.getByText("Pagos")).toBeInTheDocument();
      expect(screen.getByText("Inversiones")).toBeInTheDocument();
      expect(screen.getByText("Mi Perfil")).toBeInTheDocument();
    });
  });

  test("should render account cards", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("Cuenta Corriente")).toBeInTheDocument();
      expect(screen.getByText("Cuenta de Ahorro")).toBeInTheDocument();
      expect(screen.getByText("Cuenta de Inversión")).toBeInTheDocument();
    });
  });

  test("should render quick actions", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("Acciones Rápidas")).toBeInTheDocument();
      const transferButtons = screen.getAllByText("Transferir");
      expect(transferButtons.length).toBeGreaterThan(0);
    });
  });

  test("should render recent transactions", async () => {
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText("Últimas Transacciones")).toBeInTheDocument();
      expect(
        screen.getByText("Transferencia a Juan Pérez")
      ).toBeInTheDocument();
      expect(screen.getByText("Depósito de nómina")).toBeInTheDocument();
    });
  });

  test("should open transfer modal when transfer button is clicked", async () => {
    renderDashboard();

    await waitFor(() => {
      const transferButton = screen.getAllByText("Transferir")[0];
      fireEvent.click(transferButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Realizar Transferencia")).toBeInTheDocument();
      expect(screen.getByText("Cuenta de Origen")).toBeInTheDocument();
      expect(screen.getByText("Destinatario")).toBeInTheDocument();
    });
  });

  test("should close transfer modal when close button is clicked", async () => {
    renderDashboard();

    await waitFor(() => {
      const transferButton = screen.getAllByText("Transferir")[0];
      fireEvent.click(transferButton);
    });

    await waitFor(() => {
      const closeButton = screen.getByText("×");
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Realizar Transferencia")
      ).not.toBeInTheDocument();
    });
  });

  test("should handle transfer form submission", async () => {
    renderDashboard();

    await waitFor(() => {
      const transferButton = screen.getAllByText("Transferir")[0];
      fireEvent.click(transferButton);
    });

    await waitFor(() => {
      const destinationInput = screen.getByPlaceholderText(
        "Nombre o RUT del destinatario"
      );
      const amountInput = screen.getByPlaceholderText("Monto a transferir");
      const submitButton = screen.getByRole("button", { name: "Transferir" });

      fireEvent.change(destinationInput, { target: { value: "Juan Pérez" } });
      fireEvent.change(amountInput, { target: { value: "50000" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Realizar Transferencia")
      ).not.toBeInTheDocument();
    });
  });

  test("should show error when transfer form is incomplete", async () => {
    renderDashboard();

    await waitFor(() => {
      const transferButton = screen.getAllByText("Transferir")[0];
      fireEvent.click(transferButton);
    });

    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: "Transferir" });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Por favor complete todos los campos")
      ).toBeInTheDocument();
    });
  });

  test("should handle logout", async () => {
    mockFirebaseContext.logout.mockResolvedValue();

    renderDashboard();

    await waitFor(() => {
      const logoutButton = screen.getByText("Cerrar Sesión");
      fireEvent.click(logoutButton);
    });

    await waitFor(() => {
      expect(mockFirebaseContext.logout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("should handle logout error", async () => {
    mockFirebaseContext.logout.mockRejectedValue(new Error("Logout failed"));

    renderDashboard();

    await waitFor(() => {
      const logoutButton = screen.getByText("Cerrar Sesión");
      fireEvent.click(logoutButton);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Error al cerrar sesión. Por favor intente nuevamente."
        )
      ).toBeInTheDocument();
    });
  });

  test("should format currency correctly", async () => {
    renderDashboard();

    await waitFor(() => {
      // Verificar que los montos se muestren formateados
      expect(screen.getByText(/\$1\.250\.000/)).toBeInTheDocument();
      expect(screen.getByText(/\$3\.750\.000/)).toBeInTheDocument();
      expect(screen.getByText(/\$5\.000\.000/)).toBeInTheDocument();
    });
  });

  test("should switch between sidebar sections", async () => {
    renderDashboard();

    await waitFor(() => {
      const accountsButton = screen.getByText("Mis Cuentas");
      fireEvent.click(accountsButton);
    });

    // Verificar que la sección activa cambie
    const accountsListItem = screen.getByText("Mis Cuentas").closest("li");
    expect(accountsListItem).toHaveClass("active");
  });
});
