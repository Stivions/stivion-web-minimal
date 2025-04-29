"use client"

import { Download, FileType } from "lucide-react"
import { useState } from "react"

interface DownloadItemProps {
  title: string
  description: string
  fileName: string
  fileSize?: string
  fileType?: string
  index: number
  colors: {
    accent: string
    accentLight: string
    text: string
    textSecondary: string
    background: string
    card: string
  }
}

export default function DownloadItem({
  title,
  description,
  fileName,
  fileSize,
  fileType,
  index,
  colors,
}: DownloadItemProps) {
  const [isHovering, setIsHovering] = useState(false)

  // Calcular un ligero retraso en la animación basado en el índice
  const animationDelay = `${index * 50}ms`

  return (
    <div
      className="relative group transition-all duration-300 ease-out"
      style={{
        animationDelay,
        transform: isHovering ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="absolute -inset-1 rounded-lg opacity-70 blur-sm transition-all duration-300"
        style={{
          background: isHovering ? `linear-gradient(135deg, ${colors.accentLight}, ${colors.accent})` : "transparent",
          opacity: isHovering ? 0.5 : 0,
        }}
      ></div>

      <div
        className="relative p-4 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: colors.card,
          boxShadow: isHovering ? `0 10px 20px -10px ${colors.accent}40` : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="mb-3">
          <h2 className="text-base font-semibold" style={{ color: colors.text }}>
            {title}
          </h2>

          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            {description}
          </p>

          {(fileSize || fileType) && (
            <div className="flex items-center gap-2 mt-2 text-[10px]" style={{ color: colors.textSecondary }}>
              {fileType && (
                <span className="flex items-center">
                  <FileType size={10} className="mr-1" />
                  {fileType}
                </span>
              )}
              {fileSize && fileType && <span>•</span>}
              {fileSize && <span>{fileSize}</span>}
            </div>
          )}
        </div>

        <a
          href={`/files/${fileName}`}
          download
          className="inline-flex items-center gap-1.5 text-xs py-2 px-4 rounded-md transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${colors.accentLight}, ${colors.accent})`,
            color: "#fff",
            transform: isHovering ? "scale(1.03)" : "scale(1)",
            boxShadow: isHovering ? `0 5px 15px -5px ${colors.accent}80` : "0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Download size={14} />
          DESCARGAR
        </a>
      </div>
    </div>
  )
}
