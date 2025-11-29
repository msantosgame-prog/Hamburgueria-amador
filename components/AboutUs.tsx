import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="pb-12 bg-white text-black">
      {/* Hero Banner */}
      <div className="relative h-[300px] w-full border-4 border-black mb-12">
        <img 
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop" 
          alt="Interior da Hamburgueria" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white border-4 border-black p-4">
            <h1 className="font-bold text-4xl text-black uppercase text-center">
              Nossa <span className="text-brand-cheddar underline">História</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Origin Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center border-4 border-black p-4 bg-white">
          <div>
            <h2 className="font-bold text-3xl text-black mb-6 uppercase border-b-2 border-black pb-2">
              Como tudo começou
            </h2>
            <p className="text-black leading-relaxed text-lg mb-4 font-serif">
              O Burger Kingo nasceu em 2018, na garagem de dois amigos apaixonados por carne e fogo em Brasília. O que começou como um hobby de fim de semana para alimentar a família na Asa Norte, rapidamente se transformou em uma obsessão por encontrar o blend perfeito.
            </p>
            <p className="text-black leading-relaxed text-lg font-serif">
              Após meses de testes e centenas de hambúrgueres grelhados, chegamos à nossa fórmula secreta: carne fresca moída diariamente, pães artesanais de fermentação natural e molhos feitos do zero em nossa cozinha.
            </p>
          </div>
          <div className="relative border-4 border-black h-64">
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop" 
              alt="Hambúrguer na grelha" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Philosophy */}
        <section className="bg-white p-8 border-4 border-black text-center">
          <h2 className="font-bold text-3xl text-black mb-8 uppercase underline decoration-brand-cheddar">
            Filosofia Kingo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-4 border-2 border-black">
              <div className="text-4xl mb-4">🥩</div>
              <h3 className="text-xl font-bold text-black mb-2 uppercase">100% Fresco</h3>
              <p className="text-black font-serif">Nunca congelamos nossa carne. O blend é preparado todos os dias.</p>
            </div>
            <div className="p-4 border-2 border-black">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-bold text-black mb-2 uppercase">Fogo Real</h3>
              <p className="text-black font-serif">Usamos charbroiler para garantir aquele sabor defumado.</p>
            </div>
            <div className="p-4 border-2 border-black">
              <div className="text-4xl mb-4">🥬</div>
              <h3 className="text-xl font-bold text-black mb-2 uppercase">Produtores Locais</h3>
              <p className="text-black font-serif">Nossos vegetais chegam toda manhã de produtores do DF.</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="grid md:grid-cols-2 gap-12 items-center border-4 border-black p-4 bg-white">
          <div className="order-2 md:order-1 relative border-4 border-black h-64">
             <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" 
              alt="Nossa Equipe na Cozinha" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-bold text-3xl text-black mb-6 uppercase border-b-2 border-black pb-2">
              Quem faz acontecer
            </h2>
            <p className="text-black leading-relaxed text-lg mb-6 font-serif">
              Por trás de cada mordida suculenta, existe uma equipe dedicada de chapeiros, atendentes e entregadores. Somos uma família unida pelo amor à gastronomia descomplicada e saborosa.
            </p>
            <p className="font-bold text-2xl text-black italic bg-brand-cheddar p-2 border-2 border-black text-center">
              "Comida de verdade, feita por pessoas de verdade."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};