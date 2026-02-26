export interface CustomizationOption {
  id: string;
  name: string;
  price?: number;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  required?: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'kebabs' | 'durums' | 'plates' | 'sides' | 'drinks';
  image: string;
  popular?: boolean;
  customizations?: CustomizationGroup[];
}

export const KEBAB_CUSTOMIZATIONS: CustomizationGroup[] = [
  {
    id: 'meat',
    name: 'Tipo de Carne',
    type: 'single',
    required: true,
    options: [
      { id: 'mix', name: 'Mixta (Ternera y Pollo)' },
      { id: 'ternera', name: 'Solo Ternera' },
      { id: 'pollo', name: 'Solo Pollo' }
    ]
  },
  {
    id: 'remove',
    name: 'Quitar Ingredientes',
    type: 'multiple',
    options: [
      { id: 'no_cebolla', name: 'Sin Cebolla' },
      { id: 'no_tomate', name: 'Sin Tomate' },
      { id: 'no_lechuga', name: 'Sin Lechuga' }
    ]
  },
  {
    id: 'sauces',
    name: 'Salsas',
    type: 'multiple',
    options: [
      { id: 'sauce_blanca', name: 'Salsa Blanca (Yogur)' },
      { id: 'sauce_roja', name: 'Salsa Roja (Picante)' },
      { id: 'sauce_no', name: 'Sin Salsas' }
    ]
  }
];

export const DRINK_CUSTOMIZATIONS: CustomizationGroup[] = [
  {
    id: 'drink',
    name: 'Elige tu Bebida',
    type: 'single',
    required: true,
    options: [
      { id: 'coca', name: 'Coca Cola' },
      { id: 'fanta_o', name: 'Fanta Naranja' },
      { id: 'fanta_l', name: 'Fanta Limón' },
      { id: 'nestea', name: 'Nestea' },
      { id: 'agua', name: 'Agua' }
    ]
  }
];

export const MENU_DATA: MenuItem[] = [
  {
    id: 'k1',
    name: 'Kebab Clásico',
    description: 'Carne de ternera o pollo, lechuga fresca, tomate, cebolla y nuestra salsa secreta.',
    price: 6.50,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true,
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'k2',
    name: 'Kebab Mixto Especial',
    description: 'Doble ración de carne mixta con queso feta y pimientos asados.',
    price: 8.50,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/5410410/pexels-photo-5410410.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'd1',
    name: 'Durum XL',
    description: 'Rollo gigante con carne a elegir, patatas dentro y extra de salsa picante.',
    price: 7.90,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true,
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'p1',
    name: 'Plato Istanbul',
    description: 'Cama de arroz basmati, carne mixta, ensalada completa y pan de pita recién horneado.',
    price: 11.50,
    category: 'plates',
    image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
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

export interface Promotion {
  id: string;
  title: string;
  description: string;
  price: number;
  tag: string;
  customizations?: CustomizationGroup[];
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    title: 'Menú Pareja',
    description: '2 Durums + 1 Patatas Grandes + 2 Bebidas',
    price: 18.90,
    tag: 'MÁS VENDIDO',
    customizations: [
      {
        id: 'drinks_2',
        name: 'Elige 2 Bebidas',
        type: 'multiple',
        required: true,
        options: [
          ...DRINK_CUSTOMIZATIONS[0].options,
          { id: 'coca_zero', name: 'Coca Cola Zero' }
        ]
      }
    ]
  },
  {
    id: 'p2',
    title: 'Martes Locos',
    description: 'Todos los Kebabs individuales a 5€',
    price: 5.00,
    tag: 'SOLO MARTES',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'p3',
    title: 'Súper Menú',
    description: '2 Kebabs + Patatas + 1 Litro Coca Cola',
    price: 14.00,
    tag: 'NUEVA OFERTA',
    customizations: [
      {
        id: 'drink_1l',
        name: 'Elige Bebida 1L',
        type: 'single',
        required: true,
        options: [
          { id: '1l_coca', name: 'Coca Cola 1L' },
          { id: '1l_fanta', name: 'Fanta 1L' }
        ]
      }
    ]
  },
  {
    id: 'p4',
    title: 'Menú Amigos',
    description: '4 Kebabs + 2 Patatas Grandes + Bebida 2L',
    price: 26.00,
    tag: 'PARA COMPARTIR',
    customizations: [
      {
        id: 'drink_2l',
        name: 'Elige Bebida 2L',
        type: 'single',
        required: true,
        options: [
          { id: '2l_coca', name: 'Coca Cola 2L' },
          { id: '2l_fanta', name: 'Fanta Naranja 2L' },
          { id: '2l_sprite', name: 'Sprite 2L' }
        ]
      }
    ]
  }
];
