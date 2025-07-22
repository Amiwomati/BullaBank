// Constantes para mensajes de validación y textos comunes
export const VALIDATION_MESSAGES = {
  INVALID_EMAIL: "Correo electrónico inválido",
  INVALID_PASSWORD: "La contraseña debe tener al menos 6 caracteres",
  INVALID_RUT: "RUT inválido",
  REQUIRED_FIELD: "Este campo es requerido",
  INVALID_AMOUNT: "Monto inválido",
  PASSWORD_MISMATCH: "Las contraseñas no coinciden",
};

// Constantes para datos de prueba
export const TEST_CONSTANTS = {
  VALID_EMAIL: "test@example.com",
  VALID_PASSWORD: "password123",
  INVALID_EMAIL: "invalid-email",
  INVALID_PASSWORD: "123",
  VALID_RUT: "12345678-9",
  INVALID_RUT: "invalid-rut",
  TEST_AMOUNT: "100000",
  MOCK_ACCOUNT_NUMBER: "12345678",
  EMPTY_FIELDS_ERROR: "Por favor complete todos los campos",
  LOGIN_BUTTON_TEXT: "Iniciar Sesión",
  WELCOME_MESSAGE: "Bienvenido a BullaBank",
  CLP_CURRENCY: "CLP",
  NUMERIC_ERROR: "Los montos deben ser números válidos",
  EMAIL_LABEL: "Correo Electrónico",
  PASSWORD_LABEL: "Contraseña",
};

// Constantes para formato de moneda
export const CURRENCY_CONFIG = {
  LOCALE: "es-CL",
  CURRENCY: "CLP",
  STYLE: "currency",
};

// Constantes para clases CSS
export const CSS_CLASSES = {
  SIDEBAR_ICON: "sidebar-icon",
  TRANSFER_FORM: "transfer-form",
  ERROR_MESSAGE: "error-message",
  SUCCESS_MESSAGE: "success-message",
};

// Constantes para cuentas
export const ACCOUNT_TYPES = {
  CORRIENTE: "cuenta-corriente",
  AHORRO: "cuenta-ahorro",
  VISTA: "cuenta-vista",
  PLAZO_FIJO: "cuenta-plazo-fijo",
};

// SonarCloud test: Added comment to trigger workflow analysis
