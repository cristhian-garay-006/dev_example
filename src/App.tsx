import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { 
  Zap, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Moon, 
  Sun, 
  ArrowRight, 
  GitBranch, 
  Plus, 
  Minus, 
  RotateCcw 
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Vite 6 + React 19',
      desc: 'Hot Module Replacement ultra rápido y la última versión de React con soporte completo para TypeScript.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'CSS Modules Moderno',
      desc: 'Diseño modular, con temas dinámicos (Dark/Light), glassmorphism y variables CSS fluidas.'
    },
    {
      icon: <Layers size={24} />,
      title: 'Estructura Escalable',
      desc: 'Estructura lista para producción, separación limpia de componentes y utilidades.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Tipado Fuerte',
      desc: 'TypeScript configurado estrictamente para una experiencia de desarrollo libre de bugs.'
    }
  ];

  return (
    <div className={styles.appContainer}>
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowBottom} />

      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <Zap size={20} />
            </div>
            <span>DevExample</span>
          </div>

          <div className={styles.navActions}>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className={styles.themeToggle}
              aria-label="GitHub repository"
            >
              <GitBranch size={18} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>React + TypeScript + Vite</span>
          </div>
          
          <h1 className={styles.title}>
            Construye aplicaciones <br />
            <span className={styles.titleGradient}>rápidas y modernas</span>
          </h1>

          <p className={styles.subtitle}>
            Tu entorno de desarrollo está listo. Personaliza este template y empieza a construir interfaces increíbles con la máxima velocidad y rendimiento.
          </p>

          <div className={styles.heroActions}>
            <a href="#demo-interactive" className={styles.btnPrimary}>
              <span>Probar interactividad</span>
              <ArrowRight size={18} />
            </a>
            <a 
              href="https://react.dev" 
              target="_blank" 
              rel="noreferrer" 
              className={styles.btnSecondary}
            >
              Documentación
            </a>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className={styles.grid}>
          {features.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Interactive State Demo */}
        <section id="demo-interactive" className={styles.counterSection}>
          <div>
            <h2 className={styles.cardTitle}>Demostración de Estado React</h2>
            <p className={styles.cardDesc}>Interactúa con el contador para ver React en acción</p>
          </div>

          <div className={styles.counterValue}>{count}</div>

          <div className={styles.counterButtons}>
            <button 
              className={styles.counterBtn} 
              onClick={() => setCount(prev => prev - 1)}
              aria-label="Decrementar"
            >
              <Minus size={18} />
            </button>
            <button 
              className={styles.counterBtn} 
              onClick={() => setCount(0)}
              aria-label="Resetear"
            >
              <RotateCcw size={18} />
            </button>
            <button 
              className={styles.counterBtn} 
              onClick={() => setCount(prev => prev + 1)}
              aria-label="Incrementar"
            >
              <Plus size={18} />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} DevExample - Proyecto React Vite listo para producción.</p>
      </footer>
    </div>
  );
}
