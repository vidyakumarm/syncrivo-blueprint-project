import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import App from './App.tsx'
import './index.css'
import './lib/i18n';

console.log('🚀 [Main] Application starting up', {
  timestamp: new Date().toISOString(),
  environment: import.meta.env.MODE,
  rootElement: document.getElementById("root"),
});

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading translations...</div>}>
    <App />
  </Suspense>
);
