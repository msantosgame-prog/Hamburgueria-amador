import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onNavigate: (view: 'menu' | 'about' | 'auth') => void;
  onLogout: () => void;
  currentView: string;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, onOpenCart, onNavigate, onLogout, currentView, user }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-cheddar border-b-4 border-black h-20 shadow-none">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo Text Only */}
        <div 
          className="flex items-center gap-2 cursor-pointer bg-white border-2 border-black p-1"
          onClick={() => onNavigate('menu')}
        >
          {/* Simple Hamburger SVG */}
          <svg width="40" height="40" viewBox="0 0 100 100" className="border border-black">
             {/* Bun Top */}
             <path d="M10 40 Q50 10 90 40" fill="#FFD700" stroke="black" strokeWidth="3"/>
             {/* Lettuce */}
             <path d="M10 40 L20 45 L30 40 L40 45 L50 40 L60 45 L70 40 L80 45 L90 40" stroke="green" strokeWidth="3" fill="none"/>
             {/* Meat */}
             <rect x="10" y="50" width="80" height="15" fill="#8B4513" stroke="black" strokeWidth="3"/>
             {/* Bun Bottom */}
             <path d="M10 70 Q50 85 90 70" fill="#FFD700" stroke="black" strokeWidth="3"/>
          </svg>
          <span className="text-2xl font-bold text-black uppercase">
            Burger Kingo
          </span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('menu')}
            className={`px-4 py-2 font-bold border-2 border-black ${currentView === 'menu' ? 'bg-white text-black' : 'bg-transparent text-black'}`}
          >
            CARDÁPIO
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className={`px-4 py-2 font-bold border-2 border-black ${currentView === 'about' ? 'bg-white text-black' : 'bg-transparent text-black'}`}
          >
            SOBRE NÓS
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          
          {user ? (
             <div className="hidden md:flex items-center gap-2 bg-white border-2 border-black p-1">
               <span className="text-sm font-bold text-black mr-2">Olá, {user.name.split(' ')[0]}</span>
               <button 
                 onClick={onLogout}
                 className="text-red-600 font-bold underline"
               >
                 SAIR
               </button>
             </div>
          ) : (
            <button
              onClick={() => onNavigate('auth')}
              className="hidden md:flex items-center gap-2 font-bold uppercase text-sm px-4 py-2 border-2 border-black bg-white text-black hover:bg-gray-100"
            >
              Entrar
            </button>
          )}

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 bg-white border-2 border-black text-black hover:bg-yellow-200"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="font-bold ml-1">CARRINHO ({cartItemCount})</span>
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="md:hidden flex border-b-4 border-black bg-brand-cheddar">
        <button 
          onClick={() => onNavigate('menu')}
          className="flex-1 py-2 border-r-2 border-black font-bold text-black bg-white"
        >
           CARDÁPIO
        </button>
        <button 
          onClick={() => onNavigate('about')}
          className="flex-1 py-2 border-r-2 border-black font-bold text-black bg-white"
        >
           SOBRE
        </button>
        {user ? (
           <button onClick={onLogout} className="flex-1 py-2 font-bold text-red-600 bg-white">
             SAIR
          </button>
        ) : (
          <button onClick={() => onNavigate('auth')} className="flex-1 py-2 font-bold text-blue-600 bg-white">
             ENTRAR
          </button>
        )}
      </div>
    </header>
  );
};