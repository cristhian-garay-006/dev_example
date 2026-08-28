import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, CartItem, OrderConfirmation, CategoryFilter, OrderStatus } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: OrderConfirmation | null;
  setLastOrder: (order: OrderConfirmation | null) => void;
  ordersHistory: OrderConfirmation[];
  addOrderToHistory: (order: OrderConfirmation) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  isOrdersModalOpen: boolean;
  setIsOrdersModalOpen: (open: boolean) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (orderId: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryFilter;
  setSelectedCategory: (cat: CategoryFilter) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'devexample_ecommerce_cart';
const ORDERS_STORAGE_KEY = 'devexample_ecommerce_orders';

const DEFAULT_MOCK_ORDERS: OrderConfirmation[] = [
  {
    orderId: 'NEXUS-89412',
    customerName: 'Carlos Mendoza',
    customerEmail: 'carlos.mendoza@example.com',
    address: 'Av. Javier Prado Este 2450, San Borja',
    city: 'Lima',
    zipCode: '15036',
    subtotal: 1299.00,
    tax: 207.84,
    total: 1506.84,
    date: '26 de Agosto, 2026 14:30',
    timestamp: Date.now() - 86400000,
    status: 'shipped',
    trackingNumber: 'NX-TRK-894120',
    carrier: 'Nexus Express Logistics',
    estimatedDelivery: '28 de Agosto, 2026',
    items: [
      {
        product: {
          id: 'p1',
          name: 'Nexus Pro Max 15',
          tagline: 'Superpotencia con chip M3 Ultra y pantalla Liquid Retina XDR',
          description: 'El smartphone definitivo para creadores exigentes. Cámara de 200MP y cuerpo de titanio.',
          price: 1299,
          originalPrice: 1499,
          category: 'smartphones',
          rating: 4.9,
          reviewsCount: 128,
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
          stock: 15,
          badge: 'HOT',
          specs: { Pantalla: '6.7" OLED 120Hz', Procesador: 'M3 Ultra', Batería: '5000 mAh' }
        },
        quantity: 1
      }
    ],
    timeline: [
      { status: 'processing', title: 'Orden Confirmada', description: 'Pago verificado y pedido recibido en el sistema.', timestamp: '26 Ago, 14:30', completed: true },
      { status: 'packed', title: 'Empaquetado en Almacén', description: 'Producto verificado y embalado con protección premium.', timestamp: '26 Ago, 18:15', completed: true },
      { status: 'shipped', title: 'En Camino con Repartidor', description: 'El paquete se encuentra en tránsito en la unidad móvil NX-402.', timestamp: '27 Ago, 09:00', completed: true },
      { status: 'delivered', title: 'Entrega Programada', description: 'Paquete listo para recibir en la dirección especificada.', timestamp: 'Pendiente', completed: false }
    ]
  }
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [ordersHistory, setOrdersHistory] = useState<OrderConfirmation[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_MOCK_ORDERS;
    } catch {
      return DEFAULT_MOCK_ORDERS;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersHistory));
    } catch (e) {
      console.error('Error saving orders to localStorage', e);
    }
  }, [ordersHistory]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrderToHistory = (order: OrderConfirmation) => {
    setOrdersHistory(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    const statusOrder: OrderStatus[] = ['processing', 'packed', 'shipped', 'delivered'];
    const targetIdx = statusOrder.indexOf(nextStatus);
    const nowFormatted = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    setOrdersHistory(prev =>
      prev.map(ord => {
        if (ord.orderId !== orderId) return ord;

        const updatedTimeline = ord.timeline.map((step) => {
          const stepIdx = statusOrder.indexOf(step.status);
          const isCompleted = stepIdx <= targetIdx;
          return {
            ...step,
            completed: isCompleted,
            timestamp: isCompleted && step.timestamp === 'Pendiente' ? `Hoy, ${nowFormatted}` : step.timestamp
          };
        });

        return {
          ...ord,
          status: nextStatus,
          timeline: updatedTimeline
        };
      })
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.16; // 16% IVA simulado
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        tax,
        total,
        isCartOpen,
        setIsCartOpen,
        selectedProductModal,
        setSelectedProductModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,
        ordersHistory,
        addOrderToHistory,
        updateOrderStatus,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
