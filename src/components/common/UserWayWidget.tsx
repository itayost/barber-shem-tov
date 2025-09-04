// src/components/common/UserWayWidget.tsx
'use client';

import { useEffect } from 'react';

export default function UserWayWidget() {
  useEffect(() => {
    // Only load UserWay after hydration is complete
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.userway.org/widget.js';
      script.setAttribute('data-account', '7ek953Xjr7');
      script.async = true;
      
      // Add script to body after a small delay to ensure hydration is complete
      setTimeout(() => {
        document.body.appendChild(script);
      }, 100);
      
      return () => {
        // Cleanup on unmount if needed
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return null;
}