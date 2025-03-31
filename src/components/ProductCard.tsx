
import React from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
};

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, colors }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="group transition-all duration-300 hover:shadow-md rounded-lg p-3">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden rounded-md mb-3 bg-gray-100 aspect-[3/4]">
          {!imageLoaded && !imageError && (
            <Skeleton className="w-full h-full absolute inset-0" />
          )}
          
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <span>Image not available</span>
            </div>
          ) : (
            <img 
              src={image} 
              alt={name} 
              className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          )}
        </div>
        
        <h3 className="text-fashion-gray-900 font-medium truncate">{name}</h3>
        
        <div className="mt-1 flex items-center justify-between">
          <p className="text-fashion-gray-800 font-semibold">${price.toFixed(2)}</p>
          
          {colors.length > 0 && (
            <div className="flex">
              {colors.slice(0, 3).map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full ml-1 border border-gray-200" 
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
