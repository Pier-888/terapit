import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserService } from '../services/userService';
import { MatchingService } from '../services/matchingService';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'psychologist';
  avatar?: string;
  createdAt: Date;
  hasCompletedQuestionnaire?: boolean;
  matchingStatus?: 'pending' | 'matched' | 'consultations_completed' | 'therapy_started';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere utilizzato all\'interno di un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Converte l'utente Supabase nel nostro formato
  const convertSupabaseUser = (supabaseUser: any): User => {
    const profile = supabaseUser.user_profiles?.[0];
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      firstName: supabaseUser.first_name,
      lastName: supabaseUser.last_name,
      role: supabaseUser.role,
      avatar: supabaseUser.avatar_url,
      createdAt: new Date(supabaseUser.created_at),
      hasCompletedQuestionnaire: profile?.has_completed_questionnaire || false,
      matchingStatus: profile?.matching_status || 'pending'
    };
  };

  useEffect(() => {
    // Se Supabase non è configurato, usa dati mock
    if (!isSupabaseConfigured) {
      console.log('🔧 Supabase non configurato, usando dati mock');
      setIsLoading(false);
      return;
    }

    // Controlla la sessione esistente
    const checkSession = async () => {
      try {
        console.log('🔍 Controllando sessione esistente...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log('✅ Sessione trovata:', session.user.email);
          // Recupera i dati completi dell'utente
          const userData = await UserService.getUserWithProfile(session.user.id);
          if (userData) {
            setUser(convertSupabaseUser(userData));
          }
        } else {
          console.log('ℹ️ Nessuna sessione esistente');
        }
      } catch (error) {
        console.error('❌ Errore nel controllo sessione:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            console.log('👤 Utente autenticato, recuperando dati...');
            const userData = await UserService.getUserWithProfile(session.user.id);
            if (userData) {
              console.log('✅ Dati utente recuperati');
              setUser(convertSupabaseUser(userData));
            } else {
              console.log('⚠️ Dati utente non trovati nel database');
            }
          } catch (error) {
            console.error('❌ Errore nel recupero dati utente:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 Utente disconnesso');
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Login mock per demo
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          email,
          firstName: email.includes('dr.') ? 'Dr.ssa Sarah' : 'Giovanni',
          lastName: email.includes('dr.') ? 'Johnson' : 'Rossi',
          role: email.includes('dr.') ? 'psychologist' : 'patient',
          avatar: `https://images.pexels.com/photos/${email.includes('dr.') ? '5327580' : '2379004'}/pexels-photo-${email.includes('dr.') ? '5327580' : '2379004'}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1`,
          createdAt: new Date(),
          hasCompletedQuestionnaire: true,
          matchingStatus: 'matched'
        };

        setUser(mockUser);
        localStorage.setItem('mindconnect_user', JSON.stringify(mockUser));
      } catch (error) {
        throw new Error('Autenticazione fallita');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    try {
      console.log('🔐 Tentativo login per:', email);
      const result = await UserService.loginUser(email, password);
      setUser(convertSupabaseUser(result.user));
      console.log('✅ Login completato');
    } catch (error: any) {
      console.error('❌ Errore login:', error);
      throw new Error(error.message || 'Errore durante il login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    if (!isSupabaseConfigured) {
      // Registrazione mock per demo
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const questionnaireData = localStorage.getItem('mindconnect_questionnaire');
        
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email!,
          firstName: userData.firstName!,
          lastName: userData.lastName!,
          role: userData.role!,
          createdAt: new Date(),
          hasCompletedQuestionnaire: !!questionnaireData,
          matchingStatus: questionnaireData ? 'matched' : 'pending'
        };

        setUser(newUser);
        localStorage.setItem('mindconnect_user', JSON.stringify(newUser));
        
        if (questionnaireData) {
          localStorage.removeItem('mindconnect_questionnaire');
          localStorage.removeItem('mindconnect_therapy_type');
        }
      } catch (error) {
        throw new Error('Registrazione fallita');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    try {
      console.log('📝 Iniziando registrazione per:', userData.email);
      
      // Controlla se c'è un questionario completato
      const questionnaireData = localStorage.getItem('mindconnect_questionnaire');
      const parsedQuestionnaire = questionnaireData ? JSON.parse(questionnaireData) : null;

      console.log('📋 Questionario trovato:', !!parsedQuestionnaire);

      const registrationData = {
        email: userData.email!,
        password: userData.password,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        role: userData.role!,
        questionnaireData: parsedQuestionnaire
      };

      console.log('🚀 Chiamando UserService.registerUser...');
      
      // Usa un timeout più lungo per la registrazione
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: La registrazione sta impiegando troppo tempo')), 30000);
      });

      const registrationPromise = UserService.registerUser(registrationData);
      
      const result = await Promise.race([registrationPromise, timeoutPromise]) as any;
      
      console.log('✅ Registrazione completata:', result.user.id);
      
      // Rimuovi il questionario dal localStorage
      if (questionnaireData) {
        localStorage.removeItem('mindconnect_questionnaire');
        localStorage.removeItem('mindconnect_therapy_type');
        console.log('🗑️ Questionario rimosso dal localStorage');
        
        // Se c'è un questionario, genera i match in background
        if (parsedQuestionnaire) {
          try {
            console.log('🎯 Generando match in background...');
            // Non aspettare i match per completare la registrazione
            UserService.getUserQuestionnaires(result.user.id).then(questionnaires => {
              if (questionnaires && questionnaires.length > 0) {
                const latestQuestionnaire = questionnaires[0];
                return MatchingService.generateMatches(result.user.id, latestQuestionnaire.id);
              }
            }).then(() => {
              console.log('✅ Match generati in background');
            }).catch(matchError => {
              console.error('⚠️ Errore nella generazione dei match (non bloccante):', matchError);
            });
          } catch (matchError) {
            console.error('⚠️ Errore nella generazione dei match:', matchError);
          }
        }
      }
      
    } catch (error: any) {
      console.error('❌ Errore registrazione:', error);
      
      // Gestisci errori specifici
      if (error.message?.includes('fetch')) {
        throw new Error('Errore di connessione. Verifica la tua connessione internet e riprova.');
      } else if (error.message?.includes('timeout') || error.message?.includes('Timeout')) {
        throw new Error('La registrazione sta impiegando troppo tempo. Riprova tra qualche minuto.');
      } else if (error.message?.includes('email')) {
        throw new Error('Problema con l\'indirizzo email. Verifica che sia corretto.');
      } else if (error.message?.includes('password')) {
        throw new Error('Password non valida. Usa almeno 6 caratteri.');
      }
      
      throw new Error(error.message || 'Errore durante la registrazione. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (!isSupabaseConfigured) {
      // Logout mock
      setUser(null);
      localStorage.removeItem('mindconnect_user');
      localStorage.removeItem('mindconnect_questionnaire');
      localStorage.removeItem('mindconnect_therapy_type');
      return;
    }

    try {
      console.log('👋 Logout...');
      await UserService.logout();
      setUser(null);
      localStorage.removeItem('mindconnect_questionnaire');
      localStorage.removeItem('mindconnect_therapy_type');
      console.log('✅ Logout completato');
    } catch (error) {
      console.error('❌ Errore logout:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    if (!isSupabaseConfigured) {
      // Update mock
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('mindconnect_user', JSON.stringify(updatedUser));
      return;
    }
    
    try {
      await UserService.updateUserProfile(user.id, updates);
      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Errore aggiornamento profilo:', error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};