
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Heart, TruckIcon, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useProductDetails } from '@/hooks/useProducts';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, error: productError } = useProductDetails(productId || '');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [formError, setFormError] = useState('');
  const [productVariants, setProductVariants] = useState<{ id: string; size: string; color: string; }[]>([]);
  const [mainImage, setMainImage] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (product) {
      // Set main image
      setMainImage(product.image_urls[0]);
      
      // Extract unique sizes and colors from product variants
      const variants = product.variants || [];
      const uniqueVariants = variants.map(variant => ({
        id: variant.id,
        size: variant.size || '',
        color: variant.color || '',
      }));
      setProductVariants(uniqueVariants);
      
      // Auto-select the first color and size if available
      if (uniqueVariants.length > 0) {
        const colors = [...new Set(uniqueVariants.map(v => v.color))];
        if (colors.length > 0) {
          setSelectedColor(colors[0]);
          
          // Find sizes available for the selected color
          const sizesForColor = uniqueVariants
            .filter(v => v.color === colors[0])
            .map(v => v.size);
            
          if (sizesForColor.length > 0) {
            setSelectedSize(sizesForColor[0]);
          }
        }
      }
    }
  }, [product]);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      setFormError('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      setFormError('Please select a color');
      return;
    }
    
    const selectedVariant = productVariants.find(
      variant => variant.size === selectedSize && variant.color === selectedColor
    );
    
    if (!selectedVariant) {
      setFormError('Selected combination is not available');
      return;
    }
    
    addToCart({
      id: product!.id,
      size: selectedSize,
      color: selectedColor,
      price: product!.price,
      name: product!.name,
      image: product!.image_urls[0],
      variant_id: selectedVariant.id
    });
    
    toast.success(`${product!.name} added to cart`);
    
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  };
  
  // Get available sizes for the selected color
  const getAvailableSizes = () => {
    if (!selectedColor) return [];
    
    return [...new Set(
      productVariants
        .filter(variant => variant.color === selectedColor)
        .map(variant => variant.size)
    )];
  };
  
  // Get all available colors
  const getAvailableColors = () => {
    return [...new Set(productVariants.map(variant => variant.color))];
  };
  
  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-[400px] rounded-md" />
          <div>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-8" />
            
            <div className="mb-6">
              <Skeleton className="h-6 w-1/3 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
            
            <div className="mb-6">
              <Skeleton className="h-6 w-1/3 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-14 rounded-md" />
                <Skeleton className="h-10 w-14 rounded-md" />
                <Skeleton className="h-10 w-14 rounded-md" />
              </div>
            </div>
            
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }
  
  if (productError || !product) {
    return (
      <div className="container-custom py-12">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="text-fashion-gray-800 mb-6">We couldn't find the product you're looking for. It may have been removed or doesn't exist.</p>
          <Link to="/products" className="btn-primary inline-flex items-center justify-center">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-fashion-gray-800 hover:text-fashion-accent">
          Home
        </Link>
        <span className="mx-2 text-fashion-gray-800">/</span>
        <Link to="/products" className="text-fashion-gray-800 hover:text-fashion-accent">
          Products
        </Link>
        <span className="mx-2 text-fashion-gray-800">/</span>
        <span className="text-fashion-gray-900 font-medium truncate">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative overflow-hidden mb-4 bg-gray-50 rounded-lg aspect-square">
            {!imageLoaded && !imageError && (
              <Skeleton className="w-full h-full absolute inset-0" />
            )}
            
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <span>Image not available</span>
              </div>
            ) : (
              <img 
                src={mainImage} 
                alt={product.name} 
                className={`w-full h-full object-contain rounded-md transition-opacity duration-300 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
              />
            )}
          </div>
          
          {/* Image thumbnails */}
          {product.image_urls.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.image_urls.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square overflow-hidden rounded-md border ${
                    mainImage === image ? 'ring-2 ring-fashion-accent border-fashion-accent' : 'border-gray-200 hover:border-fashion-accent'
                  }`}
                  onClick={() => {
                    setMainImage(image);
                    setImageLoaded(false);
                    setImageError(false);
                  }}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6 text-fashion-gray-800">{product.description}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Color</h3>
              {selectedColor && (
                <span className="text-sm text-fashion-gray-800">{selectedColor}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {getAvailableColors().map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border transition-all ${
                    selectedColor === color ? 'ring-2 ring-fashion-accent scale-110' : 'ring-1 ring-gray-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setSelectedColor(color);
                    setFormError('');
                    
                    // Reset size if current selection is not available with new color
                    const sizesForNewColor = productVariants
                      .filter(v => v.color === color)
                      .map(v => v.size);
                      
                    if (!sizesForNewColor.includes(selectedSize)) {
                      setSelectedSize(sizesForNewColor.length > 0 ? sizesForNewColor[0] : '');
                    }
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Size</h3>
              <button className="text-xs text-fashion-gray-800 underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {getAvailableSizes().map((size) => (
                <button
                  key={size}
                  className={`min-w-[3rem] h-10 border rounded-md flex items-center justify-center transition-colors ${
                    selectedSize === size 
                      ? 'bg-fashion-gray-900 text-white border-fashion-gray-900' 
                      : 'border-gray-300 text-fashion-gray-800 hover:border-fashion-gray-900'
                  }`}
                  onClick={() => {
                    setSelectedSize(size);
                    setFormError('');
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center w-32 border border-gray-300 rounded-md">
              <button
                className="w-10 h-10 flex items-center justify-center border-r border-gray-300 text-fashion-gray-800 hover:bg-gray-50"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                className="w-10 h-10 flex items-center justify-center border-l border-gray-300 text-fashion-gray-800 hover:bg-gray-50"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {formError && <p className="text-red-500 mb-4 text-sm">{formError}</p>}
          
          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button 
              onClick={handleAddToCart}
              className="bg-fashion-gray-900 hover:bg-fashion-gray-800 text-white flex-grow"
              size="lg"
              disabled={!selectedSize || !selectedColor}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="flex-shrink-0"
            >
              <Heart className="h-5 w-5 mr-2" />
              Wishlist
            </Button>
          </div>
          
          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start">
              <TruckIcon className="h-5 w-5 mr-3 text-fashion-gray-800 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Free shipping</h4>
                <p className="text-sm text-fashion-gray-800">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Undo2 className="h-5 w-5 mr-3 text-fashion-gray-800 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">30-day returns</h4>
                <p className="text-sm text-fashion-gray-800">Return or exchange within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
