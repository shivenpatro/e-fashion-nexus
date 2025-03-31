import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Heart, TruckIcon, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useProductDetails } from '@/hooks/useProducts';
import { useAuth } from '@/context/AuthContext';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, error: productError } = useProductDetails(productId || '');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [productVariants, setProductVariants] = useState<{ id: string; size: string; color: string; }[]>([]);

  useEffect(() => {
    if (product) {
      // Extract unique sizes and colors from product variants
      const variants = product.variants || [];
      const uniqueVariants = variants.map(variant => ({
        id: variant.id,
        size: variant.size,
        color: variant.color,
      }));
      setProductVariants(uniqueVariants);
    }
  }, [product]);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    
    const selectedVariant = productVariants.find(
      variant => variant.size === selectedSize && variant.color === selectedColor
    );
    
    if (!selectedVariant) {
      setError('Selected combination is not available');
      return;
    }
    
    addToCart({
      id: product.id,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      name: product.name,
      image: product.image_urls[0],
      variant_id: selectedVariant.id
    });
    
    toast.success(`${product.name} added to cart`);
    
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };
  
  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (productError || !product) {
    return (
      <div className="container-custom py-12">
        <p>Error: Could not load product details.</p>
        <Link to="/products" className="text-blue-500">
          Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img src={product.image_urls[0]} alt={product.name} className="w-full rounded-md" />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>
          
          {/* Size Selection */}
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Size:</h3>
            <div className="flex gap-2">
              {productVariants.map((variant) => (
                <button
                  key={variant.id}
                  className={`border rounded-md p-2 ${selectedSize === variant.size ? 'bg-accent text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    setSelectedSize(variant.size);
                    setError('');
                  }}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Color:</h3>
            <div className="flex gap-2">
              {productVariants.map((variant) => (
                <button
                  key={variant.id}
                  className={`border rounded-full w-10 h-10 ${selectedColor === variant.color ? 'ring-2 ring-accent' : 'hover:ring-1 ring-gray-300'}`}
                  style={{ backgroundColor: variant.color }}
                  onClick={() => {
                    setSelectedColor(variant.color);
                    setError('');
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Quantity:</h3>
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {error && <p className="text-red-500">{error}</p>}
          
          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart}>
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          
          {/* Additional Info */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-2">
              <TruckIcon className="h-5 w-5 text-green-500" />
              <p className="text-sm">Free shipping on orders over $50</p>
            </div>
            <div className="flex items-center gap-2">
              <Undo2 className="h-5 w-5 text-yellow-500" />
              <p className="text-sm">30-day free returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
