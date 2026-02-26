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
  category: 'kebabs' | 'durums' | 'plates' | 'sides' | 'drinks' | 'pizzas' | 'ensaladas' | 'raciones' | 'hamburguesas';
  ingredients?: string;

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
    id: 'm1',
    name: 'Doner Kebab',
    description: 'Pan tostado, ternera o pollo o mixto, ensalada y salsas.',
    ingredients: 'Pan tostado, ternera o pollo o mixto, ensalada y salsas.',
    price: 4.5,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm2',
    name: 'Doner Kebab (doble carne)',
    description: 'Pan tostado, doble de ternera o pollo o mixto, ensalada y salsas.',
    ingredients: 'Pan tostado, doble de ternera o pollo o mixto, ensalada y salsas.',
    price: 5.5,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm3',
    name: 'Kebab con Queso',
    description: 'Pan tostado, ternera o pollo o mixto, queso de oveja, ensalada y salsas.',
    ingredients: 'Pan tostado, ternera o pollo o mixto, queso de oveja, ensalada y salsas.',
    price: 5.5,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm4',
    name: 'Kebab Falafel',
    description: 'Pan tostado, falafel, ensalada y salsas.',
    ingredients: 'Pan tostado, falafel, ensalada y salsas.',
    price: 4.5,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm5',
    name: 'Kebab Vegetal',
    description: 'Pan tostado, queso de oveja, ensalada y salsas.',
    ingredients: 'Pan tostado, queso de oveja, ensalada y salsas.',
    price: 4.0,
    category: 'kebabs',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm6',
    name: 'Dürüm Normal',
    description: 'Tortilla de pan de pita, ternera o pollo o mixto, ensalada y salsas.',
    ingredients: 'Tortilla de pan de pita, ternera o pollo o mixto, ensalada y salsas.',
    price: 5.5,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm7',
    name: 'Dürüm con Queso',
    description: 'Tortilla de pan de pita, ternera o pollo o mixto, queso de oveja, ensalada y salsas.',
    ingredients: 'Tortilla de pan de pita, ternera o pollo o mixto, queso de oveja, ensalada y salsas.',
    price: 6.5,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm8',
    name: 'Dürüm Solo Carne',
    description: 'Tortilla de pan de pita, carne (sin ensalada).',
    ingredients: 'Tortilla de pan de pita, carne (sin ensalada).',
    price: 6.5,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm9',
    name: 'Dürüm Doble',
    description: 'Tortilla de pan de pita, doble carne, ensalada y salsas.',
    ingredients: 'Tortilla de pan de pita, doble carne, ensalada y salsas.',
    price: 6.5,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm10',
    name: 'Dürüm Falafel',
    description: 'Tortilla de pan de pita, falafel, ensalada y salsas.',
    ingredients: 'Tortilla de pan de pita, falafel, ensalada y salsas.',
    price: 5.5,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm11',
    name: 'Dürüm Vegetal',
    description: 'Tortilla de pan de pita, queso de oveja, ensalada y salsas.',
    ingredients: 'Tortilla de pan de pita, queso de oveja, ensalada y salsas.',
    price: 5.0,
    category: 'durums',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm12',
    name: 'Plato Kebab con Ensalada',
    description: 'Ternera o pollo o mixto, pan tostado, ensalada y salsas.',
    ingredients: 'Ternera o pollo o mixto, pan tostado, ensalada y salsas.',
    price: 7.0,
    category: 'plates',
    image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm13',
    name: 'Plato Especial',
    description: 'Ternera o pollo o mixto, queso de oveja, patatas, falafel, ensalada y salsas.',
    ingredients: 'Ternera o pollo o mixto, queso de oveja, patatas, falafel, ensalada y salsas.',
    price: 9.5,
    category: 'plates',
    image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm14',
    name: 'Plato de la Casa',
    description: 'Ternera o pollo o mixto, arroz o patatas, ensalada y salsas.',
    ingredients: 'Ternera o pollo o mixto, arroz o patatas, ensalada y salsas.',
    price: 7.5,
    category: 'plates',
    image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm15',
    name: 'Plato Kebab Completo',
    description: 'Pan tostado, ternera o pollo o mixto, arroz y salsas.',
    ingredients: 'Pan tostado, ternera o pollo o mixto, arroz y salsas.',
    price: 8.5,
    category: 'plates',
    image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm16',
    name: 'Lawasa Twister',
    description: 'Pizza enrollada con salsa especial, carne o mixto y ensaladas.',
    ingredients: 'Pizza enrollada con salsa especial, carne o mixto y ensaladas.',
    price: 6.0,
    category: 'pizzas',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm17',
    name: 'Pizza Enrollada',
    description: 'Pizza enrollada, doble ternera o pollo o mixto, ensalada y salsas.',
    ingredients: 'Pizza enrollada, doble ternera o pollo o mixto, ensalada y salsas.',
    price: 7.0,
    category: 'pizzas',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm18',
    name: 'Ensalada Turca',
    description: 'Lechuga, tomate, cebolla, queso de oveja, maíz, zanahoria y salsas.',
    ingredients: 'Lechuga, tomate, cebolla, queso de oveja, maíz, zanahoria y salsas.',
    price: 4.5,
    category: 'ensaladas',
    image: 'https://images.pexels.com/photos/105451/pexels-photo-105451.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm19',
    name: 'Ensalada Normal',
    description: 'Lechuga, tomate, cebolla, carne (ternera o pollo o mixto), maíz, zanahoria y salsas.',
    ingredients: 'Lechuga, tomate, cebolla, carne (ternera o pollo o mixto), maíz, zanahoria y salsas.',
    price: 5.5,
    category: 'ensaladas',
    image: 'https://images.pexels.com/photos/105451/pexels-photo-105451.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm20',
    name: 'Ensalada Falafel',
    description: 'Falafel, garbanzos, lechuga, tomate, cebolla, queso y salsas.',
    ingredients: 'Falafel, garbanzos, lechuga, tomate, cebolla, queso y salsas.',
    price: 5.5,
    category: 'ensaladas',
    image: 'https://images.pexels.com/photos/105451/pexels-photo-105451.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm21',
    name: 'Ensalada Mixta',
    description: 'Atún, lechuga, tomate, cebolla, zanahoria y queso de oveja.',
    ingredients: 'Atún, lechuga, tomate, cebolla, zanahoria y queso de oveja.',
    price: 5.5,
    category: 'ensaladas',
    image: 'https://images.pexels.com/photos/105451/pexels-photo-105451.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm22',
    name: 'Patatas Fritas',
    description: 'Patatas Fritas',
    price: 4.0,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm23',
    name: 'Patatas Deluxe',
    description: 'Patatas Deluxe',
    price: 4.0,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm24',
    name: 'Patatas Bravas',
    description: 'Patatas Bravas',
    price: 4.0,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm25',
    name: 'Alitas 5 uds',
    description: 'Alitas 5 uds',
    price: 6.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm26',
    name: 'Alitas + Patatas',
    description: 'Alitas + Patatas',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm27',
    name: 'Nuggets 6 uds',
    description: 'Nuggets 6 uds',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm28',
    name: 'Nuggets + Ensalada',
    description: 'Nuggets + Ensalada',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm29',
    name: 'Falafel 6 uds + Ensalada',
    description: 'Falafel 6 uds + Ensalada',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm30',
    name: 'Patatas con Carne (Grande)',
    description: 'Patatas con Carne (Grande)',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm31',
    name: 'Patatas con Carne (Pequeña)',
    description: 'Patatas con Carne (Pequeña)',
    price: 5.0,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm32',
    name: 'Muslo de Pollo',
    description: 'Muslo de Pollo',
    price: 7.0,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm33',
    name: 'Pop Corn + Patatas',
    description: 'Pop Corn + Patatas',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm34',
    name: 'Ración de Arroz',
    description: 'Ración de Arroz',
    price: 4.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm35',
    name: 'Ración de Ternera o Pollo o Mixto',
    description: 'Ración de Ternera o Pollo o Mixto',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm36',
    name: 'Finger de Pollo (5 uds)',
    description: 'Finger de Pollo (5 uds)',
    price: 6.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm37',
    name: 'Aros de Cebolla + Patatas',
    description: 'Aros de Cebolla + Patatas',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm38',
    name: 'Croquetas de Pollo + Patatas',
    description: 'Croquetas de Pollo + Patatas',
    price: 5.5,
    category: 'raciones',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'm39',
    name: 'Hamburguesa Completa',
    description: 'Pan de hamburguesa, carne, ensalada, queso y salsas.',
    ingredients: 'Pan de hamburguesa, carne, ensalada, queso y salsas.',
    price: 4.5,
    category: 'hamburguesas',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm40',
    name: 'Hamburguesa con Queso',
    description: 'Pan de hamburguesa, carne, queso y salsas.',
    ingredients: 'Pan de hamburguesa, carne, queso y salsas.',
    price: 4.0,
    category: 'hamburguesas',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm41',
    name: 'Hamburguesa Mixta',
    description: 'Doble carne, ensalada y salsas.',
    ingredients: 'Doble carne, ensalada y salsas.',
    price: 6.0,
    category: 'hamburguesas',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm42',
    name: 'Hamburguesa Normal',
    description: 'Pan de hamburguesa, carne, ensalada y salsas.',
    ingredients: 'Pan de hamburguesa, carne, ensalada y salsas.',
    price: 5.0,
    category: 'hamburguesas',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'm43',
    name: 'Hamburguesa Barbacoa',
    description: 'Carne, ensalada, pollo, queso, huevo y salsa barbacoa.',
    ingredients: 'Carne, ensalada, pollo, queso, huevo y salsa barbacoa.',
    price: 5.0,
    category: 'hamburguesas',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizations: KEBAB_CUSTOMIZATIONS
  },
  {
    id: 'd1',
    name: 'Coca-Cola 2L',
    description: 'Coca-Cola 2L bien fría',
    ingredients: 'Coca-Cola 2L bien fría',
    price: 3.0,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd2',
    name: 'Coca-Cola lata',
    description: 'Coca-Cola lata bien fría',
    ingredients: 'Coca-Cola lata bien fría',
    price: 1.5,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd3',
    name: 'Fanta Naranja',
    description: 'Fanta Naranja bien fría',
    ingredients: 'Fanta Naranja bien fría',
    price: 1.5,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd4',
    name: 'Fanta Limón',
    description: 'Fanta Limón bien fría',
    ingredients: 'Fanta Limón bien fría',
    price: 1.5,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd5',
    name: 'Nestea',
    description: 'Nestea bien fría',
    ingredients: 'Nestea bien fría',
    price: 1.5,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd6',
    name: 'Aquarius',
    description: 'Aquarius bien fría',
    ingredients: 'Aquarius bien fría',
    price: 1.5,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd7',
    name: 'Cerveza Mahou',
    description: 'Cerveza Mahou bien fría',
    ingredients: 'Cerveza Mahou bien fría',
    price: 1.5,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd8',
    name: 'Tónica',
    description: 'Tónica bien fría',
    ingredients: 'Tónica bien fría',
    price: 1.5,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd9',
    name: 'Agua',
    description: 'Agua bien fría',
    ingredients: 'Agua bien fría',
    price: 1.0,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
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
