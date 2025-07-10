// Configuración de Jest para el entorno de testing
import "@testing-library/jest-dom";

// Mock para Firebase
jest.mock("./Firebase/client.js", () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: jest.fn(),
  },
  db: {},
  storage: {},
}));

// Mock para react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/" }),
}));

// Mock para Intl.NumberFormat si no está disponible en el entorno de testing
if (!global.Intl) {
  global.Intl = {
    NumberFormat: jest.fn(() => ({
      format: jest.fn((num) => `$${num.toLocaleString()}`),
    })),
  };
}

// Mock para localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock para sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;
