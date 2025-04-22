// SignInModal.jsx
import { useState } from 'react';

export default function SignInModal({ isOpen, onClose, onSignUp }) {
  const [signinData, setSigninData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSigninData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignin = (e) => {
    e.preventDefault();
    
    // Here you would send the sign-in data to your backend for authentication
    console.log("Sign in data:", signinData);
    
    // Close the modal after submission
    onClose();
    
    // Reset form
    setSigninData({
      email: '',
      password: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
        
        <form onSubmit={handleSignin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="signinEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="signinEmail"
                name="email"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={signinData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="signinPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="signinPassword"
                name="password"
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={signinData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white font-medium px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-green-600 hover:text-green-500"
                onClick={onSignUp}
              >
                Sign up now
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
