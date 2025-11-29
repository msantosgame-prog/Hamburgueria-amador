import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutView } from './components/CheckoutView';
import { ProductModal } from './components/ProductModal';
import { AboutUs } from './components/AboutUs';
import { AuthView } from './components/AuthView';
import { Footer } from './components/Footer';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryNav } from './components/CategoryNav';
import { MENU_ITEMS, SOCIAL_LINKS } from './constants';
import { Product, CartItem, ViewState, CartItemOption, User } from './types';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<ViewState>('menu');
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number, doneness?: string, extras?: CartItemOption[], observation?: string) => {
    setCart(prev => {
      const optionsKey = `${product.id}-${doneness || ''}-${extras?.map(e => e.name).sort().join('') || ''}-${observation || ''}`;
      const existingItemIndex = prev.findIndex(item => item.internalId === optionsKey);
      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { ...product, quantity, doneness, extras, observation, internalId: optionsKey }];
    });
    setIsModalOpen(false);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if ((item.internalId || item.id) === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
      return item;
    }));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => (item.internalId || item.id) !== id));

  const handleLogin = (name: string, phone?: string, acceptsPromos?: boolean) => {
    setUser({ name, phone: phone || '', isGuest: false, address: 'SQS 308 Bl D', acceptsPromos });
    setView(cart.length > 0 ? 'checkout' : 'menu');
  };

  const handleLogout = () => { setUser(null); setView('menu'); };
  const handleGuest = () => { setUser({ name: 'Convidado', isGuest: true }); setView('checkout'); };
  const handleOrderSuccess = () => { setCart([]); setView('success'); };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-black font-serif">
      <Header 
        cartItemCount={cartItemCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={(v) => setView(v)}
        onLogout={handleLogout}
        currentView={view}
        user={user}
      />

      {/* Added top padding to account for fixed header */}
      <main className="max-w-7xl mx-auto px-4 py-6 pt-24">
        {view === 'menu' && (
          <div>
            <HeroCarousel />
            <CategoryNav />

            <div className="space-y-12">
              {[
                { id: 'combos', title: 'COMBOS', items: MENU_ITEMS.filter(i => i.category === 'combo') },
                { id: 'burgers', title: 'HAMBÚRGUERES', items: MENU_ITEMS.filter(i => i.category === 'burger') },
                { id: 'sides', title: 'ACOMPANHAMENTOS', items: MENU_ITEMS.filter(i => i.category === 'side') },
                { id: 'drinks', title: 'BEBIDAS', items: MENU_ITEMS.filter(i => i.category === 'drink') },
                { id: 'desserts', title: 'SOBREMESAS', items: MENU_ITEMS.filter(i => i.category === 'dessert') },
              ].map(section => (
                <section key={section.id} id={section.id} className="border-t-4 border-black pt-4">
                  <h2 className="text-4xl font-bold uppercase mb-4 text-center bg-brand-cheddar text-black border-2 border-black p-2">{section.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.items.map(product => (
                      <ProductCard key={product.id} product={product} onAdd={handleProductClick} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {view === 'about' && <AboutUs />}
        {view === 'auth' && <AuthView onLogin={handleLogin} onGuest={handleGuest} />}
        {view === 'checkout' && <CheckoutView cart={cart} user={user} onBack={() => setView('menu')} onSuccess={handleOrderSuccess} />}
        
        {view === 'success' && (
          <div className="text-center p-12 border-4 border-black bg-white mt-12">
            <h1 className="text-4xl font-bold text-green-800 mb-4">SUCESSO!</h1>
            <p className="text-xl mb-8">SEU PEDIDO FOI ENVIADO PRO ZAP.</p>
            <Button onClick={() => setView('menu')}>VOLTAR</Button>
          </div>
        )}
      </main>

      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onCheckout={() => {setIsCartOpen(false); setView(user ? 'checkout' : 'auth');}} />

      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
        <a href={SOCIAL_LINKS.whatsapp} target="_blank" className="bg-green-600 text-white p-4 border-2 border-black font-bold shadow-none hover:bg-green-700">WHATSAPP</a>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleAddToCart} />
      )}
    </div>
  );
};

export default App;