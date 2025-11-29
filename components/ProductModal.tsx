import React, { useState, useEffect } from 'react';
import { Product, CartItemOption } from '../types';
import { DONENESS_OPTIONS, EXTRA_OPTIONS, MENU_ITEMS } from '../constants';
import { Button } from './Button';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product, quantity: number, doneness?: string, extras?: CartItemOption[], observation?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [step, setStep] = useState<'details' | 'upsell'>('details');
  const [quantity, setQuantity] = useState(1);
  const isComboCasal = product.id === 'c1';

  // State for Regular Products
  const [doneness, setDoneness] = useState<string>(DONENESS_OPTIONS[2]);
  const [selectedExtras, setSelectedExtras] = useState<CartItemOption[]>([]);
  const [observation, setObservation] = useState('');

  // State for Combo Casal (Burger 1 and Burger 2)
  const [comboState, setComboState] = useState({
    b1: { doneness: DONENESS_OPTIONS[2], extras: [] as CartItemOption[], obs: '' },
    b2: { doneness: DONENESS_OPTIONS[2], extras: [] as CartItemOption[], obs: '' }
  });

  const [upsellIds, setUpsellIds] = useState<string[]>([]);
  const upsellSuggestions = React.useMemo(() => {
    const sides = MENU_ITEMS.filter(i => i.category === 'side').slice(0, 2);
    const drinks = MENU_ITEMS.filter(i => i.category === 'drink').slice(0, 2);
    return [...sides, ...drinks];
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setQuantity(1);
      setDoneness(DONENESS_OPTIONS[2]);
      setSelectedExtras([]);
      setObservation('');
      setUpsellIds([]);
      setComboState({
        b1: { doneness: DONENESS_OPTIONS[2], extras: [], obs: '' },
        b2: { doneness: DONENESS_OPTIONS[2], extras: [], obs: '' }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleExtra = (extra: { id: string, name: string, price: number }) => {
    setSelectedExtras(prev => {
      const exists = prev.find(e => e.name === extra.name);
      return exists ? prev.filter(e => e.name !== extra.name) : [...prev, { name: extra.name, price: extra.price }];
    });
  };

  const toggleComboExtra = (burgerKey: 'b1' | 'b2', extra: { id: string, name: string, price: number }) => {
    setComboState(prev => {
      const currentExtras = prev[burgerKey].extras;
      const exists = currentExtras.find(e => e.name === extra.name);
      const newExtras = exists 
        ? currentExtras.filter(e => e.name !== extra.name) 
        : [...currentExtras, { name: extra.name, price: extra.price }];
      
      return { ...prev, [burgerKey]: { ...prev[burgerKey], extras: newExtras } };
    });
  };

  const toggleUpsellItem = (id: string) => {
    setUpsellIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const calculateTotalPrice = () => {
    let extrasTotal = 0;
    if (isComboCasal) {
      extrasTotal += comboState.b1.extras.reduce((acc, c) => acc + c.price, 0);
      extrasTotal += comboState.b2.extras.reduce((acc, c) => acc + c.price, 0);
    } else {
      extrasTotal += selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
    }
    return (product.price + extrasTotal) * quantity;
  };

  const handleInitialConfirm = () => {
    if (product.category === 'burger') {
      setStep('upsell');
    } else {
      handleFinalize();
    }
  };

  const handleFinalize = () => {
    if (isComboCasal) {
      const combinedExtras: CartItemOption[] = [
        ...comboState.b1.extras.map(e => ({ ...e, name: `Burger 1: ${e.name}` })),
        ...comboState.b2.extras.map(e => ({ ...e, name: `Burger 2: ${e.name}` }))
      ];
      
      const combinedObsParts = [];
      combinedObsParts.push(`Burger 1: ${comboState.b1.doneness}`);
      if (comboState.b1.obs) combinedObsParts.push(`(Obs 1: ${comboState.b1.obs})`);
      combinedObsParts.push(`Burger 2: ${comboState.b2.doneness}`);
      if (comboState.b2.obs) combinedObsParts.push(`(Obs 2: ${comboState.b2.obs})`);
      if (observation) combinedObsParts.push(`Geral: ${observation}`);

      onConfirm(product, quantity, undefined, combinedExtras, combinedObsParts.join(' | '));
    } else {
      onConfirm(product, quantity, product.customizable ? doneness : undefined, selectedExtras, observation.trim() !== '' ? observation.trim() : undefined);
    }

    if (upsellIds.length > 0) {
      upsellIds.forEach(id => {
        const item = MENU_ITEMS.find(i => i.id === id);
        if (item) onConfirm(item, 1, undefined, [], undefined);
      });
    }

    onClose();
  };

  const renderCustomizeSection = (
    title: string, 
    currentDoneness: string, 
    setDonenessFn: (d: string) => void,
    currentExtras: CartItemOption[],
    toggleExtraFn: (e: any) => void,
    currentObs: string,
    setObsFn: (o: string) => void
  ) => (
    <div className="border-2 border-black p-2 mb-4 bg-white">
      <h3 className="font-bold text-black border-b border-black mb-2 bg-brand-cheddar pl-1">{title}</h3>
      
      {/* Doneness */}
      <div className="mb-2">
        <h4 className="font-bold text-sm underline">Ponto da Carne:</h4>
        <select 
          className="w-full border border-black p-1 mt-1 bg-white"
          value={currentDoneness}
          onChange={(e) => setDonenessFn(e.target.value)}
        >
          {DONENESS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {/* Extras */}
      <div className="mb-2">
        <h4 className="font-bold text-sm underline">Extras:</h4>
        <div className="flex flex-col gap-1 mt-1">
          {EXTRA_OPTIONS.map(extra => {
            const isSelected = currentExtras.some(e => e.name === extra.name);
            return (
              <label key={extra.id} className="flex items-center gap-2 text-sm bg-white border border-gray-400 p-1">
                <input type="checkbox" checked={isSelected} onChange={() => toggleExtraFn(extra)} />
                <span>{extra.name} (+ R$ {extra.price.toFixed(2)})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Obs */}
      <input 
        type="text" 
        placeholder="Obs:"
        value={currentObs}
        onChange={(e) => setObsFn(e.target.value)}
        className="w-full border border-black p-1 text-sm"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/80" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border-4 border-black shadow-none flex flex-col max-h-[90vh] z-10">
        
        {step === 'details' ? (
          <>
            <div className="p-4 border-b-4 border-black bg-brand-cheddar text-black flex justify-between items-center">
              <h2 className="text-2xl font-bold uppercase">{product.name}</h2>
              <button onClick={onClose} className="bg-white text-black border-2 border-black px-2 font-bold hover:bg-red-200">X</button>
            </div>

            <div className="p-4 overflow-y-auto bg-white">
              <p className="border border-black p-2 bg-white mb-4 font-serif italic">{product.description}</p>
              
              {isComboCasal ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {renderCustomizeSection("Lanche 1", comboState.b1.doneness, (d) => setComboState(prev => ({...prev, b1: {...prev.b1, doneness: d}})), comboState.b1.extras, (e) => toggleComboExtra('b1', e), comboState.b1.obs, (o) => setComboState(prev => ({...prev, b1: {...prev.b1, obs: o}})))}
                  {renderCustomizeSection("Lanche 2", comboState.b2.doneness, (d) => setComboState(prev => ({...prev, b2: {...prev.b2, doneness: d}})), comboState.b2.extras, (e) => toggleComboExtra('b2', e), comboState.b2.obs, (o) => setComboState(prev => ({...prev, b2: {...prev.b2, obs: o}})))}
                </div>
              ) : (
                 product.customizable && (
                    <div className="border-2 border-black p-2 bg-white">
                      <div className="mb-4">
                        <span className="font-bold block mb-1">PONTO DA CARNE:</span>
                        <div className="flex flex-col gap-1">
                          {DONENESS_OPTIONS.map(opt => (
                            <label key={opt} className="flex items-center gap-2 bg-white border border-gray-400 p-1">
                              <input type="radio" name="doneness" checked={doneness === opt} onChange={(e) => setDoneness(e.target.value)} value={opt} />
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="font-bold block mb-1">ADICIONAIS:</span>
                        <div className="flex flex-col gap-1">
                          {EXTRA_OPTIONS.map(extra => {
                            const isSelected = selectedExtras.some(e => e.name === extra.name);
                            return (
                              <label key={extra.id} className="flex items-center gap-2 bg-white border border-gray-400 p-1">
                                <input type="checkbox" checked={isSelected} onChange={() => toggleExtra(extra)} />
                                {extra.name} - R$ {extra.price.toFixed(2)}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                 )
              )}

              <div className="mt-4">
                <label className="font-bold block mb-1">OBSERVAÇÕES:</label>
                <textarea
                  className="w-full border-2 border-black p-2"
                  placeholder="Escreva aqui..."
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 border-t-4 border-black bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold">QUANTIDADE:</span>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="border-2 border-black w-16 p-1 text-center" 
                  />
                </div>
                <div className="text-xl font-bold bg-brand-cheddar px-2 border border-black">
                  Total: R$ {calculateTotalPrice().toFixed(2)}
                </div>
              </div>
              <Button onClick={handleInitialConfirm} className="w-full py-3 text-xl bg-brand-cheddar text-black">
                ADICIONAR AO PEDIDO
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b-4 border-black bg-brand-cheddar">
               <h2 className="text-xl font-bold uppercase text-black">Ofertas Extras!!!</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {upsellSuggestions.map(item => {
                const isSelected = upsellIds.includes(item.id);
                return (
                  <label key={item.id} className={`flex items-center gap-4 p-2 border-2 cursor-pointer ${isSelected ? 'border-red-600 bg-red-100' : 'border-black bg-white'}`}>
                    <input type="checkbox" checked={isSelected} onChange={() => toggleUpsellItem(item.id)} className="w-6 h-6" />
                    <img src={item.image} className="w-16 h-16 border border-black" />
                    <div>
                       <h3 className="font-bold uppercase">{item.name}</h3>
                       <span className="font-bold text-red-600">APENAS R$ {item.price.toFixed(2)}</span>
                    </div>
                  </label>
                )
              })}
            </div>
            <div className="p-4 border-t-4 border-black bg-white flex flex-col gap-2">
              <Button onClick={handleFinalize} className="w-full py-3 text-lg bg-green-600 text-white">
                {upsellIds.length > 0 ? `LEVAR TUDO` : `NÃO QUERO NADA, SÓ O LANCHE`}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};