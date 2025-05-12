'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items in Hebrew
  const navItems = [
    { name: 'דף הבית', path: '/' },
    { name: 'שירותים', path: '/services' },
    { name: 'האקדמיה', path: '/academy' },
    { name: 'גלריה', path: '/gallery' },
    { name: 'אודות', path: '/about' },
    { name: 'צור קשר', path: '/contact' },
  ];

  // Calculate appropriate logo size based on navbar height
  // When scrolled, navbar is shorter (py-3 = padding-top and padding-bottom of 0.75rem = 1.5rem total)
  // When not scrolled, navbar is taller (py-6 = padding-top and padding-bottom of 1.5rem = 3rem total)
  const logoHeight = isScrolled ? 30 : 40; // Adjust these values to fit your navbar
  
  // Assuming an aspect ratio of the original logo
  const logoWidth = logoHeight * 3; // Adjust the multiplier based on your logo's aspect ratio

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-charcoal shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo (Right in RTL) - Sized to fit navbar height */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="relative z-10 inline-block">
            <Image 
              src="/images/logos/logo.png"
              alt="The Fader Barbershop"
              width={logoWidth}
              height={logoHeight}
              className="h-auto transition-all duration-300"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation (Middle) */}
        <nav className="hidden md:flex items-center justify-center space-x-8 space-x-reverse">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              className="text-offwhite hover:text-gold transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Book Button (Left in RTL) */}
        <div className="hidden md:block flex-shrink-0">
          <Link 
            href="/contact" 
            className="inline-block px-6 py-2 bg-gold text-charcoal font-medium font-heebo transition-colors duration-200 hover:bg-opacity-90"
          >
            הזמן תור
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none z-10 flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
        >
          <div className={`w-6 h-0.5 bg-offwhite mb-1.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-offwhite mb-1.5 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-offwhite transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-charcoal bg-opacity-95 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <nav className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                className="text-offwhite text-h4 hover:text-gold transition-colors duration-200 font-heebo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="mt-4 px-8 py-3 bg-gold text-charcoal font-medium font-heebo transition-colors duration-200 hover:bg-opacity-90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              הזמן תור
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;