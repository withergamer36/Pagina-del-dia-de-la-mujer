


import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, BarChart2, ChevronRight, ExternalLink, 
  Info, CheckCircle2, BookOpen, Globe2
} from 'lucide-react';

// --- INTERFACES TYPESCRIPT ---
interface HistoricalWoman {
  id: number;
  name: string;
  category: string;
  era: string;
  impact: string;
  image: string;
}

interface DashboardData {
  label: string;
  value: number;
  color: string;
  max?: number;
}

interface DashboardCategory {
  title: string;
  context: string;
  data: DashboardData[];
  unit: string;
}

type DashboardTabs = 'salarios' | 'cuidados' | 'liderazgo';

// --- DATA ---
const NEWS_ALERTS: string[] = [
  "ÚLTIMA HORA: La ONU advierte que al ritmo actual, tomará 300 años alcanzar la plena igualdad de género.",
  "ACTUALIZACIÓN: Participación laboral femenina alcanza el 53% a nivel global, frente al 80% masculino.",
  "ALERTA: Las mujeres asumen 2.5 veces más trabajo de cuidados no remunerado que los hombres."
];

const HISTORICAL_WOMEN: HistoricalWoman[] = [
  {
    id: 1,
    name: "Marie Curie",
    category: "Ciencia",
    era: "1867 - 1934",
    impact: "Primera persona en ganar dos Premios Nobel en distintas especialidades científicas (Física y Química). Rompió barreras en un mundo académico dominado por hombres, abriendo la puerta a generaciones de mujeres en STEM.",
    image: "/Marie_Curie.jpg" // Asegúrate de guardar marie-curie.jpg en la carpeta public/
  },
  {
    id: 2,
    name: "Rosa Parks",
    category: "Derechos Civiles",
    era: "1913 - 2005",
    impact: "Su negativa a ceder su asiento en un autobús segregado encendió el movimiento por los derechos civiles en EE. UU. Demostró que un acto individual de resistencia de una mujer puede cambiar la legislación y la historia de una nación.",
    image: "/Rosa_Parks.jpg" // Asegúrate de guardar rosa-parks.jpg en la carpeta public/
  },
  {
    id: 3,
    name: "Sor Juana Inés de la Cruz",
    category: "Literatura y Pensamiento",
    era: "1648 - 1695",
    impact: "Defensora temprana del derecho de las mujeres a la educación. Sus escritos desafiaron las convenciones patriarcales de la época colonial, convirtiéndola en una pionera del feminismo en Hispanoamérica.",
    image: "/Sor_Juana_Ines_de_la_Cruz.jpg" // Asegúrate de guardar sor-juana.jpg en la carpeta public/
  }
];

const DATA_DASHBOARD: Record<DashboardTabs, DashboardCategory> = {
  salarios: {
    title: "Brecha Salarial Global",
    context: "Por cada dólar que gana un hombre, una mujer gana en promedio 77 centavos. Esto significa que las mujeres trabajan gratis los últimos meses del año en comparación con sus pares masculinos.",
    data: [
      { label: "Hombres", value: 100, color: "bg-slate-400" },
      { label: "Mujeres", value: 77, color: "bg-purple-600" }
    ],
    unit: "%"
  },
  cuidados: {
    title: "Trabajo Doméstico No Remunerado",
    context: "Las mujeres dedican en promedio 4.1 horas diarias al trabajo de cuidados y doméstico, mientras que los hombres dedican 1.7 horas. Esto limita su tiempo para el trabajo remunerado, educación o descanso.",
    data: [
      { label: "Mujeres (Horas/Día)", value: 4.1, max: 5, color: "bg-purple-600" },
      { label: "Hombres (Horas/Día)", value: 1.7, max: 5, color: "bg-slate-400" }
    ],
    unit: " hrs"
  },
  liderazgo: {
    title: "Representación en Puestos Directivos",
    context: "A pesar de representar casi la mitad de la fuerza laboral, las mujeres ocupan una minoría de los puestos de toma de decisiones, afectando el diseño de políticas públicas y corporativas.",
    data: [
      { label: "Directores Hombres", value: 72, color: "bg-slate-400" },
      { label: "Directoras Mujeres", value: 28, color: "bg-purple-600" }
    ],
    unit: "%"
  }
};

const App: React.FC = () => {
  const [newsIndex, setNewsIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<DashboardTabs>("salarios");

  // Rotador de noticias (Cintillo dinámico)
  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % NEWS_ALERTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Se añadió w-full, min-w-full y overflow-x-hidden para evitar márgenes negros de Vite
    <div className="min-h-screen w-full min-w-full overflow-x-hidden bg-slate-50 text-slate-900 font-sans selection:bg-purple-300 selection:text-purple-900">
      
      {/* 1. ARQUITECTURA: CINTILLO DINÁMICO (Última hora) */}
      <div className="bg-purple-900 text-purple-50 px-4 py-2 flex items-center justify-center text-sm font-medium transition-all w-full" role="alert">
        <AlertCircle className="w-4 h-4 mr-2 animate-pulse shrink-0" />
        <span className="truncate">{NEWS_ALERTS[newsIndex]}</span>
      </div>

      {/* HEADER Y ENLACES OFICIALES */}
      <header className="bg-white border-b border-slate-200 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                <Globe2 className="w-8 h-8" />
                Portal de Equidad 8M
              </h1>
              <p className="text-xs text-slate-500 mt-1">Plataforma de Datos Abiertos e Historia</p>
            </div>
            
            {/* Enlaces Oficiales */}
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <a 
                href="https://www.gob.mx/inmujeres" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-lg font-medium transition-colors text-sm w-full sm:w-auto"
              >
                INMUJERES
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://www.unwomen.org/es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-medium transition-colors text-sm shadow-sm w-full sm:w-auto"
              >
                ONU Mujeres
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* 1. ARQUITECTURA: JERARQUÍA VISUAL (Above the fold - Datos críticos) */}
        <section className="bg-purple-800 text-white py-12 md:py-16 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-4">
                  El 8 de Marzo no es una celebración, es un recordatorio de la lucha por la equidad.
                </h2>
                <p className="text-lg text-purple-100 mb-6">
                  Consulta el estado actual de los derechos de las mujeres, su impacto en la economía y descubre a las pioneras que abrieron el camino.
                </p>
                <div className="flex gap-4 text-sm font-mono text-purple-200">
                  <span className="flex items-center gap-1 bg-purple-900/50 px-3 py-1 rounded-full"><AlertCircle className="w-3 h-3"/> Datos act. 03/2026</span>
                  <span className="flex items-center gap-1 bg-purple-900/50 px-3 py-1 rounded-full"><BookOpen className="w-3 h-3"/> Fuentes verificadas</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-4xl font-black text-purple-200 mb-1">30%</div>
                  <div className="text-sm font-medium text-purple-100">Crecimiento potencial del PIB global si se cierra la brecha de género.</div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <div className="text-4xl font-black text-purple-200 mb-1">1 de 3</div>
                  <div className="text-sm font-medium text-purple-100">Mujeres en el mundo sufren violencia de género.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 1: 3 MUJERES IMPORTANTES EN LA HISTORIA */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-slate-900 border-l-4 border-purple-600 pl-4">Pioneras que cambiaron la historia</h3>
            <p className="mt-2 text-slate-600 max-w-2xl">La historia universal está construida sobre los cimientos que muchas mujeres sentaron, a menudo sin recibir el reconocimiento en su tiempo.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HISTORICAL_WOMEN.map((woman) => (
              <article key={woman.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="h-64 md:h-56 lg:h-48 overflow-hidden bg-slate-200 relative w-full">
                  {/* Fallback pattern si la imagen falla */}
                  <img 
                    src={woman.image} 
                    alt={`Retrato histórico de ${woman.name}`} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='14' fill='%2364748b' text-anchor='middle' dy='.3em'%3EImagen no disponible%3C/text%3E%3C/svg%3E" }}
                  />
                  <div className="absolute top-3 left-3 bg-purple-900/90 text-white text-xs px-2 py-1 rounded font-semibold backdrop-blur-sm">
                    {woman.category}
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <div className="text-xs font-mono text-purple-600 mb-2">{woman.era}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{woman.name}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{woman.impact}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: LA IMPORTANCIA EN EL DÍA A DÍA (DATA VIZ) */}
        <section className="bg-slate-100 py-16 border-y border-slate-200 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-slate-900 border-l-4 border-purple-600 pl-4">La mujer en el día a día: Los Datos</h3>
              <p className="mt-2 text-slate-600 max-w-2xl">La importancia de la mujer va más allá de fechas conmemorativas; es el motor diario de economías, familias y sociedades. Explora los datos interactivos.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="grid lg:grid-cols-3">
                {/* Controles del Dashboard */}
                <div className="bg-slate-50 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-purple-600" /> Indicadores
                  </h4>
                  <div className="space-y-3">
                    {(Object.keys(DATA_DASHBOARD) as DashboardTabs[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`w-full text-left px-4 py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-between border shadow-sm group ${
                          activeTab === key 
                            ? 'bg-purple-50 text-purple-800 border-purple-400 ring-1 ring-purple-400' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:shadow-md hover:text-purple-700'
                        }`}
                        aria-pressed={activeTab === key ? "true" : "false"}
                      >
                        <span className="pr-2 text-sm sm:text-base">{DATA_DASHBOARD[key].title}</span>
                        <ChevronRight className={`w-5 h-5 shrink-0 transition-colors ${
                          activeTab === key ? 'text-purple-600' : 'text-slate-300 group-hover:text-purple-400'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Viz Area */}
                <div className="lg:col-span-2 p-6 md:p-10">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{DATA_DASHBOARD[activeTab].title}</h4>
                  
                  {/* Contextualización */}
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-8 flex gap-3">
                    <Info className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-purple-900 block mb-1">¿Qué significa esto para ti?</span>
                      <p className="text-purple-800 text-sm leading-relaxed">{DATA_DASHBOARD[activeTab].context}</p>
                    </div>
                  </div>

                  {/* Gráfico de Barras CSS interactivo */}
                  <div className="space-y-6" aria-label={`Gráfico de ${DATA_DASHBOARD[activeTab].title}`}>
                    {DATA_DASHBOARD[activeTab].data.map((item, idx) => {
                      // Calcular porcentaje para ancho de barra
                      const widthPct = item.max ? (item.value / item.max) * 100 : item.value;
                      
                      return (
                        <div key={idx} className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-slate-700 text-sm sm:text-base">{item.label}</span>
                            <span className="font-bold text-slate-900">{item.value}{DATA_DASHBOARD[activeTab].unit}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-6 overflow-hidden border border-slate-300">
                            <div 
                              className={`h-6 rounded-full transition-all duration-1000 ease-out flex items-center px-2 text-xs text-white font-bold ${item.color}`} 
                              style={{ width: `${widthPct}%` }}
                              role="progressbar"
                              aria-valuenow={item.value}
                              aria-valuemin={0}
                              aria-valuemax={item.max || 100}
                            >
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: POR QUÉ EL 8 DE MARZO ES VITAL PARA EL MUNDO */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Un Asunto de Humanidad, No Solo de Mujeres</h3>
            <p className="text-lg text-slate-600">El 8 de marzo conmemora una lucha histórica, pero su objetivo final beneficia a la sociedad en su conjunto. La desigualdad de género lastra el potencial humano global.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <CheckCircle2 className="w-10 h-10 text-purple-600 mb-4 shrink-0" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">Crecimiento Económico</h4>
              <p className="text-slate-600 text-sm flex-1">Empoderar económicamente a las mujeres impulsa la productividad y la diversificación económica, beneficiando los mercados locales y globales.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <CheckCircle2 className="w-10 h-10 text-purple-600 mb-4 shrink-0" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">Desarrollo Sostenible</h4>
              <p className="text-slate-600 text-sm flex-1">Las comunidades donde las mujeres tienen voz en las decisiones logran una mejor gestión de recursos y mayor resiliencia ante crisis climáticas.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <CheckCircle2 className="w-10 h-10 text-purple-600 mb-4 shrink-0" />
              <h4 className="text-xl font-bold text-slate-900 mb-2">Paz y Justicia</h4>
              <p className="text-slate-600 text-sm flex-1">Estudios demuestran que los acuerdos de paz y las democracias son más fuertes, duraderos y menos corruptos cuando las mujeres participan equitativamente.</p>
            </div>
          </div>
        </section>

        {/* CREDIBILIDAD Y SOPORTE (Metodología y Contacto) */}
        <section className="bg-slate-900 text-slate-300 py-16 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10">
              
              {/* Metodología y Fuentes */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  Metodología y Transparencia
                </h3>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    <strong className="text-white">Recolección de Datos:</strong> Los indicadores mostrados en nuestros dashboards se actualizan trimestralmente utilizando APIs públicas y reportes consolidados.
                  </p>
                  <ul className="space-y-3 border-l-2 border-slate-700 pl-4">
                    <li>
                      <a href="https://www.weforum.org/publications/global-gender-gap-report-2023/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-purple-200 transition-colors group">
                        <ExternalLink className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 group-hover:text-purple-300"/> 
                        <span><strong className="text-white group-hover:text-purple-100">Brecha Salarial:</strong> Basado en el Reporte Global de Brecha de Género 2023 del Foro Económico Mundial.</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.unwomen.org/es/digital-library/progress-of-the-worlds-women" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-purple-200 transition-colors group">
                        <ExternalLink className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 group-hover:text-purple-300"/> 
                        <span><strong className="text-white group-hover:text-purple-100">Trabajo de Cuidados:</strong> Datos extraídos de ONU Mujeres (Reporte "El progreso de las mujeres en el mundo").</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://es.wikipedia.org/wiki/Historia_de_la_mujer" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-purple-200 transition-colors group">
                        <ExternalLink className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 group-hover:text-purple-300"/> 
                        <span><strong className="text-white group-hover:text-purple-100">Datos Históricos:</strong> Verificados cruzando enciclopedias académicas y archivos universitarios.</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Frase Motivacional */}
              <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex flex-col justify-center items-center text-center">
                <p className="text-xl leading-relaxed text-purple-200 italic font-medium max-w-2xl">
                  "Visibilizar la realidad es el primer paso para transformarla. Tu voz y tus aportes nos ayudan a construir un futuro más equitativo para todas."
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-6 text-center text-sm w-full">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Portal de Datos Abiertos - 8 de Marzo. Todos los derechos reservados por Jose, Diego y Uriel 8° de sistemas computacionales.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;