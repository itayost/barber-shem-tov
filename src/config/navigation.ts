// src/config/navigation.ts - Updated Version
export interface NavItem {
  name: string;
  path: string;
  icon?: string;
  badge?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export interface NavigationConfig {
  mainItems: NavItem[];
  quickActions: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  mobileMenu: {
    showStats: boolean;
    showHours: boolean;
    compactModeBreakpoint: number;
    enableQuickActions: boolean;
    enableDragToClose: boolean;
    bottomSheetMaxHeight: string;
    showMiniNav: boolean;
    miniNavScrollThreshold: number;
  };
}

export const navigationConfig: NavigationConfig = {
  mainItems: [
    { 
      name: 'דף הבית', 
      path: '/',
    },
    { 
      name: 'האקדמיה', 
      path: '/academy',
    },
    { 
      name: 'גלריה', 
      path: '/gallery',
    },
    { 
      name: 'קורסים', 
      path: '/courses',
    },
    { 
      name: 'צור קשר', 
      path: '/contact',
    },
  ],
  quickActions: {
    primary: {
      text: 'הרשמה לקורסים',
      href: '/apply' // Changed from /contact
    },
    secondary: {
      text: 'צור קשר',
      href: '/contact' // Keep this for general inquiries
    }
  },
  mobileMenu: {
    showStats: true,
    showHours: true,
    compactModeBreakpoint: 700,
    enableQuickActions: true,
    enableDragToClose: true,
    bottomSheetMaxHeight: '85vh',
    showMiniNav: true,
    miniNavScrollThreshold: 200
  }
};