
/**
 * Performance-optimized analytics utility functions
 */

// Create a single analytics queue to batch operations
const analyticsQueue: (() => void)[] = [];
let isProcessingQueue = false;

// Process the analytics queue during idle time
const processAnalyticsQueue = () => {
  if (isProcessingQueue || analyticsQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  const processNextBatch = () => {
    // Process up to 5 operations at once to avoid blocking main thread
    const batch = analyticsQueue.splice(0, 5);
    if (batch.length === 0) {
      isProcessingQueue = false;
      return;
    }
    
    batch.forEach(operation => {
      try {
        operation();
      } catch (error) {
        console.error('Analytics operation failed:', error);
      }
    });
    
    if (analyticsQueue.length > 0) {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => processNextBatch(), { timeout: 1000 });
      } else {
        setTimeout(processNextBatch, 50);
      }
    } else {
      isProcessingQueue = false;
    }
  };
  
  processNextBatch();
};

// Add an operation to the queue
const queueAnalyticsOperation = (operation: () => void) => {
  analyticsQueue.push(operation);
  
  if (!isProcessingQueue) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => processAnalyticsQueue(), { timeout: 2000 });
    } else {
      setTimeout(processAnalyticsQueue, 100);
    }
  }
};

/**
 * Initialize Google Analytics with performance optimizations
 */
export const initializeGoogleAnalytics = (measurementId: string): void => {
  if (!measurementId) return;
  
  // Define gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    'send_page_view': false,
    'transport_type': 'beacon',
    'anonymize_ip': true
  });
  
  // Script already added in index.html with defer
};

/**
 * Initialize Google AdSense with performance optimizations
 */
export const initializeGoogleAdSense = (adClientId: string): void => {
  // Script already added in index.html with defer
  if (!adClientId) return;
  
  // Initialize adsbygoogle
  window.adsbygoogle = window.adsbygoogle || [];
};

/**
 * Initialize Facebook Pixel with performance optimizations
 */
export const initializeFacebookPixel = (pixelId: string): void => {
  if (!pixelId) return;
  
  queueAnalyticsOperation(() => {
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
  });
};

/**
 * Track page view with optimized timing
 */
export const trackPageView = (path: string, title: string): void => {
  queueAnalyticsOperation(() => {
    // Track in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        send_to: window.gtag.length > 0 ? window.gtag[0] : undefined
      });
    }
    
    // Track in Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  });
};

/**
 * Track custom event with performance optimization
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  queueAnalyticsOperation(() => {
    // Track in Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
    
    // Track in Facebook Pixel
    if (window.fbq) {
      window.fbq('track', eventName, eventParams);
    }
  });
};
