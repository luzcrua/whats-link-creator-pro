
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./contexts/language-context";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { TRACKING_CONFIG } from "./config/tracking";
import { initializeGoogleAnalytics, initializeGoogleAdSense, initializeFacebookPixel, trackPageView } from "./lib/analytics";

const queryClient = new QueryClient();

// Analytics wrapper that tracks page views
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname, document.title);
  }, [location]);
  
  return <>{children}</>;
};

// Initialize analytics on app start
const initializeAnalytics = () => {
  initializeGoogleAnalytics(TRACKING_CONFIG.GOOGLE_ANALYTICS_ID);
  initializeGoogleAdSense(TRACKING_CONFIG.GOOGLE_ADSENSE_CLIENT_ID);
  initializeFacebookPixel(TRACKING_CONFIG.FACEBOOK_PIXEL_ID);
};

const App = () => {
  // Initialize analytics when the app loads
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsWrapper>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnalyticsWrapper>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
