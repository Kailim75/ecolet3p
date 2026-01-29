import React, { useEffect, useState } from "react";

interface ServiceWorkerState {
  isInstalled: boolean;
  isUpdateAvailable: boolean;
  isOffline: boolean;
}

export const useServiceWorker = () => {
  const [state, setState] = useState<ServiceWorkerState>({
    isInstalled: false,
    isUpdateAvailable: false,
    isOffline: !navigator.onLine,
  });

  useEffect(() => {
    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    // Avoid registering SW in dev/preview (Vite module URLs must not be cached)
    if (!import.meta.env.PROD) {
      // Best-effort cleanup in case a SW was previously registered
      (async () => {
        try {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
          console.log('Service Worker disabled in dev/preview');
        } catch (e) {
          console.warn('Service Worker cleanup failed (non-blocking):', e);
        }
      })();
      return;
    }

    // Register the service worker
    let updateIntervalId: number | undefined;

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('Service Worker registered successfully');
        setState(prev => ({ ...prev, isInstalled: true }));

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setState(prev => ({ ...prev, isUpdateAvailable: true }));
                console.log('New version available');
              }
            });
          }
        });

        // Check for updates periodically (every hour)
        updateIntervalId = window.setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    registerSW();

    // Handle online/offline status
    const handleOnline = () => setState(prev => ({ ...prev, isOffline: false }));
    const handleOffline = () => setState(prev => ({ ...prev, isOffline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      if (updateIntervalId) {
        window.clearInterval(updateIntervalId);
      }
    };
  }, []);

  // Function to update to new version
  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration?.waiting) {
          registration.waiting.postMessage('skipWaiting');
          window.location.reload();
        }
      });
    }
  };

  return {
    ...state,
    updateServiceWorker,
  };
};
