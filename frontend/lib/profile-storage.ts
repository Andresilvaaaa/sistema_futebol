import type { UserProfile, ProfileFormData } from "@/types/profile"

const PROFILE_STORAGE_KEY = "user_profile"

export function getProfile(): UserProfile | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function saveProfile(profileData: ProfileFormData): UserProfile {
  const existingProfile = getProfile()
  const now = new Date().toISOString()

  const profile: UserProfile = {
    id: existingProfile?.id || crypto.randomUUID(),
    ...profileData,
    role: "Administrador",
    createdAt: existingProfile?.createdAt || now,
    updatedAt: now,
  }

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  return profile
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
