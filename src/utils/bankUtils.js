// Funciones utilitarias para operaciones bancarias

/**
 * Formatea un monto en pesos chilenos
 * @param {number} amount - Monto a formatear
 * @returns {string} - Monto formateado en CLP
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    throw new Error("El monto debe ser un número");
  }

  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Valida si un RUT chileno es válido
 * @param {string} rut - RUT a validar (formato: 12345678-9)
 * @returns {boolean} - True si es válido, false si no
 */
export const validateRUT = (rut) => {
  if (!rut || typeof rut !== "string") {
    return false;
  }

  // Limpiar el RUT
  const cleanRut = rut.replace(/\./g, "").replace(/-/g, "");

  if (cleanRut.length < 8 || cleanRut.length > 9) {
    return false;
  }

  const body = cleanRut.slice(0, -1);
  const checkDigit = cleanRut.slice(-1).toLowerCase();

  // Validar que el cuerpo sean solo números
  if (!/^\d+$/.test(body)) {
    return false;
  }

  // Calcular dígito verificador
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const calculatedCheckDigit = remainder < 2 ? remainder.toString() : "k";

  return checkDigit === calculatedCheckDigit;
};

/**
 * Valida si un monto de transferencia es válido
 * @param {number} amount - Monto a validar
 * @param {number} availableBalance - Saldo disponible
 * @param {number} minAmount - Monto mínimo permitido (default: 1000)
 * @param {number} maxAmount - Monto máximo permitido (default: 10000000)
 * @returns {object} - Objeto con isValid y mensaje de error si aplica
 */
export const validateTransferAmount = (
  amount,
  availableBalance,
  minAmount = 1000,
  maxAmount = 10000000
) => {
  if (typeof amount !== "number" || typeof availableBalance !== "number") {
    return {
      isValid: false,
      error: "Los montos deben ser números válidos",
    };
  }

  if (amount <= 0) {
    return {
      isValid: false,
      error: "El monto debe ser mayor a cero",
    };
  }

  if (amount < minAmount) {
    return {
      isValid: false,
      error: `El monto mínimo es ${formatCurrency(minAmount)}`,
    };
  }

  if (amount > maxAmount) {
    return {
      isValid: false,
      error: `El monto máximo es ${formatCurrency(maxAmount)}`,
    };
  }

  if (amount > availableBalance) {
    return {
      isValid: false,
      error: "Saldo insuficiente",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Calcula el saldo después de una transferencia
 * @param {number} currentBalance - Saldo actual
 * @param {number} transferAmount - Monto a transferir
 * @returns {number} - Nuevo saldo
 */
export const calculateNewBalance = (currentBalance, transferAmount) => {
  if (
    typeof currentBalance !== "number" ||
    typeof transferAmount !== "number"
  ) {
    throw new Error("Los montos deben ser números válidos");
  }

  return currentBalance - transferAmount;
};

/**
 * Genera un número de transacción único
 * @returns {string} - Número de transacción único
 */
export const generateTransactionId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 9);
  return `TXN-${timestamp}-${random}`.toUpperCase();
};
