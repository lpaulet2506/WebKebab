import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, X, Plus, Minus, Trash2, ChevronRight, ChevronLeft, Star, Clock, MapPin, Phone, Facebook, Instagram } from 'lucide-react';
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

const Hero = () => {
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
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-brand-primary hover:bg-orange-600 text-white font-bold rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              VER CARTA <ChevronRight size={20} />
            </button>
            <button
              onClick={() => document.getElementById('promos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-full transition-all border border-white/10"
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
            <div key={promo.id} className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-brand-primary/20 to-transparent border border-brand-primary/20 group">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all" />
              <span className="inline-block px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] font-bold mb-4 tracking-wider">
                {promo.tag}
              </span>
              <h3 className="text-3xl font-display font-bold mb-2">{promo.title}</h3>
              <p className="text-white/60 mb-6">{promo.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-display font-bold">{promo.price.toFixed(2)}€</span>
                <button
                  onClick={() => onAddToCart(promo)}
                  className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-brand-primary hover:text-white transition-all"
                >
                  PEDIR AHORA
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
  onRemove
}: {
  isOpen: boolean,
  onClose: () => void,
  items: CartItemType[],
  onUpdateQuantity: (id: string, delta: number) => void,
  onRemove: (id: string) => void
}) => {
  const subtotal = items.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  const deliveryFee = 2.50;
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

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
            <div className="p-6 border-bottom border-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">TU PEDIDO</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <ShoppingCart size={64} className="mb-4" />
                  <p>Tu cesta está vacía</p>
                </div>
              ) : (
                items.map((cartItem) => {
                  const { id, item, quantity, selections } = cartItem;
                  const itemName = 'title' in item ? item.title : item.name;
                  const itemImage = 'image' in item ? item.image : 'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=800'; // fallback for promos

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

                        {/* Render Customizations */}
                        {Object.keys(selections).length > 0 && (
                          <div className="text-xs text-white/50 mb-2 space-y-1">
                            {Object.entries(selections).map(([groupId, selectedOptions]) => {
                              if (selectedOptions.length === 0) return null;
                              const group = item.customizations?.find(g => g.id === groupId);
                              if (!group) return null;
                              const names = selectedOptions.map(optId => {
                                return group.options.find(o => o.id === optId)?.name || optId;
                              });
                              return <div key={groupId}>• {names.join(', ')}</div>;
                            })}
                          </div>
                        )}

                        <p className="text-brand-primary text-sm font-bold mb-3">{item.price.toFixed(2)}€</p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(id, -1)}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-mono text-sm">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(id, 1)}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
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
            <span className="text-3xl font-display font-bold tracking-tighter text-brand-primary">ISTANBUL</span>
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
        <Hero />
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
