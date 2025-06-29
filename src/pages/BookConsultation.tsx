import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { mockPsychologists } from '../mock/data';
import { Psychologist } from '../types';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';
import { it } from 'date-fns/locale';

const BookConsultation: React.FC = () => {
  const { psychologistId } = useParams<{ psychologistId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [psychologist, setPsychologist] = useState<Psychologist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    const foundPsychologist = mockPsychologists.find(p => p.id === psychologistId);
    setPsychologist(foundPsychologist || null);
  }, [psychologistId]);

  if (!psychologist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            Terapeuta non trovato
          </h2>
          <Button onClick={() => navigate('/matching-results')}>
            Torna ai Risultati
          </Button>
        </div>
      </div>
    );
  }

  // Genera slot temporali disponibili
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  // Genera date disponibili per la settimana corrente
  const getAvailableDates = () => {
    const startDate = addWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), currentWeek);
    const dates = [];
    
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      const dayOfWeek = date.getDay();
      const isAvailable = psychologist.availability.some(av => av.dayOfWeek === dayOfWeek);
      
      if (isAvailable && date >= new Date()) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsBooking(true);
    try {
      // Simula la prenotazione
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Naviga alla conferma
      navigate('/consultation-booked', {
        state: {
          psychologist,
          date: selectedDate,
          time: selectedTime
        }
      });
    } catch (error) {
      console.error('Errore nella prenotazione:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const availableDates = getAvailableDates();
  const timeSlots = generateTimeSlots();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/matching-results')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna ai Risultati
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Psychologist Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="text-center mb-4">
                <img
                  src={psychologist.avatar}
                  alt={`${psychologist.firstName} ${psychologist.lastName}`}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  {psychologist.firstName} {psychologist.lastName}
                </h2>
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(psychologist.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-neutral-600">
                    {psychologist.rating}
                  </span>
                </div>
                <div className="flex items-center justify-center text-neutral-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{psychologist.location}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center text-green-600 font-medium mb-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Consulenza Gratuita
                </div>
                <p className="text-green-700 text-sm text-center">
                  30 minuti per conoscervi e valutare la compatibilità
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-neutral-900">Specializzazioni:</h3>
                <div className="flex flex-wrap gap-2">
                  {psychologist.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-6">
                Prenota la Tua Consulenza Gratuita
              </h1>

              {/* Date Selection */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Seleziona una Data
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                      disabled={currentWeek === 0}
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(currentWeek + 1)}
                    >
                      →
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-sm text-neutral-600">
                        {format(date, 'EEE', { locale: it })}
                      </div>
                      <div className="font-semibold text-neutral-900">
                        {format(date, 'd MMM', { locale: it })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Seleziona un Orario
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          selectedTime === time
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        <div className="text-sm font-medium">{time}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-neutral-900 mb-2">
                    Riepilogo Prenotazione
                  </h4>
                  <div className="space-y-2 text-sm text-neutral-700">
                    <div className="flex justify-between">
                      <span>Terapeuta:</span>
                      <span>{psychologist.firstName} {psychologist.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data:</span>
                      <span>{format(selectedDate, 'EEEE, d MMMM yyyy', { locale: it })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orario:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durata:</span>
                      <span>30 minuti</span>
                    </div>
                    <div className="flex justify-between font-semibold text-green-600">
                      <span>Costo:</span>
                      <span>Gratuita</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                isLoading={isBooking}
              >
                {isBooking ? 'Prenotazione in corso...' : 'Conferma Prenotazione'}
              </Button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Riceverai una email di conferma con i dettagli della consulenza e il link per la videochiamata
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;