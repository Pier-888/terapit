import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-neutral-200 transition-all duration-200 ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;