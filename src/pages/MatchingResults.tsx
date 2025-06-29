import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Card from '../components/Card';
import { mockPsychologists } from '../mock/data';
import { Psychologist } from '../types';

const MatchingResults: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [matchedPsychologists, setMatchedPsychologists] = useState<Psychologist[]>([]);
  const [compatibilityScores, setCompatibilityScores] = useState<number[]>([]);

  useEffect(() => {
    // Simula il processo di matching
    const performMatching = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Seleziona 3 psicologi casuali per la demo
      const shuffled = [...mockPsychologists].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      setMatchedPsychologists(selected);
      setCompatibilityScores([95, 88, 82]); // Score di compatibilità simulati
      setIsLoading(false);
    };

    performMatching();
  }, []);

  const handleBookConsultation = (psychologistId: string) => {
    navigate(`/book-consultation/${psychologistId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
            Stiamo analizzando il tuo profilo...
          </h2>
          <p className="text-neutral-600">
            Il nostro algoritmo sta trovando i terapeuti più adatti a te
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Abbiamo Trovato i Tuoi Match!
          </h1>
          <p className="text-lg text-neutral-600 mb-4">
            Basandoci sulle tue risposte, abbiamo selezionato 3 terapeuti perfetti per te
          </p>
          <div className="bg-primary-100 border border-primary-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-primary-800 font-medium">
              🎁 Ricevi 3 consulenze gratuite di 30 minuti ciascuna
            </p>
            <p className="text-primary-700 text-sm mt-1">
              Dopo aver parlato con tutti e 3, potrai scegliere con chi iniziare la terapia
            </p>
          </div>
        </div>

        {/* Matched Psychologists */}
        <div className="space-y-6">
          {matchedPsychologists.map((psychologist, index) => (
            <Card key={psychologist.id} className="p-6 relative overflow-hidden">
              {/* Compatibility Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {compatibilityScores[index]}% compatibile
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Psychologist Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={psychologist.avatar}
                      alt={`${psychologist.firstName} ${psychologist.lastName}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                        {psychologist.firstName} {psychologist.lastName}
                      </h3>
                      <div className="flex items-center mb-2">
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
                          {psychologist.rating} ({psychologist.reviewCount} recensioni)
                        </span>
                      </div>
                      <div className="flex items-center text-neutral-600 text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{psychologist.location}</span>
                        <span className="mx-2">•</span>
                        <span>{psychologist.yearsOfExperience} anni di esperienza</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-700 mb-4 line-clamp-3">
                    {psychologist.bio}
                  </p>

                  {/* Specializations */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-neutral-900 mb-2">Specializzazioni:</h4>
                    <div className="flex flex-wrap gap-2">
                      {psychologist.specializations.map((spec, specIndex) => (
                        <span
                          key={specIndex}
                          className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Why This Match */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-medium text-green-900 mb-2">
                      Perché questo match è perfetto per te:
                    </h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Specializzato nelle tue aree di interesse</li>
                      <li>• Approccio terapeutico compatibile con le tue preferenze</li>
                      <li>• Esperienza con casi simili al tuo</li>
                      <li>• Disponibilità che si adatta ai tuoi orari</li>
                    </ul>
                  </div>
                </div>

                {/* Consultation Booking */}
                <div className="lg:w-80">
                  <Card className="p-6 bg-neutral-50">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-primary-600" />
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-1">
                        Consulenza Gratuita #{index + 1}
                      </h4>
                      <p className="text-sm text-neutral-600 mb-3">
                        30 minuti per conoscervi
                      </p>
                      <div className="flex items-center justify-center text-green-600 font-medium mb-4">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Gratuita</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mb-3"
                      onClick={() => handleBookConsultation(psychologist.id)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Prenota Consulenza
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(`/psychologist/${psychologist.id}`)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Visualizza Profilo
                    </Button>
                  </Card>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        <Card className="p-6 mt-8 bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-900 mb-3">
            Come Funziona il Processo
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                1
              </div>
              <p className="text-sm text-primary-800">
                Prenota e completa le 3 consulenze gratuite
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                2
              </div>
              <p className="text-sm text-primary-800">
                Valuta con quale terapeuta ti senti più a tuo agio
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                3
              </div>
              <p className="text-sm text-primary-800">
                Scegli il tuo terapeuta e inizia il percorso
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchingResults;