import { useEffect, useRef, memo } from "react";

export const AmbientGlow = memo(() => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine pointer (mouse/trackpad)
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const glowEl = glowRef.current;
    if (!glowEl) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;
    let isMoving = false;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        glowEl.style.opacity = "1";
        rafId = requestAnimationFrame(updateGlow);
      }
    };

    const updateGlow = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      glowEl.style.transform = `translate3d(${currentX - 350}px, ${currentY - 350}px, 0)`;

      // Stop loop when close to target to save CPU
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updateGlow);
      } else {
        isMoving = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[700px] h-[700px] pointer-events-none z-20 opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.07) 0%, rgba(201, 168, 76, 0.02) 45%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
});

AmbientGlow.displayName = "AmbientGlow";

export default AmbientGlow;
