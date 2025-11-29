import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { CartItem, User } from '../types';
import { RESTAURANT_PHONE, RESTAURANT_NAME } from '../constants';

interface CheckoutViewProps {
  cart: CartItem[];
  user: User | null;
  onBack: () => void;
  onSuccess: () => void;
}

type PaymentMethod = 'credit' | 'debit' | 'pix' | 'money' | 'vr';

export const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, user, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    addressSq: '',
    addressConj: '',
    addressNum: '',
    addressRef: '',
    observation: '',
    payment: 'credit' as PaymentMethod,
    changeFor: ''
  });
  
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.name) setFormData(prev => ({ ...prev, name: user.name }));
    if (user?.phone) setFormData(prev => ({ ...prev, phone: user.phone! }));
    if (user?.address) setUseSavedAddress(true);
  }, [user]);

  const total = cart.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((acc, extra) => acc + extra.price, 0) || 0;
    return sum + ((item.price + extrasTotal) * item.quantity);
  }, 0);

  const getFullAddress = () => {
    if (useSavedAddress && user?.address) return user.address;
    return `Endereço: ${formData.addressSq}, ${formData.addressConj ? `Conj/Bloco ${formData.addressConj}, ` : ''}Nº ${formData.addressNum}. Ref: ${formData.addressRef}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fullAddress = getFullAddress();
    const header = `🍔 *PEDIDO NOVO - ${RESTAURANT_NAME}* 🍔\n`;
    
    const itemsList = cart.map(item => {
      let itemString = `- ${item.quantity}x ${item.name}`;
      if (item.doneness) itemString += `\n   [Ponto: ${item.doneness}]`;
      if (item.extras && item.extras.length > 0) itemString += `\n   [Extras: ${item.extras.map(e => e.name).join(', ')}]`;
      if (item.observation) itemString += `\n   [Obs: ${item.observation}]`;
      return itemString;
    }).join('\n');

    let paymentLabel = formData.payment.toUpperCase();
    if(formData.payment === 'money' && formData.changeFor) paymentLabel += ` (Troco para ${formData.changeFor})`;

    const message = `${header}
CLIENTE: ${formData.name}
TEL: ${formData.phone}
ENTREGA: ${fullAddress}

ITENS:
${itemsList}

OBS GERAL: ${formData.observation}

TOTAL: R$ ${total.toFixed(2)}
PGTO: ${paymentLabel}`;

    const whatsappUrl = `https://wa.me/${RESTAURANT_PHONE}?text=${encodeURIComponent(message)}`;
    setTimeout(() => { setIsSubmitting(false); window.open(whatsappUrl, '_blank'); onSuccess(); }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white border-4 border-black mt-8">
      <button onClick={onBack} className="mb-4 text-brand-cheddar underline font-bold">&lt; VOLTAR PARA O MENU</button>

      <h1 className="text-3xl font-bold bg-black text-white p-2 mb-6 uppercase text-center">Finalizar Pedido</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 border-black p-4 bg-white">
            <h2 className="font-bold underline text-lg">SEUS DADOS:</h2>
            
            <div className="flex flex-col">
               <label className="font-bold text-sm">NOME COMPLETO:</label>
               <input required type="text" className="border-2 border-black p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="flex flex-col">
               <label className="font-bold text-sm">TELEFONE:</label>
               <input required type="tel" className="border-2 border-black p-2" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <hr className="border-black border-t-2 my-2"/>

            <h2 className="font-bold underline text-lg">ENTREGA (DF):</h2>
            {user?.address && (
              <label className="bg-brand-cheddar/20 border border-black p-2 flex gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={useSavedAddress} onChange={() => setUseSavedAddress(!useSavedAddress)} />
                Usar endereço salvo: <strong>{user.address}</strong>
              </label>
            )}

            {(!useSavedAddress || !user?.address) && (
              <div className="grid grid-cols-1 gap-2 border border-black p-2 bg-white">
                <input required type="text" placeholder="Quadra / Avenida / SQ" className="border border-black p-1" value={formData.addressSq} onChange={e => setFormData({...formData, addressSq: e.target.value})} />
                <input type="text" placeholder="Conjunto / Bloco" className="border border-black p-1" value={formData.addressConj} onChange={e => setFormData({...formData, addressConj: e.target.value})} />
                <input required type="text" placeholder="Número / Casa" className="border border-black p-1" value={formData.addressNum} onChange={e => setFormData({...formData, addressNum: e.target.value})} />
                <input required type="text" placeholder="Referência" className="border border-black p-1" value={formData.addressRef} onChange={e => setFormData({...formData, addressRef: e.target.value})} />
              </div>
            )}

            <hr className="border-black border-t-2 my-2"/>

            <div className="flex flex-col">
              <label className="font-bold text-sm">OBSERVAÇÕES GERAIS:</label>
              <textarea className="border-2 border-black p-2 h-20" value={formData.observation} onChange={e => setFormData({...formData, observation: e.target.value})} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm">PAGAMENTO:</label>
              <select className="border-2 border-black p-2 bg-white" value={formData.payment} onChange={(e) => setFormData({...formData, payment: e.target.value as PaymentMethod})}>
                <option value="credit">CARTÃO DE CRÉDITO</option>
                <option value="debit">CARTÃO DE DÉBITO</option>
                <option value="vr">VALE REFEIÇÃO</option>
                <option value="pix">PIX</option>
                <option value="money">DINHEIRO</option>
              </select>
              
              {formData.payment === 'money' && (
                <input type="number" placeholder="Troco para quanto?" className="border-2 border-black p-2" value={formData.changeFor} onChange={e => setFormData({...formData, changeFor: e.target.value})} />
              )}
            </div>

            <Button type="submit" size="lg" className="w-full mt-4 bg-green-600 text-white text-xl">
               ENVIAR PEDIDO VIA WHATSAPP
            </Button>
          </form>
        </div>

        <div className="w-full md:w-64">
           <div className="bg-brand-cheddar border-4 border-black p-4 sticky top-24">
             <h3 className="font-bold border-b-2 border-black mb-2 text-center">RESUMO</h3>
             {cart.map(item => (
               <div key={item.internalId} className="border-b border-black py-2 text-sm">
                 <div className="flex justify-between font-bold">
                   <span>{item.quantity}x {item.name}</span>
                 </div>
                 <div className="pl-2 text-xs italic">
                   {item.doneness && <p>Pt: {item.doneness}</p>}
                   {item.extras?.map(e => <p key={e.name}>+ {e.name}</p>)}
                 </div>
               </div>
             ))}
             <div className="mt-4 text-xl font-bold text-center border-t-2 border-black pt-2">
               TOTAL: R$ {total.toFixed(2)}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};