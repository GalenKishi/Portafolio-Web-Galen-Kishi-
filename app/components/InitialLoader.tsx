"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "portfolio_initial_loader_shown";
const LOADER_DURATION_MS = 2500;
const LOADER_TITLE = "PORTAFOLIO";
const LOADER_TEXT = "Preparando experiencia...";

export default function InitialLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const wasShown = sessionStorage.getItem(SESSION_KEY) === "1";
      if (wasShown) return;

      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");

      const timeoutId = window.setTimeout(() => {
        setVisible(false);
      }, LOADER_DURATION_MS);

      return () => window.clearTimeout(timeoutId);
    } catch {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="initial-loader"
      role="status"
      aria-live="polite"
      aria-label="Cargando sitio"
    >
      <div className="initial-loader__content">
        <span className="initial-loader__spinner" aria-hidden="true" />
        <p className="font-pixel-title text-xl sm:text-2xl text-blue-300 leading-none">
          {LOADER_TITLE}
        </p>
        <p className="font-jersey-subtext text-base sm:text-lg text-slate-100">
          {LOADER_TEXT}
        </p>
      </div>
    </div>
  );
}
