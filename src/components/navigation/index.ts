'use client';

// Main navigation components
export { default as Navbar } from './Navbar';
export { default as NavbarOptimized } from './NavbarOptimized';
export { default as Logo } from './Logo';
export { default as DesktopNav } from './DesktopNav';
export { default as MobileMenuButton } from './MobileMenuButton';
export { default as SocialLinks } from './SocialLinks';

// Mobile menu variations
export { default as MobileMenu } from './MobileMenu';
export { default as MobileMenuRefactored } from './MobileMenuRefactored';
export { default as MobileMenuSlide } from './MobileMenuSlide';

// Mobile menu sub-components
export { default as MobileMenuHeader } from './mobile/MobileMenuHeader';
export { default as MobileMenuNav } from './mobile/MobileMenuNav';
export { default as MobileMenuActions } from './mobile/MobileMenuActions';
export { default as MobileMenuFooter } from './mobile/MobileMenuFooter';

// Re-export types and config
export type { NavItem, NavigationConfig } from '@/config/navigation';
export { navigationConfig } from '@/config/navigation';