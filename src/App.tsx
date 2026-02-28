import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, X, Plus, Minus, Trash2, ChevronRight, ChevronLeft, Star, Clock, MapPin, Phone, Facebook, Instagram, Store, ShoppingBag, Bike, ArrowLeft } from 'lucide-react';
import { MENU_DATA, MenuItem, PROMOTIONS, Promotion, CustomizationOption, CustomizationGroup } from './data/menu';
import { fetchMenuFromSheet } from './services/menuService';

export type CartItemType = {
  id: string;
  baseId: string;
  item: MenuItem | Promotion;
  quantity: number;
  selections: Record<string, string[]>;
};

// --- Components ---



const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold tracking-tighter text-brand-primary">ABESH STAR KEBAB</span>
          <span className="text-xs font-mono opacity-50 hidden sm:block">MODERN KEBAB</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenCart}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                {cartCount}
              </span>
            )}
          </button>
          <button className="sm:hidden p-2">
            <MenuIcon size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onStartOrder }: { onStartOrder: () => void }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Video auto-play failed, waiting for user interaction:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
          src="/bg-hero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-xs font-bold tracking-widest uppercase mb-6">
            El auténtico sabor de Estambul
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
            KEBAB <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-400">ABESH STAR</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Ingredientes frescos, carne de primera calidad y recetas tradicionales con un toque moderno. Pide ahora y recíbelo en 30 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartOrder}
              className="px-8 py-4 bg-brand-primary hover:bg-orange-600 text-white font-black rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20"
            >
              COMENZAR PEDIDO <ShoppingBag size={20} />
            </button>
            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              VER CARTA <ChevronRight size={20} />
            </button>
            <button
              onClick={() => document.getElementById('promos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/5 backdrop-blur-md text-white/60 font-medium rounded-full transition-all border border-white/5 hidden md:flex"
            >
              NUESTRAS PROMOS
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

const MenuSection = ({ items, onAddToCart }: { items: MenuItem[], onAddToCart: (item: MenuItem) => void }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'kebabs', label: 'Kebabs' },
    { id: 'durums', label: 'Dürüm' },
    { id: 'plates', label: 'Platos' },
    { id: 'hamburguesas', label: 'Hamburguesas' },
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'ensaladas', label: 'Ensaladas' },
    { id: 'raciones', label: 'Raciones y Complementos' },
    { id: 'drinks', label: 'Bebidas' }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">NUESTRA CARTA</h2>
          <p className="text-white/50 max-w-md">Seleccionamos los mejores cortes y vegetales cada mañana para garantizar la frescura en cada bocado.</p>
        </div>

        <div className="relative w-full md:w-auto group/nav">
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white md:hidden"
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto scroll-smooth"
          >
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${activeCategory === cat.id
                  ? 'bg-brand-primary text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white md:hidden"
              >
                <ChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative bg-white/5 rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all duration-500 flex flex-row md:flex-col"
            >
              <div className="w-[120px] h-[120px] md:w-full md:h-auto md:aspect-[4/3] flex-shrink-0 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {item.popular && (
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-brand-accent text-black text-[8px] md:text-[10px] font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full flex items-center gap-1">
                    <Star size={10} fill="currentColor" className="md:w-3 md:h-3" /> POPULAR
                  </div>
                )}
              </div>

              <div className="p-4 md:p-6 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <h3 className="text-sm md:text-xl font-bold line-clamp-2 md:line-clamp-none uppercase md:normal-case flex-1 pr-2">{item.name}</h3>
                    <span className="hidden md:inline text-brand-primary font-display font-bold text-lg">{item.price.toFixed(2)}€</span>
                  </div>
                  <p className="text-white/40 text-[10px] md:text-sm mb-4 line-clamp-2 md:line-clamp-3">
                    {item.ingredients || item.description}
                  </p>
                </div>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full py-2 md:py-3 bg-white/10 hover:bg-brand-primary text-white text-[10px] md:text-sm font-bold rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span className="md:hidden uppercase">AÑADIR POR {item.price.toFixed(2)}€</span>
                  <span className="hidden md:inline">AÑADIR AL PEDIDO</span>
                  <Plus size={14} className="md:w-[18px] md:h-[18px] group-hover/btn:rotate-90 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Promotions = ({ items, onAddToCart }: { items: Promotion[], onAddToCart: (item: Promotion) => void }) => {
  return (
    <section id="promos" className="py-24 bg-brand-primary/5 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">PROMOS EXCLUSIVAS</h2>
          <p className="text-white/50">Aprovecha nuestras ofertas especiales para grupos y días señalados.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map(promo => (
            <div key={promo.id} className="bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col group transition-all hover:border-brand-primary/20">
              {/* Image Header */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={promo.image || 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={promo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] font-black tracking-widest uppercase shadow-xl">
                    {promo.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-display font-black mb-4 uppercase tracking-tight">{promo.title}</h3>
                <p className="text-white/50 text-sm mb-10 leading-relaxed font-light flex-1">
                  {promo.description}
                </p>

                <button
                  onClick={() => onAddToCart(promo)}
                  className="w-full py-5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white font-black text-sm rounded-3xl transition-all duration-300 flex items-center justify-center gap-2 border border-brand-primary/20 hover:border-brand-primary"
                >
                  DESDE {promo.price.toFixed(2)}€
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Cart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  orderConfig,
  onUpdateOrderConfig
}: {
  isOpen: boolean,
  onClose: () => void,
  items: CartItemType[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onRemove: (id: string) => void,
  orderConfig: { type: 'tienda' | 'recoger' | 'domicilio' | null, address?: { street: string, floor: string, number: string } },
  onUpdateOrderConfig: (config: { type: 'tienda' | 'recoger' | 'domicilio' | null, address?: { street: string, floor: string, number: string } }) => void
}) => {
  const [step, setStep] = useState<'selection' | 'address' | 'cart'>(
    !orderConfig.type ? 'selection' : (orderConfig.type === 'domicilio' && !orderConfig.address ? 'address' : 'cart')
  );

  useEffect(() => {
    if (isOpen) {
      if (!orderConfig.type) setStep('selection');
      else if (orderConfig.type === 'domicilio' && !orderConfig.address) setStep('address');
      else setStep('cart');
    }
  }, [isOpen, orderConfig.type, orderConfig.address]);

  const subtotal = items.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  const deliveryFee = orderConfig.type === 'domicilio' ? 2.50 : 0;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  const handleSelectType = (type: 'tienda' | 'recoger' | 'domicilio') => {
    if (type === 'domicilio') {
      onUpdateOrderConfig({ ...orderConfig, type });
      setStep('address');
    } else {
      onUpdateOrderConfig({ ...orderConfig, type });
      setStep('cart');
      onClose(); // Show menu as requested
    }
  };

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const address = {
      street: formData.get('street') as string,
      floor: formData.get('floor') as string,
      number: formData.get('number') as string,
    };
    onUpdateOrderConfig({ ...orderConfig, address });
    setStep('cart');
    onClose(); // Show menu as requested
  };

  const options = [
    { id: 'tienda', name: 'Comer en Tienda', icon: <Store size={24} />, desc: 'Disfruta en nuestro local' },
    { id: 'recoger', name: 'Para Recoger', icon: <ShoppingBag size={24} />, desc: 'Pide y ven a por ello' },
    { id: 'domicilio', name: 'A Domicilio', icon: <Bike size={24} />, desc: 'Te lo llevamos a casa' },
  ];

  const externalPlatforms = [
    { name: 'Glovo', icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current"><path d="M12.012 0C7.847 0 4.459 3.388 4.459 7.553c0 1.576 0.494 3.106 1.412 4.4l0.211 0.281 3.93 5.555s0.47 0.775 1.529 0.775h0.941c1.036 0 1.53 -0.775 1.53 -0.775l3.93 -5.555 0.187 -0.28a7.43 7.43 0 0 0 1.412 -4.401C19.564 3.388 16.176 0 12.011 0Zm0 3.693a3.837 3.837 0 0 1 3.836 3.836c0 0.824 -0.26 1.578 -0.73 2.237l-0.212 0.28 -2.894 4.095 -2.895 -4.07 -0.21 -0.305a3.848 3.848 0 0 1 -0.731 -2.237 3.837 3.837 0 0 1 3.836 -3.836zm-2.117 18.26c0 1.106 0.893 2.023 2.07 2.047 1.223 0 2.117 -0.917 2.117 -2.059 0 -1.14 -0.894 -2.058 -2.094 -2.058 -1.2 0 -2.093 0.917 -2.093 2.07z" /></svg>, url: 'https://glovoapp.com/es/es/mostoles-alcorcon-arroyomolinos/stores/kebab-alcorcon-pizzeria-mostoles-y-alcorcon' },
    { name: 'Uber Eats', icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current"><path d="M0 2.8645v4.9972c0 1.8834 1.3315 3.1297 3.0835 3.1297a2.9652 2.9652 0 0 0 2.1502 -0.876v0.7425H6.445V2.8645H5.223v4.9339c0 1.2642 -0.8696 2.1198 -1.9954 2.122 -1.1386 -0.0023 -1.997 -0.834 -1.997 -2.122V2.8645zm7.3625 0v7.9934h1.163v-0.7318a2.9915 2.9915 0 0 0 2.1177 0.876c1.714 0.048 3.1295 -1.3283 3.1295 -3.0429s-1.4155 -3.091 -3.1295 -3.0429a2.9674 2.9674 0 0 0 -2.107 0.876V2.8645zm9.8857 2.0561c-1.6752 -0.0074 -3.0369 1.3492 -3.0356 3.0245 0 1.7366 1.3732 3.0373 3.1537 3.0373a3.123 3.123 0 0 0 2.5578 -1.2438l-0.8495 -0.6177a2.0498 2.0498 0 0 1 -1.7083 0.8585c-0.9763 0.0126 -1.8147 -0.6915 -1.971 -1.6553h4.818v-0.379c0 -1.734 -1.254 -3.0238 -2.9638 -3.0245zm6.1632 0.0667a1.5943 1.5943 0 0 0 -1.376 0.7657v-0.7186h-1.163v5.8235h1.1741V7.5465c0 -0.9023 0.5581 -1.4847 1.3268 -1.4847h0.4949V4.9886c-0.1576 0.0013 -0.3186 -0.0009 -0.4568 -0.0013zm-6.2034 0.944a1.844 1.844 0 0 1 1.8337 1.486H15.424a1.844 1.844 0 0 1 1.784 -1.486zm-6.6589 0.0056c1.1223 -0.0084 2.0365 0.8992 2.0364 2.0215 -0.0026 1.1203 -0.914 2.0258 -2.0343 2.021a2.0151 2.0151 0 0 1 -1.4159 -0.5987A2.0152 2.0152 0 0 1 8.55 7.9592a2.0152 2.0152 0 0 1 0.5838 -1.422 2.0152 2.0152 0 0 1 1.4153 -0.6003zM0 12.9864v7.9716h5.7222v-1.3666H1.5458v-1.971h4.0647v-1.314H1.5458v-1.9556h4.1764v-1.3644zm14.5608 0.4097v1.6861h-1.1519v1.338h1.1545v3.143c0 0.7927 0.5712 1.4209 1.6005 1.4209h1.6425L17.8 19.646h-1.1412c-0.3482 0 -0.5714 -0.1509 -0.5714 -0.464v-2.7683H17.8v-1.3316h-1.7062v-1.686zm-5.2974 1.5275c-1.7348 -0.0103 -3.141 1.4035 -3.1214 3.1382 0.0196 1.7346 1.4575 3.1163 3.1915 3.0668a2.9915 2.9915 0 0 0 1.912 -0.6655v0.532h1.5175v-5.9129h-1.509v0.5257a3.0047 3.0047 0 0 0 -1.9205 -0.6835c-0.0244 -0.0007 -0.0492 -0.0006 -0.0701 -0.0008zm11.771 0.0077c-1.5855 0 -2.7002 0.6437 -2.7002 1.8854 0 0.8607 0.6132 1.4213 1.936 1.695l1.4478 0.3286c0.5694 0.1095 0.7224 0.2585 0.7224 0.4906 0 0.3701 -0.438 0.6022 -1.1279 0.6022 -0.876 0 -1.3774 -0.1907 -1.5723 -0.8477h-1.533c0.219 1.2307 1.1563 2.05 3.0484 2.05h0.0022c1.752 0 2.7422 -0.819 2.7422 -1.9534 0 -0.8059 -0.5847 -1.4084 -1.8089 -1.6668l-1.2943 -0.2605c-0.7511 -0.1358 -0.988 -0.2738 -0.988 -0.5454 0 -0.357 0.3616 -0.5757 1.0295 -0.5757 0.7227 0 1.2527 0.1925 1.406 0.8473h1.5175c-0.0854 -1.2286 -0.9899 -2.0497 -2.8273 -2.0497zM9.467 16.1815c1.0092 0.0096 1.8188 0.8369 1.8067 1.8461 0.0014 1.0046 -0.8198 1.816 -1.8243 1.8025 -1.0075 -0.0048 -1.8203 -0.8256 -1.8155 -1.833 0.0048 -1.0076 0.8255 -1.8204 1.833 -1.8156z" /></svg>, url: 'https://www.ubereats.com/es/store/abesh-star-kebab-alcorcon/8MHY8oM0RmSD0nRWLxoRdg?diningMode=DELIVERY&sc=SEARCH_SUGGESTION' },
    { name: 'Just Eat', icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current"><path d="M11.196 0.232a1.376 1.376 0 0 1 1.528 0 33.157 33.157 0 0 1 3.384 2.438s0.293 0.203 0.301 -0.14a5.367 5.367 0 0 1 0.079 -1.329 0.606 0.606 0 0 1 0.562 -0.39s1.329 0.066 2.173 0.179c0.377 0.05 0.671 0.352 0.711 0.73 0 0 0.543 3.62 0.665 4.925 0 0 0.105 0.664 1.067 1.79 0 0 1.953 2.735 2.18 3.259 0 0 0.454 0.946 -0.523 1.074 0 0 -1.783 0.18 -1.955 0.22a0.446 0.446 0 0 0 -0.39 0.484s-0.094 6.296 -0.555 9.32c0 0 -0.121 1.2 -0.782 1.173 0 0 -1.833 -0.059 -2.259 -0.047 0 0 -0.183 0 -0.156 -0.246 0 0 0.934 -9.817 0.301 -14.78 0 0 -0.028 -0.64 -0.516 -0.782 0 0 -0.445 -0.18 -0.871 0.391a15.574 15.574 0 0 0 -2.9 8.86s-0.05 1.563 0.188 1.953c0 0 0.148 0.274 0.907 0.336l0.96 0.13s0.176 0 0.16 0.233c0 0 -0.218 2.88 -0.28 3.393a1.018 1.018 0 0 1 -0.071 0.34s-0.035 0.098 -0.336 0.086c0 0 -4.236 -0.03 -4.713 0 0 0 -0.2 0 -0.242 -0.105 -0.043 -0.106 -0.294 -3.717 -0.286 -4.229a0.255 0.255 0 0 1 0.149 -0.25 2.548 2.548 0 0 0 1.172 -1.871c0.052 -0.548 0.06 -1.098 0.024 -1.646 0 0 0.156 -5.522 0.195 -6.41 0 0 0.031 -0.3 -0.36 -0.355a0.364 0.364 0 0 0 -0.437 0.27v0.03c0 0.032 -0.274 3.643 -0.223 5.081 0 0 0.094 0.942 -0.558 0.961 0 0 -0.634 0.095 -0.665 -0.69 0 0 0.047 -3.542 0.203 -5.292a0.39 0.39 0 0 0 -0.348 -0.391 0.39 0.39 0 0 0 -0.437 0.316 0.065 0.065 0 0 0 0 0.031s-0.274 3.39 -0.223 5.179c0 0 0.078 0.868 -0.614 0.836 0 0 -0.578 0.066 -0.61 -0.704 0 0 0.157 -4.85 0.2 -5.224A0.39 0.39 0 0 0 6.647 9h-0.039a0.391 0.391 0 0 0 -0.418 0.325 0.167 0.167 0 0 0 0 0.035s-0.258 5.8 -0.223 7.503c0 0 -0.023 1.751 1.27 2.462 0 0 0.192 0.11 0.196 0.277 0 0 0.145 3.076 0.277 4.069 0 0 0.047 0.238 -0.164 0.238L4.291 24a0.67 0.67 0 0 1 -0.665 -0.633 72.876 72.876 0 0 1 -0.601 -9.829 0.5 0.5 0 0 0 -0.391 -0.535S0.969 12.85 0.566 12.749a0.692 0.692 0 0 1 -0.422 -1.02A33.497 33.497 0 0 1 11.197 0.232Z" /></svg>, url: 'https://www.just-eat.es/restaurants-garden-kebab-alcorcon/menu' },
  ];
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F0F0F] z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-3">
                {step !== 'selection' && !['tienda', 'recoger'].includes(orderConfig.type || '') && (
                  <button onClick={() => setStep('selection')} className="p-2 hover:bg-white/5 rounded-full text-white/50">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">
                  {step === 'selection' ? 'Tu Pedido' : (step === 'address' ? 'Dirección' : 'Tu Cesta')}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {step === 'selection' && (
                <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-4">
                    {options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectType(opt.id as any)}
                        className="w-full flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-primary/50 hover:bg-white/10 transition-all group text-left"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          {opt.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold group-hover:text-brand-primary transition-colors">{opt.name}</h4>
                          <p className="text-white/40 text-[10px] uppercase tracking-wider">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <div className="text-center mb-6">
                      <span className="text-[10px] text-white/30 font-black tracking-[0.2em] uppercase">Otras Plataformas</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {externalPlatforms.map((plat) => (
                        <a key={plat.name} href={plat.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:bg-brand-primary group-hover:text-white transition-all">
                            {plat.icon}
                          </div>
                          <span className="text-[8px] font-bold text-white/20 uppercase group-hover:text-white/40">{plat.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 'address' && (
                <form onSubmit={handleAddressSubmit} className="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Calle / Dirección</label>
                      <input name="street" required placeholder="Ej: Calle Mayor" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-brand-primary transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Número</label>
                        <input name="number" required placeholder="Ej: 12" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-brand-primary transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Piso / Puerta</label>
                        <input name="floor" placeholder="Ej: 3º B" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-brand-primary transition-all" />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-brand-primary hover:bg-orange-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-brand-primary/20">
                    CONFIRMAR Y VER CARTA
                  </button>
                </form>
              )}

              {step === 'cart' && (
                <div className="p-6 space-y-6 animate-in fade-in duration-300">
                  {orderConfig.type && (
                    <div className="flex items-center justify-between p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-brand-primary">
                          {orderConfig.type === 'domicilio' ? <Bike size={18} /> : (orderConfig.type === 'recoger' ? <ShoppingBag size={18} /> : <Store size={18} />)}
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-white/80 block uppercase tracking-wider">{orderConfig.type === 'domicilio' ? 'A Domicilio' : (orderConfig.type === 'recoger' ? 'Para Recoger' : 'Comer en Tienda')}</span>
                          {orderConfig.type === 'domicilio' && orderConfig.address && (
                            <span className="text-white/40 truncate block max-w-[180px]">{orderConfig.address.street} {orderConfig.address.number}</span>
                          )}
                        </div>
                      </div>
                      <button onClick={() => setStep('selection')} className="text-[10px] font-black text-brand-primary uppercase hover:underline">Cambiar</button>
                    </div>
                  )}

                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-12">
                      <ShoppingCart size={64} className="mb-4" />
                      <p>Tu cesta está vacía</p>
                    </div>
                  ) : (
                    items.map((cartItem) => {
                      const { id, item, quantity, selections } = cartItem;
                      const itemName = 'title' in item ? item.title : item.name;
                      const itemImage = 'image' in item ? item.image : 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=800';

                      return (
                        <div key={id} className="flex gap-4 p-4 bg-white/5 rounded-2xl">
                          <img src={itemImage} className="w-20 h-20 rounded-xl object-cover" alt={itemName} />
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <h4 className="font-bold">{itemName}</h4>
                              <button onClick={() => onRemove(id)} className="text-white/30 hover:text-red-500">
                                <Trash2 size={16} />
                              </button>
                            </div>

                            {Object.keys(selections).length > 0 && (
                              <div className="text-xs text-white/50 mb-2 space-y-1">
                                {Object.entries(selections).map(([groupId, selectedOptions]) => {
                                  if (selectedOptions.length === 0) return null;
                                  const group = item.customizations?.find(g => g.id === groupId);
                                  if (!group) return null;
                                  const names = selectedOptions.map(optId => group.options.find(o => o.id === optId)?.name || optId);
                                  return <div key={groupId}>• {names.join(', ')}</div>;
                                })}
                              </div>
                            )}

                            <p className="text-brand-primary text-sm font-bold mb-3">{item.price.toFixed(2)}€</p>
                            <div className="flex items-center gap-3">
                              <button onClick={() => onUpdateQuantity(id, -1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">
                                <Minus size={14} />
                              </button>
                              <span className="font-mono text-sm">{quantity}</span>
                              <button onClick={() => onUpdateQuantity(id, 1)} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5">
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">
                <div className="space-y-2 text-sm text-white/60">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>{deliveryFee.toFixed(2)}€</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-display font-bold pt-2">
                  <span>TOTAL</span>
                  <span className="text-brand-primary">{total.toFixed(2)}€</span>
                </div>
                <button className="w-full py-4 bg-brand-primary hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-primary/20">
                  FINALIZAR PEDIDO
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const KebabExperience = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden my-12 rounded-[3rem] mx-6">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
          src="https://assets.mixkit.co/videos/preview/mixkit-cooking-meat-on-a-grill-4302-large.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 italic text-glow uppercase tracking-tighter">El Arte del Corte</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto font-light">Tradición y maestría en cada ración de carne recién cortada.</p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl font-display font-bold tracking-tighter text-brand-primary">ABESH STAR KEBAB</span>
          </div>
          <p className="text-white/40 max-w-sm mb-8">
            Llevamos el auténtico sabor de Turquía a tu mesa con un toque de modernidad y frescura inigualable.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer text-white">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 uppercase tracking-widest text-xs text-white/50">Contacto</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 text-white/60">
              <MapPin size={16} className="text-brand-primary" /> Calle Mayor 123, Madrid
            </li>
            <li className="flex items-center gap-3 text-white/60">
              <Phone size={16} className="text-brand-primary" /> +34 912 345 678
            </li>
            <li className="flex items-center gap-3 text-white/60">
              <Clock size={16} className="text-brand-primary" /> Lun-Dom: 12:00 - 00:00
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-6 uppercase tracking-widest text-xs text-white/50">Legal</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li className="hover:text-white cursor-pointer transition-colors">Privacidad</li>
            <li className="hover:text-white cursor-pointer transition-colors">Términos y Condiciones</li>
            <li className="hover:text-white cursor-pointer transition-colors">Cookies</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.3em]">
        © 2026 Istanbul Modern Kebab. Crafted for food lovers.
      </div>
    </footer>
  );
};

const ItemCustomizationModal = ({
  item,
  isOpen,
  onClose,
  onAdd
}: {
  item: MenuItem | Promotion | null,
  isOpen: boolean,
  onClose: () => void,
  onAdd: (item: MenuItem | Promotion, selections: Record<string, string[]>) => void
}) => {
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (item && item.customizations) {
      const initial: Record<string, string[]> = {};
      item.customizations.forEach(g => {
        if (g.type === 'single' && g.required && g.options.length > 0) {
          initial[g.id] = [g.options[0].id];
        } else {
          initial[g.id] = [];
        }
      });
      setSelections(initial);
    } else {
      setSelections({});
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleToggle = (groupId: string, optionId: string, type: 'single' | 'multiple') => {
    setSelections(prev => {
      const current = prev[groupId] || [];
      if (type === 'single') return { ...prev, [groupId]: [optionId] };
      const exists = current.includes(optionId);
      return {
        ...prev,
        [groupId]: exists ? current.filter(id => id !== optionId) : [...current, optionId]
      };
    });
  };

  const itemName = 'title' in item ? item.title : item.name;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 rounded-t-3xl">
              <h3 className="text-2xl font-display font-bold">{itemName}</h3>
              <button onClick={onClose}><X size={24} /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              {item.customizations?.map(group => (
                <div key={group.id}>
                  <h4 className="font-bold text-lg mb-4 text-brand-primary">{group.name} <span className="text-xs text-white/50">{group.type === 'multiple' ? '(Opcional)' : '(Obligatorio)'}</span></h4>
                  <div className="space-y-3">
                    {group.options.map(opt => {
                      const isSelected = (selections[group.id] || []).includes(opt.id);
                      return (
                        <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${isSelected ? 'border-brand-primary bg-brand-primary/10' : 'border-white/5 hover:border-brand-primary/50 bg-white/5'}`}>
                          <input
                            type={group.type === 'single' ? 'radio' : 'checkbox'}
                            name={group.id}
                            checked={isSelected}
                            onChange={() => handleToggle(group.id, opt.id, group.type)}
                            className="w-5 h-5 accent-brand-primary"
                          />
                          <span>{opt.name}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-white/10 bg-black/50 rounded-b-3xl">
              <button onClick={() => onAdd(item, selections)} className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-orange-600 transition-colors">
                AÑADIR - {item.price.toFixed(2)}€
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- Main App ---

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_DATA);
  const [promotions, setPromotions] = useState<Promotion[]>(PROMOTIONS);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderConfig, setOrderConfig] = useState<{ type: 'tienda' | 'recoger' | 'domicilio' | null, address?: { street: string, floor: string, number: string } }>({ type: null });
  const [customizingItem, setCustomizingItem] = useState<MenuItem | Promotion | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      const { menu, promotions } = await fetchMenuFromSheet();
      if (menu.length > 0) setMenuItems(menu);
      if (promotions.length > 0) setPromotions(promotions);
    };
    loadMenu();
  }, []);

  const startCustomizing = (item: MenuItem | Promotion) => {
    if (item.customizations && item.customizations.length > 0) {
      setCustomizingItem(item);
    } else {
      handleAddConfiguredItem(item, {});
    }
  };

  const handleAddConfiguredItem = (item: MenuItem | Promotion, selections: Record<string, string[]>) => {
    const selectionsKey = JSON.stringify(selections);
    const cartId = `${item.id}-${selectionsKey}`;

    setCartItems(prev => {
      const existing = prev.find(i => i.id === cartId);
      if (existing) {
        return prev.map(i => i.id === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: cartId, baseId: item.id, item, quantity: 1, selections }];
    });
    setCustomizingItem(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero onStartOrder={() => setIsCartOpen(true)} />
        <Promotions items={promotions} onAddToCart={startCustomizing} />
        <KebabExperience />
        <MenuSection items={menuItems} onAddToCart={startCustomizing} />

        {/* Features / Social Proof Section */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold">Envío Rápido</h3>
              <p className="text-white/40 text-sm">Tu comida caliente en menos de 30 minutos en la puerta de tu casa.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold">Calidad Premium</h3>
              <p className="text-white/40 text-sm">Solo utilizamos carne certificada y vegetales de proximidad.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold">Localización Central</h3>
              <p className="text-white/40 text-sm">Visítanos en el corazón de la ciudad para una experiencia completa.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        orderConfig={orderConfig}
        onUpdateOrderConfig={setOrderConfig}
      />

      {/* Mobile Floating Action Button for Cart */}
      {cartCount > 0 && !isCartOpen && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center sm:hidden"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-white text-brand-primary text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-brand-primary">
            {cartCount}
          </span>
        </motion.button>
      )}

      <ItemCustomizationModal
        item={customizingItem}
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAdd={handleAddConfiguredItem}
      />
    </div>
  );
}
