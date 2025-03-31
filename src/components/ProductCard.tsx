
import React from 'react';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
};

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, colors }) => {
  return (
    <div className="group">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden mb-3">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-[300px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <h3 className="text-fashion-gray-900 font-medium">{name}</h3>
        
        <div className="mt-1 flex items-center justify-between">
          <p className="text-fashion-gray-800">${price.toFixed(2)}</p>
          
          {colors.length > 0 && (
            <div className="flex">
              {colors.slice(0, 3).map((color, index) => (
                <div 
                  key={index}
                  className="w-3 h-3 rounded-full ml-1" 
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                />
              ))}
              {colors.length > 3 && (
                <span className="text-xs text-fashion-gray-800 ml-1">+{colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
