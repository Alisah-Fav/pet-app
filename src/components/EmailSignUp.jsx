// EmailSignupForm.jsx
import { useState } from 'react';

export default function EmailSignupForm({ onSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      onSubmit(email);
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex rounded-3xl overflow-hidden shadow-lg">
        <input 
          type="email" 
          placeholder="Enter your email or phone number"
          className="bg-white text-gray-600 flex-grow px-4 py-3 outline-none w-2/3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          className="bg-teal-400 text-white font-medium px-4 py-3 whitespace-nowrap"
          onClick={handleSubmit}
        >
          Get Started
        </button>
      </div>
      
      <div className="text-white text-center mt-4">
        <div className="flex items-center justify-center gap-2">
          <span>Or get started with</span>
          <button 
            className="bg-white rounded-full p-1 flex items-center justify-center w-8 h-8 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              // Implement Google OAuth sign-in
              console.log('Google sign-in clicked');
            }}
          >
            {/* Google "G" logo */}
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}