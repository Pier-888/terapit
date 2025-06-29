import React from 'react';
import { Calendar, MessageCircle, Users, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { mockAppointments } from '../mock/data';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const PsychologistDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const todayAppointments = mockAppointments.filter(
    apt => format(apt.dateTime, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const stats = {
    todayAppointments: todayAppointments.length,
    totalPatients: 24,
    monthlyRevenue: 7850,
    avgRating: 4.9
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Buongiorno, {user?.firstName}!
        </h1>
        <p className="text-neutral-600">
          Hai {stats.todayAppointments} appuntamenti programmati per oggi.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-neutral-900">{stats.todayAppointments}</p>
              <p className="text-neutral-600 text-sm">Sessioni di Oggi</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-neutral-900">{stats.totalPatients}</p>
              <p className="text-neutral-600 text-sm">Pazienti Attivi</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-neutral-900">€{stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-neutral-600 text-sm">Questo Mese</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-neutral-900">{stats.avgRating}</p>
              <p className="text-neutral-600 text-sm">Valutazione Media</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Button
          className="h-16 flex-col"
          onClick={() => navigate('/appointments')}
        >
          <Calendar className="w-5 h-5 mb-1" />
          Calendario
        </Button>
        <Button
          variant="outline"
          className="h-16 flex-col"
          onClick={() => navigate('/patients')}
        >
          <Users className="w-5 h-5 mb-1" />
          Pazienti
        </Button>
        <Button
          variant="outline"
          className="h-16 flex-col"
          onClick={() => navigate('/messages')}
        >
          <MessageCircle className="w-5 h-5 mb-1" />
          Messaggi
        </Button>
        <Button
          variant="outline"
          className="h-16 flex-col"
          onClick={() => navigate('/profile')}
        >
          <Users className="w-5 h-5 mb-1" />
          Profilo
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Schedule */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-neutral-900">
                Programma di Oggi
              </h2>
              <span className="text-sm text-neutral-600">
                {format(new Date(), 'EEEE, d MMMM yyyy', { locale: it })}
              </span>
            </div>
            
            {todayAppointments.length > 0 ? (
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center p-4 bg-neutral-50 rounded-lg">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-900">
                        Sessione Paziente
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {format(appointment.dateTime, 'HH:mm')} - {format(new Date(appointment.dateTime.getTime() + appointment.duration * 60000), 'HH:mm')}
                      </p>
                      <p className="text-sm text-neutral-500 capitalize">
                        Sessione {appointment.type === 'initial' ? 'iniziale' : 'di follow-up'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-neutral-900">
                        €{appointment.price}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {appointment.duration} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600">Nessun appuntamento programmato per oggi</p>
              </div>
            )}
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Attività Recenti
            </h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900">Nuovo paziente registrato</p>
                  <p className="text-xs text-neutral-600">2 ore fa</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900">Sessione completata con Giovanni D.</p>
                  <p className="text-xs text-neutral-600">Ieri alle 15:00</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-900">Nuovo messaggio da paziente</p>
                  <p className="text-xs text-neutral-600">Ieri alle 10:30</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Prossimi della Settimana
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Domani</span>
                <span className="text-sm font-medium text-neutral-900">4 sessioni</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Mercoledì</span>
                <span className="text-sm font-medium text-neutral-900">6 sessioni</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Giovedì</span>
                <span className="text-sm font-medium text-neutral-900">3 sessioni</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-600">Venerdì</span>
                <span className="text-sm font-medium text-neutral-900">5 sessioni</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate('/calendar')}
            >
              Visualizza Calendario Completo
            </Button>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Questo Mese
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-600">Sessioni Completate</span>
                  <span className="text-sm font-medium">67/70</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-600">Soddisfazione Pazienti</span>
                  <span className="text-sm font-medium">4.9/5.0</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-600">Tempo di Risposta</span>
                  <span className="text-sm font-medium">{'< 2 ore'}</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Notes */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Note e Promemoria
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Seguire con Sara le strategie di coping
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Preparare materiali per sessione di gruppo
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  Rivedere piano di trattamento con Michele
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
            >
              Aggiungi Nota
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PsychologistDashboard;