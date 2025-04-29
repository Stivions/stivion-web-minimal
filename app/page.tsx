import DownloadItem from "@/components/download-item"
import { downloadItems, siteConfig } from "@/lib/data"

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center px-6 py-12"
      style={{
        background: `linear-gradient(135deg, ${siteConfig.colors.gradientStart} 0%, ${siteConfig.colors.gradientEnd} 100%)`,
        color: siteConfig.colors.text,
        fontFamily: siteConfig.font,
      }}
    >
      <div className="w-full max-w-md mx-auto">
        <header className="flex flex-col items-center mb-12">
          <div className="mb-6 relative">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur"></div>
              <div className="relative bg-black rounded-lg p-4 flex items-center justify-center">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Stivion
                </span>
              </div>
            </div>
          </div>

          <h1
            className="text-3xl font-bold mb-2 uppercase tracking-wider"
            style={{
              color: siteConfig.colors.title,
              textShadow: `0 0 15px ${siteConfig.colors.glow}`,
            }}
          >
            Stivion Descargas
          </h1>

          <div
            className="h-1 w-24 my-4 rounded-full"
            style={{
              background: `linear-gradient(to right, ${siteConfig.colors.accentLight}, ${siteConfig.colors.accent})`,
            }}
          ></div>

          <p className="text-sm text-center max-w-xs" style={{ color: siteConfig.colors.textSecondary }}>
            {siteConfig.tagline}
          </p>
        </header>

        <section className="space-y-6">
          {downloadItems.map((item, index) => (
            <DownloadItem
              key={item.id}
              title={item.title}
              description={item.description}
              fileName={item.fileName}
              fileSize={item.fileSize}
              fileType={item.fileType}
              index={index}
              colors={siteConfig.colors}
            />
          ))}
        </section>

        <footer className="mt-16 text-center">
          <div
            className="h-0.5 w-16 mx-auto mb-6 rounded-full"
            style={{
              background: `linear-gradient(to right, ${siteConfig.colors.accentLight}, ${siteConfig.colors.accent})`,
            }}
          ></div>
          <p className="text-xs" style={{ color: siteConfig.colors.textSecondary }}>
            {siteConfig.footerText}
          </p>
        </footer>
      </div>
    </main>
  )
}
