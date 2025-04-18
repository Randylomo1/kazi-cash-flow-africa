
// This file registers the service worker for offline functionality

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/serviceWorker.js', {
        scope: '/'
      });
      
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.log('Service workers not supported');
  }
};

// Handle service worker updates
export const checkForUpdates = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update();
    });
  }
};

// Force the waiting service worker to become the active service worker
export const updateServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    });
  }
};
