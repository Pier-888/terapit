import React from 'react';
import { Calendar, MessageCircle, User, Clock, Star, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { mockAppointments, mockPsychologists } from '../mock/data';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Simula lo stato del paziente
  const hasCompletedQuestionnaire = user?.hasCompletedQuestionnaire || false;
  const matchingStatus = user?.matchingStatus || 'pending';

  const upcomingAppointments = mockAppointments.filter(
    apt => apt.status === 'scheduled' && apt.dateTime > new Date()
  );

  const consultationsCompleted = 1; // Simulato
  const totalConsultations = 3;

  const renderWelcomeSection = () => {
    if (!hasCompletedQuestionnaire) {
      return (
        <Card className="p-6 bg-primary-50 border-primary-200 mb-8">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Inizia il Tuo Percorso
              </h3>
              <p className="text-primary-700 mb-4">
                Scegli il tipo di terapia e completa il questionario di valutazione per ricevere i tuoi 3 match personalizzati e le consulenze gratuite.
              </p>
              <Button onClick={() => navigate('/therapy-type-selection')}>
                Inizia Questionario
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    if (matchingStatus === 'matched') {
      return (
        <Card className="p-6 bg-green-50 border-green-200 mb-8">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                I Tuoi Match Sono Pronti!
              </h3>
              <p className="text-green-700 mb-4">
                Abbiamo trovato 3 terapeuti perfetti per te. Prenota le tue consulenze gratuite per conoscerli.
              </p>
              <Button onClick={() => navigate('/matching-results')}>
                Visualizza i Tuoi Match
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-6 bg-sand-50 border-sand-200 mb-8">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-sand-100 rounded-full flex items-center justify-center mr-4">
            <Calendar className="w-6 h-6 text-sand-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-sand-900 mb-2">
              Consulenze in Corso
            </h3>
            <p className="text-sand-700 mb-4">
              Hai completato {consultationsCompleted} di {totalConsultations} consulenze gratuite. 
              Continua a conoscere i tuoi terapeuti per fare la scelta migliore.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/matching-results')}>
                Prenota Prossima Consulenza
              </Button>
              <Button variant="outline" onClick={() => navigate('/consultations-feedback')}>
                Lascia Feedback
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Bentornato, {user?.firstName}!
        </h1>
        <p className="text-neutral-600">
          Il tuo percorso di salute mentale continua qui. Facciamo in modo che oggi conti.
        </p>
      </div>

      {/* Status-based Welcome Card */}
      {renderWelcomeSection()}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Button
          className="h-20 flex-col"
          onClick={() => navigate(hasCompletedQuestionnaire ? '/matching-results' : '/therapy-type-selection')}
        >
          <FileText className="w-6 h-6 mb-1" />
          {hasCompletedQuestionnaire ? 'I Miei Match' : 'Questionario'}
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col"
          onClick={() => navigate('/appointments')}
        >
          <Calendar className="w-6 h-6 mb-1" />
          Appuntamenti
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col"
          onClick={() => navigate('/messages')}
        >
          <MessageCircle className="w-6 h-6 mb-1" />
          Messaggi
        </Button>
        <Button
          variant="outline"
          className="h-20 flex-col"
          onClick={() => navigate('/profile')}
        >
          <User className="w-6 h-6 mb-1" />
          Il Mio Profilo
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Overview */}
          {hasCompletedQuestionnaire && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Il Tuo Percorso
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="font-medium text-green-900">Questionario Completato</span>
                  </div>
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-primary-600 mr-3" />
                    <span className="font-medium text-primary-900">
                      Consulenze Gratuite ({consultationsCompleted}/{totalConsultations})
                    </span>
                  </div>
                  <div className="w-20 bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(consultationsCompleted / totalConsultations) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg">
                  <div className="flex items-center">
                    <User className="w-6 h-6 text-neutral-600 mr-3" />
                    <span className="font-medium text-neutral-900">Scelta del Terapeuta</span>
                  </div>
                  <span className="text-neutral-500 text-sm">In attesa</span>
                </div>
              </div>
            </Card>
          )}

          {/* Upcoming Appointments */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-neutral-900">
                Prossimi Appuntamenti
              </h2>
              <Button
                variant="ghost"
                onClick={() => navigate('/appointments')}
              >
                Vedi Tutti
              </Button>
            </div>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 3).map((appointment) => {
                  const therapist = mockPsychologists.find(p => p.id === appointment.psychologistId);
                  return (
                    <div key={appointment.id} className="flex items-center p-4 bg-neutral-50 rounded-lg">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <Calendar className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900">
                          {therapist?.firstName} {therapist?.lastName}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {format(appointment.dateTime, 'EEEE, d MMMM yyyy', { locale: it })} alle{' '}
                          {format(appointment.dateTime, 'HH:mm')}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {appointment.type === 'consultation' ? 'Consulenza Gratuita' : 
                           appointment.type === 'therapy' ? 'Sessione di Terapia' : 'Sessione di Follow-up'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-900">
                          {appointment.isFreeConsultation ? 'Gratuita' : `€${appointment.price}`}
                        </p>
                        <div className="flex items-center text-neutral-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{appointment.duration}min</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 mb-4">Nessun appuntamento in programma</p>
                <Button onClick={() => navigate(hasCompletedQuestionnaire ? '/matching-results' : '/therapy-type-selection')}>
                  {hasCompletedQuestionnaire ? 'Prenota Consulenza' : 'Inizia Questionario'}
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Process Guide */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Come Funziona
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">Tipo di Terapia</h4>
                  <p className="text-sm text-neutral-600">
                    Scegli tra individuale, coppia o infantile
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">Questionario</h4>
                  <p className="text-sm text-neutral-600">
                    Completa la valutazione per ricevere i tuoi match
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">3 Consulenze Gratuite</h4>
                  <p className="text-sm text-neutral-600">
                    Conosci i terapeuti selezionati per te
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">Scegli e Inizia</h4>
                  <p className="text-sm text-neutral-600">
                    Seleziona il terapeuta e inizia il percorso
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Consiglio per la Salute Mentale
            </h3>
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-primary-800 text-sm mb-2 font-medium">
                Preparati alle Consulenze
              </p>
              <p className="text-primary-700 text-sm">
                Pensa a cosa vorresti sapere sui terapeuti e alle domande che potresti fare durante le consulenze gratuite.
              </p>
            </div>
          </Card>

          {/* Emergency Resources */}
          <Card className="p-6 bg-red-50 border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Hai Bisogno di Aiuto Immediato?
            </h3>
            <p className="text-red-700 text-sm mb-4">
              Se hai pensieri di autolesionismo o suicidio, contatta immediatamente i servizi di emergenza.
            </p>
            <div className="space-y-2">
              <p className="text-red-800 font-medium text-sm">
                Telefono Amico: 199 284 284
              </p>
              <p className="text-red-800 font-medium text-sm">
                Emergenze: 112
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;