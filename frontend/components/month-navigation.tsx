"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { formatMonthYear, getAdjacentMonths } from "@/lib/monthly-utils"

interface MonthNavigationProps {
  currentMonth: number
  currentYear: number
  onMonthChange: (month: number, year: number) => void
}

export function MonthNavigation({ currentMonth, currentYear, onMonthChange }: MonthNavigationProps) {
  const { prev, next } = getAdjacentMonths(currentMonth, currentYear)

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onMonthChange(prev.month, prev.year)}
        className="text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {formatMonthYear(prev.month, prev.year)}
      </Button>

      <div className="text-center">
        <h2 className="text-2xl font-bold">{formatMonthYear(currentMonth, currentYear)}</h2>
        <p className="text-sm text-muted-foreground">{currentYear}</p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onMonthChange(next.month, next.year)}
        className="text-muted-foreground hover:text-foreground"
      >
        {formatMonthYear(next.month, next.year)}
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}
