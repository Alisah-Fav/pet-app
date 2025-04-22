
// BrandLoader.jsx
import { useState, useEffect } from 'react';

export default function BrandLoader({ brandName, onLoadingComplete }) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const letterInterval = setInterval(() => {
      setVisibleLetters(prev => {
        if (prev < brandName.length) {
          return prev + 1;
        }
        clearInterval(letterInterval);
        return prev;
      });
    }, 300);

    const timer = setTimeout(() => {
      setLoading(false);
      onLoadingComplete();
    }, brandName.length * 300 + 800);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(timer);
    };
  }, [brandName, onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: 'black' }}
    >
      <div className="relative bg-black/60 p-8 rounded-lg">
        <div className="flex overflow-hidden">
          {brandName.split('').map((letter, index) => (
            <div key={index} className="relative overflow-hidden mx-1">
              <span 
                className={`text-5xl md:text-7xl font-bold inline-block transform transition-transform duration-500 ${
                  index < visibleLetters ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {letter}
              </span>
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 transform transition-transform duration-300 origin-left ${
                  index < visibleLetters ? 'scale-x-100' : 'scale-x-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 100}ms` }}
              ></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}