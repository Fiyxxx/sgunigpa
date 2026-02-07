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

  const getDegreeClassification = (gpa: number) => {
    if (!config.degreeClassifications) return null;

    for (const classification of config.degreeClassifications) {
      if (gpa >= classification.minGPA) {
        return classification.name;
      }
    }
    return null;
  };

  const classification = getDegreeClassification(calculated.gpa);

  return (
    <div className="bg-card rounded-lg border border-border p-8 text-center">
      <div className="mb-6">
        <div className="text-secondary text-sm font-medium mb-2">
          Your {config.gpaLabel}
        </div>
        <div
          className="text-6xl md:text-7xl font-bold text-foreground"
          aria-live="polite"
          aria-atomic="true"
        >
          {calculated.gpa === 0 ? "--" : animatedGPA.toFixed(2)}
        </div>
        <div className="text-sm text-secondary mt-2">
          out of {config.gpaScale.toFixed(1)}
        </div>
      </div>

      {classification && calculated.gpa > 0 && (
        <div className="mb-4 py-2 px-4 bg-accent/10 rounded-lg">
          <div className="text-sm font-medium text-accent">
            {classification}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div>
          <div className="text-2xl font-semibold text-foreground">
            {calculated.totalCreditsEarned}
          </div>
          <div className="text-sm text-secondary mt-1">
            {config.creditLabel} Earned
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-foreground">
            {calculated.totalCreditsAttempted}
          </div>
          <div className="text-sm text-secondary mt-1">
            {config.creditLabel} Attempted
          </div>
        </div>
      </div>
    </div>
  );
}
