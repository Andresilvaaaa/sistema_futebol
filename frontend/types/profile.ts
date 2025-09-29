export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  role: string
  clubName: string
  clubLogo?: string
  address: string
  city: string
  state: string
  zipCode: string
  createdAt: string
  updatedAt: string
}

export interface ProfileFormData {
  name: string
  email: string
  phone: string
  avatar?: string
  clubName: string
  clubLogo?: string
  address: string
  city: string
  state: string
  zipCode: string
}
