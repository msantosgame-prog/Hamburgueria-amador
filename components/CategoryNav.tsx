import React from 'react';

const CATEGORIES = [
  { id: 'combos', label: 'Combos' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sides', label: 'Acomp.' },
  { id: 'drinks', label: 'Bebidas' },
  { id: 'desserts', label: 'Doces' },
];

export const CategoryNav: React.FC = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header (80px) + nav (60px)
      const y = element.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="border-y-4 border-black bg-white p-2 mb-8 flex flex-wrap justify-center gap-2 sticky top-20 z-40">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleScroll(cat.id)}
          className="border-2 border-black bg-white px-4 py-2 font-bold uppercase hover:bg-brand-cheddar active:bg-orange-600 transition-colors"
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};