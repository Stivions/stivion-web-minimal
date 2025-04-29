export interface DownloadItem {
  id: string
  title: string
  description: string
  fileName: string
  fileSize?: string
  fileType?: string
}

// Configuración personalizada del sitio
export const siteConfig = {
  // Información del sitio
  tagline: "Archivos premium para tus proyectos. Descarga rápida y sin restricciones.",

  // Colores personalizados
  colors: {
    gradientStart: "#0f0f1a", // Inicio del gradiente de fondo
    gradientEnd: "#1a1a2e", // Fin del gradiente de fondo
    background: "#0f0f1a", // Color de fondo base
    text: "#ffffff", // Color de texto principal
    textSecondary: "#a0a0c0", // Color de texto secundario
    title: "#ffffff", // Color para títulos
    accent: "#6c5ce7", // Color de acento principal
    accentLight: "#00d2ff", // Color de acento secundario para gradientes
    glow: "rgba(108, 92, 231, 0.7)", // Color para efectos de brillo
    card: "#16162a", // Color de fondo para tarjetas
  },

  // Fuente personalizada
  font: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  // Texto personalizado del pie de página
  footerText: "© STIVION DESCARGAS · PREMIUM FILES",
}

// Archivos para descargar
export const downloadItems: DownloadItem[] = [
  {
    id: "1",
    title: "Cuenta 24/7",
    description: "Con este Codigo pondras tu  cuenta de Discord 24/7",
    fileName: "24-7cuenta.zip",
    fileSize: "3 MB",
    fileType: "ZIP",
  },
  {
    id: "2",
    title: "PROXIMANTE",
    description: "PROXIMANTE",
    fileName: "PROXIMANTE",
    fileSize: "PROXIMANTE",
    fileType: "PROXIMANTE",
  },
  {
    id: "3",
    title: "PROXIMAMENTE",
    description: "PROXIMANTE",
    fileName: "PROXIMANTE",
    fileSize: "PROXIMANTE",
    fileType: "PROXIMANTE",
  },
  {
    id: "4",
    title: "PROXIMANTE",
    description: "PROXIMANTE",
    fileName: "PROXIMANTE",
    fileSize: "PROXIMANTE",
    fileType: "PROXIMANTE",
  },
  {
    id: "5",
    title: "PROXIMANTE",
    description: "PROXIMANTE",
    fileName: "PROXIMANTE",
    fileSize: "PROXIMANTE",
    fileType: "PROXIMANTE",
  },
]
