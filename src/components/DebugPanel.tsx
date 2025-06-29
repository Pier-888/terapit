import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import Button from './Button';
import Card from './Card';

const DebugPanel: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const testConnection = async () => {
    try {
      addLog('🔍 Testando connessione Supabase...');
      addLog(`📍 URL: ${import.meta.env.VITE_SUPABASE_URL}`);
      addLog(`🔑 Key: ${import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20)}...`);
      addLog(`⚙️ Configurato: ${isSupabaseConfigured ? 'SÌ' : 'NO'}`);
      
      if (!isSupabaseConfigured) {
        addLog('❌ SUPABASE NON CONFIGURATO!');
        addLog('📋 Clicca "Connect to Supabase" in alto a destra');
        return;
      }
      
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      if (error) {
        addLog(`❌ Errore connessione: ${error.message}`);
        addLog(`📋 Dettagli: ${JSON.stringify(error, null, 2)}`);
      } else {
        addLog('✅ Connessione Supabase OK');
      }
    } catch (err: any) {
      addLog(`❌ Errore: ${err.message}`);
    }
  };

  const testAuth = async () => {
    try {
      addLog('🔍 Testando autenticazione...');
      
      if (!isSupabaseConfigured) {
        addLog('❌ Supabase non configurato');
        return;
      }
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        addLog(`❌ Errore auth: ${error.message}`);
      } else if (session) {
        addLog(`✅ Utente autenticato: ${session.user.email}`);
        addLog(`📧 Email confermata: ${session.user.email_confirmed_at ? 'Sì' : 'No'}`);
      } else {
        addLog('ℹ️ Nessun utente autenticato');
      }
    } catch (err: any) {
      addLog(`❌ Errore: ${err.message}`);
    }
  };

  const testRegistration = async () => {
    try {
      addLog('🔍 Testando registrazione veloce...');
      
      if (!isSupabaseConfigured) {
        addLog('❌ Supabase non configurato');
        addLog('✅ Modalità DEMO attiva - registrazione mock funzionante');
        return;
      }
      
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = 'password123';
      
      addLog(`📧 Email test: ${testEmail}`);
      addLog(`🔑 Password: ${testPassword}`);
      
      // Test con timeout più breve
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout dopo 10 secondi')), 10000);
      });

      const registrationPromise = supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            first_name: 'Test',
            last_name: 'User',
            role: 'patient'
          }
        }
      });

      const { data, error } = await Promise.race([registrationPromise, timeoutPromise]) as any;
      
      if (error) {
        addLog(`❌ Errore registrazione: ${error.message}`);
        addLog(`📋 Dettagli: ${JSON.stringify(error, null, 2)}`);
      } else {
        addLog(`✅ Registrazione test OK: ${data.user?.id}`);
        addLog(`📧 Email confirmed: ${data.user?.email_confirmed_at ? 'Sì' : 'No'}`);
        addLog(`📨 Confirmation sent: ${data.user?.confirmation_sent_at ? 'Sì' : 'No'}`);
      }
    } catch (err: any) {
      if (err.message.includes('Timeout')) {
        addLog(`⏱️ Timeout: ${err.message}`);
        addLog('💡 La registrazione potrebbe essere lenta, ma non necessariamente fallita');
      } else {
        addLog(`❌ Errore: ${err.message}`);
      }
    }
  };

  const testDatabase = async () => {
    try {
      addLog('🔍 Testando accesso database...');
      
      if (!isSupabaseConfigured) {
        addLog('❌ Supabase non configurato');
        return;
      }
      
      // Test tabella users
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('*')
        .limit(5);
      
      if (usersError) {
        addLog(`❌ Errore tabella users: ${usersError.message}`);
      } else {
        addLog(`✅ Tabella users OK (${users?.length || 0} record)`);
      }
      
      // Test tabella user_profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*')
        .limit(5);
      
      if (profilesError) {
        addLog(`❌ Errore tabella user_profiles: ${profilesError.message}`);
      } else {
        addLog(`✅ Tabella user_profiles OK (${profiles?.length || 0} record)`);
      }
      
    } catch (err: any) {
      addLog(`❌ Errore: ${err.message}`);
    }
  };

  const testNetworkSpeed = async () => {
    try {
      addLog('🌐 Testando velocità di rete...');
      
      const startTime = Date.now();
      
      // Test con una richiesta semplice
      const response = await fetch('https://httpbin.org/json');
      const endTime = Date.now();
      
      const duration = endTime - startTime;
      
      if (response.ok) {
        addLog(`✅ Rete OK - Latenza: ${duration}ms`);
        if (duration > 5000) {
          addLog('⚠️ Connessione lenta - potrebbe causare timeout');
        }
      } else {
        addLog(`❌ Problema di rete: ${response.status}`);
      }
    } catch (err: any) {
      addLog(`❌ Errore rete: ${err.message}`);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-red-500 text-white border-red-500 hover:bg-red-600 animate-pulse"
        >
          🚨 Debug
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-neutral-900">Debug Panel</h3>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
          >
            ✕
          </Button>
        </div>
        
        {!isSupabaseConfigured && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-red-800 text-sm">
              <div className="font-semibold mb-2">🚨 PROBLEMA PRINCIPALE</div>
              <div className="mb-2">
                <strong>Supabase NON è configurato!</strong>
              </div>
              <div className="text-xs space-y-1">
                <div>1. Clicca "Connect to Supabase" in alto a destra</div>
                <div>2. Inserisci URL e Anon Key del tuo progetto</div>
                <div>3. Ricarica la pagina</div>
              </div>
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                <strong>Attualmente:</strong> App in modalità DEMO con dati mock
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          <Button onClick={testConnection} size="sm" className="w-full">
            Test Connessione
          </Button>
          <Button onClick={testAuth} size="sm" className="w-full">
            Test Auth
          </Button>
          <Button onClick={testDatabase} size="sm" className="w-full">
            Test Database
          </Button>
          <Button onClick={testRegistration} size="sm" className="w-full">
            Test Registrazione
          </Button>
          <Button onClick={testNetworkSpeed} size="sm" className="w-full">
            Test Velocità Rete
          </Button>
          <Button onClick={clearLogs} variant="outline" size="sm" className="w-full">
            Pulisci Log
          </Button>
        </div>
        
        <div className="bg-neutral-900 text-green-400 p-3 rounded text-xs max-h-64 overflow-y-auto font-mono">
          {logs.length === 0 ? (
            <div className="text-neutral-500">Nessun log...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1 break-words">
                {log}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default DebugPanel;