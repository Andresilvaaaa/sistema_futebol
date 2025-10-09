import type { UserProfile, ProfileFormData } from "@/types/profile"
import { AuthService } from "./auth"

const PROFILE_STORAGE_KEY_PREFIX = "user_profile"

function getProfileStorageKey(): string {
  const currentUser = AuthService.getCurrentUser()
  if (!currentUser) {
    throw new Error("Usuário não autenticado. Faça login para acessar o perfil.")
  }
  return `${PROFILE_STORAGE_KEY_PREFIX}_${currentUser.id}`
}

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null

  try {
    const storageKey = getProfileStorageKey()
    const stored = localStorage.getItem(storageKey)
    if (!stored) return null

    return JSON.parse(stored)
  } catch (error) {
    console.warn("Erro ao obter perfil:", error)
    return null
  }
}

export function updateProfile(profileData: Partial<UserProfile>): UserProfile {
  try {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      throw new Error('Usuário não autenticado')
    }

    const existingProfile = getProfile()
    const now = new Date().toISOString()

    const profile: UserProfile = {
      id: existingProfile?.id || crypto.randomUUID(),
      ...profileData,
      role: currentUser.role === 'admin' ? "Administrador" : "Usuário",
      createdAt: existingProfile?.createdAt || now,
      updatedAt: now,
    }

    const storageKey = getProfileStorageKey()
    localStorage.setItem(storageKey, JSON.stringify(profile))
    return profile
  } catch (error) {
    console.error("Erro ao salvar perfil:", error)
    throw error
  }
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
