
import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MessageSquare, Share } from "lucide-react";
import { LanguageSelector } from "./language-selector";
import { useLanguage } from "@/contexts/language-context";
import { SEOHead } from "./seo-head";
import { Button } from "./ui/button";
import { memo, lazy, Suspense } from "react";

// Lazy-loaded footer component to reduce initial bundle size
const Footer = lazy(() => import("./footer"));

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
}

// Use memo to prevent unnecessary re-renders
const Layout = memo(({ 
  children, 
  title, 
  description, 
  canonicalUrl, 
  imageUrl 
}: LayoutProps) => {
  const { translations } = useLanguage();
  
  const handleShareOnWhatsApp = () => {
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col theme-transition">
      <SEOHead 
        title={title || translations.websiteTitle}
        description={description || translations.mainSubtitle}
        canonicalUrl={canonicalUrl}
        imageUrl={imageUrl}
      />
      
      <header className="border-b py-3 px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-screen-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-whatsapp animate-pulse-green" />
            <span className="font-bold text-xl md:text-2xl">{translations.headerTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleShareOnWhatsApp} 
              className="text-whatsapp hover:text-whatsapp-dark"
              aria-label="Share on WhatsApp"
            >
              <Share className="h-5 w-5 animate-pulse-green" />
            </Button>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-screen-lg mx-auto px-4 py-8">
        {children}
      </main>
      
      <Suspense fallback={<div className="h-24 border-t"></div>}>
        <Footer translations={translations} handleShareOnWhatsApp={handleShareOnWhatsApp} />
      </Suspense>
    </div>
  );
});

Layout.displayName = "Layout";

export { Layout };
