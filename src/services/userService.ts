import { supabase } from '../lib/supabase';
import type { DatabaseUser, UserProfile, QuestionnaireResponse } from '../lib/supabase';

export class UserService {
  // Registrazione nuovo utente
  static async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'patient' | 'psychologist';
    questionnaireData?: any;
  }) {
    try {
      console.log('Iniziando registrazione utente:', { email: userData.email, role: userData.role });

      // Validazione input
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        throw new Error('Tutti i campi sono obbligatori');
      }

      if (userData.password.length < 6) {
        throw new Error('La password deve essere di almeno 6 caratteri');
      }

      // 1. Registra l'utente con Supabase Auth
      console.log('🔐 Registrando con Supabase Auth...');
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role
          }
        }
      });

      if (authError) {
        console.error('Errore auth signup:', authError);
        
        // Gestisci errori specifici di Supabase
        if (authError.message.includes('email_address_invalid')) {
          throw new Error('Indirizzo email non valido');
        } else if (authError.message.includes('signup_disabled')) {
          throw new Error('Registrazione temporaneamente disabilitata');
        } else if (authError.message.includes('email_address_not_authorized')) {
          throw new Error('Email non autorizzata per la registrazione');
        } else if (authError.message.includes('weak_password')) {
          throw new Error('Password troppo debole. Usa almeno 6 caratteri');
        } else if (authError.message.includes('User already registered')) {
          throw new Error('Un utente con questa email è già registrato');
        }
        
        throw new Error(authError.message);
      }
      
      if (!authData.user) {
        throw new Error('Errore nella creazione dell\'utente');
      }

      console.log('✅ Utente auth creato:', authData.user.id);

      // Se la conferma email è richiesta ma non ancora confermata
      if (!authData.user.email_confirmed_at && authData.user.confirmation_sent_at) {
        console.log('📧 Email di conferma inviata');
        // Per ora procediamo comunque, ma in produzione potresti voler gestire diversamente
      }

      // 2. Crea il record nella tabella users con retry
      console.log('📝 Creando record utente...');
      
      let userRecord;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          const { data, error: userError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: userData.email,
              first_name: userData.firstName,
              last_name: userData.lastName,
              role: userData.role
            })
            .select()
            .single();

          if (userError) {
            if (userError.code === '23505') { // Unique violation
              console.log('⚠️ Utente già esistente nel database, recuperando...');
              const { data: existingUser } = await supabase
                .from('users')
                .select('*')
                .eq('id', authData.user.id)
                .single();
              
              if (existingUser) {
                userRecord = existingUser;
                break;
              }
            }
            throw userError;
          }

          userRecord = data;
          break;
        } catch (error: any) {
          retryCount++;
          console.log(`⚠️ Tentativo ${retryCount}/${maxRetries} fallito:`, error.message);
          
          if (retryCount >= maxRetries) {
            throw error;
          }
          
          // Aspetta prima di riprovare
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }

      if (!userRecord) {
        throw new Error('Impossibile creare il record utente');
      }

      console.log('✅ Record utente creato:', userRecord.id);

      // 3. Crea il profilo utente
      console.log('👤 Creando profilo utente...');
      
      const profileData: Partial<UserProfile> = {
        user_id: authData.user.id,
        has_completed_questionnaire: !!userData.questionnaireData,
        matching_status: userData.questionnaireData ? 'matched' : 'pending'
      };

      // Aggiungi dati dalla località se presenti nel questionario
      if (userData.questionnaireData?.responses?.location_city) {
        profileData.location_city = userData.questionnaireData.responses.location_city;
        profileData.location_cap = userData.questionnaireData.responses.location_cap;
      }

      const { data: profileRecord, error: profileError } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single();

      if (profileError) {
        console.error('Errore creazione profilo:', profileError);
        // Non bloccare la registrazione per errori del profilo
        console.log('⚠️ Continuando senza profilo...');
      } else {
        console.log('✅ Profilo utente creato:', profileRecord.id);
      }

      // 4. Salva il questionario se presente
      if (userData.questionnaireData) {
        try {
          console.log('📋 Salvando questionario...');
          await this.saveQuestionnaireResponse({
            user_id: authData.user.id,
            therapy_type: userData.questionnaireData.therapyType,
            responses: userData.questionnaireData.responses,
            session_id: userData.questionnaireData.sessionId
          });
          console.log('✅ Questionario salvato');
        } catch (questionnaireError) {
          console.error('⚠️ Errore salvataggio questionario (non bloccante):', questionnaireError);
        }
      }

      return {
        user: userRecord,
        authUser: authData.user
      };
    } catch (error: any) {
      console.error('❌ Errore nella registrazione:', error);
      
      // Se l'errore è di rete, fornisci un messaggio più chiaro
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Errore di connessione. Verifica la tua connessione internet.');
      }
      
      throw error;
    }
  }

  // Login utente
  static async loginUser(email: string, password: string) {
    try {
      console.log('Tentativo login per:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Errore login:', error);
        
        // Gestisci errori specifici
        if (error.message.includes('email_not_confirmed')) {
          throw new Error('Devi confermare la tua email prima di accedere. Controlla la tua casella di posta.');
        } else if (error.message.includes('invalid_credentials')) {
          throw new Error('Email o password non corretti');
        }
        
        throw error;
      }
      
      if (!data.user) {
        throw new Error('Credenziali non valide');
      }

      console.log('Login riuscito per utente:', data.user.id);

      // Aggiorna last_login
      try {
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);
      } catch (updateError) {
        console.log('⚠️ Errore aggiornamento last_login (non bloccante):', updateError);
      }

      // Recupera i dati completi dell'utente
      const userData = await this.getUserWithProfile(data.user.id);
      
      return {
        user: userData,
        session: data.session
      };
    } catch (error) {
      console.error('Errore nel login:', error);
      throw error;
    }
  }

  // Recupera utente con profilo
  static async getUserWithProfile(userId: string) {
    try {
      console.log('Recuperando dati utente:', userId);

      const { data: user, error: userError } = await supabase
        .from('users')
        .select(`
          *,
          user_profiles (*)
        `)
        .eq('id', userId)
        .maybeSingle();

      if (userError) {
        console.error('Errore recupero utente:', userError);
        throw userError;
      }

      if (!user) {
        console.log('Utente non trovato nel database:', userId);
        return null;
      }

      console.log('Dati utente recuperati:', user);
      return user;
    } catch (error) {
      console.error('Errore nel recupero utente:', error);
      throw error;
    }
  }

  // Salva risposta questionario
  static async saveQuestionnaireResponse(data: {
    user_id?: string;
    session_id?: string;
    therapy_type: 'individual' | 'couple' | 'child';
    responses: Record<string, any>;
  }) {
    try {
      console.log('Salvando questionario:', data);

      const { data: savedQuestionnaire, error } = await supabase
        .from('questionnaire_responses')
        .insert({
          user_id: data.user_id,
          session_id: data.session_id,
          therapy_type: data.therapy_type,
          responses: data.responses,
          questionnaire_version: '1.0'
        })
        .select()
        .single();

      if (error) {
        console.error('Errore salvataggio questionario:', error);
        throw error;
      }

      console.log('Questionario salvato:', savedQuestionnaire);
      return savedQuestionnaire;
    } catch (error) {
      console.error('Errore nel salvataggio questionario:', error);
      throw error;
    }
  }

  // Aggiorna profilo utente
  static async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Errore nell\'aggiornamento profilo:', error);
      throw error;
    }
  }

  // Recupera questionari dell'utente
  static async getUserQuestionnaires(userId: string) {
    try {
      const { data, error } = await supabase
        .from('questionnaire_responses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Errore nel recupero questionari:', error);
      throw error;
    }
  }

  // Recupera statistiche utente
  static async getUserStats(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Errore nel recupero statistiche:', error);
      throw error;
    }
  }

  // Logout
  static async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Errore nel logout:', error);
      throw error;
    }
  }

  // Recupera sessione corrente
  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Errore nel recupero sessione:', error);
      throw error;
    }
  }

  // Ascolta cambiamenti di autenticazione
  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Richiedi reset password
  static async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Errore reset password:', error);
      throw error;
    }
  }

  // Conferma email manualmente (se necessario)
  static async confirmEmail(token: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Errore conferma email:', error);
      throw error;
    }
  }
}