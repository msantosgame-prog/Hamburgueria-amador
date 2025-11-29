import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    title: 'COMBO FAMÍLIA - PROMOÇÃO',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    title: 'BACON BLAST - NOVIDADE',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    title: 'ENTREGA GRÁTIS',
  }
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full border-4 border-black p-2 bg-white mb-8">
      <div className="relative h-[300px] w-full border-2 border-black">
        <img
          src={SLIDES[current].image}
          alt={SLIDES[current].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-brand-cheddar text-black p-2 text-center border-t-2 border-black">
           <h2 className="text-2xl font-bold uppercase underline">{SLIDES[current].title}</h2>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-6 h-6 border-2 border-black ${idx === current ? 'bg-brand-cheddar' : 'bg-white'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};