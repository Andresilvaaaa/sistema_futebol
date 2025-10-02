export interface MonthlyPeriod {
  id: string
  month: number
  year: number
  name: string
  isActive: boolean
  createdAt: string
  totalExpected: number
  totalReceived: number
  playersCount: number
}

export interface MonthlyPlayer {
  id: string
  playerId: string // Corrigido: string (UUID)
  monthlyPeriodId: string
  playerName: string
  position: string
  phone: string
  email: string
  monthlyFee: number
  status: "paid" | "pending"
  paymentDate?: string
  joinDate: string
  pendingMonthsCount?: number
}

export interface CasualPlayer {
  id: string
  monthlyPeriodId: string
  playerName: string
  playDate: string
  invitedBy: string
  amount: number
  paymentDate?: string
  status: "paid" | "pending"
  createdAt: string
}
