
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if we have a language parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');

// If there's a language parameter, save it to localStorage
if (langParam) {
  localStorage.setItem('language', langParam);
}

createRoot(document.getElementById("root")!).render(<App />);
