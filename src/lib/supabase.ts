import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Tipos para as tabelas
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  cpf?: string
  role: 'admin-saas' | 'admin-barbearia' | 'barbeiro' | 'cliente'
  avatar_url?: string
  created_at: string
  updated_at: string
  last_login?: string
  is_active: boolean
}

export interface Barbershop {
  id: string
  name: string
  description?: string
  address: string
  phone?: string
  email?: string
  cnpj?: string
  logo_url?: string
  cover_image_url?: string
  opening_hours?: Record<string, { open: string; close: string }>
  is_active: boolean
  subscription_plan: 'basic' | 'intermediate' | 'advanced' | 'multi-unit'
  subscription_expires_at?: string
  owner_id: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  barbershop_id: string
  name: string
  description?: string
  price: number
  duration_minutes: number
  is_active: boolean
  category?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  barbershop_id: string
  client_id: string
  barber_id?: string
  service_id: string
  appointment_date: string
  appointment_time: string
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
  total_price: number
  payment_status: 'pending' | 'paid' | 'cancelled' | 'refunded'
  payment_method?: string
  notes?: string
  cancelled_reason?: string
  cancelled_at?: string
  created_at: string
  updated_at: string
}

export interface BarberBarbershop {
  id: string
  barber_id: string
  barbershop_id: string
  is_active: boolean
  commission_percentage: number
  working_hours?: Record<string, any>
  specialties?: string[]
  hire_date: string
  created_at: string
  updated_at: string
}