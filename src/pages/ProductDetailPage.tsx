
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Heart, TruckIcon, Undo2, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

// Mock product data
const products = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Gray', value: '#C4C4C4' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Our Premium Cotton T-Shirt is crafted from high-quality, 100% organic cotton for exceptional comfort and durability. The classic fit and versatile design make it perfect for everyday wear, while the breathable fabric ensures all-day comfort. The t-shirt features a ribbed crew neck that maintains its shape, reinforced seams for added strength, and a straight hemline for a clean, polished look.',
    details: [
      'Material: 100% Organic Cotton',
      'Weight: 180 GSM',
      'Care: Machine wash cold, tumble dry low',
      'Made in Portugal'
    ],
    category: 'men',
    subcategory: 'tops'
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Blue', value: '#3B5998' },
      { name: 'Dark Blue', value: '#1F2937' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    description: 'These Slim Fit Jeans offer modern style with a comfortable fit. Made from premium denim with just the right amount of stretch, they provide both comfort and durability. The slim fit design sits below the waist and is slim through the hip and thigh with a narrow leg opening for a sleek silhouette. Perfect for casual everyday wear or dressed up for a night out.',
    details: [
      'Material: 98% Cotton, 2% Elastane',
      'Weight: Medium-weight denim',
      'Care: Machine wash cold, inside out',
      'Made in Turkey'
    ],
    category: 'men',
    subcategory: 'bottoms'
  }
];

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  
  // Find the product based on the ID from URL params
  const product = products.find(p => p.id === productId);
  
  // State for selected options and quantity
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].value || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  
  // If product not found
  if (!product) {
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
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Find the color name based on selected value
    const colorObj = product.colors.find(c => c.value === selectedColor);
    const colorName = colorObj ? colorObj.name : '';
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: colorName
    });
    
    toast.success('Added to cart', {
      description: `${product.name} - ${colorName}, Size ${selectedSize}`
    });
  };
  
  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
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
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
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
        
        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color: {product.colors.find(c => c.value === selectedColor)?.name}</h3>
            <div className="flex space-x-2">
              {product.colors.map(color => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full ${selectedColor === color.value ? 'ring-2 ring-accent' : 'ring-1 ring-gray-300'}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color.value)}
                  aria-label={`Select color ${color.name}`}
                />
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Size</h3>
              <button className="text-xs text-fashion-gray-800 underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
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
          
          {/* Quantity */}
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
          
          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              onClick={handleAddToCart}
              className="flex-grow bg-fashion-gray-900 text-white hover:bg-fashion-gray-800"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button variant="outline" className="flex-shrink-0">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
          </div>
          
          {/* Shipping and Returns Info */}
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
      
      {/* Product Description and Details */}
      <div className="mt-12">
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-fashion-gray-800 mb-8">{product.description}</p>
          
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <ul className="list-disc pl-5 text-fashion-gray-800 space-y-2">
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
