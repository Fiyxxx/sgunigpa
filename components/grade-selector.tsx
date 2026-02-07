"use client";

import { GradeMapping } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GradeSelectorProps {
  grades: GradeMapping[];
  selected: string;
  onSelect: (grade: string) => void;
}

export function GradeSelector({
  grades,
  selected,
  onSelect,
}: GradeSelectorProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-0">
      {grades.map((gradeMapping) => (
        <button
          key={gradeMapping.grade}
          type="button"
          onClick={() => onSelect(gradeMapping.grade)}
          aria-label={`Select grade ${gradeMapping.grade}`}
          className={cn(
            "border border-border px-3 py-3 text-center transition-all duration-200",
            "hover:bg-secondary/10 font-semibold min-h-[44px]",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:z-10",
            selected === gradeMapping.grade
              ? "bg-foreground text-background"
              : "bg-card text-foreground"
          )}
        >
          {gradeMapping.grade}
        </button>
      ))}
    </div>
  );
}
