
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-semibold text-2xl tracking-tight">
            E-Fashion Hub
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-fashion-gray-800 hover:text-accent">
              All Products
            </Link>
            <Link to="/products/women" className="text-fashion-gray-800 hover:text-accent">
              Women
            </Link>
            <Link to="/products/men" className="text-fashion-gray-800 hover:text-accent">
              Men
            </Link>
            <Link to="/products/accessories" className="text-fashion-gray-800 hover:text-accent">
              Accessories
            </Link>
          </div>
          
          {/* Search, Cart, and User Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-fashion-gray-800 hover:text-accent p-1">
              <Search size={20} />
            </Link>
            
            <Link to="/cart" className="text-fashion-gray-800 hover:text-accent p-1 relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Link to={isAuthenticated ? "/profile" : "/login"} className="text-fashion-gray-800 hover:text-accent p-1">
              <User size={20} />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-fashion-gray-800 hover:text-accent p-1"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                className="text-fashion-gray-800 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/products/women" 
                className="text-fashion-gray-800 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/products/men" 
                className="text-fashion-gray-800 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/products/accessories" 
                className="text-fashion-gray-800 hover:text-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
