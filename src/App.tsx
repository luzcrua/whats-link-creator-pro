
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/language-context";
import { useEffect, lazy, Suspense, useState } from "react";
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
      refetchOnWindowFocus: false, // Prevent refetching when window gets focus
    },
  },
});

// Analytics wrapper that tracks page views
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isAnalyticsInitialized, setIsAnalyticsInitialized] = useState(false);
  
  // Initialize analytics only once
  useEffect(() => {
    if (!isAnalyticsInitialized && TRACKING_CONFIG.GOOGLE_ANALYTICS_ID) {
      const initAnalytics = () => {
        if (TRACKING_CONFIG.GOOGLE_ANALYTICS_ID) {
          initializeGoogleAnalytics(TRACKING_CONFIG.GOOGLE_ANALYTICS_ID);
        }
        
        if (TRACKING_CONFIG.GOOGLE_ADSENSE_CLIENT_ID) {
          initializeGoogleAdSense(TRACKING_CONFIG.GOOGLE_ADSENSE_CLIENT_ID);
        }
        
        if (TRACKING_CONFIG.FACEBOOK_PIXEL_ID) {
          initializeFacebookPixel(TRACKING_CONFIG.FACEBOOK_PIXEL_ID);
        }
        
        setIsAnalyticsInitialized(true);
      };
      
      // Use requestIdleCallback to initialize analytics during browser idle time
      if (window.requestIdleCallback) {
        window.requestIdleCallback(initAnalytics, { timeout: 5000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(initAnalytics, 3000); // Delay more to ensure critical content loads first
      }
    }
  }, [isAnalyticsInitialized]);
  
  // Track page views
  useEffect(() => {
    if (isAnalyticsInitialized) {
      const trackCurrentPage = () => {
        trackPageView(location.pathname, document.title);
      };
      
      if (window.requestIdleCallback) {
        window.requestIdleCallback(trackCurrentPage, { timeout: 2000 });
      } else {
        setTimeout(trackCurrentPage, 500);
      }
    }
  }, [location, isAnalyticsInitialized]);
  
  return <>{children}</>;
};

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse text-lg font-medium">Loading...</div>
    </div>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsWrapper>
              <Suspense fallback={<LoadingFallback />}>
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
