import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Brain, Users, Heart, Target, Globe, Baby } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import CitySelector from '../components/CitySelector';
import { QuestionnaireQuestion, TherapyType, getQuestionnaireByType } from '../types';

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [therapyType, setTherapyType] = useState<TherapyType>('individual');
  const [questions, setQuestions] = useState<QuestionnaireQuestion[]>([]);
  
  // Stati per la selezione di città e CAP
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCap, setSelectedCap] = useState('');
  const [locationError, setLocationError] = useState('');

  useEffect(() => {
    // Recupera il tipo di terapia selezionato
    const savedTherapyType = localStorage.getItem('mindconnect_therapy_type') as TherapyType;
    if (savedTherapyType) {
      setTherapyType(savedTherapyType);
      setQuestions(getQuestionnaireByType(savedTherapyType));
    } else {
      // Se non c'è un tipo selezionato, reindirizza alla selezione
      navigate('/therapy-type-selection');
    }
  }, [navigate]);

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const progress = questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0;

  // Controlla se la domanda corrente richiede la selezione della località
  const shouldShowLocationSelector = currentQuestion?.showLocationSelector && 
    responses[currentQuestion.id] && 
    ['Solo in presenza', 'Entrambe le modalità', 'Non ho preferenze', 'Misto (presenza per bambino, online per genitori)'].includes(responses[currentQuestion.id]);

  // Icone per le categorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emotional-state':
        return <Brain className="w-5 h-5" />;
      case 'communication-style':
        return <Users className="w-5 h-5" />;
      case 'therapy-preferences':
        return <Heart className="w-5 h-5" />;
      case 'values-goals':
        return <Target className="w-5 h-5" />;
      case 'life-context':
        return <Globe className="w-5 h-5" />;
      case 'relationship-dynamics':
        return <Heart className="w-5 h-5" />;
      case 'child-development':
        return <Baby className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'emotional-state':
        return 'Stato Emotivo';
      case 'communication-style':
        return 'Stile Comunicativo';
      case 'therapy-preferences':
        return 'Preferenze Terapeutiche';
      case 'values-goals':
        return 'Valori e Obiettivi';
      case 'life-context':
        return 'Contesto di Vita';
      case 'relationship-dynamics':
        return 'Dinamiche Relazionali';
      case 'child-development':
        return 'Sviluppo del Bambino';
      default:
        return 'Questionario';
    }
  };

  const getTherapyTypeTitle = (type: TherapyType) => {
    switch (type) {
      case 'individual':
        return 'Terapia Individuale';
      case 'couple':
        return 'Terapia di Coppia';
      case 'child':
        return 'Psicologia Infantile';
      default:
        return 'Questionario';
    }
  };

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Reset della selezione di città e CAP se la modalità cambia e non richiede più la località
    if ((questionId === 'session_modality' || questionId === 'session_modality_couple' || questionId === 'session_modality_child') && 
        !['Solo in presenza', 'Entrambe le modalità', 'Non ho preferenze', 'Misto (presenza per bambino, online per genitori)'].includes(value)) {
      setSelectedCity('');
      setSelectedCap('');
      setLocationError('');
    }
  };

  const handleNext = () => {
    // Validazione speciale per la selezione della località
    if (shouldShowLocationSelector) {
      if (!selectedCity || !selectedCap) {
        setLocationError('Seleziona il comune e il CAP per continuare');
        return;
      }
      // Salva i dati della località nelle risposte
      setResponses(prev => ({
        ...prev,
        location_city: selectedCity,
        location_cap: selectedCap
      }));
    }

    setLocationError('');
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Validazione finale per la località se necessaria
    if (shouldShowLocationSelector) {
      if (!selectedCity || !selectedCap) {
        setLocationError('Seleziona il comune e il CAP per completare il questionario');
        return;
      }
      // Salva i dati della località nelle risposte
      setResponses(prev => ({
        ...prev,
        location_city: selectedCity,
        location_cap: selectedCap
      }));
    }

    setIsSubmitting(true);
    try {
      // Salva le risposte del questionario in localStorage per usarle dopo la registrazione
      const questionnaireData = {
        therapyType,
        responses: {
          ...responses,
          ...(shouldShowLocationSelector && {
            location_city: selectedCity,
            location_cap: selectedCap
          })
        },
        completedAt: new Date().toISOString(),
        sessionId: Date.now().toString()
      };
      
      localStorage.setItem('mindconnect_questionnaire', JSON.stringify(questionnaireData));
      
      // Simula il processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Naviga alla registrazione
      navigate('/register');
    } catch (error) {
      console.error('Errore nel salvataggio del questionario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = (question: QuestionnaireQuestion) => {
    const currentValue = responses[question.id];

    switch (question.type) {
      case 'age-gender':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Età del bambino/a
                </label>
                <input
                  type="number"
                  min="0"
                  max="18"
                  value={currentValue?.age || ''}
                  onChange={(e) => handleResponse(question.id, { ...currentValue, age: e.target.value })}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Es. 8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Sesso
                </label>
                <select
                  value={currentValue?.gender || ''}
                  onChange={(e) => handleResponse(question.id, { ...currentValue, gender: e.target.value })}
                  className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Seleziona</option>
                  <option value="maschio">Maschio</option>
                  <option value="femmina">Femmina</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'single-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  currentValue === option
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={currentValue === option}
                  onChange={(e) => handleResponse(question.id, e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 ${
                  currentValue === option
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-neutral-300'
                }`}>
                  {currentValue === option && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span className="text-neutral-900 text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  currentValue?.includes(option)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={currentValue?.includes(option) || false}
                  onChange={(e) => {
                    const newValue = currentValue || [];
                    if (e.target.checked) {
                      handleResponse(question.id, [...newValue, option]);
                    } else {
                      handleResponse(question.id, newValue.filter((v: string) => v !== option));
                    }
                  }}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 mr-3 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                  currentValue?.includes(option)
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-neutral-300'
                }`}>
                  {currentValue?.includes(option) && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-neutral-900 text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'scale':
        const maxScale = question.id === 'cultural_spiritual_importance' ? 5 : 10;
        const scaleArray = Array.from({ length: maxScale }, (_, i) => i + 1);
        
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-neutral-600">
              <span>
                {question.description?.includes('poco') ? 'Poco disposto/a' : 
                 question.description?.includes('importante') ? 'Per niente importante' :
                 'Molto bassa'}
              </span>
              <span>
                {question.description?.includes('poco') ? 'Completamente disposto/a' : 
                 question.description?.includes('importante') ? 'Molto importante' :
                 'Molto alta'}
              </span>
            </div>
            <div className="flex space-x-2">
              {scaleArray.map((value) => (
                <button
                  key={value}
                  onClick={() => handleResponse(question.id, value)}
                  className={`flex-1 h-12 rounded-lg border-2 transition-all text-sm font-medium ${
                    currentValue === value
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );

      case 'multi-scale':
        return (
          <div className="space-y-6">
            {question.scaleLabels?.map((label, labelIndex) => (
              <div key={labelIndex} className="space-y-3">
                <h4 className="font-medium text-neutral-900">{label}</h4>
                <div className="flex justify-between text-xs text-neutral-600 mb-2">
                  <span>Per niente</span>
                  <span>Estremamente</span>
                </div>
                <div className="flex space-x-1">
                  {(question.id === 'specialized_competencies' ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((value) => (
                    <button
                      key={value}
                      onClick={() => {
                        const newValue = currentValue || {};
                        newValue[label] = value;
                        handleResponse(question.id, newValue);
                      }}
                      className={`flex-1 h-10 rounded border-2 transition-all text-xs font-medium ${
                        currentValue?.[label] === value
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={currentValue || ''}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[120px]"
            rows={5}
            placeholder="Scrivi la tua risposta qui..."
          />
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (!currentQuestion?.required) return true;
    const value = responses[currentQuestion.id];
    
    if (currentQuestion.type === 'multi-scale') {
      return value && Object.keys(value).length === currentQuestion.scaleLabels?.length;
    }
    
    if (currentQuestion.type === 'age-gender') {
      return value && value.age && value.gender;
    }
    
    const hasBasicResponse = value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
    
    // Se la domanda richiede la selezione della località, controlla anche città e CAP
    if (shouldShowLocationSelector) {
      return hasBasicResponse && selectedCity && selectedCap;
    }
    
    return hasBasicResponse;
  };

  // Funzione per ottenere il testo descrittivo basato sulla modalità selezionata
  const getLocationSelectorDescription = () => {
    const modalityResponse = responses[currentQuestion?.id];
    
    switch (modalityResponse) {
      case 'Solo in presenza':
        return therapyType === 'child' 
          ? 'Seleziona il tuo comune di residenza per trovare terapeuti infantili nella tua zona'
          : therapyType === 'couple'
          ? 'Seleziona il vostro comune di residenza per trovare terapeuti di coppia nella vostra zona'
          : 'Seleziona il tuo comune di residenza per trovare terapeuti nella tua zona';
      case 'Entrambe le modalità':
        return 'Seleziona il tuo comune per trovare terapeuti nella tua zona che offrono anche sessioni in presenza';
      case 'Non ho preferenze':
        return 'Seleziona il tuo comune per includere anche terapeuti che offrono sessioni in presenza nella tua zona';
      case 'Misto (presenza per bambino, online per genitori)':
        return 'Seleziona il tuo comune per trovare terapeuti infantili che possano vedere il bambino in presenza';
      default:
        return 'Seleziona il tuo comune di residenza';
    }
  };

  // Se non ci sono domande caricate, mostra loading
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-sand-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Questionario - {getTherapyTypeTitle(therapyType)}
          </h1>
          <p className="text-neutral-600">
            Rispondi a queste {questions.length} domande per aiutarci a trovare i terapeuti più adatti a te
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-neutral-600 mb-2">
            <span>Domanda {currentStep + 1} di {questions.length}</span>
            <span>{Math.round(progress)}% completato</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div 
              className="bg-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Category Badge */}
        {currentQuestion && (
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full">
              {getCategoryIcon(currentQuestion.category)}
              <span className="ml-2 text-sm font-medium">
                {getCategoryName(currentQuestion.category)}
              </span>
            </div>
          </div>
        )}

        {/* Question Card */}
        {currentQuestion && (
          <Card className="p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                {currentQuestion.question}
              </h2>
              {currentQuestion.description && (
                <p className="text-sm text-neutral-600 mb-4">
                  {currentQuestion.description}
                </p>
              )}
              {!currentQuestion.required && (
                <p className="text-sm text-neutral-500 mb-4">
                  Questa domanda è opzionale
                </p>
              )}
            </div>

            {renderQuestion(currentQuestion)}

            {/* Selettore di località condizionale */}
            {shouldShowLocationSelector && (
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Dove preferiresti incontrare il terapeuta?
                </h3>
                <p className="text-sm text-neutral-600 mb-6">
                  {getLocationSelectorDescription()}
                </p>
                
                {/* Badge informativo basato sulla modalità */}
                <div className="mb-6">
                  {responses[currentQuestion.id] === 'Solo in presenza' && (
                    <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      📍 Solo terapia in presenza
                    </div>
                  )}
                  {responses[currentQuestion.id] === 'Entrambe le modalità' && (
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      🔄 Presenza + Online disponibili
                    </div>
                  )}
                  {responses[currentQuestion.id] === 'Non ho preferenze' && (
                    <div className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      ⚡ Tutte le modalità disponibili
                    </div>
                  )}
                  {responses[currentQuestion.id] === 'Misto (presenza per bambino, online per genitori)' && (
                    <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      👶 Bambino in presenza, genitori online
                    </div>
                  )}
                </div>

                <CitySelector
                  selectedCity={selectedCity}
                  selectedCap={selectedCap}
                  onCityChange={setSelectedCity}
                  onCapChange={setSelectedCap}
                  error={locationError}
                />
              </div>
            )}
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Precedente
          </Button>

          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Elaborazione...' : 'Completa e Registrati'}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Successiva
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-neutral-500">
            Le tue risposte sono completamente private e verranno utilizzate solo per trovare i terapeuti più adatti a te
          </p>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;