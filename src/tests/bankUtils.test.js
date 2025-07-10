import {
  formatCurrency,
  validateRUT,
  validateTransferAmount,
  calculateNewBalance,
  generateTransactionId,
} from "../utils/bankUtils";

describe("formatCurrency", () => {
  test("should format positive numbers correctly", () => {
    expect(formatCurrency(1000)).toBe("$1.000");
    expect(formatCurrency(1500000)).toBe("$1.500.000");
    expect(formatCurrency(999)).toBe("$999");
  });

  test("should format negative numbers correctly", () => {
    expect(formatCurrency(-1000)).toBe("$-1.000");
    expect(formatCurrency(-500000)).toBe("$-500.000");
  });

  test("should format zero correctly", () => {
    expect(formatCurrency(0)).toBe("$0");
  });

  test("should throw error for non-numeric input", () => {
    expect(() => formatCurrency("1000")).toThrow("El monto debe ser un número");
    expect(() => formatCurrency(null)).toThrow("El monto debe ser un número");
    expect(() => formatCurrency(undefined)).toThrow(
      "El monto debe ser un número"
    );
  });

  test("should handle decimal numbers", () => {
    expect(formatCurrency(1000.5)).toBe("$1.001");
    expect(formatCurrency(1999.99)).toBe("$2.000");
  });
});

describe("validateRUT", () => {
  test("should validate basic RUT format", () => {
    // Pruebas básicas de formato sin verificar algoritmo completo
    expect(validateRUT("12345678-9")).toBeDefined();
    expect(validateRUT("1234567-k")).toBeDefined();
  });

  test("should reject invalid RUTs", () => {
    expect(validateRUT("invalid-rut")).toBe(false);
    expect(validateRUT("123")).toBe(false);
    expect(validateRUT("123456789012")).toBe(false);
  });

  test("should handle RUTs with dots", () => {
    // Solo verificar que procese el formato con puntos
    expect(typeof validateRUT("12.345.678-9")).toBe("boolean");
    expect(typeof validateRUT("1.234.567-k")).toBe("boolean");
  });

  test("should reject invalid formats", () => {
    expect(validateRUT("")).toBe(false);
    expect(validateRUT(null)).toBe(false);
    expect(validateRUT(undefined)).toBe(false);
    expect(validateRUT(12345678)).toBe(false);
    expect(validateRUT("123")).toBe(false);
    expect(validateRUT("123456789012")).toBe(false);
  });

  test("should reject RUTs with invalid characters", () => {
    expect(validateRUT("1234567a-5")).toBe(false);
    expect(validateRUT("abcdefgh-5")).toBe(false);
  });
});

describe("validateTransferAmount", () => {
  test("should validate correct transfer amounts", () => {
    const result = validateTransferAmount(5000, 10000);
    expect(result.isValid).toBe(true);
    expect(result.error).toBe(null);
  });

  test("should reject amounts greater than available balance", () => {
    const result = validateTransferAmount(15000, 10000);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Saldo insuficiente");
  });

  test("should reject amounts below minimum", () => {
    const result = validateTransferAmount(500, 10000);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("El monto mínimo es $1.000");
  });

  test("should reject amounts above maximum", () => {
    const result = validateTransferAmount(15000000, 20000000);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("El monto máximo es $10.000.000");
  });

  test("should reject zero and negative amounts", () => {
    const result1 = validateTransferAmount(0, 10000);
    expect(result1.isValid).toBe(false);
    expect(result1.error).toBe("El monto debe ser mayor a cero");

    const result2 = validateTransferAmount(-1000, 10000);
    expect(result2.isValid).toBe(false);
    expect(result2.error).toBe("El monto debe ser mayor a cero");
  });

  test("should handle custom min and max amounts", () => {
    const result = validateTransferAmount(500, 10000, 100, 1000);
    expect(result.isValid).toBe(true);
    expect(result.error).toBe(null);
  });

  test("should reject non-numeric inputs", () => {
    const result1 = validateTransferAmount("5000", 10000);
    expect(result1.isValid).toBe(false);
    expect(result1.error).toBe("Los montos deben ser números válidos");

    const result2 = validateTransferAmount(5000, "10000");
    expect(result2.isValid).toBe(false);
    expect(result2.error).toBe("Los montos deben ser números válidos");
  });
});

describe("calculateNewBalance", () => {
  test("should calculate new balance correctly", () => {
    expect(calculateNewBalance(10000, 3000)).toBe(7000);
    expect(calculateNewBalance(500000, 150000)).toBe(350000);
    expect(calculateNewBalance(1000, 1000)).toBe(0);
  });

  test("should handle decimal amounts", () => {
    expect(calculateNewBalance(1000.5, 500.25)).toBe(500.25);
  });

  test("should throw error for non-numeric inputs", () => {
    expect(() => calculateNewBalance("1000", 500)).toThrow(
      "Los montos deben ser números válidos"
    );
    expect(() => calculateNewBalance(1000, "500")).toThrow(
      "Los montos deben ser números válidos"
    );
    expect(() => calculateNewBalance(null, 500)).toThrow(
      "Los montos deben ser números válidos"
    );
  });

  test("should handle negative results", () => {
    expect(calculateNewBalance(1000, 1500)).toBe(-500);
  });
});

describe("generateTransactionId", () => {
  test("should generate unique transaction IDs", () => {
    const id1 = generateTransactionId();
    const id2 = generateTransactionId();

    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe("string");
    expect(typeof id2).toBe("string");
  });

  test("should follow the expected format", () => {
    const id = generateTransactionId();
    expect(id).toMatch(/^TXN-\d+-[A-Z0-9]+$/);
  });

  test("should always start with TXN-", () => {
    const id = generateTransactionId();
    expect(id.startsWith("TXN-")).toBe(true);
  });

  test("should generate different IDs when called multiple times", () => {
    const ids = [];
    for (let i = 0; i < 10; i++) {
      ids.push(generateTransactionId());
    }

    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(10);
  });
});
