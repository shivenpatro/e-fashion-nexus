
import React from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
];

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, colors }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(image);

  // When a product has no image or a broken link, use a fallback based on product ID
  // This ensures the same product always gets the same fallback image
  const getFallbackImage = () => {
    const index = parseInt(id.replace(/\D/g, '').slice(-1) || '0', 10) % fallbackImages.length;
    return fallbackImages[index];
  };

  // If original image fails, try the fallback image
  const handleImageError = () => {
    if (currentImage === image) {
      // First error - try fallback
      const fallback = getFallbackImage();
      setCurrentImage(fallback);
    } else {
      // If fallback also fails, show error state
      setImageError(true);
    }
    setImageLoaded(true);
  };

  return (
    <motion.div 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden rounded-t-md bg-gray-100 aspect-[3/4]">
          {!imageLoaded && (
            <Skeleton className="w-full h-full absolute inset-0" />
          )}
          
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              <div className="text-center p-4">
                <span className="block text-sm">Product Image</span>
                <span className="block text-xs text-gray-400 mt-1">{name}</span>
              </div>
            </div>
          ) : (
            <img 
              src={currentImage} 
              alt={name} 
              className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
          )}
          
          {/* Product badge - "New" or "Sale" */}
          {id.includes('new') && (
            <div className="absolute top-2 right-2 bg-fashion-accent text-white text-xs font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="text-fashion-gray-900 font-medium truncate">{name}</h3>
          
          <div className="mt-1 flex items-center justify-between">
            <p className="text-fashion-gray-800 font-semibold">${price.toFixed(2)}</p>
            
            {colors.length > 0 && (
              <div className="flex -space-x-1">
                {colors.slice(0, 3).map((color, index) => (
                  <div 
                    key={index}
                    className="w-4 h-4 rounded-full border border-white shadow-sm" 
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${color}`}
                  />
                ))}
                {colors.length > 3 && (
                  <span className="text-xs text-fashion-gray-800 ml-2">+{colors.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
