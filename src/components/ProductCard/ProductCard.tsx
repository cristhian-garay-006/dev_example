import { Star, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, setSelectedProductModal } = useCart();

  return (
    <div className={styles.card}>
      {/* Image & Quick Actions */}
      <div 
        className={styles.imageContainer}
        onClick={() => setSelectedProductModal(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className={styles.productImage}
          loading="lazy"
        />
        {product.badge && (
          <span className={styles.badge}>{product.badge}</span>
        )}
        <button 
          className={styles.quickViewBtn} 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProductModal(product);
          }}
        >
          <Eye size={14} />
          <span>Vista rápida</span>
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.categoryRating}>
          <span className={styles.categoryTag}>{product.category}</span>
          <div className={styles.rating}>
            <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
            <span>{product.rating}</span>
            <span className={styles.ratingCount}>({product.reviewsCount})</span>
          </div>
        </div>

        <h3 
          className={styles.title}
          onClick={() => setSelectedProductModal(product)}
        >
          {product.name}
        </h3>

        <p className={styles.tagline}>{product.tagline}</p>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.currentPrice}>
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          <button 
            className={styles.addBtn}
            onClick={() => addToCart(product)}
            title="Añadir al carrito"
          >
            <ShoppingBag size={16} />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
