// main.tsx - Application entry point - v2.1
import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// DEV/PREVIEW SAFETY: if a Service Worker ever cached Vite module URLs, it can cause
// mixed React instances and crash hooks (e.g. "Cannot read properties of null (reading 'useRef')").
// We proactively unregister SW + clear caches in non-PROD before React renders.
if ("serviceWorker" in navigator && !import.meta.env.PROD) {
  (async () => {
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      const hadRegs = regs.length > 0;
      await Promise.all(regs.map((r) => r.unregister()));

      const keys = await caches.keys();
      if (keys.length) {
        await Promise.all(keys.map((k) => caches.delete(k)));
      }

      // If a SW was controlling this page, a reload is required to fully detach it.
      // Guard to avoid reload loops.
      const reloaded = sessionStorage.getItem("sw_cleanup_reloaded") === "1";
      if ((hadRegs || navigator.serviceWorker.controller) && !reloaded) {
        sessionStorage.setItem("sw_cleanup_reloaded", "1");
        window.location.reload();
      }
    } catch (e) {
      // Non-blocking: app can still run without cleanup.
      console.warn("SW cleanup failed (non-blocking):", e);
    }
  })();
}

// Register Service Worker for caching and offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration.scope);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
