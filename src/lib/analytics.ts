
// Analytics and tracking utility functions

/**
 * Initialize Google Analytics
 * @param measurementId - GA4 measurement ID
 */
export const initializeGoogleAnalytics = (measurementId: string): void => {
  if (!measurementId) return;
  
  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId);
};

/**
 * Initialize Google AdSense
 * @param adClientId - AdSense client ID
 */
export const initializeGoogleAdSense = (adClientId: string): void => {
  if (!adClientId) return;
  
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`;
  document.head.appendChild(script);
};

/**
 * Initialize Facebook Pixel
 * @param pixelId - Facebook pixel ID
 */
export const initializeFacebookPixel = (pixelId: string): void => {
  if (!pixelId) return;
  
  // Add Facebook Pixel base code
  window.fbq = window.fbq || function() {
    (window.fbq.q = window.fbq.q || []).push(arguments);
  };
  window._fbq = window._fbq || window.fbq;
  window.fbq.push = window.fbq;
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  window.fbq.queue = [];
  
  // Insert Facebook Pixel script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  
  // Initialize the pixel
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};

/**
 * Track page view
 * @param path - URL path
 * @param title - Page title
 */
export const trackPageView = (path: string, title: string): void => {
  // Track in Google Analytics
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
  
  // Track in Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track custom event
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  // Track in Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
  
  // Track in Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, eventParams);
  }
};
