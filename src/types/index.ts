export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'smartphones' | 'audio' | 'wearables' | 'accessories' | 'computing';
  rating: number;
  reviewsCount: number;
  image: string;
  stock: number;
  badge?: 'HOT' | 'NUEVO' | '-20%' | '-35%' | 'POPULAR';
  specs: { [key: string]: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CategoryFilter = 'all' | 'smartphones' | 'audio' | 'wearables' | 'accessories' | 'computing';

export interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface OrderConfirmation {
  orderId: string;
  customerName: string;
  total: number;
  date: string;
  items: CartItem[];
}
