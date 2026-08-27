import { useState } from 'react';
import { X, Star, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import styles from './ProductModal.module.css';

export const ProductModal = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setSelectedProductModal(null);
    }, 600);
  };

  return (
    <div className={styles.backdrop} onClick={() => setSelectedProductModal(null)}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className={styles.closeBtn} 
          onClick={() => setSelectedProductModal(null)}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className={styles.contentGrid}>
          {/* Image */}
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.name} className={styles.productImg} />
          </div>

          {/* Details */}
          <div className={styles.infoWrapper}>
            <div className={styles.headerInfo}>
              <div className={styles.badgeCategory}>
                <span className={styles.categoryTag}>{product.category}</span>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
              </div>

              <h2 className={styles.title}>{product.name}</h2>

              <div className={styles.ratingRow}>
                <div className={styles.stars}>
                  <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewsCount} reseñas verificadas</span>
              </div>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.price}>
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>
                  ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Technical Specs */}
            <div className={styles.specsSection}>
              <h4 className={styles.specsTitle}>Especificaciones Clave</h4>
              <div className={styles.specsGrid}>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specKey}>{key}: </span>
                    <span className={styles.specVal}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actionSection}>
              <div className={styles.qtyPicker}>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  aria-label="Disminuir"
                >
                  <Minus size={16} />
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(prev => prev + 1)}
                  aria-label="Aumentar"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                className={styles.addBtn}
                onClick={handleAddToCart}
              >
                {addedAnimation ? (
                  <>
                    <Check size={18} />
                    <span>¡Añadido!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Añadir al Carrito</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
