
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

// Mock data for featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#FFFFFF', '#C4C4C4']
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#3B5998', '#1F2937']
  },
  {
    id: '3',
    name: 'Classic Leather Jacket',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000']
  },
  {
    id: '4',
    name: 'Structured Blazer',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#403F3F', '#6D7688']
  }
];

// Mock data for new arrivals
const newArrivals = [
  {
    id: '5',
    name: 'Designer Sunglasses',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#704214']
  },
  {
    id: '6',
    name: 'Casual Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#E5E7EB', '#000000']
  },
  {
    id: '7',
    name: 'Wool Scarf',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1520903183477-2b9d394c8073?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#C45850', '#A4C2F4', '#B4B4B4']
  },
  {
    id: '8',
    name: 'Leather Belt',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000']
  }
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Fashion Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Elevate Your Style</h1>
            <p className="text-lg md:text-xl mb-8">
              Discover the latest trends in fashion with our curated collection of premium clothing and accessories.
            </p>
            <div className="flex space-x-4">
              <Link to="/products" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/products/new-arrivals" className="btn-outline border-white text-white hover:bg-white hover:text-black">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-fashion-gray-100">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products/women" className="relative group overflow-hidden rounded-md h-64">
              <img 
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Women's Fashion" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-semibold mb-2">Women</h3>
                  <span className="inline-flex items-center text-sm">
                    Shop Now <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/products/men" className="relative group overflow-hidden rounded-md h-64">
              <img 
                src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Men's Fashion" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-semibold mb-2">Men</h3>
                  <span className="inline-flex items-center text-sm">
                    Shop Now <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/products/accessories" className="relative group overflow-hidden rounded-md h-64">
              <img 
                src="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Accessories" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-2xl font-semibold mb-2">Accessories</h3>
                  <span className="inline-flex items-center text-sm">
                    Shop Now <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">Featured Products</h2>
            <Link to="/products" className="text-fashion-gray-800 hover:text-accent inline-flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-12 bg-fashion-accent text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-2">Summer Sale</h2>
              <p className="text-lg">Up to 50% off on selected items</p>
            </div>
            <Link to="/products/sale" className="btn-outline border-white text-white hover:bg-white hover:text-fashion-accent">
              Shop Sale
            </Link>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title mb-0">New Arrivals</h2>
            <Link to="/products/new-arrivals" className="text-fashion-gray-800 hover:text-accent inline-flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="product-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-fashion-gray-100">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="section-title">Subscribe to Our Newsletter</h2>
          <p className="text-fashion-gray-800 mb-6">
            Stay updated with the latest trends, new arrivals, and exclusive offers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-fashion-accent focus:border-fashion-accent"
              required
            />
            <button 
              type="submit" 
              className="btn-primary"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
