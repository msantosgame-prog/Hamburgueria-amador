export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burger' | 'side' | 'drink' | 'dessert' | 'combo';
  image: string;
  rating: number;
  customizable?: boolean;
}

export interface CartItemOption {
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
  doneness?: string; // e.g., "Ao Ponto"
  extras?: CartItemOption[];
  internalId?: string; // Unique ID for cart management
  observation?: string; 
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export type ViewState = 'menu' | 'about' | 'auth' | 'checkout' | 'success';

export interface User {
  name: string;
  email?: string;
  phone?: string;
  isGuest: boolean;
  address?: string; // Mock saved address
  acceptsPromos?: boolean;
}