import React from 'react';
import { useAuth } from '../context/AuthContext';
import PatientDashboard from './PatientDashboard';
import PsychologistDashboard from './PsychologistDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {user.role === 'patient' ? <PatientDashboard /> : <PsychologistDashboard />}
    </div>
  );
};

export default Dashboard;