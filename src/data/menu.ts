export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'kebabs' | 'durums' | 'plates' | 'sides' | 'drinks';
  image: string;
  popular?: boolean;
}

export const MENU_DATA: MenuItem[] = [
  {
    id: 'k1',
    name: 'Kebab Clásico',
    description: 'Carne de ternera o pollo, lechuga fresca, tomate, cebolla y nuestra salsa secreta.',
    price: 6.50,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },
  {
    id: 'k2',
    name: 'Kebab Mixto Especial',
    description: 'Doble ración de carne mixta con queso feta y pimientos asados.',
    price: 8.50,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/5410410/pexels-photo-5410410.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'd1',
    name: 'Durum XL',
    description: 'Rollo gigante con carne a elegir, patatas dentro y extra de salsa picante.',
    price: 7.90,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },
  {
    id: 'p1',
    name: 'Plato Istanbul',
    description: 'Cama de arroz basmati, carne mixta, ensalada completa y pan de pita recién horneado.',
    price: 11.50,
    category: 'plates',
    image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 's1',
    name: 'Patatas Supremas',
    description: 'Patatas fritas crujientes con carne picada y salsa de queso.',
    price: 5.50,
    category: 'sides',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 's2',
    name: 'Falafel Casero (6 uds)',
    description: 'Croquetas de garbanzos con especias orientales y salsa tahini.',
    price: 4.90,
    category: 'sides',
    image: 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const PROMOTIONS = [
  {
    id: 'p1',
    title: 'Menú Pareja',
    description: '2 Durums + 1 Patatas Grandes + 2 Bebidas',
    price: 18.90,
    tag: 'MÁS VENDIDO'
  },
  {
    id: 'p2',
    title: 'Martes Locos',
    description: 'Todos los Kebabs individuales a 5€',
    price: 5.00,
    tag: 'SOLO MARTES'
  },
  {
    id: 'p3',
    title: 'Súper Menú',
    description: '2 Kebabs + Patatas + 1 Litro Coca Cola',
    price: 14.00,
    tag: 'NUEVA OFERTA'
  },
  {
    id: 'p4',
    title: 'Menú Amigos',
    description: '4 Kebabs + 2 Patatas Grandes + Bebida 2L',
    price: 26.00,
    tag: 'PARA COMPARTIR'
  }
];
