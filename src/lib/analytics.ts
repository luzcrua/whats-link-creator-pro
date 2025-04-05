
// Analytics and tracking utility functions
// Optimized for better performance

/**
 * Initialize Google Analytics with performance optimizations
 * @param measurementId - GA4 measurement ID
 */
export const initializeGoogleAnalytics = (measurementId: string): void => {
  if (!measurementId) return;
  
  // Add Google Analytics script with defer to prevent blocking
  const script = document.createElement('script');
  script.async = true;
  script.defer = true; // Add defer attribute
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, {
    'send_page_view': false, // Disable automatic page view to control timing
  });
};

/**
 * Initialize Google AdSense with performance optimizations
 * @param adClientId - AdSense client ID
 */
export const initializeGoogleAdSense = (adClientId: string): void => {
  if (!adClientId) return;
  
  // Add script with defer to prevent render blocking
  const script = document.createElement('script');
  script.async = true;
  script.defer = true; // Add defer attribute
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`;
  document.head.appendChild(script);
  
  // Initialize adsbygoogle
  window.adsbygoogle = window.adsbygoogle || [];
};

/**
 * Initialize Facebook Pixel with performance optimizations
 * @param pixelId - Facebook pixel ID
 */
export const initializeFacebookPixel = (pixelId: string): void => {
  if (!pixelId) return;
  
  // Defer Facebook Pixel initialization
  setTimeout(() => {
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
    script.defer = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    
    // Initialize the pixel
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }, 2000); // Delay initialization to prioritize core content loading
};

/**
 * Track page view with optimized timing
 * @param path - URL path
 * @param title - Page title
 */
export const trackPageView = (path: string, title: string): void => {
  // Use requestIdleCallback to run tracking during browser idle time
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
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
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
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
    }, 0);
  }
};

/**
 * Track custom event with performance optimization
 * @param eventName - Name of the event
 * @param eventParams - Event parameters
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  // Use requestIdleCallback to run tracking during browser idle time
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      // Track in Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, eventParams);
      }
      
      // Track in Facebook Pixel
      if (window.fbq) {
        window.fbq('track', eventName, eventParams);
      }
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      // Track in Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, eventParams);
      }
      
      // Track in Facebook Pixel
      if (window.fbq) {
        window.fbq('track', eventName, eventParams);
      }
    }, 0);
  }
};
