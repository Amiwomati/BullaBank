# BullaBank - Aplicación Bancaria

BullaBank es una aplicación web bancaria moderna desarrollada con React, Firebase Authentication y Firestore. Ofrece una interfaz de usuario intuitiva y segura para gestionar cuentas bancarias, realizar transferencias y administrar finanzas personales.

![BullaBank Dashboard](https://via.placeholder.com/800x400?text=BullaBank+Dashboard)

## Características

- **Autenticación segura**: Registro e inicio de sesión de usuarios mediante Firebase Authentication
- **Dashboard bancario**: Interfaz moderna con resumen de cuentas y últimas transacciones
- **Transferencias**: Sistema para realizar transferencias entre cuentas
- **Base de datos en tiempo real**: Almacenamiento y sincronización de datos con Firestore
- **Diseño responsivo**: Experiencia de usuario optimizada para dispositivos móviles y de escritorio

## Requisitos previos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)
- Cuenta de Firebase (para autenticación y base de datos)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/bullabank.git
cd bullabank
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar Firebase**

- Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
- Habilita Authentication y Firestore en tu proyecto
- Copia el archivo `.env.example` a un nuevo archivo llamado `.env`:

```bash
cp .env.example .env
```

- Abre el archivo `.env` y reemplaza los valores de ejemplo con tus credenciales de Firebase:

```
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-auth-domain
VITE_FIREBASE_PROJECT_ID=tu-project-id
VITE_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
VITE_FIREBASE_MEASUREMENT_ID=tu-measurement-id
```

> **Nota de seguridad**: El archivo `.env` contiene información sensible y está configurado para ser ignorado por Git en el archivo `.gitignore`. Nunca compartas o subas este archivo a repositorios públicos.

## Ejecución local

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

Para construir la aplicación para producción:

```bash
npm run build
```

Para previsualizar la versión de producción:

```bash
npm run preview
```

## Estructura del proyecto

```
bullabank/
├── public/             # Archivos estáticos
├── src/                # Código fuente
│   ├── contexts/       # Contextos de React (Firebase, Auth)
│   ├── Dashboard/      # Componentes del Dashboard
│   ├── Firebase/       # Configuración de Firebase
│   ├── LoginScreen/    # Componentes de inicio de sesión
│   ├── RegisterScreen/ # Componentes de registro
│   ├── App.jsx         # Componente principal
│   └── main.jsx        # Punto de entrada
├── .env                # Variables de entorno (no incluido en el repositorio)
└── package.json        # Dependencias y scripts
```
