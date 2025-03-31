
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, TruckIcon } from 'lucide-react';

const OrderConfirmationPage = () => {
  // Generate mock order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Estimated delivery date (5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Order Confirmed!</h1>
          <p className="text-fashion-gray-800">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>
        
        <div className="bg-fashion-gray-100 p-6 rounded-md mb-8">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div>
              <p className="text-sm text-fashion-gray-800">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            
            <div className="mt-3 sm:mt-0">
              <p className="text-sm text-fashion-gray-800">Order Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex items-center">
              <TruckIcon className="h-5 w-5 mr-2 text-fashion-gray-800" />
              <h3 className="font-medium">Shipping Information</h3>
            </div>
            <div className="mt-2">
              <p className="text-fashion-gray-800">Estimated delivery by:</p>
              <p className="font-medium">{formattedDeliveryDate}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium mb-2">What's Next?</h3>
            <ul className="text-fashion-gray-800 space-y-1">
              <li>• You will receive an order confirmation email shortly.</li>
              <li>• We'll notify you when your order ships.</li>
              <li>• You can track your order status in your account.</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/profile/orders" className="btn-primary">
            Track Your Order
          </Link>
          
          <Link to="/products" className="btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
