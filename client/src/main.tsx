import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register service worker (PWA will auto-register with vite-plugin-pwa)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker registered:', registration);
      },
      (error) => {
        console.log('Service Worker registration failed:', error);
      }
    );
  });
}

createRoot(document.getElementById("root")!).render(<App />);
