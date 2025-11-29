import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o BurgerBot 🤖. Estou aqui para te ajudar a escolher o hambúrguer perfeito hoje. O que você gosta de comer?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Ops, tive um problema. Tente novamente.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-brand-yellow text-brand-dark p-4 rounded-full shadow-lg hover:bg-yellow-400 transition-all hover:scale-110 flex items-center justify-center"
        >
          <MessageSquare className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[350px] bg-brand-surface border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-brand-red p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <span className="font-display font-bold">BurgerBot IA</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 h-80">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[85%] rounded-2xl px-4 py-2 text-sm
                    ${msg.role === 'user' 
                      ? 'bg-brand-red text-white rounded-br-none' 
                      : 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700'}
                    ${msg.isError ? 'border-red-500 border' : ''}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-2 border border-gray-700 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-yellow" />
                  <span className="text-xs text-gray-400">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-gray-800 border-t border-gray-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre os hambúrgueres..."
              className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-brand-yellow text-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-yellow text-brand-dark p-2 rounded-xl hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};