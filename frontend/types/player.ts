export interface Player {
  id: string
  name: string
  position: string
  phone: string
  email: string
  joinDate: string
  status: "active" | "pending" | "delayed" | "inactive" // Adicionado "inactive"
  monthlyFee: number
  isActive: boolean
}

export interface PlayerStats {
  total: number
  active: number
  pending: number
  delayed: number
  inactive: number
}
