# STIVION DESCARGAS

Una página web minimalista pero altamente personalizada para descargar archivos premium.

## Características

- Diseño único con gradientes y efectos visuales
- Animaciones sutiles en la interfaz
- Tarjetas interactivas para los archivos
- Información detallada de archivos (tamaño, tipo)
- Totalmente responsive

## Personalización

Toda la personalización se realiza en el archivo `lib/data.ts`:

### Información del sitio

\`\`\`typescript
tagline: "Tu descripción personalizada",
\`\`\`

### Colores y estilo

\`\`\`typescript
colors: {
  gradientStart: "#0f0f1a", // Inicio del gradiente de fondo
  gradientEnd: "#1a1a2e",   // Fin del gradiente de fondo
  background: "#0f0f1a",    // Color de fondo base
  text: "#ffffff",          // Color de texto principal
  textSecondary: "#a0a0c0", // Color de texto secundario
  title: "#ffffff",         // Color para títulos
  accent: "#6c5ce7",        // Color de acento principal
  accentLight: "#00d2ff",   // Color de acento secundario para gradientes
  glow: "rgba(108, 92, 231, 0.7)", // Color para efectos de brillo
  card: "#16162a",          // Color de fondo para tarjetas
},
\`\`\`

### Archivos para descargar

\`\`\`typescript
export const downloadItems: DownloadItem[] = [
  {
    id: "1",
    title: "TÍTULO DEL ARCHIVO",
    description: "Descripción del archivo",
    fileName: "nombre-archivo.zip",
    fileSize: "1.8 GB",
    fileType: "ZIP"
  },
  // Añade más elementos aquí
]
\`\`\`

## Desarrollo local

\`\`\`bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
