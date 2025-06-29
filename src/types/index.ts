export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'psychologist';
  avatar?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: Date;
  phoneNumber?: string;
  emergencyContact?: string;
  medicalHistory?: string;
  currentMedications?: string;
  preferredLanguage?: string;
  insuranceProvider?: string;
  hasCompletedQuestionnaire?: boolean;
  matchingStatus?: 'pending' | 'matched' | 'consultations_completed' | 'therapy_started';
}

export interface Psychologist extends User {
  role: 'psychologist';
  licenseNumber: string;
  specializations: string[];
  yearsOfExperience: number;
  education: string[];
  languages: string[];
  bio: string;
  location: string;
  hourlyRate: number;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  availability: Availability[];
  matchingCriteria?: string[]; // Criteri per il matching automatico
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface Appointment {
  id: string;
  patientId: string;
  psychologistId: string;
  dateTime: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'consultation' | 'therapy' | 'follow-up';
  notes?: string;
  price: number;
  isFreeConsultation?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
}

export interface QuestionnaireResponse {
  id: string;
  patientId?: string; // Opzionale perché il questionario viene fatto prima della registrazione
  responses: Record<string, any>;
  completedAt: Date;
  matchingScore?: number;
  sessionId?: string; // Per tracciare le risposte prima della registrazione
  therapyType?: 'individual' | 'couple' | 'child'; // Nuovo campo per il tipo di terapia
}

export interface MatchResult {
  id: string;
  patientId: string;
  psychologists: Psychologist[];
  compatibilityScores: number[];
  reasonsForMatch: string[][];
  createdAt: Date;
  status: 'active' | 'consultations_completed' | 'therapy_selected';
  selectedPsychologistId?: string;
}

export interface ConsultationFeedback {
  id: string;
  patientId: string;
  psychologistId: string;
  appointmentId: string;
  rating: number; // 1-5
  feedback: string;
  wouldChooseForTherapy: boolean;
  createdAt: Date;
}

// Tipo per la selezione del tipo di terapia
export type TherapyType = 'individual' | 'couple' | 'child';

// Questionario per il matching - 15 domande specifiche
export interface QuestionnaireQuestion {
  id: string;
  question: string;
  type: 'single-choice' | 'multiple-choice' | 'scale' | 'text' | 'multi-scale' | 'age-gender';
  options?: string[];
  scaleLabels?: string[];
  required: boolean;
  category: 'emotional-state' | 'communication-style' | 'therapy-preferences' | 'values-goals' | 'life-context' | 'relationship-dynamics' | 'child-development';
  description?: string;
  showLocationSelector?: boolean; // Nuovo campo per mostrare il selettore di località
  therapyType?: TherapyType[]; // Specifica per quali tipi di terapia è valida la domanda
}

// Questionario per Terapia Individuale (esistente)
export const INDIVIDUAL_QUESTIONNAIRE: QuestionnaireQuestion[] = [
  // 🧠 1. Stato emotivo e sintomatologia
  {
    id: 'main_difficulties',
    question: 'Quali sono le principali difficoltà o sofferenze che stai vivendo in questo momento?',
    type: 'text',
    required: true,
    category: 'emotional-state',
    description: 'Descrivi liberamente quello che stai attraversando',
    therapyType: ['individual']
  },
  {
    id: 'emotional_intensity',
    question: 'In che misura ti senti ansioso, triste, stressato o sopraffatto nella tua quotidianità?',
    type: 'multi-scale',
    scaleLabels: ['Ansioso', 'Triste', 'Stressato', 'Sopraffatto'],
    required: true,
    category: 'emotional-state',
    description: 'Valuta da 1 (per niente) a 10 (estremamente) ogni emozione',
    therapyType: ['individual']
  },
  {
    id: 'previous_diagnosis',
    question: 'Hai mai ricevuto una diagnosi psicologica o psichiatrica in passato?',
    type: 'single-choice',
    options: ['No, mai', 'Sì, ma non ricordo i dettagli', 'Sì, per ansia/attacchi di panico', 'Sì, per depressione', 'Sì, per disturbi dell\'umore', 'Sì, altro (specificare nei commenti)'],
    required: true,
    category: 'emotional-state',
    therapyType: ['individual']
  },

  // 👥 2. Relazioni e stile comunicativo
  {
    id: 'communication_style',
    question: 'Ti senti più a tuo agio a parlare con persone dirette o con chi usa uno stile più empatico e riflessivo?',
    type: 'single-choice',
    options: ['Preferisco uno stile diretto e pratico', 'Preferisco uno stile empatico e riflessivo', 'Non ho preferenze particolari', 'Dipende dall\'argomento'],
    required: true,
    category: 'communication-style',
    therapyType: ['individual']
  },
  {
    id: 'thinking_style',
    question: 'Tendi a esplorare i tuoi pensieri parlando o preferisci prima riflettere da solo?',
    type: 'single-choice',
    options: ['Penso meglio parlando ad alta voce', 'Preferisco riflettere prima da solo', 'Un mix di entrambi', 'Dipende dalla situazione'],
    required: true,
    category: 'communication-style',
    therapyType: ['individual']
  },

  // 🛋️ 3. Preferenze terapeutiche
  {
    id: 'therapy_experience',
    question: 'Hai già fatto psicoterapia in passato?',
    type: 'single-choice',
    options: ['No, mai', 'Sì, terapia cognitivo-comportamentale', 'Sì, terapia psicodinamica', 'Sì, terapia umanistica', 'Sì, ma non ricordo l\'approccio', 'Sì, più approcci diversi'],
    required: true,
    category: 'therapy-preferences',
    therapyType: ['individual']
  },
  {
    id: 'therapist_gender',
    question: 'Ti senti più a tuo agio con uno psicologo uomo o donna, o non hai preferenze?',
    type: 'single-choice',
    options: ['Preferisco un terapeuta uomo', 'Preferisco una terapeuta donna', 'Non ho preferenze', 'Dipende dalla personalità, non dal genere'],
    required: false,
    category: 'therapy-preferences',
    therapyType: ['individual']
  },
  {
    id: 'therapy_approach',
    question: 'Preferiresti un terapeuta che ti dia strumenti pratici o uno che lavori più in profondità sulla tua storia e inconscio?',
    type: 'single-choice',
    options: ['Strumenti pratici e soluzioni concrete', 'Lavoro in profondità su storia e inconscio', 'Un equilibrio tra entrambi', 'Non sono sicuro/a'],
    required: true,
    category: 'therapy-preferences',
    therapyType: ['individual']
  },
  {
    id: 'specialized_competencies',
    question: 'Quanto è importante per te che lo psicologo abbia anche competenze in ambito neuroscientifico, medico o spirituale?',
    type: 'multi-scale',
    scaleLabels: ['Competenze neuroscientifiche', 'Competenze mediche', 'Competenze spirituali'],
    required: false,
    category: 'therapy-preferences',
    description: 'Valuta da 1 (per niente importante) a 5 (molto importante)',
    therapyType: ['individual']
  },

  // 🔍 4. Valori, motivazione e obiettivi
  {
    id: 'therapy_goals',
    question: 'Cosa speri di ottenere dalla psicoterapia?',
    type: 'multiple-choice',
    options: [
      'Superare un blocco emotivo',
      'Capire meglio me stesso/a',
      'Migliorare le mie relazioni',
      'Sviluppare resilienza e forza interiore',
      'Gestire ansia e stress',
      'Elaborare un trauma o lutto',
      'Migliorare l\'autostima',
      'Trovare direzione nella vita',
      'Altro'
    ],
    required: true,
    category: 'values-goals',
    therapyType: ['individual']
  },
  {
    id: 'commitment_level',
    question: 'Quanto sei disposto/a a metterti in gioco nel percorso terapeutico?',
    type: 'scale',
    required: true,
    category: 'values-goals',
    description: 'Da 1 (poco disposto/a) a 10 (completamente disposto/a)',
    therapyType: ['individual']
  },
  {
    id: 'support_areas',
    question: 'In quali aree della tua vita senti maggiore bisogno di supporto?',
    type: 'multiple-choice',
    options: ['Emotiva', 'Lavorativa', 'Relazionale', 'Familiare', 'Sessuale', 'Sociale', 'Spirituale', 'Altro'],
    required: true,
    category: 'values-goals',
    therapyType: ['individual']
  },

  // 🌍 5. Vita e contesto
  {
    id: 'time_availability',
    question: 'Quante ore puoi realisticamente dedicare alla terapia ogni settimana?',
    type: 'single-choice',
    options: ['1 ora a settimana', '1-2 ore a settimana', '2-3 ore a settimana', 'Più di 3 ore a settimana', 'Dipende dal periodo'],
    required: true,
    category: 'life-context',
    therapyType: ['individual']
  },
  {
    id: 'life_changes',
    question: 'Ti trovi in una fase di cambiamento significativo (es: lutto, separazione, trasferimento)?',
    type: 'single-choice',
    options: ['No, la mia vita è abbastanza stabile', 'Sì, un lutto o perdita importante', 'Sì, una separazione o divorzio', 'Sì, un trasferimento o cambio lavoro', 'Sì, altri cambiamenti significativi', 'Preferisco non specificare'],
    required: false,
    category: 'life-context',
    therapyType: ['individual']
  },
  {
    id: 'session_modality',
    question: 'Quali modalità ti renderebbero più comodo iniziare il percorso?',
    type: 'single-choice',
    options: ['Solo in presenza', 'Solo online', 'Entrambe le modalità', 'Telefonico', 'Non ho preferenze'],
    required: true,
    category: 'life-context',
    showLocationSelector: true,
    therapyType: ['individual']
  }
];

// Questionario per Terapia di Coppia
export const COUPLE_QUESTIONNAIRE: QuestionnaireQuestion[] = [
  // 1. Dinamica relazionale attuale
  {
    id: 'relationship_status',
    question: 'Qual è attualmente lo stato della vostra relazione?',
    type: 'single-choice',
    options: ['Stabile', 'In crisi', 'In transizione', 'Separati ma in contatto'],
    required: true,
    category: 'relationship-dynamics',
    therapyType: ['couple']
  },
  {
    id: 'partner_participation',
    question: 'Entrambi i partner sono disposti a partecipare alla terapia?',
    type: 'single-choice',
    options: ['Sì', 'No', 'Non ancora certo'],
    required: true,
    category: 'relationship-dynamics',
    therapyType: ['couple']
  },
  {
    id: 'main_problems',
    question: 'Quali sono i principali problemi che vorreste affrontare?',
    type: 'multiple-choice',
    options: ['Comunicazione', 'Fiducia', 'Sessualità', 'Famiglia', 'Gestione del denaro', 'Gelosia', 'Differenze di valori', 'Altro'],
    required: true,
    category: 'relationship-dynamics',
    therapyType: ['couple']
  },
  {
    id: 'conflict_style',
    question: 'Come affrontate solitamente un conflitto?',
    type: 'single-choice',
    options: ['Evitamento', 'Discussione accesa', 'Dialogo costruttivo', 'Silenzio prolungato', 'Uno parla, l\'altro ascolta', 'Cerchiamo mediazione'],
    required: true,
    category: 'communication-style',
    therapyType: ['couple']
  },
  {
    id: 'relationship_importance',
    question: 'Quanto è importante per voi mantenere la relazione?',
    type: 'scale',
    required: true,
    category: 'values-goals',
    description: 'Da 1 (poco importante) a 10 (estremamente importante)',
    therapyType: ['couple']
  },

  // 2. Contesto familiare e responsabilità
  {
    id: 'children_responsibilities',
    question: 'Avete figli o responsabilità condivise?',
    type: 'text',
    required: false,
    category: 'life-context',
    description: 'Se sì, specificare età dei figli e tipo di responsabilità condivise',
    therapyType: ['couple']
  },
  {
    id: 'serious_issues',
    question: 'Ci sono episodi di infedeltà, violenza verbale/fisica o dipendenze?',
    type: 'single-choice',
    options: ['Sì', 'No', 'Preferisco non dire'],
    required: true,
    category: 'relationship-dynamics',
    therapyType: ['couple']
  },
  {
    id: 'feeling_heard',
    question: 'Vi sentite ascoltati dall\'altro partner?',
    type: 'scale',
    required: true,
    category: 'communication-style',
    description: 'Da 1 (per niente) a 10 (completamente)',
    therapyType: ['couple']
  },

  // 3. Stile comunicativo
  {
    id: 'communication_predominant_style',
    question: 'Qual è il vostro stile comunicativo predominante come coppia?',
    type: 'single-choice',
    options: ['Assertivo', 'Passivo', 'Aggressivo', 'Ironico', 'Evitante', 'Misto'],
    required: true,
    category: 'communication-style',
    therapyType: ['couple']
  },
  {
    id: 'previous_couple_therapy',
    question: 'Avete già fatto terapia di coppia in passato?',
    type: 'single-choice',
    options: ['No, mai', 'Sì, terapia sistemico-familiare', 'Sì, terapia cognitivo-comportamentale', 'Sì, mediazione familiare', 'Sì, ma non ricordo l\'approccio', 'Sì, più approcci diversi'],
    required: true,
    category: 'therapy-preferences',
    therapyType: ['couple']
  },

  // 4. Preferenze terapeutiche
  {
    id: 'therapist_style_preference',
    question: 'Preferite un terapeuta che sia più diretto o più contenitivo?',
    type: 'single-choice',
    options: ['Diretto e orientato alle soluzioni', 'Empatico e contenitivo', 'Neutro e imparziale', 'Dipende dalla situazione'],
    required: true,
    category: 'therapy-preferences',
    therapyType: ['couple']
  },
  {
    id: 'therapy_goals_couple',
    question: 'Cosa sperate di ottenere dalla terapia?',
    type: 'text',
    required: true,
    category: 'values-goals',
    description: 'Es. prendere una decisione, riavvicinamento, gestione dei conflitti, migliorare la comunicazione, ecc.',
    therapyType: ['couple']
  },
  {
    id: 'cultural_spiritual_importance',
    question: 'Che importanza date agli aspetti culturali, religiosi o spirituali del vostro percorso?',
    type: 'scale',
    required: false,
    category: 'values-goals',
    description: 'Da 1 (per niente importante) a 5 (molto importante)',
    therapyType: ['couple']
  },
  {
    id: 'therapist_gender_preference_couple',
    question: 'Avete preferenze rispetto al genere del terapeuta?',
    type: 'single-choice',
    options: ['Preferisco una terapeuta donna', 'Preferisco un terapeuta uomo', 'Nessuna preferenza', 'Preferiamo un team misto'],
    required: false,
    category: 'therapy-preferences',
    therapyType: ['couple']
  },
  {
    id: 'therapy_duration_expectation',
    question: 'Che tipo di percorso immaginate?',
    type: 'single-choice',
    options: ['Breve e orientato alla soluzione', 'Approfondito e a lungo termine', 'Non so, dipende dai risultati', 'Flessibile in base alle necessità'],
    required: true,
    category: 'therapy-preferences',
    therapyType: ['couple']
  },

  // 5. Modalità di incontro (con logica condizionale)
  {
    id: 'session_modality_couple',
    question: 'Con quali modalità vi sentite più comodi a iniziare il percorso?',
    type: 'single-choice',
    options: ['Solo in presenza', 'Solo online', 'Entrambe le modalità', 'Non ho preferenze'],
    required: true,
    category: 'life-context',
    showLocationSelector: true,
    therapyType: ['couple']
  }
];

// Questionario per Psicologia Infantile
export const CHILD_QUESTIONNAIRE: QuestionnaireQuestion[] = [
  // 1. Informazioni di base sul bambino
  {
    id: 'child_age_gender',
    question: 'Qual è l\'età e il sesso del bambino/a?',
    type: 'age-gender',
    required: true,
    category: 'child-development',
    description: 'Inserisci età e seleziona il sesso',
    therapyType: ['child']
  },
  {
    id: 'support_reason',
    question: 'Perché stai cercando un supporto psicologico in questo momento?',
    type: 'text',
    required: true,
    category: 'child-development',
    description: 'Descrivi liberamente le tue preoccupazioni o motivazioni',
    therapyType: ['child']
  },

  // 2. Comportamenti osservati
  {
    id: 'behavioral_changes',
    question: 'Hai notato cambiamenti nel comportamento, nel sonno o nel rendimento scolastico?',
    type: 'text',
    required: false,
    category: 'child-development',
    description: 'Se sì, descrivi quali cambiamenti hai osservato',
    therapyType: ['child']
  },
  {
    id: 'previous_diagnosis_child',
    question: 'Il bambino ha ricevuto diagnosi precedenti (DSA, ADHD, spettro autistico...)?',
    type: 'text',
    required: false,
    category: 'child-development',
    description: 'Se sì, specificare quale diagnosi e quando è stata fatta',
    therapyType: ['child']
  },
  {
    id: 'child_temperament',
    question: 'Come descriveresti il suo temperamento?',
    type: 'single-choice',
    options: ['Calmo e riflessivo', 'Irascibile e impulsivo', 'Timido e riservato', 'Estroverso e socievole', 'Ansioso e preoccupato', 'Energico e vivace', 'Altro'],
    required: true,
    category: 'child-development',
    therapyType: ['child']
  },

  // 3. Eventi e contesto
  {
    id: 'stressful_events',
    question: 'Ci sono eventi stressanti recenti nella vita del bambino?',
    type: 'text',
    required: false,
    category: 'life-context',
    description: 'Es. separazioni, lutti, bullismo, traslochi, nascita di fratellini, ecc.',
    therapyType: ['child']
  },
  {
    id: 'peer_relationships',
    question: 'Come si comporta con i coetanei?',
    type: 'single-choice',
    options: ['Ben integrato e socievole', 'Ha difficoltà nelle relazioni', 'Tende ad evitare i coetanei', 'È molto selettivo nelle amicizie', 'Non so', 'Dipende dal contesto'],
    required: true,
    category: 'child-development',
    therapyType: ['child']
  },
  {
    id: 'previous_therapy_child',
    question: 'Il bambino ha già fatto terapia in passato?',
    type: 'text',
    required: false,
    category: 'therapy-preferences',
    description: 'Se sì, che tipo di terapia e con quali risultati?',
    therapyType: ['child']
  },

  // 4. Contesto scolastico
  {
    id: 'school_involvement',
    question: 'C\'è un coinvolgimento della scuola o richieste da parte degli insegnanti?',
    type: 'single-choice',
    options: ['Sì, la scuola ha segnalato delle difficoltà', 'No, nessun coinvolgimento scolastico', 'In corso, stiamo valutando con la scuola', 'La scuola supporta ma non ha segnalato problemi'],
    required: true,
    category: 'child-development',
    therapyType: ['child']
  },

  // 5. Obiettivi genitoriali
  {
    id: 'consultation_goals',
    question: 'Cosa speri di ottenere dalla consulenza psicologica?',
    type: 'text',
    required: true,
    category: 'values-goals',
    description: 'Es. strumenti educativi, valutazione diagnostica, supporto emotivo per il bambino, consulenza genitoriale, ecc.',
    therapyType: ['child']
  },
  {
    id: 'therapist_preferences_child',
    question: 'Hai preferenze rispetto al genere o approccio del terapeuta?',
    type: 'single-choice',
    options: ['Preferisco una terapeuta donna', 'Preferisco un terapeuta uomo', 'Nessuna preferenza di genere', 'Più importante l\'esperienza con bambini'],
    required: false,
    category: 'therapy-preferences',
    therapyType: ['child']
  },
  {
    id: 'therapy_type_preference',
    question: 'Preferisci un percorso solo genitoriale, con il bambino, o misto?',
    type: 'single-choice',
    options: ['Solo consulenza genitoriale', 'Solo terapia con il bambino', 'Percorso misto (genitori + bambino)', 'Dipende dalla valutazione del terapeuta'],
    required: true,
    category: 'therapy-preferences',
    therapyType: ['child']
  },
  {
    id: 'emotional_expression',
    question: 'Il bambino ha difficoltà nell\'esprimere emozioni o pensieri?',
    type: 'single-choice',
    options: ['Sì, ha molte difficoltà', 'No, si esprime bene', 'A volte, dipende dalla situazione', 'È molto riservato', 'Si esprime meglio con i gesti che con le parole'],
    required: true,
    category: 'child-development',
    therapyType: ['child']
  },

  // 6. Aspetti logistici
  {
    id: 'session_modality_child',
    question: 'Con quali modalità ti senti più comodo a iniziare il percorso?',
    type: 'single-choice',
    options: ['Solo in presenza', 'Online per consulenza genitoriale', 'Misto (presenza per bambino, online per genitori)', 'Non ho preferenze'],
    required: true,
    category: 'life-context',
    showLocationSelector: true,
    therapyType: ['child']
  },
  {
    id: 'schedule_compatibility',
    question: 'Quali orari sarebbero più compatibili con la vostra routine familiare?',
    type: 'single-choice',
    options: ['Mattina (9:00-12:00)', 'Primo pomeriggio (14:00-16:00)', 'Tardo pomeriggio (16:00-18:00)', 'Sera (18:00-20:00)', 'Weekend', 'Flessibile'],
    required: true,
    category: 'life-context',
    therapyType: ['child']
  }
];

// Funzione per ottenere il questionario appropriato
export const getQuestionnaireByType = (therapyType: TherapyType): QuestionnaireQuestion[] => {
  switch (therapyType) {
    case 'individual':
      return INDIVIDUAL_QUESTIONNAIRE;
    case 'couple':
      return COUPLE_QUESTIONNAIRE;
    case 'child':
      return CHILD_QUESTIONNAIRE;
    default:
      return INDIVIDUAL_QUESTIONNAIRE;
  }
};

// Manteniamo la compatibilità con il codice esistente
export const QUESTIONNAIRE_QUESTIONS = INDIVIDUAL_QUESTIONNAIRE;