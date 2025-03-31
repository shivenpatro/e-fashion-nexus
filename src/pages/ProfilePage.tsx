import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
  
  const profileTabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.user_metadata?.avatar_url || undefined} />
              <AvatarFallback className="bg-accent text-white">
                {user?.user_metadata?.first_name?.[0] || user?.email?.[0] || 'U'}
                {user?.user_metadata?.last_name?.[0] || ''}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-xl font-semibold">
                {user?.user_metadata?.first_name 
                  ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
                  : user?.email || 'User'}
              </h3>
              <p className="text-fashion-gray-800">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <ShoppingBag className="h-5 w-5" />,
      content: (
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
      ),
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: <Heart className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-xl font-medium mb-4">My Wishlist</h2>
          
          <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
            <p className="text-fashion-gray-800 mb-4">Your wishlist is empty.</p>
            <Link to="/products" className="btn-primary">
              Discover Products
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: <CreditCard className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-xl font-medium mb-4">Payment Methods</h2>
          
          <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
            <p className="text-fashion-gray-800 mb-4">You don't have any saved payment methods.</p>
            <button className="btn-primary">
              Add Payment Method
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: <Settings className="h-5 w-5" />,
      content: (
        <div>
          <h2 className="text-xl font-medium mb-4">Account Settings</h2>
          
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    defaultValue={user?.user_metadata?.first_name}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    defaultValue={user?.user_metadata?.last_name || ''}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
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
      ),
    },
  ];

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-semibold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-md p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.user_metadata?.avatar_url || undefined} />
                <AvatarFallback className="bg-accent text-white">
                  {user?.user_metadata?.first_name?.[0] || user?.email?.[0] || 'U'}
                  {user?.user_metadata?.last_name?.[0] || ''}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">
                  {user?.user_metadata?.first_name 
                    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
                    : user?.email || 'User'}
                </h2>
                <p className="text-sm text-fashion-gray-800">{user?.email}</p>
              </div>
            </div>
            
            <nav className="p-2">
              {profileTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                    activeTab === tab.id 
                      ? 'bg-fashion-gray-100 text-fashion-gray-900' 
                      : 'text-fashion-gray-800 hover:bg-fashion-gray-100'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              
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
        
        <div className="flex-grow">
          {profileTabs.map(tab => (
            <div key={tab.id} className={`mt-8 ${activeTab === tab.id ? 'block' : 'hidden'}`}>
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
