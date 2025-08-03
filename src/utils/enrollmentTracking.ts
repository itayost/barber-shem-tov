// src/utils/enrollmentTracking.ts

/**
 * Simple enrollment tracking utilities
 * Tracks user interactions with enrollment CTAs
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    fbq?: (
      command: 'track' | 'trackCustom' | 'init' | 'pageView',
      event: string,
      parameters?: Record<string, unknown>
    ) => void;
  }
}

export type EnrollmentMethod = 'whatsapp' | 'phone' | 'form' | 'float_whatsapp' | 'float_phone' | 'float_form';
export type EnrollmentSource = 'course_card' | 'course_page' | 'contact_page' | 'float_button' | 'academy_page';

interface EnrollmentEvent {
  method: EnrollmentMethod;
  source: EnrollmentSource;
  courseName?: string;
  coursePrice?: number;
  timestamp: string;
}

class EnrollmentTracker {
  private readonly STORAGE_KEY = 'enrollment_interactions';
  
  /**
   * Track an enrollment interaction
   */
  track(method: EnrollmentMethod, source: EnrollmentSource, courseName?: string, coursePrice?: number) {
    const event: EnrollmentEvent = {
      method,
      source,
      courseName,
      coursePrice,
      timestamp: new Date().toISOString()
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Enrollment Event:', event);
    }

    // Store in localStorage for analytics
    try {
      const stored = this.getStoredEvents();
      stored.push(event);
      
      // Keep only last 50 events to prevent storage overflow
      const recentEvents = stored.slice(-50);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recentEvents));
    } catch (error) {
      console.error('Failed to store enrollment event:', error);
    }

    // Send to analytics if available
    this.sendToAnalytics(event);
  }

  /**
   * Get stored enrollment events
   */
  getStoredEvents(): EnrollmentEvent[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Get enrollment statistics
   */
  getStats() {
    const events = this.getStoredEvents();
    
    const stats = {
      total: events.length,
      byMethod: {} as Record<EnrollmentMethod, number>,
      bySource: {} as Record<EnrollmentSource, number>,
      popularCourses: {} as Record<string, number>,
      conversionPath: [] as string[]
    };

    events.forEach(event => {
      // Count by method
      stats.byMethod[event.method] = (stats.byMethod[event.method] || 0) + 1;
      
      // Count by source
      stats.bySource[event.source] = (stats.bySource[event.source] || 0) + 1;
      
      // Count course popularity
      if (event.courseName) {
        stats.popularCourses[event.courseName] = (stats.popularCourses[event.courseName] || 0) + 1;
      }
    });

    // Determine most common conversion path
    if (events.length > 0) {
      const lastEvent = events[events.length - 1];
      stats.conversionPath = [`${lastEvent.source} -> ${lastEvent.method}`];
    }

    return stats;
  }

  /**
   * Send event to analytics service (Google Analytics, Mixpanel, etc.)
   */
  private sendToAnalytics(event: EnrollmentEvent) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'enrollment_interaction', {
        method: event.method,
        source: event.source,
        course_name: event.courseName,
        course_price: event.coursePrice,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: event.courseName,
        value: event.coursePrice,
        currency: 'ILS',
        content_category: 'Course Enrollment',
      });
    }

    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(() => {
        // Silently fail analytics
      });
    }
  }

  /**
   * Clear stored events (for privacy/GDPR)
   */
  clearEvents() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // Ignore errors
    }
  }
}

// Export singleton instance
export const enrollmentTracker = new EnrollmentTracker();

// Helper functions for common tracking scenarios
export const trackEnrollment = {
  // From course cards
  courseCard: {
    whatsapp: (courseName: string, price: number) => 
      enrollmentTracker.track('whatsapp', 'course_card', courseName, price),
    phone: (courseName: string, price: number) => 
      enrollmentTracker.track('phone', 'course_card', courseName, price),
    form: (courseName: string, price: number) => 
      enrollmentTracker.track('form', 'course_card', courseName, price),
  },
  
  // From float button
  float: {
    whatsapp: (courseName?: string, price?: number) => 
      enrollmentTracker.track('float_whatsapp', 'float_button', courseName, price),
    phone: (courseName?: string, price?: number) => 
      enrollmentTracker.track('float_phone', 'float_button', courseName, price),
    form: (courseName?: string, price?: number) => 
      enrollmentTracker.track('float_form', 'float_button', courseName, price),
  },
  
  // From contact page
  contactPage: {
    whatsapp: (courseName?: string) => 
      enrollmentTracker.track('whatsapp', 'contact_page', courseName),
    form: (courseName?: string) => 
      enrollmentTracker.track('form', 'contact_page', courseName),
  }
};