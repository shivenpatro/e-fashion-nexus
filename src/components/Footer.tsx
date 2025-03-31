
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-fashion-gray-100 border-t border-gray-200 mt-12">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">E-Fashion Hub</h3>
            <p className="text-fashion-gray-800 text-sm">
              Your destination for premium fashion with seamless shopping experience.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products/women" className="text-fashion-gray-800 hover:text-accent text-sm">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/products/men" className="text-fashion-gray-800 hover:text-accent text-sm">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products/accessories" className="text-fashion-gray-800 hover:text-accent text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products/new-arrivals" className="text-fashion-gray-800 hover:text-accent text-sm">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/customer-service" className="text-fashion-gray-800 hover:text-accent text-sm">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="text-fashion-gray-800 hover:text-accent text-sm">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-fashion-gray-800 hover:text-accent text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-fashion-gray-800 hover:text-accent text-sm">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-fashion-gray-800 text-sm">Email: support@efashionhub.com</li>
              <li className="text-fashion-gray-800 text-sm">Phone: +1 (555) 123-4567</li>
              <li className="text-fashion-gray-800 text-sm">Hours: Mon-Fri, 9am-5pm EST</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-fashion-gray-800 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} E-Fashion Hub. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-fashion-gray-800 hover:text-accent">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-fashion-gray-800 hover:text-accent">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
