import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Errore login:', err);
      setError(err.message || 'Email o password non validi. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-neutral-900">Bentornato</h2>
          <p className="mt-2 text-neutral-600">Accedi al tuo account MindConnect</p>
        </div>

        <Card className="p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Indirizzo Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Inserisci la tua password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-neutral-600">Ricordami</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                Password dimenticata?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Accedi
            </Button>
          </form>

          <div className="mt-6 border-t border-neutral-200 pt-6">
            <p className="text-center text-sm text-neutral-600 mb-4">
              Per testare, puoi creare un nuovo account o usare questi dati demo:
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full text-sm"
                onClick={() => handleDemoLogin('test@paziente.com', 'password123')}
              >
                📧 test@paziente.com | 🔑 password123
              </Button>
              <Button
                variant="outline"
                className="w-full text-sm"
                onClick={() => handleDemoLogin('dr@psicologo.com', 'password123')}
              >
                📧 dr@psicologo.com | 🔑 password123
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Non hai un account?{' '}
              <Link 
                to="/therapy-type-selection" 
                className="font-medium text-primary-600 hover:text-primary-700 block mt-2"
              >
                Compila il questionario ed entra in MindConnect
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;