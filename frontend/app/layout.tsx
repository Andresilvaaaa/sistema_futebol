import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sistema de Gestão Esportiva",
  description: "Gerencie jogadores, pagamentos e finanças do seu time",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
