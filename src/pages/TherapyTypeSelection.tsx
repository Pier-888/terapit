import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, Baby, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export type TherapyType = 'individual' | 'couple' | 'child';

const TherapyTypeSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<TherapyType | null>(null);

  const therapyTypes = [
    {
      id: 'individual' as TherapyType,
      title: 'Terapia Individuale',
      description: 'Supporto personalizzato per il tuo benessere mentale e crescita personale',
      icon: <User className="w-8 h-8" />,
      features: [
        'Ansia, depressione, stress',
        'Crescita personale',
        'Gestione delle emozioni',
        'Autostima e relazioni'
      ],
      color: 'blue'
    },
    {
      id: 'couple' as TherapyType,
      title: 'Terapia di Coppia',
      description: 'Migliora la comunicazione e rafforza il legame con il tuo partner',
      icon: <Heart className="w-8 h-8" />,
      features: [
        'Comunicazione e conflitti',
        'Fiducia e intimità',
        'Crisi di coppia',
        'Mediazione familiare'
      ],
      color: 'red'
    },
    {
      id: 'child' as TherapyType,
      title: 'Psicologia Infantile',
      description: 'Supporto specializzato per bambini e consulenza genitoriale',
      icon: <Baby className="w-8 h-8" />,
      features: [
        'Difficoltà comportamentali',
        'Supporto scolastico',
        'Consulenza genitoriale',
        'Sviluppo emotivo'
      ],
      color: 'green'
    }
  ];

  const handleTypeSelect = (type: TherapyType) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (!selectedType) return;
    
    // Salva il tipo di terapia selezionato nel localStorage
    localStorage.setItem('mindconnect_therapy_type', selectedType);
    
    // Naviga al questionario appropriato
    navigate('/questionnaire');
  };

  const handleCardClick = (type: TherapyType) => {
    handleTypeSelect(type);
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const baseClasses = 'transition-all duration-200';
    
    if (isSelected) {
      switch (color) {
        case 'blue':
          return `${baseClasses} border-blue-500 bg-blue-50 shadow-lg transform scale-105`;
        case 'red':
          return `${baseClasses} border-red-500 bg-red-50 shadow-lg transform scale-105`;
        case 'green':
          return `${baseClasses} border-green-500 bg-green-50 shadow-lg transform scale-105`;
        default:
          return `${baseClasses} border-blue-500 bg-blue-50 shadow-lg transform scale-105`;
      }
    }
    
    return `${baseClasses} border-neutral-200 hover:border-neutral-300 hover:shadow-md hover:scale-102`;
  };

  const getIconColorClasses = (color: string, isSelected: boolean) => {
    if (isSelected) {
      switch (color) {
        case 'blue':
          return 'text-blue-600 bg-blue-100';
        case 'red':
          return 'text-red-600 bg-red-100';
        case 'green':
          return 'text-green-600 bg-green-100';
        default:
          return 'text-blue-600 bg-blue-100';
      }
    }
    
    return 'text-neutral-600 bg-neutral-100 group-hover:text-neutral-700';
  };

  const getSelectedButtonClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600 text-white';
      case 'red':
        return 'bg-red-600 text-white';
      case 'green':
        return 'bg-green-600 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Che tipo di supporto stai cercando?
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Seleziona il tipo di terapia più adatto alle tue esigenze. 
            Ti guideremo verso i professionisti specializzati nel tuo ambito.
          </p>
        </div>

        {/* Therapy Type Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {therapyTypes.map((type) => (
            <div
              key={type.id}
              className={`cursor-pointer group ${getColorClasses(type.color, selectedType === type.id)}`}
              onClick={() => handleCardClick(type.id)}
            >
              <Card className="p-6 h-full border-0 shadow-none bg-transparent">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-200 ${getIconColorClasses(type.color, selectedType === type.id)}`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {type.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-neutral-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                <div className="text-center">
                  {selectedType === type.id ? (
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${getSelectedButtonClasses(type.color)}`}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Selezionato
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-neutral-300 text-neutral-600 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200">
                      Seleziona
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedType}
            className={`px-8 transition-all duration-200 ${
              selectedType 
                ? 'opacity-100 transform scale-100' 
                : 'opacity-50 transform scale-95'
            }`}
          >
            Continua con il Questionario
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {selectedType && (
            <div className="mt-4 animate-fade-in">
              <p className="text-sm text-neutral-600">
                Procederai con il questionario per{' '}
                <span className="font-medium text-primary-600">
                  {therapyTypes.find(t => t.id === selectedType)?.title}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-12 p-6 bg-primary-50 border-primary-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">
              Come Funziona il Processo
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  1
                </div>
                <p className="text-sm text-primary-800">
                  Completa il questionario specializzato
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  2
                </div>
                <p className="text-sm text-primary-800">
                  Ricevi 3 match personalizzati
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  3
                </div>
                <p className="text-sm text-primary-800">
                  3 consulenze gratuite per scegliere
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TherapyTypeSelection;