# Configuración de Quality Gates para BullaBank

## Métricas de Calidad Configuradas

### 1. Cobertura de Código

- **Cobertura mínima:** 80%
- **Cobertura de nuevas líneas:** 90%

### 2. Duplicación de Código

- **Duplicación máxima:** 3%
- **Duplicación en nuevas líneas:** 3%

### 3. Maintainability

- **Ratio de mantenibilidad:** A
- **Deuda técnica máxima:** 30 minutos
- **Code Smells en nuevas líneas:** 0

### 4. Reliability

- **Bugs en nuevas líneas:** 0
- **Reliability Rating:** A

### 5. Security

- **Vulnerabilidades en nuevas líneas:** 0
- **Security Rating:** A
- **Security Hotspots revisados:** 100%

## Configuración de ESLint con SonarJS

Las siguientes reglas están activas para mantener la calidad del código:

```javascript
'sonarjs/cognitive-complexity': ['error', 15],
'sonarjs/no-duplicate-string': ['error', 3],
'sonarjs/no-identical-functions': 'error',
'sonarjs/no-small-switch': 'error',
'sonarjs/prefer-immediate-return': 'error',
'sonarjs/prefer-object-literal': 'error',
'sonarjs/prefer-single-boolean-return': 'error',
```

## Comandos de Análisis

```bash
# Análisis completo de calidad
npm run quality

# Solo análisis de SonarQube
npm run sonar

# Análisis local (con SonarQube local)
npm run sonar:local

# ESLint con formato JSON para SonarQube
npm run lint:sonar
```

## Configuración de Variables de Entorno

Para ejecutar el análisis de SonarQube, configura las siguientes variables:

```bash
# Para SonarCloud
SONAR_TOKEN=tu_token_de_sonarcloud
SONAR_HOST_URL=https://sonarcloud.io

# Para SonarQube local
SONAR_TOKEN=tu_token_local
SONAR_HOST_URL=http://localhost:9000
```

## Exclusiones Configuradas

- Archivos de prueba: `**/*.test.js`, `**/*.test.jsx`
- Configuración: `**/setupTests.js`
- Dependencias: `**/node_modules/**`
- Build: `**/dist/**`, `**/coverage/**`

## Integración con CI/CD

El workflow de GitHub Actions ejecuta automáticamente:

1. Instalación de dependencias
2. Ejecución de pruebas con cobertura
3. Análisis de ESLint
4. Escaneo de SonarQube
5. Verificación del Quality Gate
