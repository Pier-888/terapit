import { Psychologist, Appointment, Message } from '../types';

export const mockPsychologists: Psychologist[] = [
  {
    id: '1',
    email: 'dr.sarah@example.com',
    firstName: 'Dr.ssa Sarah',
    lastName: 'Johnson',
    role: 'psychologist',
    licenseNumber: 'PSY12345',
    specializations: ['Disturbi d\'Ansia', 'Depressione', 'Terapia Cognitivo Comportamentale'],
    yearsOfExperience: 8,
    education: ['Ph.D. in Psicologia Clinica - Università Bocconi', 'M.A. in Psicologia - Università Statale Milano'],
    languages: ['Italiano', 'Inglese', 'Spagnolo'],
    bio: 'Mi specializzo nell\'aiutare le persone a superare ansia e depressione attraverso approcci basati sull\'evidenza. Con oltre 8 anni di esperienza, fornisco un ambiente sicuro e di supporto per la guarigione e la crescita.',
    location: 'Milano, IT',
    hourlyRate: 120,
    isVerified: true,
    rating: 4.9,
    reviewCount: 124,
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    createdAt: new Date('2020-01-15'),
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '15:00' },
    ]
  },
  {
    id: '2',
    email: 'dr.michael@example.com',
    firstName: 'Dr. Michele',
    lastName: 'Chen',
    role: 'psychologist',
    licenseNumber: 'PSY67890',
    specializations: ['Terapia Familiare', 'Consulenza di Coppia', 'Recupero da Traumi'],
    yearsOfExperience: 12,
    education: ['Ph.D. in Terapia Familiare - Università La Sapienza', 'M.S. in Psicologia Clinica - Università Cattolica'],
    languages: ['Italiano', 'Inglese', 'Mandarino', 'Cantonese'],
    bio: 'Lavoro con coppie e famiglie per migliorare la comunicazione, risolvere conflitti e rafforzare le relazioni. Il mio approccio combina terapia sistemica con interventi basati sulla mindfulness.',
    location: 'Roma, IT',
    hourlyRate: 140,
    isVerified: true,
    rating: 4.8,
    reviewCount: 89,
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    createdAt: new Date('2018-03-20'),
    availability: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 5, startTime: '10:00', endTime: '16:00' },
    ]
  },
  {
    id: '3',
    email: 'dr.emily@example.com',
    firstName: 'Dr.ssa Emilia',
    lastName: 'Rodriguez',
    role: 'psychologist',
    licenseNumber: 'PSY11111',
    specializations: ['Psicologia Infantile', 'ADHD', 'Disturbi dello Spettro Autistico'],
    yearsOfExperience: 6,
    education: ['Ph.D. in Psicologia Infantile - Università di Padova', 'M.Ed. in Educazione Speciale - Università di Bologna'],
    languages: ['Italiano', 'Spagnolo', 'Portoghese'],
    bio: 'Mi specializzo nel lavoro con bambini e adolescenti, in particolare quelli con differenze nello sviluppo neurologico. Utilizzo terapia del gioco e interventi comportamentali per supportare le giovani menti.',
    location: 'Napoli, IT',
    hourlyRate: 110,
    isVerified: true,
    rating: 4.7,
    reviewCount: 56,
    avatar: 'https://images.pexels.com/photos/5327647/pexels-photo-5327647.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    createdAt: new Date('2019-09-10'),
    availability: [
      { dayOfWeek: 2, startTime: '14:00', endTime: '19:00' },
      { dayOfWeek: 4, startTime: '14:00', endTime: '19:00' },
      { dayOfWeek: 6, startTime: '09:00', endTime: '14:00' },
    ]
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    psychologistId: '1',
    dateTime: new Date('2024-02-15T10:00:00'),
    duration: 60,
    status: 'scheduled',
    type: 'initial',
    price: 120,
    notes: 'Consulto iniziale per gestione dell\'ansia'
  },
  {
    id: '2',
    patientId: '1',
    psychologistId: '1',
    dateTime: new Date('2024-02-08T10:00:00'),
    duration: 60,
    status: 'completed',
    type: 'follow-up',
    price: 120,
    notes: 'Sessione di follow-up - notati buoni progressi'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '1',
    content: 'Salve Dr.ssa Johnson, volevo fare un follow-up sulla nostra ultima sessione.',
    timestamp: new Date('2024-02-10T14:30:00'),
    isRead: true
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '1',
    content: 'Grazie per avermi contattato. Come si è sentito dal nostro ultimo incontro?',
    timestamp: new Date('2024-02-10T15:45:00'),
    isRead: true
  }
];