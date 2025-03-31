
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Extended data for featured products
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
  },
  {
    id: '5',
    name: 'Modern Overshirt',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#FFFFFF', '#C4C4C4']
  },
  {
    id: '6',
    name: 'Casual Puffer Jacket',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#3B5998', '#1F2937']
  },
  {
    id: '7',
    name: 'Vintage Denim Jacket',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000']
  },
  {
    id: '8',
    name: 'Button-Down Shirt',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#403F3F', '#6D7688']
  }
];

// Extended data for new arrivals
const newArrivals = [
  {
    id: 'new-1',
    name: 'Designer Sunglasses',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#704214']
  },
  {
    id: 'new-2',
    name: 'Casual Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#E5E7EB', '#000000']
  },
  {
    id: 'new-3',
    name: 'Wool Scarf',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1520903183477-2b9d394c8073?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#C45850', '#A4C2F4', '#B4B4B4']
  },
  {
    id: 'new-4',
    name: 'Leather Belt',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000']
  },
  {
    id: 'new-5',
    name: 'Leather Crossbody Bag',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000', '#C4C4C4']
  },
  {
    id: 'new-6',
    name: 'Minimal Watch',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#E5E7EB', '#6B4F4F']
  },
  {
    id: 'new-7',
    name: 'Classic Fedora Hat',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000']
  },
  {
    id: 'new-8',
    name: 'Gold Necklace',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#D4AF37']
  },
  {
    id: 'new-9',
    name: 'Silver Bracelet',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#C0C0C0']
  },
  {
    id: 'new-10',
    name: 'Canvas Backpack',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000', '#3B5998']
  },
  {
    id: 'new-11',
    name: 'Stylish Beanie',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#C4C4C4', '#3B5998']
  },
  {
    id: 'new-12',
    name: 'Leather Gloves',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1603065882751-416336c4c217?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000']
  }
];

// More trends data
const trendingProducts = [
  {
    id: 'trend-1',
    name: 'Summer Dress',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#FFFFFF', '#FEC6A1', '#E5DEFF']
  },
  {
    id: 'trend-2',
    name: 'Cargo Pants',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1609873814058-a8928924184a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#6B4F4F', '#000000', '#C4C4C4']
  },
  {
    id: 'trend-3',
    name: 'Oversized Sweater',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#C45850', '#FEC6A1', '#E5DEFF']
  },
  {
    id: 'trend-4',
    name: 'Platform Boots',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#6B4F4F']
  },
  {
    id: 'trend-5',
    name: 'Silk Scarf',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1606760561143-fd6e2b3be258?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#C45850', '#E5DEFF', '#FEC6A1']
  },
  {
    id: 'trend-6',
    name: 'Statement Earrings',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#D4AF37', '#C0C0C0']
  },
  {
    id: 'trend-7',
    name: 'Cropped Jacket',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1551854838-212c9a5e7721?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#C4C4C4', '#6B4F4F']
  },
  {
    id: 'trend-8',
    name: 'Wide Leg Jeans',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    colors: ['#000000', '#3B5998']
  }
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Fashion Hero" 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Elevate Your Style</h1>
            <p className="text-lg md:text-xl mb-8">
              Discover the latest trends in fashion with our curated collection of premium clothing and accessories.
            </p>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/products" className="btn-primary">
                  Shop Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/products/new-arrivals" className="btn-outline border-white text-white hover:bg-white hover:text-black">
                  New Arrivals
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-fashion-gray-100">
        <div className="container-custom">
          <motion.h2 
            className="section-title text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Shop by Category
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to="/products/women" className="relative group overflow-hidden rounded-md h-64 block">
                <img 
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Women's Fashion" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-semibold mb-2">Women</h3>
                    <span className="inline-flex items-center text-sm">
                      Shop Now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/products/men" className="relative group overflow-hidden rounded-md h-64 block">
                <img 
                  src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Men's Fashion" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-semibold mb-2">Men</h3>
                    <span className="inline-flex items-center text-sm">
                      Shop Now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/products/accessories" className="relative group overflow-hidden rounded-md h-64 block">
                <img 
                  src="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Accessories" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-semibold mb-2">Accessories</h3>
                    <span className="inline-flex items-center text-sm">
                      Shop Now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-0">Featured Products</h2>
            <Link to="/products" className="text-fashion-gray-800 hover:text-accent inline-flex items-center group">
              View All <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-16 bg-fashion-accent text-white">
        <div className="container-custom">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-2">Summer Sale</h2>
              <p className="text-xl">Up to 50% off on selected items</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/products/sale" className="btn-outline border-white text-white hover:bg-white hover:text-fashion-accent">
                Shop Sale
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-0">New Arrivals</h2>
            <Link to="/products/new-arrivals" className="text-fashion-gray-800 hover:text-accent inline-flex items-center group">
              View All <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Now Section - New Addition */}
      <section className="py-16 bg-fashion-gray-100">
        <div className="container-custom">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-0">Trending Now</h2>
            <Link to="/products/trending" className="text-fashion-gray-800 hover:text-accent inline-flex items-center group">
              View All <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
              <motion.button 
                type="submit" 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
