"use client";

import { useInView } from "@/hooks/use-in-view";
import { type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in ms before the reveal transition starts, staggers grids/lists. */
  delay?: number;
  /** "up" fades + slides up (default), "scale" fades + scales in. */
  variant?: "up" | "scale";
  /** Optional anchor id, useful for section wrappers used as scroll targets. */
  id?: string;
};

/**
 * Reveal
 * Wraps any block of content and fades/slides it in the first time it
 * scrolls into the viewport. Pure CSS transition driven by IntersectionObserver,
 * so it stays lightweight and respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "up",
  id,
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const base = variant === "scale" ? "reveal-scale" : "reveal";

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${base} ${isInView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
