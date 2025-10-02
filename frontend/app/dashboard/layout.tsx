import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Suspense } from "react"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="p-6 pt-16 md:pt-6">{children}</div>
        </Suspense>
      </main>
    </div>
  )
}