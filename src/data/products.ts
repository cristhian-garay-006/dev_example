import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aura Pro X Studio',
    tagline: 'Cancelación Activa de Ruido Espacial',
    description: 'Auriculares inalámbricos premium con transductores de grafeno de 40mm, audio de alta resolución y hasta 45 horas de reproducción continua. Diseñados para audiófilos y creadores.',
    price: 349.99,
    originalPrice: 429.99,
    category: 'audio',
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    badge: 'POPULAR',
    specs: {
      'Batería': '45 horas con ANC activado',
      'Conectividad': 'Bluetooth 5.3 + Jack 3.5mm',
      'Carga': 'USB-C de carga rápida',
      'Peso': '245g'
    }
  },
  {
    id: 'prod-2',
    name: 'Nebula Watch Ultra',
    tagline: 'Titanio aeroespacial y GPS de doble frecuencia',
    description: 'Smartwatch avanzado con sensor biométrico integral (ECG, SpO2, temperatura), pantalla AMOLED de 2000 nits protegida por cristal de zafiro y resistencia al agua hasta 100m.',
    price: 499.00,
    originalPrice: 599.00,
    category: 'wearables',
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    stock: 8,
    badge: 'HOT',
    specs: {
      'Pantalla': 'AMOLED 1.96 pulgadas',
      'Material': 'Caja de Titanio Grado 5',
      'Batería': 'Hasta 7 días de uso',
      'Sensores': 'ECG, Oxígeno en Sangre, GPS Dual'
    }
  },
  {
    id: 'prod-3',
    name: 'Horizon Phone 15 Pro Max',
    tagline: 'Procesador Biónico 3nm con cámara periscópica',
    description: 'El smartphone definitivo. Pantalla OLED 120Hz ProMotion, cuerpo de aleación de magnesio y sistema de triple cámara de 50MP con zoom óptico 5x de nivel cinemático.',
    price: 1199.00,
    category: 'smartphones',
    rating: 4.95,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    stock: 12,
    badge: 'NUEVO',
    specs: {
      'Pantalla': '6.7" Super Retina XDR 120Hz',
      'Almacenamiento': '256GB / 512GB / 1TB',
      'Cámara': '50MP Principal + 50MP Ultra Gran Angular + 50MP Teleobjetivo',
      'Batería': '4800 mAh con carga de 65W'
    }
  },
  {
    id: 'prod-4',
    name: 'CyberBook Max 16',
    tagline: 'Potencia desatada para desarrollo y renderizado 3D',
    description: 'Laptop para profesionales con 32GB de RAM unificada, 1TB SSD NVMe Gen4, y pantalla Liquid Retina XDR de 120Hz con 1600 nits de brillo pico. Chasis de aluminio mecanizado.',
    price: 2199.00,
    originalPrice: 2499.00,
    category: 'computing',
    rating: 4.9,
    reviewsCount: 77,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    stock: 5,
    badge: '-20%',
    specs: {
      'Procesador': '16 núcleos CPU / 40 núcleos GPU',
      'Memoria': '32GB RAM Unificada',
      'Almacenamiento': '1TB NVMe PCIe 4.0',
      'Autonomía': 'Hasta 20 horas'
    }
  },
  {
    id: 'prod-5',
    name: 'Pulse Soundbar Atmos',
    tagline: 'Sonido envolvente 7.1.4 Dolby Atmos para tu setup',
    description: 'Barra de sonido compacta para gaming y cine en casa. Conexión eARC, subwoofer inalámbrico de 8 pulgadas y calibración acústica automática por habitación.',
    price: 279.50,
    category: 'audio',
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    specs: {
      'Potencia': '380W RMS',
      'Audio': 'Dolby Atmos, DTS:X',
      'Conexión': 'HDMI eARC, Bluetooth 5.2, Óptico',
      'Subwoofer': 'Inalámbrico 8"'
    }
  },
  {
    id: 'prod-6',
    name: 'Vortex Mechanical Keyboard',
    tagline: 'Switches magnéticos con actuación ajustable a 0.1mm',
    description: 'Teclado mecánico custom inalámbrico 75% con switches magnéticos hall-effect, keycaps PBT de doble inyección, perilla multimedia de aluminio y retroiluminación RGB por tecla.',
    price: 169.00,
    originalPrice: 199.00,
    category: 'accessories',
    rating: 4.85,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    badge: 'POPULAR',
    specs: {
      'Switches': 'Magnéticos Hall Effect rápidos',
      'Formato': '75% Compacto',
      'Batería': '4000 mAh (hasta 200h)',
      'Conectividad': '2.4GHz Wireless, Bluetooth, USB-C'
    }
  },
  {
    id: 'prod-7',
    name: 'Optix Precision Mouse',
    tagline: 'Sensor 30K DPI y peso pluma de 49 gramos',
    description: 'Mouse ultraligero diseñado para máxima ergonomía y precisión en eSports y trabajo diario. Polling rate de 4000Hz y switches ópticos sin retraso.',
    price: 89.99,
    category: 'accessories',
    rating: 4.6,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    stock: 30,
    specs: {
      'Sensor': 'Óptico 30,000 DPI',
      'Peso': '49g Ultraligero',
      'Polling Rate': '4000Hz Wireless',
      'Autonomía': 'Hasta 90 horas'
    }
  },
  {
    id: 'prod-8',
    name: 'AeroPad Wireless Charging Stand',
    tagline: 'Carga simultánea 3 en 1 MagSafe de 15W',
    description: 'Estación de carga rápida magnética de aleación de zinc y acabado mate para smartphone, reloj y auriculares simultáneamente.',
    price: 79.00,
    originalPrice: 99.00,
    category: 'accessories',
    rating: 4.75,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    badge: '-20%',
    specs: {
      'Potencia Total': '25W (15W + 5W + 5W)',
      'Compatibilidad': 'MagSafe y Qi2',
      'Materiales': 'Aleación de Zinc y Silicona suave',
      'Seguridad': 'Protección contra sobrecalentamiento'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos los productos' },
  { id: 'smartphones', label: 'Smartphones' },
  { id: 'audio', label: 'Audio & Sonido' },
  { id: 'wearables', label: 'Wearables' },
  { id: 'computing', label: 'Computación' },
  { id: 'accessories', label: 'Accesorios' }
] as const;
