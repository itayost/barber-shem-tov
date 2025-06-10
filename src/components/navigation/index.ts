// src/components/navigation/index.ts - Enhanced Version
'use client';

// Main navigation components
export { default as Navbar } from './Navbar';
export { default as Logo } from './Logo';
export { default as DesktopNav } from './DesktopNav';
export { default as MobileMenuButton } from './MobileMenuButton';
export { default as SocialLinks } from './SocialLinks';

// Mobile menu components
export { default as MobileMenu } from './MobileMenu';

// Mobile menu sub-components
export { default as MobileMenuHeader } from './mobile/MobileMenuHeader';
export { default as MobileMenuNav } from './mobile/MobileMenuNav';
export { default as MobileMenuActions } from './mobile/MobileMenuActions';
export { default as MobileMenuFooter } from './mobile/MobileMenuFooter';

// Re-export types and config
export type { NavItem, NavigationConfig } from '@/config/navigation';
export { navigationConfig } from '@/config/navigation';

// Backward compatibility exports (can be removed later)
export { default as NavbarOptimized } from './Navbar';
export { default as MobileMenuRefactored } from './MobileMenu';