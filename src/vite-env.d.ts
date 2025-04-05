
/// <reference types="vite/client" />

interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
  fbq: any;
  _fbq: any;
  adsbygoogle: any[];
  requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback: (handle: number) => void;
}
