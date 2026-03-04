"use client";

import { useEffect } from "react";

const DIGITS = "0123456789";
const TARGET_SELECTOR = "a, button, .project-card, .interactive-btn";

function randomDigit() {
  return DIGITS[Math.floor(Math.random() * DIGITS.length)];
}

export default function HoverNumberRain() {
  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const element = event.target as HTMLElement | null;
      if (!element) return;

      const target = element.closest(TARGET_SELECTOR) as HTMLElement | null;
      if (!target) return;

      const related = event.relatedTarget as Node | null;
      if (related && target.contains(related)) return;

      const rect = target.getBoundingClientRect();
      const spawnCount = 8;

      for (let index = 0; index < spawnCount; index += 1) {
        const particle = document.createElement("span");
        particle.className = "hover-number-particle";
        particle.textContent = randomDigit();

        const startX = rect.left + rect.width * (0.2 + Math.random() * 0.6);
        const startY = rect.top + Math.min(rect.height * 0.35, 24);
        const drift = -24 + Math.random() * 48;
        const duration = 850 + Math.floor(Math.random() * 600);
        const delay = Math.floor(Math.random() * 140);
        const scale = 0.85 + Math.random() * 0.5;

        particle.style.left = `${Math.round(startX)}px`;
        particle.style.top = `${Math.round(startY)}px`;
        particle.style.setProperty("--drift", `${drift.toFixed(0)}px`);
        particle.style.animationDuration = `${duration}ms`;
        particle.style.animationDelay = `${delay}ms`;
        particle.style.transform = `scale(${scale.toFixed(2)})`;

        document.body.appendChild(particle);

        const removeParticle = () => {
          particle.removeEventListener("animationend", removeParticle);
          particle.remove();
        };

        particle.addEventListener("animationend", removeParticle);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return null;
}
