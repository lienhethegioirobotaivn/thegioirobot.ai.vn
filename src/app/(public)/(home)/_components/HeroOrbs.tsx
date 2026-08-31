"use client";

import { useEffect, useRef } from "react";

type OrbConfig = {
  size: number;
  top: string;
  left: string;
  color: string;
  duration: number;
  delay: number;
};

const ORBS: OrbConfig[] = [
  {
    size: 16,
    top: "8%",
    left: "5%",
    color: "var(--color-accent)",
    duration: 9,
    delay: 0,
  },
  {
    size: 10,
    top: "22%",
    left: "85%",
    color: "var(--color-accent-2)",
    duration: 11,
    delay: 0.6,
  },
  {
    size: 22,
    top: "70%",
    left: "12%",
    color: "var(--color-accent)",
    duration: 13,
    delay: 1.2,
  },
  {
    size: 8,
    top: "85%",
    left: "60%",
    color: "#ffffff",
    duration: 8,
    delay: 1.8,
  },
  {
    size: 18,
    top: "40%",
    left: "92%",
    color: "var(--color-accent-2)",
    duration: 12,
    delay: 2.4,
  },
  {
    size: 12,
    top: "12%",
    left: "45%",
    color: "var(--color-accent)",
    duration: 10,
    delay: 3,
  },
  {
    size: 14,
    top: "60%",
    left: "78%",
    color: "var(--color-accent-2)",
    duration: 14,
    delay: 0.9,
  },
  {
    size: 9,
    top: "90%",
    left: "25%",
    color: "#ffffff",
    duration: 9.5,
    delay: 1.5,
  },
];

export function HeroOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const AVOID_RADIUS = 140;
    const MAX_PUSH = 60;

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      orbRefs.current.forEach((orb) => {
        if (!orb) {
          return;
        }
        const orbRect = orb.getBoundingClientRect();
        const orbX = orbRect.left + orbRect.width / 2 - rect.left;
        const orbY = orbRect.top + orbRect.height / 2 - rect.top;

        const dx = orbX - mouseX;
        const dy = orbY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < AVOID_RADIUS) {
          const force = (1 - distance / AVOID_RADIUS) * MAX_PUSH;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force;
          const pushY = Math.sin(angle) * force;
          orb.style.setProperty("--push-x", `${pushX}px`);
          orb.style.setProperty("--push-y", `${pushY}px`);
          orb.style.transition = "transform 0.25s ease-out";
        } else {
          orb.style.setProperty("--push-x", "0px");
          orb.style.setProperty("--push-y", "0px");
          orb.style.transition = "transform 0.6s ease-out";
        }
      });
    }

    function handlePointerLeave() {
      orbRefs.current.forEach((orb) => {
        if (!orb) {
          return;
        }
        orb.style.setProperty("--push-x", "0px");
        orb.style.setProperty("--push-y", "0px");
        orb.style.transition = "transform 0.6s ease-out";
      });
    }

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
    >
      {ORBS.map((orb, i) => (
        <span
          key={i}
          ref={(el) => {
            orbRefs.current[i] = el;
          }}
          className="orb-free absolute rounded-full"
          style={
            {
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              backgroundColor: orb.color,
              boxShadow: `0 0 ${orb.size}px ${Math.round(orb.size / 2)}px ${orb.color}`,
              filter: "blur(1px)",
              animation: `float-free ${orb.duration}s ease-in-out infinite`,
              animationDelay: `${orb.delay}s`,
              "--push-x": "0px",
              "--push-y": "0px",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
