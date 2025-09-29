"use client"

import * as React from "react"
import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MagicThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    setIsAnimating(true)

    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    // Reset animation after transition
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isAnimating && "scale-110",
        theme === "dark"
          ? "bg-slate-900 border-slate-700 hover:bg-slate-800"
          : "bg-amber-50 border-amber-200 hover:bg-amber-100",
      )}
    >
      {/* Background sparkles effect */}
      <div
        className={cn("absolute inset-0 transition-opacity duration-300", isAnimating ? "opacity-100" : "opacity-0")}
      >
        <Sparkles className="absolute top-1 left-1 h-2 w-2 text-amber-400 animate-pulse" />
        <Sparkles className="absolute bottom-1 right-1 h-2 w-2 text-blue-400 animate-pulse delay-150" />
        <Sparkles className="absolute top-1 right-1 h-1.5 w-1.5 text-purple-400 animate-pulse delay-300" />
      </div>

      {/* Sun icon */}
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all duration-300",
          theme === "dark" ? "rotate-90 scale-0 text-amber-500" : "rotate-0 scale-100 text-amber-600",
        )}
      />

      {/* Moon icon */}
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
          theme === "dark" ? "rotate-0 scale-100 text-slate-300" : "-rotate-90 scale-0 text-slate-600",
        )}
      />

      <span className="sr-only">Alternar para tema {theme === "light" ? "escuro" : "claro"}</span>
    </Button>
  )
}
