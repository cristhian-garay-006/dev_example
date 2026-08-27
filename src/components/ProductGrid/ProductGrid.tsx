import { useMemo } from 'react';
import { PackageOpen } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../ProductCard/ProductCard';
import type { CategoryFilter } from '../../types';
import styles from './ProductGrid.module.css';

export const ProductGrid = () => {
  const { 
    searchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    sortBy, 
    setSortBy,
    setSearchQuery 
  } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        Object.values(product.specs).some(spec => spec.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <section className={styles.section} id="catalog">
      <div className={styles.controlsBar}>
        {/* Category Pills */}
        <div className={styles.categoryPills}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.pill} ${selectedCategory === cat.id ? styles.pillActive : ''}`}
              onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Counter & Sorting */}
        <div className={styles.filterHeader}>
          <div className={styles.resultsCount}>
            Mostrando <span className={styles.resultsCountHighlight}>{filteredProducts.length}</span> productos
            {searchQuery && ` para "${searchQuery}"`}
          </div>

          <select 
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Ordenar productos"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Calificados</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <PackageOpen size={48} className={styles.noResultsIcon} />
          <h3>No se encontraron productos</h3>
          <p>No encontramos ningún resultado que coincida con tus criterios de búsqueda o filtro.</p>
          <button 
            className={styles.resetBtn}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </section>
  );
};
