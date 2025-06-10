// src/components/common/SmartFAB.tsx - Updated
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import WhatsAppFloat from './WhatsAppFloat';
import QuickEnrollFloat from './QuickEnrollFloat';

const SmartFAB: React.FC = () => {
  const pathname = usePathname();
  
  // Don't show any FAB on the /apply page itself
  if (pathname === '/apply') {
    return null;
  }
  
  // Determine which FAB to show based on current page
  const showEnrollmentFAB = pathname?.includes('/courses') || 
                           pathname?.includes('/academy');
  
  // Show enrollment FAB on course-related pages
  if (showEnrollmentFAB) {
    return <QuickEnrollFloat />;
  }
  
  // Default to WhatsApp FAB for all other pages
  return <WhatsAppFloat />;
};

export default SmartFAB;