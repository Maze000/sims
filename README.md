# Numassage - Plataforma de Servicios de Masajes

La primera y más grande plataforma de servicios de masajes y terapias en Chile. Conecta terapeutas profesionales con clientes que buscan servicios de bienestar y relajación.

## 🚀 Características

- **Plataforma de Servicios**: Conecta terapeutas con clientes
- **Perfiles Profesionales**: Los terapeutas pueden crear perfiles detallados
- **Sistema de Pagos**: Procesamiento seguro de pagos
- **Reservas Online**: Sistema completo de reservas y citas
- **Autenticación 2FA**: Seguridad avanzada con autenticación de dos factores
- **Diseño Moderno**: Interfaz inspirada en plataformas líderes
- **Responsive**: Optimizado para todos los dispositivos

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Package Manager**: npm
- **UI Components**: Radix UI + Custom Components

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## 🎨 Personalización

- **Colores**: Edita las variables CSS en `src/index.css`
- **Tipografía**: Modifica las familias de fuentes en `tailwind.config.ts`
- **Componentes**: Personaliza los componentes shadcn/ui en `src/components/ui/`
- **Temas**: Sistema de colores inspirado en plataformas modernas

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── numassage/      # Componentes específicos del spa (legacy)
│   └── ui/            # Componentes UI reutilizables
├── pages/              # Componentes de páginas
│   ├── Login.tsx       # Página de login/registro
│   └── Dashboard.tsx   # Dashboard principal
├── hooks/              # Custom React hooks
├── lib/                # Funciones utilitarias
└── assets/             # Imágenes y archivos estáticos
```

## 🏗️ Funcionalidades Principales

### Para Terapeutas
- **Registro de Perfil**: Creación de perfiles profesionales completos
- **Gestión de Servicios**: Definir servicios, precios y disponibilidad
- **Sistema de Pagos**: Recibir pagos de forma segura
- **Calendario**: Gestión de citas y horarios
- **Reseñas**: Sistema de calificaciones y comentarios

### Para Clientes
- **Búsqueda Avanzada**: Encontrar terapeutas por ubicación, especialidad, precio
- **Reservas**: Sistema completo de reservas online
- **Pagos Seguros**: Procesamiento seguro de pagos
- **Historial**: Seguimiento de sesiones anteriores
- **Favoritos**: Guardar terapeutas preferidos

## 🔐 Seguridad

- **Autenticación 2FA**: Verificación en dos pasos
- **Encriptación**: Datos sensibles protegidos
- **Pagos Seguros**: Integración con procesadores de pago confiables
- **Verificación de Perfiles**: Proceso de verificación para terapeutas

## 📄 License

This project is private and proprietary.
