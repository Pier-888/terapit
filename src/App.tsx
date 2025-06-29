import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import DebugPanel from './components/DebugPanel';
import SupabaseSetupBanner from './components/SupabaseSetupBanner';
import Landing from './pages/Landing';
import WhyMindConnect from './pages/WhyMindConnect';
import TherapyTypeSelection from './pages/TherapyTypeSelection';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Questionnaire from './pages/Questionnaire';
import MatchingResults from './pages/MatchingResults';
import BookConsultation from './pages/BookConsultation';
import ConsultationBooked from './pages/ConsultationBooked';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

function AppContent() {
  return (
    <Router>
      {/* Banner di configurazione Supabase */}
      <SupabaseSetupBanner />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Layout>
            <Landing />
          </Layout>
        } />
        
        <Route path="/why-mindconnect" element={
          <Layout>
            <WhyMindConnect />
          </Layout>
        } />
        
        {/* Therapy Type Selection - accessibile senza autenticazione */}
        <Route path="/therapy-type-selection" element={
          <Layout showHeader={false}>
            <TherapyTypeSelection />
          </Layout>
        } />
        
        {/* Questionnaire - accessibile senza autenticazione */}
        <Route path="/questionnaire" element={
          <Layout showHeader={false}>
            <Questionnaire />
          </Layout>
        } />
        
        <Route path="/login" element={
          <PublicRoute>
            <Layout showHeader={false}>
              <Login />
            </Layout>
          </PublicRoute>
        } />
        
        <Route path="/register" element={
          <PublicRoute>
            <Layout showHeader={false}>
              <Register />
            </Layout>
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/matching-results" element={
          <ProtectedRoute>
            <Layout>
              <MatchingResults />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/book-consultation/:psychologistId" element={
          <ProtectedRoute>
            <Layout>
              <BookConsultation />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/consultation-booked" element={
          <ProtectedRoute>
            <Layout>
              <ConsultationBooked />
            </Layout>
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* Debug Panel - solo in development */}
      {import.meta.env.DEV && <DebugPanel />}
    </Router>
  );
}

function App() {
  try {
    return (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    );
  } catch (error) {
    console.error('App error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Errore nell'applicazione</h1>
          <p className="text-red-700">Si è verificato un errore. Ricarica la pagina.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Ricarica
          </button>
        </div>
      </div>
    );
  }
}

export default App;