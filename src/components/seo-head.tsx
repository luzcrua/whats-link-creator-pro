
import { useLanguage } from "@/contexts/language-context";
import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  type?: "website" | "article";
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  imageUrl = "https://lovable.dev/opengraph-image-p98pqg.png",
  type = "website"
}: SEOHeadProps) {
  const { language, translations } = useLanguage();
  
  // Use provided values or defaults from translations
  const pageTitle = title || translations.websiteTitle;
  const pageDescription = description || translations.mainSubtitle;
  
  // Get current URL if canonical not provided
  const currentUrl = canonicalUrl || window.location.href;
  
  useEffect(() => {
    // Update document title
    document.title = pageTitle;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageDescription);
    }
    
    // Update Open Graph tags
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute(attribute, value);
      }
    };
    
    updateMetaTag('meta[property="og:title"]', "content", pageTitle);
    updateMetaTag('meta[property="og:description"]', "content", pageDescription);
    updateMetaTag('meta[property="og:url"]', "content", currentUrl);
    updateMetaTag('meta[property="og:image"]', "content", imageUrl);
    updateMetaTag('meta[property="og:type"]', "content", type);
    
    // Update Twitter tags
    updateMetaTag('meta[name="twitter:title"]', "content", pageTitle);
    updateMetaTag('meta[name="twitter:description"]', "content", pageDescription);
    updateMetaTag('meta[name="twitter:image"]', "content", imageUrl);
    
    // Set hreflang tags for language alternatives
    // First, remove any existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Add hreflang tags for each supported language
    const addHreflangTag = (lang: string, url: string) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = url;
      document.head.appendChild(link);
    };
    
    // Add hreflang tags for all supported languages
    // This assumes we have the same page in all languages, just with different language parameters
    const baseUrl = window.location.origin + window.location.pathname;
    addHreflangTag('x-default', baseUrl);
    addHreflangTag('en', `${baseUrl}?lang=en`);
    addHreflangTag('es', `${baseUrl}?lang=es`);
    addHreflangTag('de', `${baseUrl}?lang=de`);
    addHreflangTag('it', `${baseUrl}?lang=it`);
    addHreflangTag('fr', `${baseUrl}?lang=fr`);
    addHreflangTag('pt', `${baseUrl}?lang=pt`);
    
    // Set language in HTML tag
    document.documentElement.lang = language;
    
  }, [pageTitle, pageDescription, currentUrl, imageUrl, type, language]);
  
  return null; // This component doesn't render anything
}
