import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n';

console.log('🚀 [Main] Application starting up', {
  timestamp: new Date().toISOString(),
  environment: import.meta.env.MODE,
  rootElement: document.getElementById("root"),
});

createRoot(document.getElementById("root")!).render(<App />);
