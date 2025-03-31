
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
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [productVariants, setProductVariants] = useState<any[]>([]);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (product) {
      setMainImage(product.image_urls[0] || '');
      
      if (product.variants && product.variants.length > 0) {
        const colorMap = new Map();
        product.variants.forEach(variant => {
          if (variant.color) {
            if (!colorMap.has(variant.color)) {
              colorMap.set(variant.color, []);
            }
            colorMap.get(variant.color).push(variant);
          }
        });
        
        if (colorMap.size > 0) {
          const firstColor = Array.from(colorMap.keys())[0];
          setSelectedColor(firstColor);
          
          const sizes = colorMap.get(firstColor);
          if (sizes && sizes.length > 0) {
            setSelectedSize(sizes[0].size || '');
            setSelectedVariant(sizes[0].id);
          }
        }
      }
    }
  }, [product]);
  
  useEffect(() => {
    if (product?.variants) {
      setProductVariants(product.variants);
    }
  }, [product]);
  
  useEffect(() => {
    if (product?.variants) {
      const variant = product.variants.find(
        v => v.color === selectedColor && v.size === selectedSize
      );
      setSelectedVariant(variant ? variant.id : null);
    }
  }, [selectedColor, selectedSize, product]);
  
  const getAvailableSizes = () => {
    if (!product?.variants) return [];
    
    return product.variants
      .filter(v => v.color === selectedColor)
      .map(v => v.size)
      .filter((size): size is string => !!size);
  };
  
  const getAvailableColors = () => {
    if (!product?.variants) return [];
    
    const colors = new Set<string>();
    product.variants.forEach(v => {
      if (v.color) colors.add(v.color);
    });
    
    return Array.from(colors);
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      setValidationError('Please select a color');
      return;
    }
    
    const variant = productVariants.find(
      v => v.size === selectedSize && v.color === selectedColor
    );
    
    if (!variant) {
      setValidationError('Selected combination is not available');
      return;
    }
    
    addToCart({
      id: product.id,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      name: product.name,
      image: product.image_urls[0],
      variant_id: variant.id,
      quantity: quantity
    });
    
    toast.success(`${product.name} added to cart`);
    
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };
  
  if (isLoading) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-lg">Loading product details...</p>
      </div>
    );
  }
  
  if (productError || !product) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <div className="mb-6 text-sm">
        <Link to="/" className="text-fashion-gray-800 hover:text-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/products/${product.category}`} className="text-fashion-gray-800 hover:text-accent">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-fashion-gray-800">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="mb-4 overflow-hidden">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          
          <div className="flex space-x-4">
            {product.image_urls.map((image, index) => (
              <button 
                key={index}
                className={`w-20 h-20 overflow-hidden rounded-md ${mainImage === image ? 'ring-2 ring-accent' : 'ring-1 ring-gray-200'}`}
                onClick={() => setMainImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - view ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          
          {validationError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {validationError}
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">
              Color: {selectedColor}
            </h3>
            <div className="flex space-x-2">
              {getAvailableColors().map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full ${selectedColor === color ? 'ring-2 ring-accent' : 'ring-1 ring-gray-300'}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Size</h3>
              <button className="text-xs text-fashion-gray-800 underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {getAvailableSizes().map(size => (
                <button
                  key={size}
                  className={`min-w-[3rem] h-10 border rounded-md flex items-center justify-center transition-colors ${
                    selectedSize === size 
                      ? 'border-fashion-gray-900 bg-fashion-gray-900 text-white' 
                      : 'border-gray-300 text-fashion-gray-800 hover:border-fashion-gray-900'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button 
                className="w-10 h-10 flex items-center justify-center text-fashion-gray-800 disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="flex-grow text-center">{quantity}</span>
              <button 
                className="w-10 h-10 flex items-center justify-center text-fashion-gray-800"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              onClick={handleAddToCart}
              className="flex-grow bg-fashion-gray-900 text-white hover:bg-fashion-gray-800"
              disabled={!selectedVariant}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button variant="outline" className="flex-shrink-0">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
          </div>
          
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex">
              <TruckIcon className="h-5 w-5 mr-3 text-fashion-gray-800" />
              <div>
                <h4 className="text-sm font-medium">Free Shipping</h4>
                <p className="text-sm text-fashion-gray-800">Free standard shipping on orders over $100</p>
              </div>
            </div>
            
            <div className="flex">
              <Undo2 className="h-5 w-5 mr-3 text-fashion-gray-800" />
              <div>
                <h4 className="text-sm font-medium">Free Returns</h4>
                <p className="text-sm text-fashion-gray-800">Return within 30 days for a full refund</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-fashion-gray-800 mb-8">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
