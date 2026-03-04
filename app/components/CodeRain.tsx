"use client";

import { useEffect, useRef } from "react";

const CODE_CHARS = "01<>[]{}()/\\$#*+-=;:ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function CodeRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fontSize = 16;
    const columnWidth = 20;
    const minSpeed = 0.09;
    const maxSpeedOffset = 0.3;
    let frameId = 0;
    let width = 0;
    let height = 0;
    let columnCount = 0;
    let drops: number[] = [];
    let speeds: number[] = [];

    const randomChar = () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
      context.textBaseline = "top";
      context.font = `700 ${fontSize}px var(--font-geist-mono), monospace`;

      columnCount = Math.ceil(width / columnWidth) + 1;
      drops = new Array(columnCount)
        .fill(0)
        .map(() => -Math.random() * (height / fontSize));
      speeds = new Array(columnCount)
        .fill(0)
        .map(() => minSpeed + Math.random() * maxSpeedOffset);
    };

    const drawStatic = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(2, 6, 23, 0.72)";
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < columnCount; index += 1) {
        const x = index * columnWidth;
        const y = ((index * 7) % Math.floor(height / fontSize)) * fontSize;
        context.fillStyle = "rgba(74, 222, 128, 0.16)";
        context.fillText(randomChar(), x, y);
      }
    };

    const drawFrame = () => {
      context.fillStyle = "rgba(2, 6, 23, 0.24)";
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < columnCount; index += 1) {
        const x = index * columnWidth;
        const y = drops[index] * fontSize;

        context.fillStyle = "rgba(167, 243, 208, 0.62)";
        context.fillText(randomChar(), x, y);

        context.fillStyle = "rgba(74, 222, 128, 0.28)";
        context.fillText(randomChar(), x, y - fontSize);

        context.fillStyle = "rgba(56, 189, 248, 0.12)";
        context.fillText(randomChar(), x, y - fontSize * 2);

        drops[index] += speeds[index];

        if (y > height + fontSize * 2) {
          drops[index] = -Math.random() * 18;
          speeds[index] = minSpeed + Math.random() * maxSpeedOffset;
        }
      }

      frameId = window.requestAnimationFrame(drawFrame);
    };

    const start = () => {
      window.cancelAnimationFrame(frameId);
      setup();

      if (reduceMotionQuery.matches) {
        drawStatic();
        return;
      }

      context.fillStyle = "rgba(2, 6, 23, 0.95)";
      context.fillRect(0, 0, width, height);
      drawFrame();
    };

    const handleResize = () => start();
    const handleMotionChange = () => start();

    start();

    window.addEventListener("resize", handleResize);
    reduceMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      reduceMotionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="code-rain-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="code-rain-canvas" />
    </div>
  );
}
