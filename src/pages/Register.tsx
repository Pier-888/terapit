import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, UserCheck, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'psychologist',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [hasQuestionnaire, setHasQuestionnaire] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Controlla se c'è un questionario completato
    const questionnaireData = localStorage.getItem('mindconnect_questionnaire');
    if (questionnaireData) {
      setHasQuestionnaire(true);
      // Se arriva dalla landing page senza questionario, forza il ruolo paziente
      setFormData(prev => ({ ...prev, role: 'patient' }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleSelect = (role: 'patient' | 'psychologist') => {
    setFormData(prev => ({ ...prev, role }));
    setStep(2);
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Inserisci il tuo nome completo');
      return false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Inserisci un indirizzo email valido');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Le password non corrispondono');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('Accetta i Termini di Servizio e la Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('🚀 Iniziando registrazione dal form...');
      await register(formData);
      
      // Se c'è un questionario completato, naviga ai risultati del matching
      const questionnaireData = localStorage.getItem('mindconnect_questionnaire');
      if (questionnaireData) {
        console.log('📋 Navigando ai risultati del matching...');
        navigate('/matching-results');
      } else {
        console.log('📊 Navigando alla dashboard...');
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('❌ Errore registrazione dal form:', err);
      setError(err.message || 'Registrazione fallita. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  // Se ha completato il questionario, salta la selezione del ruolo
  if (hasQuestionnaire && step === 1) {
    setStep(2);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900">
            {hasQuestionnaire ? 'Completa la Registrazione' : 'Unisciti a MindConnect'}
          </h2>
          <p className="mt-2 text-neutral-600">
            {hasQuestionnaire 
              ? 'Crea il tuo account per ricevere i tuoi match personalizzati'
              : step === 1 ? 'Scegli il tipo di account' : 'Crea il tuo account'
            }
          </p>
        </div>

        <Card className="p-8">
          {hasQuestionnaire && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-600 font-medium mb-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                Questionario Completato!
              </div>
              <p className="text-green-700 text-sm">
                Ottimo! Hai completato il questionario. Ora crea il tuo account per ricevere i tuoi 3 match personalizzati.
              </p>
            </div>
          )}

          {!hasQuestionnaire && step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 text-center mb-6">
                Sono un...
              </h3>
              
              <button
                onClick={() => handleRoleSelect('patient')}
                className="w-full p-6 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <User className="w-12 h-12 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Paziente</h4>
                <p className="text-neutral-600 text-sm">
                  Cerco supporto per la salute mentale e servizi di terapia
                </p>
              </button>

              <button
                onClick={() => handleRoleSelect('psychologist')}
                className="w-full p-6 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
              >
                <UserCheck className="w-12 h-12 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Psicologo</h4>
                <p className="text-neutral-600 text-sm">
                  Professionista della salute mentale qualificato che offre servizi di terapia
                </p>
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                  Hai già un account?{' '}
                  <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
                    Accedi qui
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {!hasQuestionnaire && (
                <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                  <p className="text-sm text-primary-700">
                    Creando account come: <strong className="capitalize">{formData.role === 'patient' ? 'Paziente' : 'Psicologo'}</strong>
                    <button
                      onClick={() => setStep(1)}
                      className="ml-2 text-primary-600 hover:text-primary-800 underline"
                    >
                      Cambia
                    </button>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                      Nome
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                      Cognome
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Cognome"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Indirizzo Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Inserisci la tua email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Crea password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                    Conferma Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Conferma password"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 text-sm text-neutral-600">
                    Accetto i{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-700">Termini di Servizio</Link>
                    {' '}e la{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creazione account...' : hasQuestionnaire ? 'Crea Account e Ricevi i Match' : 'Crea Account'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                  Hai già un account?{' '}
                  <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
                    Accedi qui
                  </Link>
                </p>
              </div>
            </>
          )}
        </Card>

        {hasQuestionnaire && (
          <Card className="p-4 bg-primary-50 border-primary-200">
            <p className="text-sm text-primary-700 text-center">
              🎯 Dopo la registrazione riceverai immediatamente i tuoi 3 match personalizzati e potrai prenotare le consulenze gratuite
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Register;