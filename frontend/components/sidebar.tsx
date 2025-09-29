"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MagicThemeToggle } from "@/components/magic-theme-toggle"
import { Users, Calendar, DollarSign, Receipt, Home, User, LogOut, Menu, X } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Jogadores", href: "/players", icon: Users },
  { name: "Gestão Mensal", href: "/monthly", icon: Calendar },
  { name: "Fluxo de Caixa", href: "/cashflow", icon: DollarSign },
  { name: "Despesas", href: "/expenses", icon: Receipt },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                AD
              </div>
              <div>
                <p className="font-semibold text-foreground">Admin</p>
                <p className="text-sm text-muted-foreground">Administrador</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Link href="/profile" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  pathname === "/profile" && "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
                )}
                size="sm"
              >
                <User className="h-4 w-4" />
                Perfil
              </Button>
            </Link>

            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-muted-foreground">Tema</span>
              <div className="flex items-center gap-2">
                <MagicThemeToggle />
                <ThemeToggle />
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
