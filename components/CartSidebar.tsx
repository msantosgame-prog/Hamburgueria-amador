import React from 'react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCheckout
}) => {
  const calculateItemTotal = (item: CartItem) => {
    const extrasPrice = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
    return (item.price + extrasPrice) * item.quantity;
  };

  const total = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Dimmer solid */}
      <div 
        className="fixed inset-0 bg-white/50"
        onClick={onClose}
      />
      
      {/* Sidebar Box */}
      <div className="relative w-full max-w-md bg-white border-l-4 border-black flex flex-col h-full shadow-none z-50">
        <div className="p-4 flex items-center justify-between border-b-4 border-black bg-brand-cheddar text-black">
          <h2 className="text-xl font-bold uppercase">SEU CARRINHO</h2>
          <button 
            onClick={onClose}
            className="bg-white text-black border-2 border-black p-1 font-bold hover:bg-red-200"
          >
            FECHAR [X]
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {cart.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-black bg-white">
              <p className="font-bold text-xl mb-4">CARRINHO VAZIO</p>
              <Button onClick={onClose} variant="outline" size="sm">
                VOLTAR AO MENU
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.internalId || item.id} className="flex flex-col bg-white border-2 border-black p-2">
                <div className="flex gap-2 border-b border-black pb-2 mb-2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 border border-black object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-black uppercase">{item.name}</h3>
                    <div className="text-sm font-serif">
                      {item.doneness && <p>Ponto: {item.doneness}</p>}
                      {item.extras?.map((extra, idx) => (
                        <p key={idx}>+ {extra.name}</p>
                      ))}
                      {item.observation && <p className="italic">Obs: {item.observation}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white p-2 border border-black">
                   <span className="font-bold">R$ {calculateItemTotal(item).toFixed(2)}</span>
                   
                   <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.internalId || item.id, -1)}
                        className="bg-white border border-black px-2 font-bold hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.internalId || item.id, 1)}
                        className="bg-white border border-black px-2 font-bold hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => onRemove(item.internalId || item.id)}
                        className="ml-2 bg-red-600 text-white border border-black px-2 font-bold"
                      >
                        X
                      </button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 bg-white border-t-4 border-black">
            <div className="flex justify-between items-center text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
              <span>TOTAL A PAGAR:</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <Button 
              className="w-full text-xl uppercase py-4" 
              onClick={onCheckout}
              variant="primary"
            >
              FINALIZAR AGORA
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};