"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Building2, MapPin, Phone, Mail, Calendar, Save } from "lucide-react"
import { getProfile, saveProfile, getInitials } from "@/lib/profile-storage"
import type { UserProfile, ProfileFormData } from "@/types/profile"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    clubName: "",
    clubLogo: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  useEffect(() => {
    const existingProfile = getProfile()
    if (existingProfile) {
      setProfile(existingProfile)
      setFormData({
        name: existingProfile.name,
        email: existingProfile.email,
        phone: existingProfile.phone,
        avatar: existingProfile.avatar || "",
        clubName: existingProfile.clubName,
        clubLogo: existingProfile.clubLogo || "",
        address: existingProfile.address,
        city: existingProfile.city,
        state: existingProfile.state,
        zipCode: existingProfile.zipCode,
      })
    } else {
      setIsEditing(true)
    }
  }, [])

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.clubName) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome, email e nome do clube são obrigatórios.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const savedProfile = saveProfile(formData)
      setProfile(savedProfile)
      setIsEditing(false)
      toast({
        title: "Perfil salvo",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o perfil.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        avatar: profile.avatar || "",
        clubName: profile.clubName,
        clubLogo: profile.clubLogo || "",
        address: profile.address,
        city: profile.city,
        state: profile.state,
        zipCode: profile.zipCode,
      })
      setIsEditing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações pessoais e do clube</p>
        </div>
        {profile && !isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <User className="mr-2 h-4 w-4" />
            Editar Perfil
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg bg-green-600 text-white">
                  {formData.name ? getInitials(formData.name) : "AD"}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{formData.name || "Administrador"}</CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mt-2">
                <User className="mr-1 h-3 w-3" />
                Administrador
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile && (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Desde {new Date(profile.createdAt).toLocaleDateString("pt-BR")}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{formData.clubName || "Clube não informado"}</span>
                  </div>
                  {formData.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.phone}</span>
                    </div>
                  )}
                  {formData.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.email}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{isEditing ? "Editar Informações" : "Informações Pessoais"}</CardTitle>
            <CardDescription>
              {isEditing ? "Atualize suas informações pessoais e do clube" : "Suas informações pessoais e do clube"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">URL da Foto</Label>
                  <Input
                    id="avatar"
                    value={formData.avatar}
                    onChange={(e) => handleInputChange("avatar", e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Club Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações do Clube
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clubName">Nome do Clube *</Label>
                  <Input
                    id="clubName"
                    value={formData.clubName}
                    onChange={(e) => handleInputChange("clubName", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Nome do seu clube"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clubLogo">URL do Logo</Label>
                  <Input
                    id="clubLogo"
                    value={formData.clubLogo}
                    onChange={(e) => handleInputChange("clubLogo", e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://exemplo.com/logo.jpg"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Cidade"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      disabled={!isEditing}
                      placeholder="SP"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      disabled={!isEditing}
                      placeholder="00000-000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Salvando..." : "Salvar"}
                </Button>
                <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                  Cancelar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
