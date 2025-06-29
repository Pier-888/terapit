import React from 'react';
import { ArrowRight, Shield, Users, Calendar, MessageCircle, Star, Heart, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Questionario Personalizzato',
      description: 'Un questionario scientifico che analizza le tue esigenze per trovare il match perfetto.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '3 Match Selezionati',
      description: 'Il nostro algoritmo ti propone 3 terapeuti accuratamente selezionati per le tue specifiche esigenze.'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Consulenze Gratuite',
      description: '3 consulenze gratuite di 30 minuti per conoscere i terapeuti prima di scegliere.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sicuro e Privato',
      description: 'Piattaforma conforme alle normative sulla privacy che garantisce la riservatezza delle tue informazioni.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'Le consulenze gratuite mi hanno permesso di scegliere il terapeuta giusto senza pressioni. Il processo è stato perfetto.',
      role: 'Paziente'
    },
    {
      name: 'Dr. James Wilson',
      rating: 5,
      text: 'Come terapeuta, questa piattaforma mi connette con pazienti che traggono davvero beneficio dal mio approccio.',
      role: 'Psicologo'
    },
    {
      name: 'Maria L.',
      rating: 5,
      text: 'Il questionario è stato molto accurato. I 3 terapeuti proposti erano tutti perfetti per le mie esigenze.',
      role: 'Paziente'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-sand-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Trova il Tuo
              <span className="text-primary-600 block">Match Terapeutico Perfetto</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Completa il nostro questionario scientifico e ricevi 3 consulenze gratuite con i terapeuti 
              più adatti a te. Nessuna ricerca, nessuna pressione - solo il match perfetto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/therapy-type-selection')}
                className="animate-slide-up"
              >
                Inizia il Questionario Gratuito
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/login')}
              >
                Accedi al Tuo Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Come Funziona MindConnect
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Un processo semplice e scientifico per trovare il terapeuta giusto per te, senza stress o incertezze.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Il Tuo Percorso in 4 Semplici Passi
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Scegli il Tipo di Terapia
              </h3>
              <p className="text-neutral-600">
                Seleziona tra terapia individuale, di coppia o psicologia infantile per ricevere il questionario più adatto.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Completa il Questionario
              </h3>
              <p className="text-neutral-600">
                Rispondi alle domande scientificamente validate per aiutarci a comprendere le tue esigenze specifiche.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                3 Consulenze Gratuite
              </h3>
              <p className="text-neutral-600">
                Conosci ogni terapeuta con una consulenza gratuita di 30 minuti per valutare la compatibilità.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Scegli e Inizia
              </h3>
              <p className="text-neutral-600">
                Seleziona il terapeuta con cui ti senti più a tuo agio e inizia il tuo percorso di crescita.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Perché Scegliere MindConnect?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Nessuna Ricerca Stressante</h3>
                    <p className="text-neutral-600">Non dovrai più cercare tra centinaia di profili. Noi troviamo i match perfetti per te.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Consulenze Gratuite</h3>
                    <p className="text-neutral-600">Conosci i terapeuti senza impegno economico prima di prendere una decisione.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Match Scientificamente Validati</h3>
                    <p className="text-neutral-600">Il nostro algoritmo si basa su ricerche psicologiche per garantire la migliore compatibilità.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Processo Senza Pressioni</h3>
                    <p className="text-neutral-600">Prendi tutto il tempo che ti serve per scegliere il terapeuta giusto per te.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Il 94% dei nostri utenti
                </h3>
                <p className="text-lg text-neutral-700 mb-6">
                  trova il terapeuta perfetto entro le prime 3 consulenze gratuite
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-neutral-600 italic">
                    "Non avrei mai pensato che trovare il terapeuta giusto potesse essere così semplice. 
                    Le consulenze gratuite mi hanno dato la sicurezza di fare la scelta giusta."
                  </p>
                  <p className="text-sm font-medium text-neutral-900 mt-2">- Anna, Milano</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Cosa Dice la Nostra Comunità
            </h2>
            <p className="text-lg text-neutral-600">
              Storie reali di persone che hanno trovato il loro match terapeutico perfetto
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-primary-600 mr-2" />
                  <span className="font-semibold text-neutral-900">{testimonial.name}</span>
                  <span className="text-neutral-500 ml-2">• {testimonial.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto a Trovare il Tuo Terapeuta Perfetto?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Inizia con il nostro questionario gratuito e ricevi 3 consulenze gratuite con i terapeuti più adatti a te.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => navigate('/therapy-type-selection')}
          >
            Inizia Ora - È Gratuito
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-primary-200 text-sm mt-4">
            Nessun impegno • 3 consulenze gratuite • Match garantiti
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;