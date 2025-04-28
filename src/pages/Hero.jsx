// CentsibleLoadingHero.jsx (Fixed)
import { useState, useEffect } from 'react';
import BrandLoader from '../components/BrandLoader';
import EmailSignupForm from '../components/EmailSignUp';
import SignUpModal from '../components/SignUp';
import SignInModal from '../components/SignIn';

export default function CentsibleLoadingHero() {
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const brandName = "CENTSIBLE";

  // States for modals and forms
  const [email, setEmail] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);

    // Add a small delay before showing the landing page for smooth transition
    setTimeout(() => {
      setShowLanding(true);
    }, 300);
  };

  const handleEmailSubmit = (submittedEmail) => {
    console.log("Email submitted:", submittedEmail); // Add for debugging
    setEmail(submittedEmail);
    setShowSignupModal(true);
  };

  const handleSignUpFromSignIn = () => {
    setShowSigninModal(false);
    setShowSignupModal(true);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Loading screen */}
      <BrandLoader 
        brandName={brandName}
        onLoadingComplete={handleLoadingComplete}
      />

      {/* Main content */}
      <div
        className={`bg-[url('assets/img5.png')] bg-contain bg-center transition-opacity duration-1000 ${showLanding ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed inset-0 -z-10 bg-black/80"></div>

        <header className="fixed top-0 left-0 w-full py-6 px-8 flex justify-between items-center z-30">
          <div className="text-2xl font-bold text-teal-400">Centsible</div>
          <nav>
            <button
              className="text-white border border-teal-400 px-6 py-2 rounded-full transition-colors hover:bg-teal-400 hover:text-black"
              onClick={() => setShowSigninModal(true)}
            >
              Sign In
            </button>
          </nav>
        </header>
          
        <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Smarter decisions, Stronger <br />
              <span className="text-teal-950">financial future.</span>
            </h1>

            <p className="text-xl max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              With Centsible's easy-to-use tools, take control of your spending and savings—and unlock a better financial path.
            </p>

            <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '1.1s' }}>
              <EmailSignupForm onSubmit={handleEmailSubmit} />
            </div>
          </div>
        </main>

        {/* Authentication Modals */}
        <SignUpModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          email={email}
          onSuccess={() => {
            setShowSignupModal(false)
            setShowSigninModal(true)
          }}
        />

        <SignInModal
          isOpen={showSigninModal}
          onClose={() => setShowSigninModal(false)}
          onSignUp={handleSignUpFromSignIn}
        />
        
        {/* Rest of your component code... */}
         {/* About Section with background */}
      <div className={`bg-[url('assets/img2.png')] bg-contain bg-center bg-repeat transition-opacity duration-1000 ${showLanding ? 'opacity-100' : 'opacity-0'}`}>

{/* Add an overlay for better text readability */}
<div className="absolute inset-0 bg-black/30"></div>
<div className="w-full max-w-6xl mx-auto px-6 animate-fade-in" style={{ animationDelay: '1.4s' }}>
  {/* About Section */}
  <section className="mb-24">
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
      About <span className="text-teal-400">Centsible</span>
    </h2>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className="text-lg mb-4">
          Centsible began with a simple belief: you shouldn't need a finance degree to feel in control of your money. We believe that financial clarity should be within everyone's reach—no matter your income, background, or experience.
        </p>
        <p className="text-lg mb-4">
          That's why we built a personal expense tracker that's simple, intuitive, and powerful. With seamless transaction tracking and clear visual reports, our platform is designed to help you gain control over your money and make smarter, more confident financial choices.
        </p>
        <p className="text-lg">
          From tracking daily expenses to monitoring your budget and analyzing your spending habits, Centsible helps you understand where your money goes, set meaningful goals, and make confident financial decisions.

          Because when you know where your money is going, you gain the power to shape your future.
        </p>
      </div>

      <div className="bg-black/30 p-8 rounded-lg border border-teal-400/30">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 text-teal-400">Our Mission</h3>
          <p>To make financial clarity simple and accessible for everyone—by providing tools that turn everyday spending into confident money decisions.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 text-teal-400">Our Vision</h3>
          <p>A world where managing money feels empowering—not overwhelming—and every person has the confidence and tools to build the life they want.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 text-teal-400">Our Values</h3>
          <p>We believe in transparency that builds trust, accessibility that welcomes everyone, empowerment that fuels growth, and innovation that never stops improving the way we manage money.</p>
        </div>
      </div>
    </div>
  </section>

  {/* Why Choose Us Section */}
  <section className="mb-24">
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
      Why Choose <span className="text-teal-400">Centsible</span>
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-black/20 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/60 transition-all hover:transform hover:scale-105">
        <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3 text-teal-400">Easy Transaction Management</h3>
        <p className="text-white/80">Add, edit, and delete transactions with ease. Categorize each expense or income to keep your finances organized.</p>
      </div>

      <div className="bg-black/20 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/60 transition-all hover:transform hover:scale-105">
        <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3 text-teal-400">Visual Spending Reports</h3>
        <p className="text-white/80">Track your spending habits with intuitive charts showing category breakdowns and monthly trends.</p>
      </div>

      <div className="bg-black/20 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/60 transition-all hover:transform hover:scale-105">
        <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3 text-teal-400">Smart Filtering</h3>
        <p className="text-white/80">Filter your transactions by date, category, or type to quickly find what you're looking for and analyze specific spending areas.</p>
      </div>

      <div className="bg-black/20 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/60 transition-all hover:transform hover:scale-105">
        <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3 text-teal-400">Clear Financial Summary</h3>
        <p className="text-white/80">Get an at-a-glance view of your total income, expenses, and remaining balance to always know where you stand financially.</p>
      </div>

      <div className="bg-black/20 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/60 transition-all hover:transform hover:scale-105">
        <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3 text-teal-400">Secure Account Access</h3>
        <p className="text-white/80">Your financial data stays protected with secure account registration and login options to keep your information private.</p>
      </div>

      <div className="bg-black/20 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/60 transition-all hover:transform hover:scale-105">
        <div className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-3 text-teal-400">User-Friendly Interface</h3>
        <p className="text-white/80">Enjoy an intuitive, clean design that makes managing your finances simple and stress-free, even for financial beginners.</p>
      </div>
    </div>
  </section>
</div>

{/* Optional CTA Section */}
<div className="w-full max-w-3xl mx-auto mt-12 text-center animate-fade-in" style={{ animationDelay: '1.7s' }}>
  <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to take control of your finances?</h2>
  <button
    className="bg-teal-400 text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-teal-300 transition-colors"
    onClick={() => setShowSignupModal(true)}
  >
    Start Tracking Now
  </button>
  <p className="mt-4 text-white/70">No credit card required. Create your account in seconds.</p>
</div>
</div>


      </div>
      {/* Footer */}
<footer className="bg-black/80 py-6 border-t border-gray-800">
<div className="container mx-auto px-6 text-center">
  <p className="text-gray-400 text-sm">
    © {new Date().getFullYear()} Centsible. All rights reserved.
  </p>
  <div className="flex justify-center mt-4 space-x-6">
    <a href="#" className="text-gray-400 hover:text-teal-400">Privacy Policy</a>
    <a href="#" className="text-gray-400 hover:text-teal-400">Terms of Service</a>
    <a href="#" className="text-gray-400 hover:text-teal-400">Contact Us</a>
  </div>
</div>
</footer>
  
    </div>
  );
}

     
 