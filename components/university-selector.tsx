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
    <div className="flex gap-2 items-center">
      {universities.map((uni) => (
        <button
          key={uni.id}
          onClick={() => onSelect(uni.id)}
          disabled={disabled}
          aria-label={`Select ${uni.name}`}
          className={cn(
            "px-6 py-3 border-2 font-bold text-lg transition-all",
            "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
            selected === uni.id
              ? "bg-foreground text-background border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              : "bg-card text-foreground border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {uni.name}
        </button>
      ))}
    </div>
  );
}
