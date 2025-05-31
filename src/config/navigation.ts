// src/config/navigation.ts
export interface NavItem {
  name: string;
  path: string;
  icon?: string;
  badge?: string;
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
  };
}

export const navigationConfig: NavigationConfig = {
  mainItems: [
    { name: 'דף הבית', path: '/'},
    { name: 'האקדמיה', path: '/academy'},
    { name: 'גלריה', path: '/gallery',},
    { name: 'קורסים', path: '/courses',},
    { name: 'צור קשר', path: '/contact',},
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
    compactModeBreakpoint: 700
  }
};