# Configuración de Organización en SonarCloud

## Problema Actual

El análisis de SonarCloud falla porque necesitas configurar una organización primero.

## Pasos para Configurar la Organización

### 1. Acceder a SonarCloud

1. Ve a https://sonarcloud.io
2. Inicia sesión con tu cuenta de GitHub (`amiwomati-github`)

### 2. Crear una Organización

1. En el dashboard, busca el botón **"+"** o **"Create new organization"**
2. Selecciona **"Create a new organization"**
3. Opciones:
   - **Nombre de organización**: `amiwomati-github` o `amiwomati`
   - **Display name**: `Amiwomati Projects`
   - **Key**: se genera automáticamente

### 3. Configurar el Proyecto

1. Una vez creada la organización, crea un nuevo proyecto:
   - **Project key**: `bullabank`
   - **Display name**: `BullaBank`
   - **Main branch**: `main` o `master`

### 4. Obtener la Configuración Correcta

1. En el proyecto creado, ve a **"Information"** o **"Project Settings"**
2. Copia la **Organization Key** exacta
3. Copia el **Project Key** exacto

### 5. Actualizar Configuración Local

Una vez que tengas los datos correctos, actualiza `sonar-project.properties`:

```properties
sonar.projectKey=[PROJECT_KEY_FROM_SONARCLOUD]
sonar.organization=[ORGANIZATION_KEY_FROM_SONARCLOUD]
sonar.projectName=BullaBank
sonar.projectVersion=1.0.0
```

### 6. Alternativa: Configurar desde GitHub

Si tu proyecto está en GitHub:

1. En SonarCloud, selecciona **"Analyze new project"**
2. Selecciona **"GitHub"**
3. Autoriza SonarCloud a acceder a tus repositorios
4. Selecciona el repositorio `BullaBank`
5. SonarCloud generará automáticamente la configuración

## Configuración Temporal

Mientras configuras la organización, puedes usar una configuración básica:

```properties
# Configuración mínima para prueba
sonar.projectKey=bullabank-test
sonar.organization=tu-organizacion-github
sonar.projectName=BullaBank
sonar.projectVersion=1.0.0
sonar.sources=src
sonar.exclusions=**/node_modules/**,**/coverage/**
sonar.tests=src/tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

## Comandos para Verificar

```bash
# Verificar token
echo $env:SONAR_TOKEN

# Ejecutar análisis después de configurar organización
npm run sonar

# Verificar resultados en:
# https://sonarcloud.io/projects
```

## Notas Importantes

- La organización debe existir antes de ejecutar el análisis
- El token debe tener permisos para la organización
- Puedes usar tu nombre de usuario de GitHub como organización personal
