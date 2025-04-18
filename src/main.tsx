
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './registerServiceWorker'

// First-time visit redirect to onboarding
const checkFirstVisit = () => {
  const hasVisited = localStorage.getItem('hasVisitedKaziCash');
  
  if (!hasVisited && !window.location.pathname.includes('onboarding')) {
    window.location.href = '/onboarding';
    localStorage.setItem('hasVisitedKaziCash', 'true');
  }
};

// Run the check
checkFirstVisit();

// Register service worker for offline functionality
registerServiceWorker();

createRoot(document.getElementById("root")!).render(<App />);
