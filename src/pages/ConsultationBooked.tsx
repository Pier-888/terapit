import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Mail, Video } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const ConsultationBooked: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { psychologist, date, time } = location.state || {};

  if (!psychologist || !date || !time) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            Informazioni prenotazione non trovate
          </h2>
          <Button onClick={() => navigate('/matching-results')}>
            Torna ai Risultati
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Consulenza Prenotata con Successo!
          </h1>
          <p className="text-lg text-neutral-600">
            La tua consulenza gratuita è stata confermata
          </p>
        </div>

        {/* Booking Details */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Dettagli della Consulenza
          </h2>
          
          <div className="space-y-4">
            {/* Psychologist */}
            <div className="flex items-center">
              <img
                src={psychologist.avatar}
                alt={`${psychologist.firstName} ${psychologist.lastName}`}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-medium text-neutral-900">
                  {psychologist.firstName} {psychologist.lastName}
                </h3>
                <div className="flex items-center text-neutral-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{psychologist.location}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm text-neutral-600">Data</p>
                    <p className="font-medium text-neutral-900">
                      {format(new Date(date), 'EEEE, d MMMM yyyy', { locale: it })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary-600 mr-3" />
                  <div>
                    <p className="text-sm text-neutral-600">Orario</p>
                    <p className="font-medium text-neutral-900">{time} (30 minuti)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center text-green-600 font-medium mb-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                Consulenza Gratuita
              </div>
              <p className="text-green-700 text-sm">
                Questa è una delle tue 3 consulenze gratuite per aiutarti a scegliere il terapeuta giusto
              </p>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Cosa Succede Ora?
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <Mail className="w-3 h-3 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900">Email di Conferma</h4>
                <p className="text-sm text-neutral-600">
                  Riceverai un'email con tutti i dettagli e il link per la videochiamata
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <Video className="w-3 h-3 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900">Videochiamata</h4>
                <p className="text-sm text-neutral-600">
                  La consulenza si svolgerà online tramite videochiamata sicura
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <CheckCircle className="w-3 h-3 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900">Dopo la Consulenza</h4>
                <p className="text-sm text-neutral-600">
                  Potrai lasciare un feedback e prenotare le altre consulenze gratuite
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => navigate('/matching-results')}
          >
            Prenota le Altre Consulenze
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            Vai alla Dashboard
          </Button>
        </div>

        {/* Contact Info */}
        <Card className="p-4 mt-6 bg-neutral-50">
          <p className="text-sm text-neutral-600 text-center">
            Hai domande? Contattaci a{' '}
            <a href="mailto:supporto@mindconnect.it" className="text-primary-600 hover:text-primary-700">
              supporto@mindconnect.it
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ConsultationBooked;