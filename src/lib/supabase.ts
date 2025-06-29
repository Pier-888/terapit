import { createClient } from '@supabase/supabase-js';

// Usa valori di fallback per evitare errori in produzione
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hpyrgrngfifdpvsnwnyr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhweXJncm5nZmlmZHB2c253bnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NzA3NzgsImV4cCI6MjA2NjU0Njc3OH0.K6L-oDcqSc2311pna0pHKrjy8TYfieIif-FQbdfRU7A';

// Verifica che le variabili siano configurate
const isConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';

if (!isConfigured) {
  console.warn('⚠️ SUPABASE NON CONFIGURATO');
  console.warn('📋 Per configurare Supabase:');
  console.warn('1. Clicca "Connect to Supabase" in alto a destra');
  console.warn('2. Inserisci URL e Anon Key del tuo progetto Supabase');
  console.warn('3. Ricarica la pagina');
}

// Crea il client anche se le variabili non sono configurate
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Flag per verificare se Supabase è configurato
export const isSupabaseConfigured = isConfigured;

// Tipi per il database
export interface DatabaseUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'patient' | 'psychologist';
  avatar_url?: string;
  phone_number?: string;
  date_of_birth?: string;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  last_login?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  preferred_language?: string;
  location_city?: string;
  location_cap?: string;
  location_region?: string;
  bio?: string;
  
  // Dati pazienti
  emergency_contact?: string;
  medical_history?: string;
  current_medications?: string;
  insurance_provider?: string;
  has_completed_questionnaire: boolean;
  matching_status: 'pending' | 'matched' | 'consultations_completed' | 'therapy_started';
  
  // Dati psicologi
  license_number?: string;
  specializations?: string[];
  years_of_experience?: number;
  education?: string[];
  languages?: string[];
  hourly_rate?: number;
  is_verified_professional: boolean;
  rating: number;
  review_count: number;
  
  created_at: string;
  updated_at: string;
}

export interface QuestionnaireResponse {
  id: string;
  user_id?: string;
  session_id?: string;
  therapy_type: 'individual' | 'couple' | 'child';
  responses: Record<string, any>;
  completed_at: string;
  matching_score?: number;
  questionnaire_version: string;
  completion_time_minutes?: number;
  created_at: string;
}

export interface TherapyMatch {
  id: string;
  patient_id: string;
  psychologist_id: string;
  questionnaire_response_id: string;
  compatibility_score: number;
  reasons_for_match: string[];
  match_rank: number;
  status: 'active' | 'consultation_booked' | 'consultation_completed' | 'selected_for_therapy' | 'declined';
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  psychologist_id: string;
  therapy_match_id?: string;
  appointment_datetime: string;
  duration_minutes: number;
  appointment_type: 'consultation' | 'therapy' | 'follow_up';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  is_free_consultation: boolean;
  price?: number;
  meeting_link?: string;
  meeting_location?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  cancelled_at?: string;
  cancellation_reason?: string;
}

export interface ConsultationFeedback {
  id: string;
  appointment_id: string;
  patient_id: string;
  psychologist_id: string;
  rating: number;
  feedback_text?: string;
  would_choose_for_therapy: boolean;
  communication_rating?: number;
  empathy_rating?: number;
  professionalism_rating?: number;
  created_at: string;
}

export interface PsychologistAvailability {
  id: string;
  psychologist_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'file' | 'image';
  attachment_url?: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
}
