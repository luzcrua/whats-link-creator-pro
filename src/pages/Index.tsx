
import { Layout } from "@/components/layout";
import { WhatsappLinkGenerator } from "@/components/whatsapp-link-generator";
import { useLanguage } from "@/contexts/language-context";
import { memo, lazy, Suspense, useEffect, useState } from "react";

// Create a separate HowItWorks component to enable code splitting
const HowItWorks = lazy(() => import("@/components/how-it-works"));

// Small inline loading component to avoid additional imports
const LoadingSkeleton = () => (
  <div className="h-64 mt-16 space-y-4">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mx-auto animate-pulse"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mx-auto animate-pulse"></div>
    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6 mx-auto mt-8 animate-pulse"></div>
  </div>
);

const Index = memo(() => {
  const { translations } = useLanguage();
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false);
  
  // Only load HowItWorks component when user has scrolled down
  useEffect(() => {
    const handleScroll = () => {
      // Start loading when user scrolls down 200px
      if (window.scrollY > 200 && !isHowItWorksVisible) {
        setIsHowItWorksVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set a timeout to load it anyway after 5 seconds
    const timer = setTimeout(() => {
      setIsHowItWorksVisible(true);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isHowItWorksVisible]);
  
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="max-w-3xl text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations.mainTitle}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {translations.mainSubtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl">
        <WhatsappLinkGenerator />
      </section>
      
      {isHowItWorksVisible ? (
        <Suspense fallback={<LoadingSkeleton />}>
          <HowItWorks />
        </Suspense>
      ) : (
        <LoadingSkeleton />
      )}
    </Layout>
  );
});

Index.displayName = "Index";

export default Index;
