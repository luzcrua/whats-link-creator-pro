
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/language-context";
import { useEffect, lazy, Suspense } from "react";
import { TRACKING_CONFIG } from "./config/tracking";
import { initializeGoogleAnalytics, initializeGoogleAdSense, initializeFacebookPixel, trackPageView } from "./lib/analytics";

// Lazy-load route components for better initial loading performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1, // Reduce number of retries
    },
  },
});

// Analytics wrapper that tracks page views
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Use requestIdleCallback to track page view during browser idle time
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        trackPageView(location.pathname, document.title);
      });
    } else {
      // Fallback
      setTimeout(() => {
        trackPageView(location.pathname, document.title);
      }, 0);
    }
  }, [location]);
  
  return <>{children}</>;
};

// Initialize analytics on app start
const initializeAnalytics = () => {
  // Only initialize if tracking IDs are provided
  if (TRACKING_CONFIG.GOOGLE_ANALYTICS_ID) {
    initializeGoogleAnalytics(TRACKING_CONFIG.GOOGLE_ANALYTICS_ID);
  }
  
  if (TRACKING_CONFIG.GOOGLE_ADSENSE_CLIENT_ID) {
    initializeGoogleAdSense(TRACKING_CONFIG.GOOGLE_ADSENSE_CLIENT_ID);
  }
  
  if (TRACKING_CONFIG.FACEBOOK_PIXEL_ID) {
    initializeFacebookPixel(TRACKING_CONFIG.FACEBOOK_PIXEL_ID);
  }
};

const App = () => {
  // Initialize analytics when the app loads, but with a slight delay
  useEffect(() => {
    // Allow critical content to load first
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        initializeAnalytics();
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(initializeAnalytics, 1000);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsWrapper>
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AnalyticsWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
