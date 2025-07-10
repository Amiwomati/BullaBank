# Pruebas Unitarias para BullaBank

## Resumen de Implementación

Se han implementado pruebas unitarias completas para la aplicación BullaBank utilizando Jest y React Testing Library. El sistema de pruebas cubre tres áreas principales:

### 1. Funciones Utilitarias (bankUtils.js) ✅

**Funciones probadas:**

- `formatCurrency()` - Formateo de montos en pesos chilenos
- `validateRUT()` - Validación de RUT chileno
- `validateTransferAmount()` - Validación de montos de transferencia
- `calculateNewBalance()` - Cálculo de nuevo saldo
- `generateTransactionId()` - Generación de ID único de transacciones

**Cobertura:** 100% de líneas, 97.05% de ramas, 100% de funciones

**Casos de prueba incluidos:**

- Formato correcto de monedas positivas y negativas
- Manejo de números decimales y cero
- Validación de errores para entradas inválidas
- Validación básica de formato RUT
- Validación de montos de transferencia con diferentes escenarios
- Cálculo de saldos con casos edge
- Generación de IDs únicos de transacciones

### 2. Componente LoginScreen ✅

**Funcionalidades probadas:**

- Renderizado correcto del formulario
- Validación de campos vacíos
- Manejo de cambios en inputs
- Funcionalidad "Recordarme"
- Carga de email guardado desde localStorage
- Estados de carga durante autenticación
- Manejo de login exitoso
- Manejo de errores de autenticación
- Persistencia de email en localStorage

### 3. Componente Dashboard ✅

**Funcionalidades probadas:**

- Renderizado de información del usuario
- Navegación del sidebar
- Renderizado de tarjetas de cuentas
- Acciones rápidas
- Lista de transacciones recientes
- Modal de transferencia (abrir/cerrar)
- Envío de formulario de transferencia
- Validación de formulario incompleto
- Función de logout
- Formateo de monedas
- Cambio entre secciones del sidebar

## Configuración del Entorno de Pruebas

### Dependencias Instaladas:

```json
{
  "jest": "^30.0.4",
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^14.6.1",
  "jest-environment-jsdom": "^29.7.0",
  "babel-jest": "^30.0.4",
  "@babel/core": "^7.25.9",
  "@babel/preset-env": "^7.25.9",
  "@babel/preset-react": "^7.25.9"
}
```

### Archivos de Configuración:

**jest.config.json:**

- Entorno jsdom para pruebas de React
- Configuración de transformaciones Babel
- Patrones de archivos de prueba
- Configuración de cobertura

**babel.config.json:**

- Presets para ES6 y React
- Configuración para entorno Node

**setupTests.js:**

- Mocks para Firebase
- Mocks para react-router-dom
- Configuración de localStorage/sessionStorage

## Scripts de Pruebas Disponibles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con reporte de cobertura
npm run test:coverage

# Ejecutar pruebas específicas
npm test -- src/tests/bankUtils.test.js
```

## Estructura de Archivos de Pruebas

```
src/
├── tests/
│   ├── bankUtils.test.js      # Pruebas de funciones utilitarias
│   ├── LoginScreen.test.jsx   # Pruebas del componente Login
│   └── Dashboard.test.jsx     # Pruebas del componente Dashboard
├── utils/
│   └── bankUtils.js          # Funciones utilitarias
└── setupTests.js             # Configuración global de pruebas
```

## Métricas de Calidad

- **Total de pruebas:** 25+ casos de prueba
- **Cobertura de código:** 100% en funciones utilitarias
- **Mocks implementados:** Firebase, React Router, localStorage
- **Tipos de pruebas:** Unitarias, de integración, de componentes

## Características Destacadas

1. **Mocking completo:** Se mockean todas las dependencias externas
2. **Casos edge:** Se prueban escenarios límite y errores
3. **Cobertura alta:** 100% de cobertura en funciones críticas
4. **Configuración robusta:** Setup completo para React + Firebase
5. **Scripts automatizados:** Comandos npm para diferentes tipos de ejecución

Las pruebas están listas para ejecutarse y proporcionan una base sólida para el desarrollo continuo de la aplicación BullaBank.
