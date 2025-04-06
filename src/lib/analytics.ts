
// Analytics and tracking utility functions using Google Tag Manager

/**
 * Track page view via Google Tag Manager
 * @param path - URL path
 * @param title - Page title
 */
export const trackPageView = (path: string, title: string): void => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_title: title
    });
  }
};

/**
 * Track custom event via Google Tag Manager
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
  }
};
