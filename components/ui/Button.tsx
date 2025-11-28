import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ButtonVariant } from '../../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = ButtonVariant.PRIMARY, 
  children, 
  icon, 
  className = '',
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    
    // Calculate distance from center
    const x = (clientX - (left + width / 2)) * 0.35; // Multiply by factor to control magnetic strength
    const y = (clientY - (top + height / 2)) * 0.35;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white overflow-hidden group";
  
  const variants = {
    [ButtonVariant.PRIMARY]: "bg-black text-white hover:text-black", // Initial state
    [ButtonVariant.SECONDARY]: "bg-black text-white hover:bg-neutral-800",
    [ButtonVariant.OUTLINE]: "border border-neutral-200 hover:border-black text-black bg-transparent hover:bg-neutral-50",
    [ButtonVariant.GHOST]: "text-neutral-600 hover:text-black bg-transparent hover:bg-neutral-100",
  };

  return (
    <motion.button 
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props as any}
    >
      {/* Fill Animation Background */}
      {variant === ButtonVariant.PRIMARY && (
        <span className="absolute inset-0 w-full h-full bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out z-0" />
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <motion.span 
            className="w-4 h-4"
            animate={{ x: variant === ButtonVariant.PRIMARY ? (position.x * 0.2) : 0 }} // Icon moves slightly less for depth
          >
            {icon}
          </motion.span>
        )}
      </span>
    </motion.button>
  );
};