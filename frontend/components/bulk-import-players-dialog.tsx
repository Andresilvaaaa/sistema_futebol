"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Upload, Check, Loader2, AlertTriangle } from "lucide-react"
import { playersService } from "@/lib/services"
import type { CreatePlayerRequest } from "@/types/api"
import { useToast } from "@/hooks/use-toast"

interface BulkImportPlayersDialogProps {
  onImported?: (createdCount: number) => void
  defaultMonthlyFee?: number
}

/**
 * Dialog para importar jogadores em massa via JSON.
 * Aceita dois formatos:
 * - Objeto: { "Nome": "+55 11 99999-9999", ... }
 * - Lista: [ { "name": "Nome", "phone": "+55 11 99999-9999" }, ... ]
 */
export function BulkImportPlayersDialog({ onImported, defaultMonthlyFee = 150 }: BulkImportPlayersDialogProps) {
  const [open, setOpen] = useState(false)
  const [jsonText, setJsonText] = useState("")
  const [parsed, setParsed] = useState<Array<{ name: string; phone: string }>>([])
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const resetState = () => {
    setJsonText("")
    setParsed([])
    setErrors([])
    setLoading(false)
  }

  const sanitizePhone = (phone: string) => phone.trim()

  const parseJson = (text: string) => {
    const localErrors: string[] = []
    let data: any
    try {
      data = JSON.parse(text)
    } catch (e) {
      localErrors.push("JSON inválido. Verifique a sintaxe.")
      setErrors(localErrors)
      setParsed([])
      return
    }

    const result: Array<{ name: string; phone: string }> = []

    // Objeto chave -> valor
    if (data && typeof data === "object" && !Array.isArray(data)) {
      for (const [name, phone] of Object.entries<any>(data)) {
        if (typeof name !== "string") continue
        if (typeof phone !== "string") {
          localErrors.push(`Telefone inválido para "${name}"`)
          continue
        }
        result.push({ name: name.trim(), phone: sanitizePhone(phone) })
      }
    }

    // Lista de objetos
    if (Array.isArray(data)) {
      for (const item of data) {
        if (typeof item !== "object" || !item) continue
        const name = (item.name ?? item.player_name ?? "").toString()
        const phone = (item.phone ?? "").toString()
        if (!name.trim() || !phone.trim()) {
          localErrors.push("Item com nome ou telefone vazio foi ignorado.")
          continue
        }
        result.push({ name: name.trim(), phone: sanitizePhone(phone) })
      }
    }

    if (result.length === 0 && localErrors.length === 0) {
      localErrors.push("Nenhum jogador encontrado no JSON.")
    }

    setParsed(result)
    setErrors(localErrors)
  }

  const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || "")
      setJsonText(text)
      parseJson(text)
    }
    reader.onerror = () => {
      toast({ title: "Erro ao ler arquivo", description: "Não foi possível ler o arquivo JSON.", variant: "destructive" })
    }
    reader.readAsText(file, "utf-8")
  }

  const handleImport = async () => {
    if (parsed.length === 0) {
      toast({ title: "Nenhum jogador para importar", description: "Insira um JSON válido com ao menos um jogador.", variant: "destructive" })
      return
    }

    setLoading(true)
    const successes: string[] = []
    const failures: Array<{ name: string; reason: string }> = []

    for (const item of parsed) {
      const payload: CreatePlayerRequest = {
        name: item.name,
        position: "forward",
        email: "", // opcional: vazio passa na validação
        phone: item.phone,
        monthly_fee: defaultMonthlyFee,
        status: "active",
      }

      try {
        await playersService.createPlayer(payload)
        successes.push(item.name)
      } catch (err: any) {
        const reason = err?.message || "Erro desconhecido"
        failures.push({ name: item.name, reason })
      }
    }

    setLoading(false)

    if (successes.length) {
      toast({ title: "Jogadores importados", description: `${successes.length} criado(s) com sucesso.`, })
    }
    if (failures.length) {
      toast({ title: "Alguns não foram importados", description: `${failures.length} falhou(aram). Veja detalhes no console.`, variant: "destructive" })
      // Log detalhado no console para diagnóstico
      console.group("Falhas na importação de jogadores")
      failures.forEach(f => console.error(`Falha ao criar ${f.name}: ${f.reason}`))
      console.groupEnd()
    }

    if (onImported) onImported(successes.length)
    setOpen(false)
    // Mantém o texto para referência até o próximo open
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) resetState() }}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-green-700 hover:bg-green-800 text-white">
          <Users className="h-4 w-4 mr-2" />
          Importar JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importar jogadores em massa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="json-file">Arquivo JSON</Label>
            <Input id="json-file" type="file" accept=".json,application/json" onChange={onFileSelected} />
            <p className="text-xs text-muted-foreground">Opcional: escolha um arquivo .json com o formato indicado.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="json-text">Ou cole o JSON aqui</Label>
            <Textarea id="json-text" value={jsonText} onChange={(e) => { setJsonText(e.target.value); parseJson(e.target.value) }} rows={10} placeholder='{"Nome": "+55 11 99999-9999", "Outro": "+55 21 88888-7777"}' />
            <p className="text-xs text-muted-foreground">Formato aceito: objeto chave→telefone ou lista de {`{ name, phone }`}.</p>
          </div>

          <div className="grid gap-2">
            <Label>Pré-visualização ({parsed.length})</Label>
            <ScrollArea className="h-[220px] border rounded-md p-3">
              {parsed.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum item válido encontrado.</p>
              ) : (
                <div className="space-y-2">
                  {parsed.map((p, idx) => (
                    <div key={`${p.name}-${idx}`} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.phone}</p>
                      </div>
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {errors.length > 0 && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>{errors[0]}</span>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={handleImport} disabled={loading || parsed.length === 0}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
              Importar {parsed.length} Jogador{parsed.length !== 1 ? "es" : ""}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}