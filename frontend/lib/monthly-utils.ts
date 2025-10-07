export const getMonthName = (month: number): string => {
  const months = [
    "JANEIRO",
    "FEVEREIRO",
    "MARÇO",
    "ABRIL",
    "MAIO",
    "JUNHO",
    "JULHO",
    "AGOSTO",
    "SETEMBRO",
    "OUTUBRO",
    "NOVEMBRO",
    "DEZEMBRO",
  ]
  return months[month - 1]
}

export const formatMonthYear = (month: number, year: number): string => {
  return `${getMonthName(month)} ${year}`
}

export const getCurrentMonth = (): { month: number; year: number } => {
  const now = new Date()
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  }
}

export const getAdjacentMonths = (month: number, year: number) => {
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year

  return {
    prev: { month: prevMonth, year: prevYear },
    next: { month: nextMonth, year: nextYear },
  }
}
import type { MonthlyPlayer, CasualPlayer } from "@/types/monthly"

export interface MonthlyStats {
  received: number
  expected: number
  pending: number
  paid: number
  casualCount: number
}

export const computeMonthlyStats = (
  players: MonthlyPlayer[],
  casuals: CasualPlayer[]
): MonthlyStats => {
  const toNum = (v: unknown): number => {
    if (typeof v === "number") return v
    const n = Number(v ?? 0)
    return isNaN(n) ? 0 : n
  }

  const received =
    players.filter((p) => p.status === "paid").reduce((sum, p) => sum + toNum(p.monthlyFee), 0) +
    casuals.filter((c) => c.status === "paid").reduce((sum, c) => sum + toNum(c.amount), 0)

  const expected =
    players.reduce((sum, p) => sum + toNum(p.monthlyFee), 0) +
    casuals.reduce((sum, c) => sum + toNum(c.amount), 0)

  const pending =
    players.filter((p) => p.status === "pending").length +
    casuals.filter((c) => c.status === "pending").length

  const paid =
    players.filter((p) => p.status === "paid").length +
    casuals.filter((c) => c.status === "paid").length

  const casualCount = casuals.length

  return { received, expected, pending, paid, casualCount }
}
