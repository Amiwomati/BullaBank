@echo off
echo ========================================
echo    SonarCloud Analysis - BullaBank
echo ========================================
echo.

REM Verificar si el token está configurado
if "%SONAR_TOKEN%"=="" (
    echo ❌ ERROR: SONAR_TOKEN no está configurado
    echo.
    echo Para configurar el token:
    echo 1. Ve a https://sonarcloud.io/account/security
    echo 2. Genera un nuevo token
    echo 3. Ejecuta: set SONAR_TOKEN=tu_token_aqui
    echo 4. Vuelve a ejecutar este script
    echo.
    pause
    exit /b 1
)

echo ✅ Token configurado correctamente
echo.

echo 📊 Paso 1: Generando reporte de cobertura...
call npm run test src/tests/bankUtils.test.js -- --coverage --watchAll=false
if errorlevel 1 (
    echo ❌ Error al generar cobertura
    pause
    exit /b 1
)

echo.
echo 🔍 Paso 2: Ejecutando análisis ESLint...
call npm run lint > eslint-report.txt 2>&1
echo ✅ Análisis local completado

echo.
echo 🚀 Paso 3: Enviando a SonarCloud...
npx sonarqube-scanner
if errorlevel 1 (
    echo ❌ Error en análisis SonarCloud
    echo Revisa la configuración del token y la conectividad
    pause
    exit /b 1
)

echo.
echo ✅ Análisis SonarCloud completado exitosamente!
echo.
echo 📈 Ver resultados en:
echo https://sonarcloud.io/project/overview?id=bullabank
echo.
pause
