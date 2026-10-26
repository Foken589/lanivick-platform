/**
 * Registers the Lanivick PWA service worker in supported browsers
 */
export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[Lanivick PWA] Service Worker active with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[Lanivick PWA] Service Worker registration info:', err);
        });
    });
  }
}
