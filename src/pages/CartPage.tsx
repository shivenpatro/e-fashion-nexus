
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  
  // Calculate shipping cost (free over $100)
  const shippingCost = subtotal >= 100 || subtotal === 0 ? 0 : 7.99;
  
  // Calculate total
  const total = subtotal + shippingCost;
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-fashion-gray-800 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-fashion-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium">Product</th>
                    <th className="text-center px-4 py-3 text-sm font-medium">Quantity</th>
                    <th className="text-right px-4 py-3 text-sm font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart.map((item, index) => (
                    <tr key={`${item.id}-${item.size}-${item.color}-${index}`}>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium">
                              <Link to={`/product/${item.id}`} className="hover:text-accent">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-fashion-gray-800 mt-1">
                              {item.color}, Size {item.size}
                            </p>
                            <p className="text-sm text-fashion-gray-800 mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              className="w-8 h-8 flex items-center justify-center text-fashion-gray-800 disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <button
                              className="w-8 h-8 flex items-center justify-center text-fashion-gray-800"
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <span className="text-sm font-medium mr-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="text-fashion-gray-800 hover:text-accent"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-fashion-gray-800">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-fashion-gray-800">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                className="btn-primary w-full justify-center"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                to="/products" 
                className="block text-center text-fashion-gray-800 hover:text-accent mt-4 text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
