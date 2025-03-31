
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { CreditCard, ShoppingBag, Truck } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  // State for multi-step form
  const [step, setStep] = useState(1);
  
  // Shipping information
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  // Payment information
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: ''
  });
  
  // Shipping method and cost
  const [shippingMethod, setShippingMethod] = useState('standard');
  const shippingCost = shippingMethod === 'express' ? 14.99 : (subtotal >= 100 ? 0 : 7.99);
  
  // Calculate total
  const total = subtotal + shippingCost;
  
  // Handle shipping info input changes
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle payment info input changes
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Validate shipping information
  const validateShippingInfo = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  // Validate payment information
  const validatePaymentInfo = () => {
    const requiredFields = ['cardNumber', 'nameOnCard', 'expiryDate', 'cvv'];
    const missingFields = requiredFields.filter(field => !paymentInfo[field as keyof typeof paymentInfo]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all payment details');
      return false;
    }
    
    // Basic card validation
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid 16-digit card number');
      return false;
    }
    
    if (paymentInfo.cvv.length < 3) {
      toast.error('Please enter a valid CVV code');
      return false;
    }
    
    return true;
  };
  
  // Handle moving to next step
  const nextStep = () => {
    if (step === 1) {
      if (validateShippingInfo()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validatePaymentInfo()) {
        setStep(3);
      }
    }
  };
  
  // Handle moving to previous step
  const prevStep = () => {
    setStep(step - 1);
  };
  
  // Handle order submission
  const handlePlaceOrder = () => {
    // This is where you would normally send the order to your backend
    
    // Show success toast
    toast.success('Order placed successfully!');
    
    // Clear the cart
    clearCart();
    
    // Navigate to confirmation page
    navigate('/order-confirmation');
  };
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  // Component for step indicator
  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 1 ? 'bg-accent text-white' : 'bg-gray-200 text-fashion-gray-800'
        }`}>
          1
        </div>
        <div className={`w-16 h-1 ${step >= 2 ? 'bg-accent' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 2 ? 'bg-accent text-white' : 'bg-gray-200 text-fashion-gray-800'
        }`}>
          2
        </div>
        <div className={`w-16 h-1 ${step >= 3 ? 'bg-accent' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          step >= 3 ? 'bg-accent text-white' : 'bg-gray-200 text-fashion-gray-800'
        }`}>
          3
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-semibold mb-8 text-center">Checkout</h1>
      
      <StepIndicator />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Steps */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="border border-gray-200 rounded-md p-6">
              <div className="flex items-center mb-6">
                <Truck className="mr-2 h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Country *</label>
                  <select
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-md font-medium mb-4">Shipping Method</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center border border-gray-200 p-3 rounded-md cursor-pointer hover:border-accent">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-fashion-gray-800">Estimated delivery in 4-6 business days</p>
                    </div>
                    <div className="font-medium">
                      {subtotal >= 100 ? 'Free' : `$7.99`}
                    </div>
                  </label>
                  
                  <label className="flex items-center border border-gray-200 p-3 rounded-md cursor-pointer hover:border-accent">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-sm text-fashion-gray-800">Estimated delivery in 1-3 business days</p>
                    </div>
                    <div className="font-medium">$14.99</div>
                  </label>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="border border-gray-200 rounded-md p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="mr-2 h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">Payment Information</h2>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    maxLength={19}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Name on Card *</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={paymentInfo.nameOnCard}
                    onChange={handlePaymentInfoChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      placeholder="MM/YY"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      maxLength={5}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      placeholder="123"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  className="btn-outline"
                >
                  Back to Shipping
                </button>
                
                <button
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Review Order
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Order Review */}
          {step === 3 && (
            <div className="border border-gray-200 rounded-md p-6">
              <div className="flex items-center mb-6">
                <ShoppingBag className="mr-2 h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">Review Your Order</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Shipping Address</h3>
                <div className="bg-fashion-gray-100 p-3 rounded-md">
                  <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                  <p>{shippingInfo.country}</p>
                  <p>{shippingInfo.email}</p>
                  <p>{shippingInfo.phone}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Payment Method</h3>
                <div className="bg-fashion-gray-100 p-3 rounded-md">
                  <p>Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  <p>{paymentInfo.nameOnCard}</p>
                  <p>Expires: {paymentInfo.expiryDate}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Shipping Method</h3>
                <div className="bg-fashion-gray-100 p-3 rounded-md">
                  <p>{shippingMethod === 'standard' ? 'Standard Shipping' : 'Express Shipping'}</p>
                  <p className="text-sm text-fashion-gray-800">
                    {shippingMethod === 'standard' 
                      ? 'Estimated delivery in 4-6 business days'
                      : 'Estimated delivery in 1-3 business days'
                    }
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Order Items</h3>
                <div className="bg-fashion-gray-100 p-3 rounded-md space-y-3">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-fashion-gray-800">
                          {item.color}, Size {item.size} - Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  className="btn-outline"
                >
                  Back to Payment
                </button>
                
                <button
                  onClick={handlePlaceOrder}
                  className="btn-primary"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-md p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-fashion-gray-800">Subtotal ({cart.length} items)</span>
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
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium mb-2">Order Items</h3>
              <div className="space-y-3 max-h-60 overflow-auto pr-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <p className="text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-fashion-gray-800">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
