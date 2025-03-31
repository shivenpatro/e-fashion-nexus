
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';

// Mock order data
const orders = [
  {
    id: 'ORD-123456',
    date: '2023-08-15',
    total: 159.97,
    status: 'Delivered',
    items: 3
  },
  {
    id: 'ORD-123457',
    date: '2023-07-29',
    total: 89.99,
    status: 'Shipped',
    items: 1
  },
  {
    id: 'ORD-123458',
    date: '2023-07-10',
    total: 224.95,
    status: 'Delivered',
    items: 2
  }
];

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  
  if (!user) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Please log in to view your profile</h1>
        <Link to="/login" className="btn-primary">
          Login
        </Link>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    toast.success('You have been logged out');
  };
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-semibold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-fashion-gray-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-fashion-gray-800" />
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-fashion-gray-800">{user.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <button
                className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                  activeTab === 'orders' 
                    ? 'bg-fashion-gray-100 text-fashion-gray-900' 
                    : 'text-fashion-gray-800 hover:bg-fashion-gray-100'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                Orders
              </button>
              
              <button
                className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                  activeTab === 'wishlist' 
                    ? 'bg-fashion-gray-100 text-fashion-gray-900' 
                    : 'text-fashion-gray-800 hover:bg-fashion-gray-100'
                }`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart className="h-5 w-5 mr-3" />
                Wishlist
              </button>
              
              <button
                className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                  activeTab === 'payment' 
                    ? 'bg-fashion-gray-100 text-fashion-gray-900' 
                    : 'text-fashion-gray-800 hover:bg-fashion-gray-100'
                }`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Payment Methods
              </button>
              
              <button
                className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                  activeTab === 'settings' 
                    ? 'bg-fashion-gray-100 text-fashion-gray-900' 
                    : 'text-fashion-gray-800 hover:bg-fashion-gray-100'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Account Settings
              </button>
              
              <button
                className="flex items-center w-full px-4 py-2 rounded-md text-left text-fashion-gray-800 hover:bg-fashion-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-medium mb-4">My Orders</h2>
              
              {orders.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-fashion-gray-100">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium">Order</th>
                        <th className="text-left px-6 py-3 text-sm font-medium">Date</th>
                        <th className="text-left px-6 py-3 text-sm font-medium">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-medium">Total</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4">
                            <span className="font-medium">{order.id}</span>
                            <p className="text-sm text-fashion-gray-800">{order.items} items</p>
                          </td>
                          <td className="px-6 py-4 text-fashion-gray-800">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link 
                              to={`/profile/orders/${order.id}`} 
                              className="text-accent hover:underline"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
                  <p className="text-fashion-gray-800 mb-4">You haven't placed any orders yet.</p>
                  <Link to="/products" className="btn-primary">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-xl font-medium mb-4">My Wishlist</h2>
              
              <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
                <p className="text-fashion-gray-800 mb-4">Your wishlist is empty.</p>
                <Link to="/products" className="btn-primary">
                  Discover Products
                </Link>
              </div>
            </div>
          )}
          
          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <div>
              <h2 className="text-xl font-medium mb-4">Payment Methods</h2>
              
              <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
                <p className="text-fashion-gray-800 mb-4">You don't have any saved payment methods.</p>
                <button className="btn-primary">
                  Add Payment Method
                </button>
              </div>
            </div>
          )}
          
          {/* Account Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-medium mb-4">Account Settings</h2>
              
              <div className="bg-white border border-gray-200 rounded-md p-6">
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        defaultValue={user.name.split(' ')[0]}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        defaultValue={user.name.split(' ')[1] || ''}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      />
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    className="btn-primary"
                    onClick={() => toast.success('Profile updated successfully!')}
                  >
                    Save Changes
                  </button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                      />
                    </div>
                    
                    <button 
                      type="button" 
                      className="btn-primary"
                      onClick={() => toast.success('Password updated successfully!')}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
