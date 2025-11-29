import { Product } from './types';

export const RESTAURANT_NAME = "Burger Kingo";
export const RESTAURANT_PHONE = "5561999999999"; // Updated to DF area code example

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  whatsapp: `https://wa.me/${RESTAURANT_PHONE}`
};

export const DONENESS_OPTIONS = [
  'Mal Passado',
  'Ao Ponto para Mal',
  'Ao Ponto',
  'Ao Ponto para Bem',
  'Bem Passado'
];

export const EXTRA_OPTIONS = [
  { id: 'bacon', name: 'Bacon Extra', price: 4.00 },
  { id: 'cheese', name: 'Queijo Extra', price: 3.50 },
  { id: 'sauce', name: 'Molho Especial', price: 2.00 },
  { id: 'onion', name: 'Cebola Caramelizada', price: 2.50 },
];

export const MENU_ITEMS: Product[] = [
  // Combos
  {
    id: 'c1',
    name: 'Combo Casal',
    description: '2 Clássicos Supremos (Personalizáveis), 2 Batatas Rústicas e 2 Bebidas à escolha.',
    price: 89.90,
    category: 'combo',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800&auto=format&fit=crop', // Burger combo
    rating: 5.0,
    customizable: true
  },
  {
    id: 'c2',
    name: 'Box Galera',
    description: '4 Smash Burgers, 4 Batatas, Onion Rings e 1 Refrigerante 2L.',
    price: 149.90,
    category: 'combo',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop', // Feast
    rating: 4.9,
    customizable: true
  },
  // Burgers
  {
    id: 'b1',
    name: 'O Clássico Supremo',
    description: 'Pão brioche, blend de 180g, queijo cheddar, alface, tomate e maionese da casa.',
    price: 32.90,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop', // Classic cheeseburger
    rating: 4.8,
    customizable: true
  },
  {
    id: 'b2',
    name: 'Bacon Blast',
    description: 'Pão australiano, dois smash burgers de 100g, muito bacon crocante, cheddar inglês e cebola caramelizada.',
    price: 38.50,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=800&auto=format&fit=crop', // Bacon burger
    rating: 4.9,
    customizable: true
  },
  {
    id: 'b3',
    name: 'Spicy Jalapeño',
    description: 'Para quem gosta de fogo. Blend 180g, queijo pepper jack, jalapeños em conserva e molho chipotle.',
    price: 35.00,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=800&auto=format&fit=crop', // Spicy burger
    rating: 4.5,
    customizable: true
  },
  {
    id: 'b4',
    name: 'Veggie Futuro',
    description: 'Hambúrguer de plantas (100% vegetal), rúcula, tomate seco e maionese vegana no pão integral.',
    price: 34.00,
    category: 'burger',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=800&auto=format&fit=crop', // Green/Veggie burger
    rating: 4.6,
    customizable: true
  },
  // Sides
  {
    id: 's1',
    name: 'Batata Rústica',
    description: 'Batatas cortadas à mão com alecrim e alho.',
    price: 18.00,
    category: 'side',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=800&auto=format&fit=crop', // Rustic fries
    rating: 4.7
  },
  {
    id: 's2',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e super crocantes.',
    price: 22.00,
    category: 'side',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=800&auto=format&fit=crop', // Onion rings
    rating: 4.4
  },
  // Drinks
  {
    id: 'd1',
    name: 'Milkshake de Nutella',
    description: '700ml de pura cremosidade com avelã.',
    price: 24.90,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop', // Milkshake
    rating: 4.9
  },
  {
    id: 'd2',
    name: 'Cola Artesanal',
    description: 'Refrigerante de cola feito na casa com especiarias.',
    price: 12.00,
    category: 'drink',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop', // Cola
    rating: 4.2
  },
  // Desserts
  {
    id: 'sw1',
    name: 'Brownie do Chef',
    description: 'Brownie de chocolate belga servido morno com sorvete de baunilha.',
    price: 18.90,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=800&auto=format&fit=crop', // Updated Brownie Image
    rating: 4.8
  },
  {
    id: 'sw2',
    name: 'Cheesecake de Frutas Vermelhas',
    description: 'Base de biscoito crocante e calda artesanal de frutas silvestres.',
    price: 21.00,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop', // Cheesecake
    rating: 4.7
  }
];

export const SYSTEM_INSTRUCTION = `
Você é o "BurgerBot", um assistente virtual especialista e garçom digital da hamburgueria "Burger Kingo".
`;