import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar/Navbar';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { ProductModal } from './components/ProductModal/ProductModal';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import { Sparkles, Truck, ShieldCheck, RefreshCw, Zap, ArrowDown } from 'lucide-react';
import styles from './App.module.css';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <CartProvider>
      <div className={styles.app}>
        <div className={styles.ambientGlow1} />
        <div className={styles.ambientGlow2} />

        {/* Navigation Bar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Hero Showcase */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <Sparkles size={16} />
            <span>Colección Exclusiva 2026</span>
          </div>

          <h1 className={styles.heroTitle}>
            Tecnología y Gadgets de <br />
            <span className={styles.gradientText}>Próxima Generación</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Diseñados para creadores, profesionales y apasionados de la innovación.
            Envío exprés gratuito y garantía de satisfacción total.
          </p>

          <div className={styles.heroActions}>
            <a href="#catalog" className={styles.ctaBtn}>
              <span>Explorar Catálogo</span>
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        {/* Value Proposition Highlights */}
        <section className={styles.featureBar}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Truck size={22} />
            </div>
            <div>
              <div className={styles.featureTitle}>Envío Gratuito</div>
              <div className={styles.featureDesc}>En todos los pedidos mayores a $50</div>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className={styles.featureTitle}>Garantía de 2 Años</div>
              <div className={styles.featureDesc}>Cobertura total contra defectos</div>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <RefreshCw size={22} />
            </div>
            <div>
              <div className={styles.featureTitle}>Devolución Fácil</div>
              <div className={styles.featureDesc}>30 días sin preguntas</div>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Zap size={22} />
            </div>
            <div>
              <div className={styles.featureTitle}>Pago 100% Seguro</div>
              <div className={styles.featureDesc}>Encriptación SSL 256-bit</div>
            </div>
          </div>
        </section>

        {/* Main Product Catalog */}
        <main className={styles.main}>
          <ProductGrid />
        </main>

        {/* Footers & Drawers */}
        <CartDrawer />
        <ProductModal />
        <CheckoutModal />

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerTop}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                <Zap size={22} color="var(--accent-primary)" />
                <span>Nexus<span className={styles.gradientText}>Store</span></span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                La tienda definitiva para hardware y tecnología de vanguardia.
              </p>
            </div>

            <div className={styles.footerCopy}>
              <p>© {new Date().getFullYear()} NexusStore. Todos los derechos reservados. Desarrollado con React 19 + TypeScript + Vite.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
