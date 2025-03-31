
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PackageCheck, Truck, TruckIcon } from 'lucide-react';

// Mock order data
const orders = {
  'ORD-123456': {
    id: 'ORD-123456',
    date: '2023-08-15',
    status: 'Delivered',
    trackingNumber: 'TRK123456789',
    carrier: 'FedEx',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'Credit Card ending in 4242',
    items: [
      {
        id: '1',
        name: 'Premium Cotton T-Shirt',
        color: 'Black',
        size: 'M',
        price: 39.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      },
      {
        id: '5',
        name: 'Designer Sunglasses',
        color: 'Black',
        size: 'One Size',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 159.97,
    shipping: 0,
    tax: 12.80,
    total: 172.77,
    timeline: [
      { date: '2023-08-10', status: 'Order Placed', description: 'Your order has been placed' },
      { date: '2023-08-11', status: 'Payment Confirmed', description: 'Your payment has been confirmed' },
      { date: '2023-08-12', status: 'Processing', description: 'Your order is being processed' },
      { date: '2023-08-13', status: 'Shipped', description: 'Your order has been shipped' },
      { date: '2023-08-15', status: 'Delivered', description: 'Your order has been delivered' }
    ]
  },
  'ORD-123457': {
    id: 'ORD-123457',
    date: '2023-07-29',
    status: 'Shipped',
    trackingNumber: 'TRK987654321',
    carrier: 'UPS',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'Credit Card ending in 4242',
    items: [
      {
        id: '3',
        name: 'Classic Leather Jacket',
        color: 'Brown',
        size: 'L',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 199.99,
    shipping: 0,
    tax: 16.00,
    total: 215.99,
    timeline: [
      { date: '2023-07-25', status: 'Order Placed', description: 'Your order has been placed' },
      { date: '2023-07-26', status: 'Payment Confirmed', description: 'Your payment has been confirmed' },
      { date: '2023-07-27', status: 'Processing', description: 'Your order is being processed' },
      { date: '2023-07-29', status: 'Shipped', description: 'Your order has been shipped' }
    ]
  }
};

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orders[orderId as keyof typeof orders];
  
  if (!order) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Order Not Found</h1>
        <p className="mb-6">The order you're looking for doesn't exist or has been removed.</p>
        <Link to="/profile" className="btn-primary">
          Back to Profile
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Link to="/profile" className="text-fashion-gray-800 hover:text-accent flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Profile
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <span className={`px-3 py-1 text-sm rounded-full ${
          order.status === 'Delivered' 
            ? 'bg-green-100 text-green-800' 
            : order.status === 'Shipped'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {order.status}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Info */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
              <div>
                <p className="text-sm text-fashion-gray-800">Order Number</p>
                <p className="font-medium">{order.id}</p>
              </div>
              
              <div className="mt-3 sm:mt-0">
                <p className="text-sm text-fashion-gray-800">Order Date</p>
                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>
            
            {order.status === 'Shipped' || order.status === 'Delivered' ? (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2 text-fashion-gray-800" />
                  <h3 className="font-medium">Shipping Information</h3>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-fashion-gray-800">Tracking Number: <span className="font-medium">{order.trackingNumber}</span></p>
                  <p className="text-sm text-fashion-gray-800">Carrier: {order.carrier}</p>
                  <a href="#" className="text-accent hover:underline text-sm mt-1 inline-block">
                    Track Package
                  </a>
                </div>
              </div>
            ) : null}
          </div>
          
          {/* Order Timeline */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="font-medium mb-4">Order Timeline</h2>
            
            <div className="relative">
              {order.timeline.map((event, index) => (
                <div key={index} className="mb-6 relative pl-8">
                  {/* Timeline connector */}
                  {index < order.timeline.length - 1 && (
                    <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    index === order.timeline.length - 1
                      ? 'bg-accent text-white'
                      : 'bg-gray-200 text-fashion-gray-800'
                  }`}>
                    {index === order.timeline.length - 1 ? (
                      order.status === 'Delivered' ? <PackageCheck size={14} /> : <Truck size={14} />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium">{event.status}</p>
                    <p className="text-sm text-fashion-gray-800">{event.description}</p>
                    <p className="text-xs text-fashion-gray-800 mt-1">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <h2 className="font-medium p-6 border-b border-gray-200">Order Items</h2>
            
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div key={index} className="p-6 flex">
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">
                      <Link to={`/product/${item.id}`} className="hover:text-accent">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-fashion-gray-800">
                      {item.color}, Size {item.size}
                    </p>
                    <p className="text-sm text-fashion-gray-800 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-fashion-gray-800 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-fashion-gray-800">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-fashion-gray-800">Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-fashion-gray-800">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="font-medium mb-4">Shipping Address</h2>
            
            <div className="text-fashion-gray-800">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          
          {/* Payment Info */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="font-medium mb-4">Payment Method</h2>
            
            <p className="text-fashion-gray-800">{order.paymentMethod}</p>
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <button className="btn-primary w-full justify-center">
              Need Help?
            </button>
            
            {order.status === 'Delivered' && (
              <button className="btn-outline w-full justify-center">
                Return Item(s)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
