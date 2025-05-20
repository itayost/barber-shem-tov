'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

interface NavItem {
  name: string;
  path: string;
}

interface CallToAction {
  text: string;
  href: string;
  className: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
  callToAction: CallToAction;
}

const DesktopNav = ({ navItems, callToAction }: DesktopNavProps) => {
  // Get current pathname to determine active link
  const pathname = usePathname();
  
  // Track hover state for each nav item
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  return (
    <>
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center justify-center space-x-8 space-x-reverse">
        {navItems.map((item) => {
          // Check if current path matches this nav item
          const isActive = 
            pathname === item.path || 
            (item.path !== '/' && pathname?.startsWith(item.path));
            
          // Check if this item is being hovered
          const isHovered = hoveredItem === item.path;
          
          return (
            <div 
              key={item.name}
              className="relative py-2"
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link 
                href={item.path}
                className={`inline-block ${isActive ? 'text-gold' : 'text-offwhite hover:text-gold'} transition-colors duration-200`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
              
              {/* Explicit underline element with inline styles for line drawing animation */}
              <div
                className="absolute bottom-0 right-0 h-0.5 bg-gold"
                style={{ 
                  width: isActive ? '100%' : (isHovered ? '100%' : '0%'),
                  transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              />
            </div>
          );
        })}
      </nav>
      
      {/* Call To Action Button with animation */}
      <div className="hidden md:block flex-shrink-0">
        <Link 
          href={callToAction.href} 
          className={`${callToAction.className} relative overflow-hidden`}
        >
          <span className="relative z-10">{callToAction.text}</span>
          
          {/* Shine effect with inline styles */}
          {callToAction.className.includes('btn-primary') && (
            <div
              className="absolute inset-0 bg-white/10 skew-x-12"
              style={{
                animation: 'shineEffect 2s ease-in-out infinite',
                transformOrigin: '0% 100%',
              }}
            />
          )}
        </Link>
      </div>
      
      {/* Keyframe animation for shine effect */}
      <style jsx>{`
        @keyframes shineEffect {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>
    </>
  );
};

export default DesktopNav;