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

        {/* Floating WhatsApp Action Button */}
        <a
          href="https://wa.me/51999999999?text=Hola!%20Deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos%20de%20la%20tienda"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappFloat}
          aria-label="Contactar por WhatsApp"
          title="Chatea con nosotros por WhatsApp"
        >
          <svg
            className={styles.whatsappIcon}
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className={styles.whatsappTooltip}>¿Necesitas ayuda? ¡Escríbenos!</span>
        </a>
      </div>
    </CartProvider>
  );
}
