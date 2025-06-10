// src/config/navigation.ts - Enhanced Version
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
    compactModeBreakpoint: number; // viewport height in px
    enableQuickActions: boolean;
    enableDragToClose: boolean;
    bottomSheetMaxHeight: string; // e.g., '85vh'
    showMiniNav: boolean;
    miniNavScrollThreshold: number; // px from top
  };
}

export const navigationConfig: NavigationConfig = {
  mainItems: [
    { 
      name: 'דף הבית', 
      path: '/',
      icon: '🏠'
    },
    { 
      name: 'האקדמיה', 
      path: '/academy',
      icon: '🎓'
    },
    { 
      name: 'גלריה', 
      path: '/gallery',
      icon: '📸'
    },
    { 
      name: 'קורסים', 
      path: '/courses',
      icon: '📚',
      badge: 'חדש'
    },
    { 
      name: 'צור קשר', 
      path: '/contact',
      icon: '📞'
    },
  ],
  quickActions: {
    primary: {
      text: 'הרשמה לקורסים',
      href: '/contact'
    },
    secondary: {
      text: 'צור קשר',
      href: '/contact'
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