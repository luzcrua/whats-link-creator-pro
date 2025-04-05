
import { useEffect, useRef, memo } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

// Memoize the component to prevent unnecessary re-renders
export const AdUnit = memo(({ slot, format = 'auto', responsive = true, className = '' }: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Use an intersection observer to lazy load ads when they come into view
    if (adRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Create ad only when visible
            loadAd();
            // Disconnect after loading
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(adRef.current);
      
      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback for browsers without IntersectionObserver
      loadAd();
    }
    
    function loadAd() {
      // Ensure AdSense is loaded
      if (adRef.current && window.adsbygoogle) {
        // Create an ad unit
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.dataset.adSlot = slot;
        
        if (responsive) {
          adElement.dataset.adFormat = format;
          adElement.dataset.fullWidthResponsive = 'true';
        }
        
        // Clear any previous ad
        if (adRef.current.firstChild) {
          adRef.current.innerHTML = '';
        }
        
        // Append the ad element
        adRef.current.appendChild(adElement);
        
        // Push command to display ads
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
    
    return () => {
      // Clean up ad unit when component unmounts
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [slot, format, responsive]);
  
  return <div ref={adRef} className={className} />;
});

AdUnit.displayName = 'AdUnit';
