import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  // Estilo "botão padrão HTML antigo"
  const baseStyles = "inline-flex items-center justify-center font-bold border-2 border-black cursor-pointer active:translate-y-1";
  
  const variants = {
    primary: "bg-brand-cheddar text-black hover:bg-orange-600", // Laranjado Cheddar
    secondary: "bg-white text-black hover:bg-gray-100",
    outline: "bg-white text-black border-2 border-black hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-4 text-xl"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};