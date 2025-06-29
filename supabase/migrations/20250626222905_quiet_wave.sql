/*
  # Database Schema per MindConnect

  1. Nuove Tabelle
    - `users` - Informazioni base degli utenti (pazienti e psicologi)
    - `user_profiles` - Profili dettagliati degli utenti
    - `questionnaire_responses` - Risposte ai questionari
    - `therapy_matches` - Match tra pazienti e psicologi
    - `appointments` - Appuntamenti e consulenze
    - `consultation_feedback` - Feedback delle consulenze gratuite

  2. Sicurezza
    - Abilita RLS su tutte le tabelle
    - Policy per accesso sicuro ai dati
    - Separazione tra dati pubblici e privati

  3. Funzionalità
    - Gestione completa del ciclo di vita utente
    - Tracciamento questionari per tipo di terapia
    - Sistema di matching e feedback
*/

-- Estensione per UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabella principale utenti
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('patient', 'psychologist')),
  avatar_url text,
  phone_number text,
  date_of_birth date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_verified boolean DEFAULT false,
  last_login timestamptz
);

-- Tabella profili dettagliati
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  -- Dati comuni
  preferred_language text DEFAULT 'italiano',
  location_city text,
  location_cap text,
  location_region text,
  bio text,
  
  -- Dati specifici pazienti
  emergency_contact text,
  medical_history text,
  current_medications text,
  insurance_provider text,
  has_completed_questionnaire boolean DEFAULT false,
  matching_status text DEFAULT 'pending' CHECK (matching_status IN ('pending', 'matched', 'consultations_completed', 'therapy_started')),
  
  -- Dati specifici psicologi
  license_number text,
  specializations text[], -- Array di specializzazioni
  years_of_experience integer,
  education text[], -- Array di titoli di studio
  languages text[], -- Array di lingue parlate
  hourly_rate decimal(10,2),
  is_verified_professional boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0.0,
  review_count integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabella risposte questionari
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  session_id text, -- Per tracciare risposte prima della registrazione
  therapy_type text NOT NULL CHECK (therapy_type IN ('individual', 'couple', 'child')),
  responses jsonb NOT NULL, -- Tutte le risposte in formato JSON
  completed_at timestamptz DEFAULT now(),
  matching_score decimal(5,2),
  
  -- Metadati utili
  questionnaire_version text DEFAULT '1.0',
  completion_time_minutes integer,
  
  created_at timestamptz DEFAULT now()
);

-- Tabella match terapeutici
CREATE TABLE IF NOT EXISTS therapy_matches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES users(id) ON DELETE CASCADE,
  psychologist_id uuid REFERENCES users(id) ON DELETE CASCADE,
  questionnaire_response_id uuid REFERENCES questionnaire_responses(id),
  
  compatibility_score decimal(5,2) NOT NULL,
  reasons_for_match text[], -- Array di motivi del match
  match_rank integer NOT NULL, -- 1, 2, o 3 (per i 3 match)
  
  status text DEFAULT 'active' CHECK (status IN ('active', 'consultation_booked', 'consultation_completed', 'selected_for_therapy', 'declined')),
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabella appuntamenti
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid REFERENCES users(id) ON DELETE CASCADE,
  psychologist_id uuid REFERENCES users(id) ON DELETE CASCADE,
  therapy_match_id uuid REFERENCES therapy_matches(id),
  
  appointment_datetime timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  appointment_type text NOT NULL CHECK (appointment_type IN ('consultation', 'therapy', 'follow_up')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  
  is_free_consultation boolean DEFAULT false,
  price decimal(10,2),
  
  -- Dettagli appuntamento
  meeting_link text, -- Per videochiamate
  meeting_location text, -- Per incontri in presenza
  notes text,
  
  -- Metadati
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  cancelled_at timestamptz,
  cancellation_reason text
);

-- Tabella feedback consulenze
CREATE TABLE IF NOT EXISTS consultation_feedback (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id uuid REFERENCES appointments(id) ON DELETE CASCADE,
  patient_id uuid REFERENCES users(id) ON DELETE CASCADE,
  psychologist_id uuid REFERENCES users(id) ON DELETE CASCADE,
  
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text text,
  would_choose_for_therapy boolean,
  
  -- Valutazioni specifiche
  communication_rating integer CHECK (communication_rating >= 1 AND communication_rating <= 5),
  empathy_rating integer CHECK (empathy_rating >= 1 AND empathy_rating <= 5),
  professionalism_rating integer CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  
  created_at timestamptz DEFAULT now()
);

-- Tabella disponibilità psicologi
CREATE TABLE IF NOT EXISTS psychologist_availability (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  psychologist_id uuid REFERENCES users(id) ON DELETE CASCADE,
  
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Domenica
  start_time time NOT NULL,
  end_time time NOT NULL,
  
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Tabella messaggi (per comunicazione paziente-psicologo)
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES users(id) ON DELETE CASCADE,
  
  content text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image')),
  attachment_url text,
  
  is_read boolean DEFAULT false,
  read_at timestamptz,
  
  created_at timestamptz DEFAULT now()
);

-- Abilita Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE therapy_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE psychologist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy per users: gli utenti possono vedere e modificare solo i propri dati
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Policy per user_profiles
CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Policy per questionnaire_responses
CREATE POLICY "Users can read own questionnaire responses" ON questionnaire_responses
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own questionnaire responses" ON questionnaire_responses
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Policy per therapy_matches: pazienti e psicologi possono vedere i propri match
CREATE POLICY "Users can read own matches" ON therapy_matches
  FOR SELECT USING (
    auth.uid()::text = patient_id::text OR 
    auth.uid()::text = psychologist_id::text
  );

-- Policy per appointments
CREATE POLICY "Users can read own appointments" ON appointments
  FOR SELECT USING (
    auth.uid()::text = patient_id::text OR 
    auth.uid()::text = psychologist_id::text
  );

CREATE POLICY "Users can insert own appointments" ON appointments
  FOR INSERT WITH CHECK (
    auth.uid()::text = patient_id::text OR 
    auth.uid()::text = psychologist_id::text
  );

CREATE POLICY "Users can update own appointments" ON appointments
  FOR UPDATE USING (
    auth.uid()::text = patient_id::text OR 
    auth.uid()::text = psychologist_id::text
  );

-- Policy per consultation_feedback
CREATE POLICY "Users can read own feedback" ON consultation_feedback
  FOR SELECT USING (
    auth.uid()::text = patient_id::text OR 
    auth.uid()::text = psychologist_id::text
  );

CREATE POLICY "Patients can insert feedback" ON consultation_feedback
  FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Policy per psychologist_availability
CREATE POLICY "Psychologists can manage own availability" ON psychologist_availability
  FOR ALL USING (auth.uid()::text = psychologist_id::text);

CREATE POLICY "Users can read psychologist availability" ON psychologist_availability
  FOR SELECT USING (true); -- Tutti possono vedere le disponibilità

-- Policy per messages
CREATE POLICY "Users can read own messages" ON messages
  FOR SELECT USING (
    auth.uid()::text = sender_id::text OR 
    auth.uid()::text = receiver_id::text
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid()::text = sender_id::text);

CREATE POLICY "Users can update own messages" ON messages
  FOR UPDATE USING (
    auth.uid()::text = sender_id::text OR 
    auth.uid()::text = receiver_id::text
  );

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_user_id ON questionnaire_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_therapy_type ON questionnaire_responses(therapy_type);
CREATE INDEX IF NOT EXISTS idx_therapy_matches_patient_id ON therapy_matches(patient_id);
CREATE INDEX IF NOT EXISTS idx_therapy_matches_psychologist_id ON therapy_matches(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_psychologist_id ON appointments(psychologist_id);
CREATE INDEX IF NOT EXISTS idx_appointments_datetime ON appointments(appointment_datetime);
CREATE INDEX IF NOT EXISTS idx_messages_sender_receiver ON messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Funzioni di utilità

-- Funzione per aggiornare updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger per aggiornare updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_therapy_matches_updated_at BEFORE UPDATE ON therapy_matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Funzione per calcolare il rating medio di uno psicologo
CREATE OR REPLACE FUNCTION calculate_psychologist_rating(psychologist_uuid uuid)
RETURNS TABLE(avg_rating decimal, total_reviews integer) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(AVG(rating::decimal), 0.0) as avg_rating,
    COUNT(*)::integer as total_reviews
  FROM consultation_feedback 
  WHERE psychologist_id = psychologist_uuid;
END;
$$ LANGUAGE plpgsql;

-- Vista per statistiche utenti
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.role,
  up.has_completed_questionnaire,
  up.matching_status,
  COUNT(DISTINCT qr.id) as questionnaires_completed,
  COUNT(DISTINCT tm.id) as total_matches,
  COUNT(DISTINCT a.id) as total_appointments,
  COUNT(DISTINCT cf.id) as feedback_given
FROM users u
LEFT JOIN user_profiles up ON u.id = up.user_id
LEFT JOIN questionnaire_responses qr ON u.id = qr.user_id
LEFT JOIN therapy_matches tm ON u.id = tm.patient_id
LEFT JOIN appointments a ON u.id = a.patient_id
LEFT JOIN consultation_feedback cf ON u.id = cf.patient_id
GROUP BY u.id, u.email, u.first_name, u.last_name, u.role, up.has_completed_questionnaire, up.matching_status;