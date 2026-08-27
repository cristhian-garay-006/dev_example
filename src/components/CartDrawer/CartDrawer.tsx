import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    tax,
    total,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleStartCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className={styles.backdrop} onClick={() => setIsCartOpen(false)}>
      <aside 
        className={styles.drawer} 
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.title}>
            <ShoppingBag size={20} />
            <span>Tu Carrito</span>
            <span className={styles.itemCountBadge}>{totalItems}</span>
          </div>

          <button 
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag size={56} className={styles.emptyIcon} />
            <h3>Tu carrito está vacío</h3>
            <p>Descubre nuestros productos premium y agrega tus artículos favoritos.</p>
            <button 
              className={styles.exploreBtn}
              onClick={() => setIsCartOpen(false)}
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <div className={styles.itemList}>
            {cart.map(item => (
              <div key={item.product.id} className={styles.itemCard}>
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className={styles.itemImg}
                />
                
                <div className={styles.itemDetails}>
                  <h4 className={styles.itemName}>{item.product.name}</h4>
                  <div className={styles.itemPrice}>
                    ${(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>

                  <div className={styles.itemControls}>
                    <div className={styles.qtyGroup}>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={14} />
                      </button>
                      <span className={styles.qtyNum}>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Eliminar producto"
                      title="Eliminar del carrito"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer with totals */}
        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Impuestos estimados (16%)</span>
              <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total a pagar</span>
              <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>

            <button 
              className={styles.checkoutBtn}
              onClick={handleStartCheckout}
            >
              <span>Proceder al Pago</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
