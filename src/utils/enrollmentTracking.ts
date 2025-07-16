// src/utils/enrollmentTracking.ts

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

export type EnrollmentMethod =
  | 'whatsapp'
  | 'phone'
  | 'form'
  | 'float_whatsapp'
  | 'float_phone'
  | 'float_form';
export type EnrollmentSource =
  | 'course_card'
  | 'course_page'
  | 'contact_page'
  | 'float_button'
  | 'academy_page'
  | 'apply_page'; // הוספתי את apply_page

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
  track(
    method: EnrollmentMethod,
    source: EnrollmentSource,
    courseName?: string,
    coursePrice?: number
  ) {
    const event: EnrollmentEvent = {
      method,
      source,
      courseName,
      coursePrice,
      timestamp: new Date().toISOString(),
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
    } catch (error) {
      console.error('Failed to retrieve enrollment events:', error);
      return [];
    }
  }

  /**
   * Send event to analytics services
   */
  private sendToAnalytics(event: EnrollmentEvent) {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'enrollment_interaction', {
        event_category: 'Enrollment',
        event_label: `${event.source}_${event.method}`,
        enrollment_method: event.method,
        enrollment_source: event.source,
        course_name: event.courseName,
        course_price: event.coursePrice,
        value: event.coursePrice,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: event.courseName,
        value: event.coursePrice,
        currency: 'ILS',
        content_category: event.source,
        content_type: event.method,
      });
    }
  }

  /**
   * Get enrollment summary
   */
  getSummary() {
    const events = this.getStoredEvents();

    const summary = {
      total: events.length,
      byMethod: {} as Record<EnrollmentMethod, number>,
      bySource: {} as Record<EnrollmentSource, number>,
      byCourse: {} as Record<string, number>,
      recentEvents: events.slice(-10).reverse(),
    };

    events.forEach(event => {
      // Count by method
      summary.byMethod[event.method] = (summary.byMethod[event.method] || 0) + 1;

      // Count by source
      summary.bySource[event.source] = (summary.bySource[event.source] || 0) + 1;

      // Count by course
      if (event.courseName) {
        summary.byCourse[event.courseName] = (summary.byCourse[event.courseName] || 0) + 1;
      }
    });

    return summary;
  }

  /**
   * Clear stored events
   */
  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear enrollment events:', error);
    }
  }
}

// Export singleton instance
export const enrollmentTracker = new EnrollmentTracker();

// Export convenient tracking functions for common use cases
export const trackEnrollment = {
  // From course pages
  courseCard: {
    whatsapp: (courseName: string, price?: number) =>
      enrollmentTracker.track('whatsapp', 'course_card', courseName, price),
    phone: (courseName: string, price?: number) =>
      enrollmentTracker.track('phone', 'course_card', courseName, price),
    form: (courseName: string, price?: number) =>
      enrollmentTracker.track('form', 'course_card', courseName, price),
  },

  // From individual course page
  coursePage: {
    whatsapp: (courseName: string, price?: number) =>
      enrollmentTracker.track('whatsapp', 'course_page', courseName, price),
    form: (courseName: string, price?: number) =>
      enrollmentTracker.track('form', 'course_page', courseName, price),
  },

  // From floating buttons
  floatingButton: {
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
    form: (courseName?: string) => enrollmentTracker.track('form', 'contact_page', courseName),
  },

  // From apply page - חדש!
  applyPage: {
    form: (courseName?: string) => enrollmentTracker.track('form', 'apply_page', courseName),
    whatsapp: (courseName?: string) =>
      enrollmentTracker.track('whatsapp', 'apply_page', courseName),
  },
};
