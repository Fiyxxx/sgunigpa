"use client";

import { University } from "@/lib/types";
import { cn } from "@/lib/utils";

interface UniversitySelectorProps {
  selected: University | null;
  onSelect: (university: University) => void;
  disabled?: boolean;
}

const universities: { id: University; name: string }[] = [
  { id: "NUS", name: "NUS" },
  { id: "NTU", name: "NTU" },
  { id: "SMU", name: "SMU" },
];

export function UniversitySelector({
  selected,
  onSelect,
  disabled = false,
}: UniversitySelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {universities.map((uni) => (
        <button
          key={uni.id}
          onClick={() => onSelect(uni.id)}
          disabled={disabled}
          aria-label={`Select ${uni.name}`}
          className={cn(
            "px-8 py-4 rounded-lg border-2 transition-all duration-200",
            "text-lg font-semibold min-h-[44px] min-w-[120px]",
            "hover:border-accent hover:text-accent",
            selected === uni.id
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-foreground border-border",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {uni.name}
        </button>
      ))}
    </div>
  );
}
