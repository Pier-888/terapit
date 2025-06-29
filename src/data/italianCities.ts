// Database dei comuni italiani con CAP
export interface ItalianCity {
  name: string;
  province: string;
  region: string;
  cap: string[];
}

// Campione rappresentativo dei comuni italiani più importanti
// In un'app reale, questo sarebbe un database completo o API
export const ITALIAN_CITIES: ItalianCity[] = [
  // Lombardia
  { name: "Milano", province: "MI", region: "Lombardia", cap: ["20100", "20121", "20122", "20123", "20124", "20125", "20126", "20127", "20128", "20129", "20131", "20132", "20133", "20134", "20135", "20136", "20137", "20138", "20139", "20141", "20142", "20143", "20144", "20145", "20146", "20147", "20148", "20149", "20151", "20152", "20153", "20154", "20155", "20156", "20157", "20158", "20159", "20161", "20162"] },
  { name: "Bergamo", province: "BG", region: "Lombardia", cap: ["24100", "24121", "24122", "24123", "24124", "24125", "24126", "24127", "24128", "24129"] },
  { name: "Brescia", province: "BS", region: "Lombardia", cap: ["25100", "25121", "25122", "25123", "25124", "25125", "25126", "25127", "25128", "25129", "25131", "25132", "25133", "25134", "25135", "25136"] },
  { name: "Como", province: "CO", region: "Lombardia", cap: ["22100"] },
  { name: "Cremona", province: "CR", region: "Lombardia", cap: ["26100"] },
  { name: "Mantova", province: "MN", region: "Lombardia", cap: ["46100"] },
  { name: "Pavia", province: "PV", region: "Lombardia", cap: ["27100"] },
  { name: "Sondrio", province: "SO", region: "Lombardia", cap: ["23100"] },
  { name: "Varese", province: "VA", region: "Lombardia", cap: ["21100"] },
  { name: "Monza", province: "MB", region: "Lombardia", cap: ["20900"] },

  // Lazio
  { name: "Roma", province: "RM", region: "Lazio", cap: ["00100", "00118", "00119", "00121", "00122", "00123", "00124", "00125", "00126", "00127", "00128", "00129", "00131", "00132", "00133", "00134", "00135", "00136", "00137", "00138", "00139", "00141", "00142", "00143", "00144", "00145", "00146", "00147", "00148", "00149", "00151", "00152", "00153", "00154", "00155", "00156", "00157", "00158", "00159", "00161", "00162", "00163", "00164", "00165", "00166", "00167", "00168", "00169", "00171", "00172", "00173", "00174", "00175", "00176", "00177", "00178", "00179", "00181", "00182", "00183", "00184", "00185", "00186", "00187", "00188", "00189", "00191", "00192", "00193", "00194", "00195", "00196", "00197", "00198", "00199"] },
  { name: "Latina", province: "LT", region: "Lazio", cap: ["04100"] },
  { name: "Frosinone", province: "FR", region: "Lazio", cap: ["03100"] },
  { name: "Rieti", province: "RI", region: "Lazio", cap: ["02100"] },
  { name: "Viterbo", province: "VT", region: "Lazio", cap: ["01100"] },

  // Campania
  { name: "Napoli", province: "NA", region: "Campania", cap: ["80100", "80121", "80122", "80123", "80124", "80125", "80126", "80127", "80128", "80129", "80131", "80132", "80133", "80134", "80135", "80136", "80137", "80138", "80139", "80141", "80142", "80143", "80144", "80145", "80146", "80147"] },
  { name: "Salerno", province: "SA", region: "Campania", cap: ["84100", "84121", "84122", "84123", "84124", "84125", "84126", "84127", "84128", "84129", "84131", "84132", "84133", "84134", "84135"] },
  { name: "Caserta", province: "CE", region: "Campania", cap: ["81100"] },
  { name: "Avellino", province: "AV", region: "Campania", cap: ["83100"] },
  { name: "Benevento", province: "BN", region: "Campania", cap: ["82100"] },

  // Sicilia
  { name: "Palermo", province: "PA", region: "Sicilia", cap: ["90100", "90121", "90122", "90123", "90124", "90125", "90126", "90127", "90128", "90129", "90131", "90132", "90133", "90134", "90135", "90136", "90137", "90138", "90139", "90141", "90142", "90143", "90144", "90145", "90146", "90147", "90148", "90149", "90151"] },
  { name: "Catania", province: "CT", region: "Sicilia", cap: ["95100", "95121", "95122", "95123", "95124", "95125", "95126", "95127", "95128", "95129", "95131", "95132", "95133", "95134", "95135", "95136", "95137", "95138", "95139", "95141", "95142", "95143", "95144", "95145", "95146"] },
  { name: "Messina", province: "ME", region: "Sicilia", cap: ["98100", "98121", "98122", "98123", "98124", "98125", "98126", "98127", "98128", "98129", "98131", "98132", "98133", "98134", "98135", "98136", "98137", "98138", "98139", "98141", "98142", "98143", "98144", "98145", "98146", "98147", "98148", "98149", "98151", "98152", "98153", "98154", "98155", "98156", "98157", "98158", "98159", "98161", "98162", "98163", "98164", "98165", "98166", "98167", "98168"] },
  { name: "Siracusa", province: "SR", region: "Sicilia", cap: ["96100"] },
  { name: "Trapani", province: "TP", region: "Sicilia", cap: ["91100"] },
  { name: "Ragusa", province: "RG", region: "Sicilia", cap: ["97100"] },
  { name: "Caltanissetta", province: "CL", region: "Sicilia", cap: ["93100"] },
  { name: "Agrigento", province: "AG", region: "Sicilia", cap: ["92100"] },
  { name: "Enna", province: "EN", region: "Sicilia", cap: ["94100"] },

  // Veneto
  { name: "Venezia", province: "VE", region: "Veneto", cap: ["30100", "30121", "30122", "30123", "30124", "30125", "30126", "30127", "30128", "30129", "30131", "30132", "30133", "30134", "30135", "30136", "30137", "30138", "30139", "30141", "30142", "30143", "30144", "30145", "30146", "30147", "30148", "30149", "30151", "30152", "30153", "30154", "30155", "30156", "30157", "30158", "30159", "30161", "30162", "30163", "30164", "30165", "30166", "30167", "30168", "30169", "30170", "30171", "30172", "30173", "30174", "30175", "30176"] },
  { name: "Verona", province: "VR", region: "Veneto", cap: ["37100", "37121", "37122", "37123", "37124", "37125", "37126", "37127", "37128", "37129", "37131", "37132", "37133", "37134", "37135", "37136", "37137", "37138", "37139", "37141", "37142"] },
  { name: "Padova", province: "PD", region: "Veneto", cap: ["35100", "35121", "35122", "35123", "35124", "35125", "35126", "35127", "35128", "35129", "35131", "35132", "35133", "35134", "35135", "35136", "35137", "35138", "35139", "35141", "35142", "35143"] },
  { name: "Vicenza", province: "VI", region: "Veneto", cap: ["36100"] },
  { name: "Treviso", province: "TV", region: "Veneto", cap: ["31100"] },
  { name: "Rovigo", province: "RO", region: "Veneto", cap: ["45100"] },
  { name: "Belluno", province: "BL", region: "Veneto", cap: ["32100"] },

  // Piemonte
  { name: "Torino", province: "TO", region: "Piemonte", cap: ["10100", "10121", "10122", "10123", "10124", "10125", "10126", "10127", "10128", "10129", "10131", "10132", "10133", "10134", "10135", "10136", "10137", "10138", "10139", "10141", "10142", "10143", "10144", "10145", "10146", "10147", "10148", "10149", "10151", "10152", "10153", "10154", "10155", "10156"] },
  { name: "Alessandria", province: "AL", region: "Piemonte", cap: ["15100"] },
  { name: "Asti", province: "AT", region: "Piemonte", cap: ["14100"] },
  { name: "Biella", province: "BI", region: "Piemonte", cap: ["13900"] },
  { name: "Cuneo", province: "CN", region: "Piemonte", cap: ["12100"] },
  { name: "Novara", province: "NO", region: "Piemonte", cap: ["28100"] },
  { name: "Verbania", province: "VB", region: "Piemonte", cap: ["28900"] },
  { name: "Vercelli", province: "VC", region: "Piemonte", cap: ["13100"] },

  // Emilia-Romagna
  { name: "Bologna", province: "BO", region: "Emilia-Romagna", cap: ["40100", "40121", "40122", "40123", "40124", "40125", "40126", "40127", "40128", "40129", "40131", "40132", "40133", "40134", "40135", "40136", "40137", "40138", "40139", "40141", "40142", "40143", "40144", "40145", "40146", "40147", "40148", "40149"] },
  { name: "Modena", province: "MO", region: "Emilia-Romagna", cap: ["41100", "41121", "41122", "41123", "41124", "41125", "41126"] },
  { name: "Parma", province: "PR", region: "Emilia-Romagna", cap: ["43100", "43121", "43122", "43123", "43124", "43125", "43126"] },
  { name: "Reggio Emilia", province: "RE", region: "Emilia-Romagna", cap: ["42100", "42121", "42122", "42123", "42124"] },
  { name: "Rimini", province: "RN", region: "Emilia-Romagna", cap: ["47900"] },
  { name: "Ferrara", province: "FE", region: "Emilia-Romagna", cap: ["44100", "44121", "44122", "44123", "44124"] },
  { name: "Forlì", province: "FC", region: "Emilia-Romagna", cap: ["47100"] },
  { name: "Piacenza", province: "PC", region: "Emilia-Romagna", cap: ["29100", "29121", "29122"] },
  { name: "Ravenna", province: "RA", region: "Emilia-Romagna", cap: ["48100", "48121", "48122", "48123", "48124", "48125"] },

  // Toscana
  { name: "Firenze", province: "FI", region: "Toscana", cap: ["50100", "50121", "50122", "50123", "50124", "50125", "50126", "50127", "50128", "50129", "50131", "50132", "50133", "50134", "50135", "50136", "50137", "50138", "50139", "50141", "50142", "50143", "50144", "50145"] },
  { name: "Pisa", province: "PI", region: "Toscana", cap: ["56100", "56121", "56122", "56123", "56124", "56125", "56126", "56127", "56128"] },
  { name: "Livorno", province: "LI", region: "Toscana", cap: ["57100", "57121", "57122", "57123", "57124", "57125", "57126", "57127", "57128"] },
  { name: "Arezzo", province: "AR", region: "Toscana", cap: ["52100"] },
  { name: "Siena", province: "SI", region: "Toscana", cap: ["53100"] },
  { name: "Pistoia", province: "PT", region: "Toscana", cap: ["51100"] },
  { name: "Lucca", province: "LU", region: "Toscana", cap: ["55100"] },
  { name: "Massa", province: "MS", region: "Toscana", cap: ["54100"] },
  { name: "Prato", province: "PO", region: "Toscana", cap: ["59100"] },
  { name: "Grosseto", province: "GR", region: "Toscana", cap: ["58100"] },

  // Puglia
  { name: "Bari", province: "BA", region: "Puglia", cap: ["70100", "70121", "70122", "70123", "70124", "70125", "70126", "70127", "70128", "70129", "70131", "70132"] },
  { name: "Lecce", province: "LE", region: "Puglia", cap: ["73100"] },
  { name: "Taranto", province: "TA", region: "Puglia", cap: ["74100", "74121", "74122", "74123"] },
  { name: "Foggia", province: "FG", region: "Puglia", cap: ["71100", "71121", "71122"] },
  { name: "Brindisi", province: "BR", region: "Puglia", cap: ["72100"] },
  { name: "Barletta", province: "BT", region: "Puglia", cap: ["76121"] },

  // Calabria
  { name: "Reggio Calabria", province: "RC", region: "Calabria", cap: ["89100", "89121", "89122", "89123", "89124", "89125", "89126", "89127", "89128", "89129", "89131", "89132", "89133", "89134", "89135"] },
  { name: "Catanzaro", province: "CZ", region: "Calabria", cap: ["88100"] },
  { name: "Cosenza", province: "CS", region: "Calabria", cap: ["87100"] },
  { name: "Crotone", province: "KR", region: "Calabria", cap: ["88900"] },
  { name: "Vibo Valentia", province: "VV", region: "Calabria", cap: ["89900"] },

  // Liguria
  { name: "Genova", province: "GE", region: "Liguria", cap: ["16100", "16121", "16122", "16123", "16124", "16125", "16126", "16127", "16128", "16129", "16131", "16132", "16133", "16134", "16135", "16136", "16137", "16138", "16139", "16141", "16142", "16143", "16144", "16145", "16146", "16147", "16148", "16149", "16151", "16152", "16153", "16154", "16155", "16156", "16157", "16158", "16159", "16161", "16162", "16163", "16164", "16165", "16166", "16167"] },
  { name: "La Spezia", province: "SP", region: "Liguria", cap: ["19100", "19121", "19122", "19123", "19124", "19125", "19126"] },
  { name: "Savona", province: "SV", region: "Liguria", cap: ["17100"] },
  { name: "Imperia", province: "IM", region: "Liguria", cap: ["18100"] },

  // Marche
  { name: "Ancona", province: "AN", region: "Marche", cap: ["60100", "60121", "60122", "60123", "60124", "60125", "60126", "60127", "60128", "60129", "60131"] },
  { name: "Pesaro", province: "PU", region: "Marche", cap: ["61100"] },
  { name: "Macerata", province: "MC", region: "Marche", cap: ["62100"] },
  { name: "Ascoli Piceno", province: "AP", region: "Marche", cap: ["63100"] },
  { name: "Fermo", province: "FM", region: "Marche", cap: ["63900"] },

  // Abruzzo
  { name: "L'Aquila", province: "AQ", region: "Abruzzo", cap: ["67100"] },
  { name: "Chieti", province: "CH", region: "Abruzzo", cap: ["66100"] },
  { name: "Pescara", province: "PE", region: "Abruzzo", cap: ["65100", "65121", "65122", "65123", "65124", "65125", "65126", "65127", "65128", "65129"] },
  { name: "Teramo", province: "TE", region: "Abruzzo", cap: ["64100"] },

  // Umbria
  { name: "Perugia", province: "PG", region: "Umbria", cap: ["06100", "06121", "06122", "06123", "06124", "06125", "06126", "06127", "06128", "06129", "06131", "06132", "06133", "06134", "06135"] },
  { name: "Terni", province: "TR", region: "Umbria", cap: ["05100"] },

  // Basilicata
  { name: "Potenza", province: "PZ", region: "Basilicata", cap: ["85100"] },
  { name: "Matera", province: "MT", region: "Basilicata", cap: ["75100"] },

  // Molise
  { name: "Campobasso", province: "CB", region: "Molise", cap: ["86100"] },
  { name: "Isernia", province: "IS", region: "Molise", cap: ["86170"] },

  // Sardegna
  { name: "Cagliari", province: "CA", region: "Sardegna", cap: ["09100", "09121", "09122", "09123", "09124", "09125", "09126", "09127", "09128", "09129", "09131", "09132", "09133", "09134"] },
  { name: "Sassari", province: "SS", region: "Sardegna", cap: ["07100"] },
  { name: "Nuoro", province: "NU", region: "Sardegna", cap: ["08100"] },
  { name: "Oristano", province: "OR", region: "Sardegna", cap: ["09170"] },
  { name: "Sud Sardegna", province: "SU", region: "Sardegna", cap: ["09010"] },

  // Friuli-Venezia Giulia
  { name: "Trieste", province: "TS", region: "Friuli-Venezia Giulia", cap: ["34100", "34121", "34122", "34123", "34124", "34125", "34126", "34127", "34128", "34129", "34131", "34132", "34133", "34134", "34135", "34136", "34137", "34138", "34139", "34141", "34142", "34143", "34144", "34145", "34146", "34147", "34148", "34149", "34151"] },
  { name: "Udine", province: "UD", region: "Friuli-Venezia Giulia", cap: ["33100"] },
  { name: "Pordenone", province: "PN", region: "Friuli-Venezia Giulia", cap: ["33170"] },
  { name: "Gorizia", province: "GO", region: "Friuli-Venezia Giulia", cap: ["34170"] },

  // Trentino-Alto Adige
  { name: "Trento", province: "TN", region: "Trentino-Alto Adige", cap: ["38100", "38121", "38122", "38123"] },
  { name: "Bolzano", province: "BZ", region: "Trentino-Alto Adige", cap: ["39100"] },

  // Valle d'Aosta
  { name: "Aosta", province: "AO", region: "Valle d'Aosta", cap: ["11100"] },

  // Aggiunta di altri comuni importanti
  { name: "Cinisello Balsamo", province: "MI", region: "Lombardia", cap: ["20092"] },
  { name: "Sesto San Giovanni", province: "MI", region: "Lombardia", cap: ["20099"] },
  { name: "Rho", province: "MI", region: "Lombardia", cap: ["20017"] },
  { name: "Cologno Monzese", province: "MI", region: "Lombardia", cap: ["20093"] },
  { name: "Desio", province: "MB", region: "Lombardia", cap: ["20832"] },
  { name: "Seregno", province: "MB", region: "Lombardia", cap: ["20831"] },
  { name: "Lissone", province: "MB", region: "Lombardia", cap: ["20851"] },
  { name: "Cesano Maderno", province: "MB", region: "Lombardia", cap: ["20811"] },
  { name: "Limbiate", province: "MB", region: "Lombardia", cap: ["20812"] },
  { name: "Nova Milanese", province: "MB", region: "Lombardia", cap: ["20834"] },
  { name: "Muggiò", province: "MB", region: "Lombardia", cap: ["20835"] },
  { name: "Vedano al Lambro", province: "MB", region: "Lombardia", cap: ["20854"] },
  { name: "Biassono", province: "MB", region: "Lombardia", cap: ["20853"] },
  { name: "Meda", province: "MB", region: "Lombardia", cap: ["20821"] },
  { name: "Seveso", province: "MB", region: "Lombardia", cap: ["20822"] },
  { name: "Barlassina", province: "MB", region: "Lombardia", cap: ["20825"] },
  { name: "Cogliate", province: "MB", region: "Lombardia", cap: ["20815"] },
  { name: "Ceriano Laghetto", province: "MB", region: "Lombardia", cap: ["20816"] },
  { name: "Misinto", province: "MB", region: "Lombardia", cap: ["20826"] },
  { name: "Lazzate", province: "MB", region: "Lombardia", cap: ["20824"] },
  { name: "Giussano", province: "MB", region: "Lombardia", cap: ["20833"] },
  { name: "Carate Brianza", province: "MB", region: "Lombardia", cap: ["20841"] },
  { name: "Besana in Brianza", province: "MB", region: "Lombardia", cap: ["20842"] },
  { name: "Triuggio", province: "MB", region: "Lombardia", cap: ["20844"] },
  { name: "Sovico", province: "MB", region: "Lombardia", cap: ["20845"] },
  { name: "Albiate", province: "MB", region: "Lombardia", cap: ["20847"] },
  { name: "Bovisio-Masciago", province: "MB", region: "Lombardia", cap: ["20813"] },
  { name: "Varedo", province: "MB", region: "Lombardia", cap: ["20814"] },
  { name: "Paderno Dugnano", province: "MI", region: "Lombardia", cap: ["20037"] },
  { name: "Cusano Milanino", province: "MI", region: "Lombardia", cap: ["20095"] },
  { name: "Bresso", province: "MI", region: "Lombardia", cap: ["20091"] },
  { name: "Cormano", province: "MI", region: "Lombardia", cap: ["20032"] },
  { name: "Novate Milanese", province: "MI", region: "Lombardia", cap: ["20026"] },
  { name: "Bollate", province: "MI", region: "Lombardia", cap: ["20021"] },
  { name: "Baranzate", province: "MI", region: "Lombardia", cap: ["20021"] },
  { name: "Garbagnate Milanese", province: "MI", region: "Lombardia", cap: ["20024"] },
  { name: "Arese", province: "MI", region: "Lombardia", cap: ["20020"] },
  { name: "Lainate", province: "MI", region: "Lombardia", cap: ["20020"] },
  { name: "Pogliano Milanese", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Pregnana Milanese", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Vanzago", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Pieve Emanuele", province: "MI", region: "Lombardia", cap: ["20090"] },
  { name: "Rozzano", province: "MI", region: "Lombardia", cap: ["20089"] },
  { name: "Basiglio", province: "MI", region: "Lombardia", cap: ["20079"] },
  { name: "Opera", province: "MI", region: "Lombardia", cap: ["20090"] },
  { name: "San Donato Milanese", province: "MI", region: "Lombardia", cap: ["20097"] },
  { name: "San Giuliano Milanese", province: "MI", region: "Lombardia", cap: ["20098"] },
  { name: "Melegnano", province: "MI", region: "Lombardia", cap: ["20077"] },
  { name: "Peschiera Borromeo", province: "MI", region: "Lombardia", cap: ["20068"] },
  { name: "Mediglia", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Pantigliate", province: "MI", region: "Lombardia", cap: ["20090"] },
  { name: "Rodano", province: "MI", region: "Lombardia", cap: ["20090"] },
  { name: "Settala", province: "MI", region: "Lombardia", cap: ["20090"] },
  { name: "Pioltello", province: "MI", region: "Lombardia", cap: ["20096"] },
  { name: "Segrate", province: "MI", region: "Lombardia", cap: ["20090"] },
  { name: "Vimodrone", province: "MI", region: "Lombardia", cap: ["20090"] },
  { name: "Cernusco sul Naviglio", province: "MI", region: "Lombardia", cap: ["20063"] },
  { name: "Cassina de' Pecchi", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Bussero", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Gorgonzola", province: "MI", region: "Lombardia", cap: ["20064"] },
  { name: "Pessano con Bornago", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Carugate", province: "MI", region: "Lombardia", cap: ["20061"] },
  { name: "Agrate Brianza", province: "MB", region: "Lombardia", cap: ["20864"] },
  { name: "Brugherio", province: "MB", region: "Lombardia", cap: ["20861"] },
  { name: "Caponago", province: "MB", region: "Lombardia", cap: ["20867"] },
  { name: "Cambiago", province: "MI", region: "Lombardia", cap: ["20040"] },
  { name: "Basiano", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Masate", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Pozzo d'Adda", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Trezzano Rosa", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Grezzago", province: "MI", region: "Lombardia", cap: ["20056"] },
  { name: "Vaprio d'Adda", province: "MI", region: "Lombardia", cap: ["20069"] },
  { name: "Trezzo sull'Adda", province: "MI", region: "Lombardia", cap: ["20056"] },
  { name: "Capriate San Gervasio", province: "BG", region: "Lombardia", cap: ["24042"] },
  { name: "Filago", province: "BG", region: "Lombardia", cap: ["24040"] },
  { name: "Medolago", province: "BG", region: "Lombardia", cap: ["24030"] },
  { name: "Suisio", province: "BG", region: "Lombardia", cap: ["24040"] },
  { name: "Bottanuco", province: "BG", region: "Lombardia", cap: ["24040"] },
  { name: "Calusco d'Adda", province: "BG", region: "Lombardia", cap: ["24033"] },
  { name: "Villa d'Adda", province: "BG", region: "Lombardia", cap: ["24030"] },
  { name: "Cornate d'Adda", province: "MB", region: "Lombardia", cap: ["20040"] },
  { name: "Porto d'Adda", province: "MI", region: "Lombardia", cap: ["20040"] },
  { name: "Cassano d'Adda", province: "MI", region: "Lombardia", cap: ["20062"] },
  { name: "Inzago", province: "MI", region: "Lombardia", cap: ["20065"] },
  { name: "Bellinzago Lombardo", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Pozzuolo Martesana", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Melzo", province: "MI", region: "Lombardia", cap: ["20066"] },
  { name: "Liscate", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Vignate", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Zelo Buon Persico", province: "LO", region: "Lombardia", cap: ["26839"] },
  { name: "Paullo", province: "MI", region: "Lombardia", cap: ["20067"] },
  { name: "Tribiano", province: "MI", region: "Lombardia", cap: ["20067"] },
  { name: "Dresano", province: "MI", region: "Lombardia", cap: ["20070"] },
  { name: "Colturano", province: "MI", region: "Lombardia", cap: ["20070"] },
  { name: "Vizzolo Predabissi", province: "MI", region: "Lombardia", cap: ["20070"] },
  { name: "Cerro al Lambro", province: "MI", region: "Lombardia", cap: ["20070"] },
  { name: "San Zenone al Lambro", province: "MI", region: "Lombardia", cap: ["20070"] },
  { name: "Mediglia", province: "MI", region: "Lombardia", cap: ["20060"] },
  { name: "Carpiano", province: "MI", region: "Lombardia", cap: ["20080"] },
  { name: "Locate di Triulzi", province: "MI", region: "Lombardia", cap: ["20085"] },
  { name: "Siziano", province: "PV", region: "Lombardia", cap: ["27010"] },
  { name: "Binasco", province: "MI", region: "Lombardia", cap: ["20082"] },
  { name: "Noviglio", province: "MI", region: "Lombardia", cap: ["20082"] },
  { name: "Zibido San Giacomo", province: "MI", region: "Lombardia", cap: ["20080"] },
  { name: "Lacchiarella", province: "MI", region: "Lombardia", cap: ["20084"] },
  { name: "Rosate", province: "MI", region: "Lombardia", cap: ["20088"] },
  { name: "Bubbiano", province: "MI", region: "Lombardia", cap: ["20080"] },
  { name: "Calvignasco", province: "MI", region: "Lombardia", cap: ["20080"] },
  { name: "Besate", province: "MI", region: "Lombardia", cap: ["20080"] },
  { name: "Morimondo", province: "MI", region: "Lombardia", cap: ["20081"] },
  { name: "Abbiategrasso", province: "MI", region: "Lombardia", cap: ["20081"] },
  { name: "Albairate", province: "MI", region: "Lombardia", cap: ["20080"] },
  { name: "Cisliano", province: "MI", region: "Lombardia", cap: ["20080"] },
  { name: "Vittuone", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Arluno", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Santo Stefano Ticino", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Mesero", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Marcallo con Casone", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Ossona", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Magenta", province: "MI", region: "Lombardia", cap: ["20013"] },
  { name: "Robecco sul Naviglio", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Corbetta", province: "MI", region: "Lombardia", cap: ["20011"] },
  { name: "Casorezzo", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Busto Garolfo", province: "MI", region: "Lombardia", cap: ["20020"] },
  { name: "Inveruno", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Cuggiono", province: "MI", region: "Lombardia", cap: ["20012"] },
  { name: "Bernate Ticino", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Boffalora sopra Ticino", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Castano Primo", province: "MI", region: "Lombardia", cap: ["20022"] },
  { name: "Nosate", province: "MI", region: "Lombardia", cap: ["20020"] },
  { name: "Lonate Pozzolo", province: "VA", region: "Lombardia", cap: ["21015"] },
  { name: "Ferno", province: "VA", region: "Lombardia", cap: ["21010"] },
  { name: "Samarate", province: "VA", region: "Lombardia", cap: ["21017"] },
  { name: "Cardano al Campo", province: "VA", region: "Lombardia", cap: ["21010"] },
  { name: "Gallarate", province: "VA", region: "Lombardia", cap: ["21013"] },
  { name: "Busto Arsizio", province: "VA", region: "Lombardia", cap: ["21052"] },
  { name: "Legnano", province: "MI", region: "Lombardia", cap: ["20025"] },
  { name: "Parabiago", province: "MI", region: "Lombardia", cap: ["20015"] },
  { name: "Nerviano", province: "MI", region: "Lombardia", cap: ["20014"] },
  { name: "San Giorgio su Legnano", province: "MI", region: "Lombardia", cap: ["20010"] },
  { name: "Villa Cortese", province: "MI", region: "Lombardia", cap: ["20020"] },
  { name: "Dairago", province: "MI", region: "Lombardia", cap: ["20020"] },
  { name: "Rescaldina", province: "MI", region: "Lombardia", cap: ["20027"] },
  { name: "Uboldo", province: "VA", region: "Lombardia", cap: ["21040"] },
  { name: "Origgio", province: "VA", region: "Lombardia", cap: ["21040"] },
  { name: "Saronno", province: "VA", region: "Lombardia", cap: ["21047"] },
  { name: "Caronno Pertusella", province: "VA", region: "Lombardia", cap: ["21042"] },
  { name: "Gerenzano", province: "VA", region: "Lombardia", cap: ["21040"] },
  { name: "Turate", province: "CO", region: "Lombardia", cap: ["22078"] },
  { name: "Lomazzo", province: "CO", region: "Lombardia", cap: ["22074"] },
  { name: "Bregnano", province: "CO", region: "Lombardia", cap: ["22070"] },
  { name: "Lentate sul Seveso", province: "MB", region: "Lombardia", cap: ["20823"] },
  { name: "Cesano Maderno", province: "MB", region: "Lombardia", cap: ["20811"] }
];

// Funzione per cercare comuni
export const searchCities = (query: string): ItalianCity[] => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return ITALIAN_CITIES.filter(city => 
    city.name.toLowerCase().includes(normalizedQuery) ||
    city.province.toLowerCase().includes(normalizedQuery) ||
    city.region.toLowerCase().includes(normalizedQuery)
  ).slice(0, 10); // Limita a 10 risultati
};

// Funzione per ottenere i CAP di un comune
export const getCityPostalCodes = (cityName: string): string[] => {
  const city = ITALIAN_CITIES.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  return city ? city.cap : [];
};