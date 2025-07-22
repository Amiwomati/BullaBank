# Guía para Ejecutar Análisis SonarCloud

## 📋 Pre-requisitos

### 1. Obtener Token de SonarCloud

1. Ve a [SonarCloud.io](https://sonarcloud.io)
2. Inicia sesión con tu cuenta GitHub
3. Ve a **My Account > Security**
4. Genera un nuevo token
5. Copia el token generado

### 2. Configurar Variables de Entorno

```bash
# Windows (PowerShell)
$env:SONAR_TOKEN="tu_token_aqui"
$env:SONAR_HOST_URL="https://sonarcloud.io"

# Windows (CMD)
set SONAR_TOKEN=tu_token_aqui
set SONAR_HOST_URL=https://sonarcloud.io

# Linux/Mac
export SONAR_TOKEN="tu_token_aqui"
export SONAR_HOST_URL="https://sonarcloud.io"
```

## 🚀 Comandos de Ejecución

### Opción 1: Usando el script JavaScript (Recomendado)

```bash
# Generar cobertura de tests
npm run test src/tests/bankUtils.test.js -- --coverage --watchAll=false

# Ejecutar análisis SonarCloud
node sonar-scanner.js
```

### Opción 2: Usando sonar-scanner CLI

```bash
# Instalar scanner (si no está instalado)
npm install -g sonarqube-scanner

# Ejecutar análisis
sonar-scanner \
  -Dsonar.projectKey=bullabank \
  -Dsonar.organization=amiwomati-github \
  -Dsonar.sources=src \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login=$SONAR_TOKEN
```

### Opción 3: Usando archivo properties

```bash
# El archivo sonar-project.properties ya está configurado
sonar-scanner
```

## 📊 Análisis Local (Sin SonarCloud)

Si quieres analizar la calidad localmente sin SonarCloud:

```bash
# Análisis ESLint + SonarJS
npm run lint

# Reporte detallado con formato JSON
npm run lint -- --format json --output-file eslint-report.json

# Tests con cobertura
npm run test src/tests/bankUtils.test.js -- --coverage --watchAll=false

# Ver reporte de cobertura en HTML
start coverage/lcov-report/index.html  # Windows
open coverage/lcov-report/index.html   # Mac
xdg-open coverage/lcov-report/index.html # Linux
```

## 🔧 Configuración SonarCloud

### Proyecto configurado:

- **Project Key**: `bullabank`
- **Organization**: `amiwomati-github`
- **URL**: `https://sonarcloud.io`

### Archivos de configuración:

- `sonar-project.properties` - Configuración principal
- `sonar-scanner.js` - Script JavaScript para ejecución
- `.github/workflows/sonarqube.yml` - Pipeline CI/CD

## 📈 Métricas Actuales

### Estado Local (ESLint + SonarJS):

- ✅ **10 warnings** (no críticos)
- ✅ **0 errores**
- ✅ **25 tests** pasando
- ✅ **100% cobertura** en bankUtils

### Métricas esperadas en SonarCloud:

- **Quality Gate**: Pass
- **Bugs**: 0
- **Vulnerabilities**: 0
- **Code Smells**: ~10
- **Coverage**: ~15% (solo bankUtils testeado)
- **Duplicated Lines**: < 3%

## ❗ Troubleshooting

### Error: "Project not found"

```bash
# Verificar que el proyecto existe en SonarCloud
# Crear proyecto manualmente en sonarcloud.io
```

### Error: "Token invalid"

```bash
# Verificar que el token es correcto
echo $SONAR_TOKEN  # Linux/Mac
echo $env:SONAR_TOKEN  # Windows PowerShell
```

### Error: "Coverage report not found"

```bash
# Generar reporte de cobertura primero
npm run test src/tests/bankUtils.test.js -- --coverage --watchAll=false
# Verificar que existe: coverage/lcov.info
```

## 🎯 Próximos Pasos

1. **Configurar token** de SonarCloud
2. **Ejecutar análisis** con `node sonar-scanner.js`
3. **Revisar resultados** en SonarCloud dashboard
4. **Configurar CI/CD** para análisis automático
5. **Mejorar cobertura** añadiendo más tests

---

**Comando rápido para ejecutar todo:**

```bash
npm run test src/tests/bankUtils.test.js -- --coverage --watchAll=false && node sonar-scanner.js
```
