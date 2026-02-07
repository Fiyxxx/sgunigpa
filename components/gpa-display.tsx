"use client";

import { useEffect, useRef, useState } from "react";
import { CalculatedGPA, UniversityConfig } from "@/lib/types";

interface GPADisplayProps {
  calculated: CalculatedGPA;
  config: UniversityConfig;
}

function useAnimatedGPA(targetGPA: number, duration: number = 500) {
  const [displayGPA, setDisplayGPA] = useState(targetGPA);
  const previousGPARef = useRef(targetGPA);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayGPA(targetGPA);
      previousGPARef.current = targetGPA;
      return;
    }

    const startGPA = previousGPARef.current;
    const difference = targetGPA - startGPA;

    if (Math.abs(difference) < 0.001) {
      return;
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      const currentGPA = startGPA + difference * easedProgress;
      setDisplayGPA(currentGPA);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        previousGPARef.current = targetGPA;
        startTimeRef.current = undefined;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetGPA, duration]);

  return displayGPA;
}

export function GPADisplay({ calculated, config }: GPADisplayProps) {
  const animatedGPA = useAnimatedGPA(calculated.gpa);

  return (
    <div className="bg-accent border-3 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <div className="text-xs font-bold uppercase text-foreground">
            {config.gpaLabel}
          </div>
          <div
            className="text-4xl font-bold text-foreground tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            {calculated.gpa === 0 ? "--" : animatedGPA.toFixed(2)}
          </div>
          <div className="text-xs text-foreground/70">
            /{config.gpaScale.toFixed(1)}
          </div>
        </div>

        <div className="flex gap-4 text-xs">
          <div className="text-right">
            <div className="font-bold text-foreground tabular-nums">
              {calculated.totalCreditsEarned}
            </div>
            <div className="text-foreground/70 uppercase">Earned</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-foreground tabular-nums">
              {calculated.totalCreditsAttempted}
            </div>
            <div className="text-foreground/70 uppercase">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
