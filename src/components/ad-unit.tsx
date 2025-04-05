
import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

export function AdUnit({ slot, format = 'auto', responsive = true, className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
    
    return () => {
      // Clean up ad unit when component unmounts
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [slot, format, responsive]);
  
  return <div ref={adRef} className={className} />;
}
