// src/components/common/SmartFAB.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import WhatsAppFloat from './WhatsAppFloat';
import QuickEnrollFloat from './QuickEnrollFloat';

const SmartFAB: React.FC = () => {
  const pathname = usePathname();
  
  // Determine which FAB to show based on current page
  const showEnrollmentFAB = pathname?.includes('/courses') || 
                           pathname?.includes('/academy') ||
                           pathname?.includes('/contact');
  
  // Show enrollment FAB on course-related pages
  if (showEnrollmentFAB) {
    return <QuickEnrollFloat />;
  }
  
  // Default to WhatsApp FAB for all other pages
  return <WhatsAppFloat />;
};

export default SmartFAB;