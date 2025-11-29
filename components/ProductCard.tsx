import React from 'react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  return (
    <div className="bg-white border-4 border-black p-2 flex flex-col h-full">
      <div className="relative h-48 border-2 border-black mb-2">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-black uppercase border-b-2 border-black mb-2 pb-1 bg-brand-cheddar px-1">
          {product.name}
        </h3>
        
        <p className="text-black text-sm mb-4 font-serif italic border border-black p-2 bg-white flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t-2 border-black bg-white p-2">
          <span className="text-lg font-bold text-black">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <Button 
            onClick={() => onAdd(product)} 
            size="sm"
            variant="primary"
            className="!rounded-none"
          >
            ADICIONAR +
          </Button>
        </div>
      </div>
    </div>
  );
};