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
      <nav className="navbar-nav">
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
              className="navbar-nav-item"
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link 
                href={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </div>
          );
        })}
      </nav>
      
      {/* Call To Action Button */}
      <div className="navbar-cta">
        <Link 
          href={callToAction.href} 
          className={`${callToAction.className} px-8 py-3 text-base font-semibold animate-shine`}
        >
          {callToAction.text}
        </Link>
      </div>
    </>
  );
};

export default DesktopNav;