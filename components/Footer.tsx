import React from 'react';
import { Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-gray-800 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-white tracking-wide">
              BURGER <span className="text-brand-yellow">KINGO</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Hambúrgueres artesanais feitos com paixão, fogo e os melhores ingredientes. A experiência definitiva de delivery.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Links Rápidos</h4>
            <div className="flex flex-col space-y-2 text-gray-400 text-sm">
              <a href="#" className="hover:text-brand-yellow transition-colors">Cardápio</a>
              <a href="#" className="hover:text-brand-yellow transition-colors">Sobre Nós</a>
              <a href="#" className="hover:text-brand-yellow transition-colors">Entregas</a>
              <a href="#" className="hover:text-brand-yellow transition-colors">Termos de Uso</a>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Fale Conosco</h4>
            <div className="flex gap-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-brand-red text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-start gap-2 text-gray-400 text-sm mt-4">
              <MapPin className="w-4 h-4 shrink-0 mt-1" />
              <span>Rua dos Burgers, 123 - Centro<br />São Paulo - SP</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Burger Kingo. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Feito com fome e código.
          </p>
        </div>
      </div>
    </footer>
  );
};