
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signUp, isAuthenticated } = useAuth();
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  // Form validation
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;
  const passwordsMatch = password === confirmPassword;
  
  const isValidForm = 
    firstName && 
    lastName && 
    email && 
    password && 
    confirmPassword && 
    isValidEmail(email) && 
    isValidPassword(password) && 
    passwordsMatch;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidForm) {
      if (!passwordsMatch) {
        toast.error('Passwords do not match');
      } else if (!isValidPassword(password)) {
        toast.error('Password must be at least 6 characters');
      } else {
        toast.error('Please fill out all fields correctly');
      }
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName
      });
      
      if (success) {
        // Registration successful, show message and redirect to login
        toast.success('Registration successful! Please check your email to confirm your account');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-center">Create an Account</h1>
        
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                required
              />
              <p className="text-xs text-fashion-gray-800 mt-1">
                Must be at least 6 characters long
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent ${
                  confirmPassword && !passwordsMatch ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full justify-center"
              disabled={isLoading || !isValidForm}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-fashion-gray-800">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
