"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ExportButtonProps {
  targetId?: string
  dataExportId?: string
  filename?: string
  label?: string
  pixelRatio?: number
  backgroundColor?: string
}

export function ExportButton({ targetId, dataExportId, filename = "export.png", label = "Exportar", pixelRatio = 3, backgroundColor = "#ffffff" }: ExportButtonProps) {
  const [loading, setLoading] = useState(false)

  const resolveTarget = (): HTMLElement | null => {
    if (targetId) return document.getElementById(targetId)
    if (dataExportId) return document.querySelector(`[data-export-id="${dataExportId}"]`)
    return null
  }

  const handleExport = async () => {
    try {
      setLoading(true)
      const node = resolveTarget()
      if (!node) {
        console.error(`[ExportButton] Elemento alvo não encontrado (id=${targetId} data-export-id=${dataExportId})`)
        setLoading(false)
        return
      }
      // Substituição de html2canvas por html-to-image para suportar cores modernas (oklch)
      const htmlToImage = await import("html-to-image")
      const dataUrl = await htmlToImage.toPng(node as HTMLElement, {
        cacheBust: true,
        pixelRatio,
        backgroundColor,
      })

      const link = document.createElement("a")
      link.href = dataUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("[ExportButton] Falha ao exportar imagem:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={loading} className="bg-emerald-700 hover:bg-emerald-800 text-white">
      {loading ? (
        <span>Gerando...</span>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  )
}