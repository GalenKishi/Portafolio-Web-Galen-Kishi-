"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = "main .section-card, main .section-card img";
const CODE_CHARS = "01<>[]{}()/\\$#*+-=;:";

function randomCodeLine(length: number) {
  let text = "";
  for (let index = 0; index < length; index += 1) {
    text += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return text;
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const animateIn = (element: Element) => {
      if (!(element instanceof HTMLElement)) return;
      if (element.dataset.scrollRevealed === "1") return;

      element.dataset.scrollRevealed = "1";
      const randomDelay = Math.floor(Math.random() * 90);

      if (element.tagName !== "IMG") {
        if (window.getComputedStyle(element).position === "static") {
          element.style.position = "relative";
        }

        const overlay = document.createElement("div");
        overlay.setAttribute("aria-hidden", "true");
        overlay.style.position = "absolute";
        overlay.style.inset = "0";
        overlay.style.pointerEvents = "none";
        overlay.style.overflow = "hidden";
        overlay.style.zIndex = "30";
        overlay.style.background =
          "repeating-linear-gradient(0deg, rgba(56, 189, 248, 0.2) 0 2px, rgba(2, 6, 23, 0) 2px 7px)";

        const lineCount = 6;
        for (let lineIndex = 0; lineIndex < lineCount; lineIndex += 1) {
          const line = document.createElement("span");
          line.textContent = randomCodeLine(26 + Math.floor(Math.random() * 24));
          line.style.position = "absolute";
          line.style.left = `${Math.floor(Math.random() * 12)}%`;
          line.style.top = `${8 + lineIndex * 14}%`;
          line.style.fontSize = "10px";
          line.style.letterSpacing = "0.08em";
          line.style.fontFamily = "var(--font-geist-mono), monospace";
          line.style.color = lineIndex % 2 === 0 ? "rgba(110, 231, 183, 0.95)" : "rgba(125, 211, 252, 0.92)";
          line.style.textShadow = "0 0 8px rgba(16, 185, 129, 0.6)";
          overlay.appendChild(line);
        }

        element.appendChild(overlay);

        const overlayAnimation = overlay.animate(
          [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 0.95, transform: "translateY(0)", offset: 0.28 },
            { opacity: 0.7, transform: "translateY(-2px)", offset: 0.56 },
            { opacity: 0, transform: "translateY(-8px)" },
          ],
          {
            delay: randomDelay,
            duration: 520,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            fill: "forwards",
          }
        );

        overlayAnimation.addEventListener("finish", () => {
          overlay.remove();
        });
      }

      element.animate(
        [
          {
            opacity: 0,
            transform: "translateY(22px) scale(0.97) skewX(-2deg)",
            filter: "blur(2.8px) contrast(1.42) saturate(1.3)",
            clipPath: "inset(0 0 100% 0)",
          },
          {
            opacity: 0.22,
            transform: "translateX(-11px) translateY(14px) scale(0.978) skewX(3deg)",
            filter: "blur(1.8px) hue-rotate(-30deg)",
            clipPath: "inset(0 0 82% 0)",
            offset: 0.12,
          },
          {
            opacity: 0.42,
            transform: "translateX(10px) translateY(11px) scale(0.986) skewX(-3deg)",
            filter: "blur(1.3px) hue-rotate(24deg)",
            clipPath: "inset(0 0 64% 0)",
            offset: 0.26,
          },
          {
            opacity: 0.58,
            transform: "translateX(-5px) translateY(7px) scale(0.994)",
            filter: "blur(0.8px) hue-rotate(-10deg)",
            clipPath: "inset(0 0 44% 0)",
            offset: 0.4,
          },
          {
            opacity: 0.78,
            transform: "translateX(3px) translateY(4px)",
            filter: "blur(0.4px)",
            clipPath: "inset(0 0 18% 0)",
            offset: 0.58,
          },
          {
            opacity: 1,
            transform: "translateX(0) translateY(0) scale(1)",
            filter: "none",
            clipPath: "inset(0 0 0 0)",
          },
        ],
        {
          delay: randomDelay,
          duration: 840,
          easing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
          fill: "both",
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animateIn(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    targets.forEach((target) => {
      if (target instanceof HTMLElement && target.dataset.scrollRevealed === "1") return;
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
