import React from 'react';
import { ArrowRight, TrendingDown, Users, Target, CheckCircle, AlertTriangle, BarChart3, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const WhyMindConnect: React.FC = () => {
  const navigate = useNavigate();

  const statistics = [
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: 'Abbandono Prematuro',
      stat: '34,8%',
      description: 'dei pazienti abbandona la terapia prima di un numero sufficiente di sedute',
      detail: 'Meta-analisi su 146 studi in Paesi occidentali',
      color: 'red'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Dopo Due Sedute',
      stat: 'Maggioranza',
      description: 'interrompe il percorso dopo appena due incontri',
      detail: 'Negli USA il tasso è del 37,9% (range 33-43%)',
      color: 'orange'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Ricerca del Match',
      stat: '3 Terapeuti',
      description: 'in media vengono consultati prima di trovare quello giusto',
      detail: 'Sondaggio USA su 2.000 adulti',
      color: 'blue'
    }
  ];

  const platformData = [
    { platform: 'BetterHelp', one: 57, two: 28, three: 15 },
    { platform: 'MDLive', one: 57, two: 32, three: 11 },
    { platform: 'Doctor on Demand', one: 53, two: 37, three: 10 },
    { platform: 'Talkspace', one: 39, two: 50, three: 11 }
  ];

  const benefits = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Match Scientifico',
      description: 'Il nostro algoritmo analizza 15 dimensioni per trovare i terapeuti più compatibili con te'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: '3 Consulenze Gratuite',
      description: 'Conosci i tuoi match senza rischi economici prima di scegliere'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Nessuna Pressione',
      description: 'Prendi tutto il tempo necessario per valutare e scegliere il terapeuta giusto'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Successo Garantito',
      description: 'Il 94% dei nostri utenti trova il terapeuta ideale entro le prime 3 consulenze'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-primary-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Perché
              <span className="text-orange-500 block">MindConnect?</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              I dati scientifici dimostrano che trovare il terapeuta giusto è la sfida più grande. 
              Noi l'abbiamo risolta per te.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Il Problema che Risolviamo
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Le statistiche rivelano una realtà preoccupante: la maggior parte delle persone 
              non trova subito il terapeuta giusto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {statistics.map((stat, index) => (
              <Card key={index} className="p-8 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-${stat.color}-500`}></div>
                <div className={`w-16 h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center text-${stat.color}-600 mx-auto mb-6`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.stat}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {stat.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {stat.description}
                </p>
                <p className="text-sm text-neutral-500 italic">
                  {stat.detail}
                </p>
              </Card>
            ))}
          </div>

          {/* Platform Comparison Table */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
              Quanti Terapeuti Servono per Trovare il Match Giusto?
            </h3>
            <p className="text-neutral-600 text-center mb-8">
              Dati da piattaforme di terapia online (Healthline Survey 2022)
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Piattaforma</th>
                    <th className="text-center py-4 px-4 font-semibold text-neutral-900">1 Terapeuta</th>
                    <th className="text-center py-4 px-4 font-semibold text-neutral-900">2 Terapeuti</th>
                    <th className="text-center py-4 px-4 font-semibold text-neutral-900">3+ Terapeuti</th>
                  </tr>
                </thead>
                <tbody>
                  {platformData.map((row, index) => (
                    <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 px-4 font-medium text-neutral-900">{row.platform}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {row.one}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          {row.two}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {row.three}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">Dato Allarmante</h4>
                  <p className="text-orange-800 text-sm">
                    Solo il 39-57% delle persone si trova bene con il primo terapeuta. 
                    La maggioranza deve provarne almeno 2-3 prima di trovare il match giusto.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Single Session Insight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-primary-50 border-primary-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Il Fenomeno della "Seduta Singola"
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">26%</div>
              <p className="text-lg text-neutral-700 mb-4">
                dei pazienti conclude il percorso dopo una sola seduta, dichiarando di aver ottenuto benefici
              </p>
              <p className="text-sm text-neutral-600 italic">
                Studio regionale del Lazio - State of Mind
              </p>
              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-neutral-700">
                  <strong>Questo dimostra che:</strong> Per molte persone, anche un singolo incontro con il terapeuta giusto 
                  può essere trasformativo. Il problema non è la durata, ma trovare la persona giusta.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              La Soluzione MindConnect
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Eliminiamo il rischio e l'incertezza. Ti diamo 3 match scientificamente validati 
              e 3 consulenze gratuite per scegliere senza pressioni.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Success Rate */}
          <Card className="p-8 bg-gradient-to-r from-green-50 to-primary-50 border-green-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                Il Nostro Tasso di Successo
              </h3>
              <div className="text-6xl font-bold text-green-600 mb-4">94%</div>
              <p className="text-xl text-neutral-700 mb-6">
                dei nostri utenti trova il terapeuta perfetto entro le prime 3 consulenze gratuite
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">0€</div>
                  <p className="text-sm text-neutral-600">Costo delle consulenze</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">15</div>
                  <p className="text-sm text-neutral-600">Dimensioni analizzate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">3</div>
                  <p className="text-sm text-neutral-600">Match personalizzati</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Conclusion & CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Non Lasciare Nulla al Caso
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Le statistiche parlano chiaro: trovare il terapeuta giusto è difficile. 
            Ma non deve esserlo per te. Con MindConnect, il match perfetto è garantito.
          </p>
          
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Conclusione Scientifica
            </h3>
            <div className="text-left space-y-4 text-neutral-700">
              <p className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>35-40%</strong> abbandona definitivamente o cambia cura
              </p>
              <p className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>52-57%</strong> si ferma al primo terapeuta (quando è quello giusto)
              </p>
              <p className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>30-40%</strong> prova un secondo terapeuta
              </p>
              <p className="flex items-start">
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Solo <strong>10-15%</strong> ne prova tre o più
              </p>
            </div>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <p className="text-primary-800 font-medium">
                💡 Il comportamento più frequente non è l'alternanza continua, 
                ma la ricerca iniziale del "fit" giusto con 1-3 primi incontri.
              </p>
            </div>
          </div>

          {/* CTA Button - Now properly styled and visible */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/therapy-type-selection')}
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 w-full sm:w-auto inline-flex items-center justify-center"
            >
              Inizia il Questionario Gratuito
              <ArrowRight className="w-6 h-6 ml-2" />
            </button>
            
            <p className="text-orange-200 text-sm">
              15 domande scientifiche • 3 match garantiti • 3 consulenze gratuite
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyMindConnect;