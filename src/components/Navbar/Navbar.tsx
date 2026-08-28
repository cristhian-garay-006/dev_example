import { Search, ShoppingBag, Moon, Sun, X, Zap, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const { 
    totalItems, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery, 
    setSelectedCategory,
    ordersHistory,
    setIsOrdersModalOpen 
  } = useCart();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand */}
        <div 
          className={styles.brand} 
          onClick={() => {
            setSelectedCategory('all');
            setSearchQuery('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className={styles.brandLogo}>
            <Zap size={22} />
          </div>
          <span>Nexus<span className={styles.brandGradient}>Store</span></span>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por nombre, categoría o especificación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className={styles.clearSearch} 
              onClick={() => setSearchQuery('')}
              aria-label="Limpiar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className={styles.navActions}>
          <button 
            className={styles.actionBtn} 
            onClick={toggleTheme} 
            aria-label="Cambiar tema"
            title="Cambiar tema claro/oscuro"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button 
            className={styles.actionBtn} 
            onClick={() => setIsOrdersModalOpen(true)}
            aria-label="Mis Pedidos y Rastreo"
            title="Mis Pedidos y Rastreo de Envío"
          >
            <Package size={19} />
            {ordersHistory.length > 0 && (
              <span className={styles.cartBadge}>{ordersHistory.length}</span>
            )}
          </button>

          <button 
            className={styles.actionBtn} 
            onClick={() => setIsCartOpen(true)}
            aria-label="Ver carrito"
            title="Abrir carrito"
          >
            <ShoppingBag size={19} />
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

