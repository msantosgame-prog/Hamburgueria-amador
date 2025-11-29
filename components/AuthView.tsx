import React, { useState } from 'react';
import { User, Lock, ArrowRight, UserPlus, Mail, Phone, Check } from 'lucide-react';
import { Button } from './Button';

interface AuthViewProps {
  onLogin: (name: string, phone?: string, acceptsPromos?: boolean) => void;
  onGuest: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin, onGuest }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'guest'>('login');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptsPromos, setAcceptsPromos] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegistering && name && phone) {
      // Register logic
      onLogin(name, phone, acceptsPromos);
    } else {
      // Login logic
      // For existing users, we simulate having a phone, or just pass what we have
      const displayName = name || email.split('@')[0] || 'Cliente';
      const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      // Simulating retrieval of phone for existing user, or passing empty if not registering
      onLogin(formattedName, isRegistering ? phone : undefined, false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl text-white mb-2 uppercase">
          {activeTab === 'login' ? (isRegistering ? 'Criar Conta' : 'Bem-vindo') : 'Identifique-se'}
        </h2>
        <p className="text-gray-400">
          {activeTab === 'login' 
            ? (isRegistering ? 'Preencha seus dados para começar' : 'Entre para acessar seus pedidos') 
            : 'Para continuarmos com seu pedido delicioso'}
        </p>
      </div>

      <div className="bg-brand-surface border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'login' ? 'bg-brand-surface text-brand-yellow border-b-2 border-brand-yellow' : 'bg-gray-900/50 text-gray-500 hover:text-white'}`}
          >
            Conta
          </button>
          <button
            onClick={() => setActiveTab('guest')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'guest' ? 'bg-brand-surface text-brand-yellow border-b-2 border-brand-yellow' : 'bg-gray-900/50 text-gray-500 hover:text-white'}`}
          >
            Convidado
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {isRegistering && (
                <div className="animate-fade-in space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        required={isRegistering}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Telefone / WhatsApp <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        required={isRegistering}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all"
                        placeholder="(61) 99999-9999"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {isRegistering && (
                <div className="animate-fade-in pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${acceptsPromos ? 'bg-brand-yellow border-brand-yellow' : 'border-gray-600 group-hover:border-gray-400'}`}>
                      {acceptsPromos && <Check className="w-3.5 h-3.5 text-brand-dark" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={acceptsPromos} 
                      onChange={(e) => setAcceptsPromos(e.target.checked)}
                    />
                    <span className="text-sm text-gray-400 select-none group-hover:text-gray-300">
                      Concordo em receber promoções exclusivas e novidades via WhatsApp ou SMS.
                    </span>
                  </label>
                </div>
              )}

              <Button type="submit" className="w-full mt-4" size="lg">
                {isRegistering ? 'Cadastrar' : 'Entrar'}
              </Button>
              
              <div className="text-center mt-6 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-2">
                  {isRegistering ? 'Já tem uma conta?' : 'Não tem conta ainda?'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-brand-yellow font-bold uppercase text-sm tracking-wide hover:underline"
                >
                  {isRegistering ? 'Fazer Login' : 'Criar conta grátis'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <UserPlus className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl text-white font-bold mb-2">Novo por aqui?</h3>
                <p className="text-gray-400 text-sm">
                  Não precisa criar conta agora. Você pode finalizar seu pedido apenas informando os dados de entrega.
                </p>
              </div>
              <Button onClick={onGuest} variant="outline" className="w-full" size="lg">
                Continuar sem Login <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};