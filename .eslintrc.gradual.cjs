module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "coverage"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "sonarjs"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // SonarJS rules - Configuración gradual para adopción
    "sonarjs/cognitive-complexity": ["warn", 20], // Más permisivo inicialmente
    "sonarjs/no-duplicate-string": ["warn", { threshold: 5 }], // Más permisivo
    "sonarjs/no-identical-functions": "warn",
    "sonarjs/no-small-switch": "warn",
    "sonarjs/prefer-immediate-return": "warn",
    "sonarjs/prefer-object-literal": "warn",
    "sonarjs/prefer-single-boolean-return": "warn",

    // Reglas de React más flexibles
    "react/prop-types": "warn", // Warning en lugar de error
    "no-unused-vars": "warn", // Warning para variables no usadas
  },
};
