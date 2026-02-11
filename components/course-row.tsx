"use client";

import { Course, UniversityConfig } from "@/lib/types";
import { Trash2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseRowProps {
  course: Course;
  config: UniversityConfig;
  onChange: (updates: Partial<Course>) => void;
  onDelete: () => void;
}

export function CourseRow({ course, config, onChange, onDelete }: CourseRowProps) {
  const handleIncrement = () => {
    onChange({ credits: course.credits + 1 });
  };

  const handleDecrement = () => {
    if (course.credits > 0) {
      onChange({ credits: Math.max(0, course.credits - 1) });
    }
  };

  return (
    <div className="bg-card border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      {/* Row 1: Code and Name */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={course.code}
          onChange={(e) => onChange({ code: e.target.value })}
          placeholder={config.codeLabel}
          aria-label={config.codeLabel}
          className="w-20 sm:w-24 px-2 py-2 text-xs font-bold font-mono bg-background focus:outline-none focus:bg-accent/10 min-h-[44px]"
        />
        <input
          type="text"
          value={course.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Course Name"
          aria-label="Course Name"
          className="flex-1 px-2 py-2 text-xs font-bold font-mono bg-background focus:outline-none focus:bg-accent/10 min-h-[44px]"
        />
      </div>

      {/* Row 2: Grade, Units, S/U, Delete */}
      <div className="flex items-end gap-2">
        {/* Grade Selection - Dropdown on mobile, boxes on desktop */}
        <div className="flex flex-col gap-0.5 flex-1 md:flex-none">
          <label className="text-[8px] sm:text-[9px] font-bold uppercase text-secondary px-0.5">
            Grade
          </label>

          {/* Mobile: Dropdown */}
          <select
            value={course.grade}
            onChange={(e) => onChange({ grade: e.target.value })}
            aria-label="Grade"
            className="md:hidden w-full px-2 py-2 text-xs font-bold font-mono bg-background focus:outline-none focus:bg-accent/10 min-h-[44px] cursor-pointer appearance-none text-center"
          >
            {config.grades.map((g) => (
              <option key={g.grade} value={g.grade}>
                {g.grade}
              </option>
            ))}
          </select>

          {/* Desktop: Grid of boxes */}
          <div className="hidden md:flex border-2 border-foreground">
            {config.grades.map((g, index) => (
              <button
                key={g.grade}
                type="button"
                onClick={() => onChange({ grade: g.grade })}
                aria-label={`Select grade ${g.grade}`}
                className={cn(
                  "px-2 py-2 text-xs font-bold font-mono min-h-[44px] min-w-[2.5rem] hover:bg-accent/20",
                  index > 0 && "border-l-2 border-foreground",
                  course.grade === g.grade
                    ? "bg-foreground text-background"
                    : "bg-background text-foreground"
                )}
              >
                {g.grade}
              </button>
            ))}
          </div>
        </div>

        {/* Units Stepper */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[8px] sm:text-[9px] font-bold uppercase text-secondary px-0.5">
            {config.creditLabel}
          </label>
          <div className="flex items-center border-2 border-foreground bg-background min-h-[44px]">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={course.credits <= 0}
              aria-label="Decrease units"
              className={cn(
                "w-10 h-full flex items-center justify-center border-r-2 border-foreground font-bold min-h-[44px]",
                course.credits <= 0
                  ? "text-secondary/50 cursor-not-allowed"
                  : "text-foreground hover:bg-accent/20 active:bg-accent/30"
              )}
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              inputMode="numeric"
              step="0.5"
              min="0"
              value={course.credits}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  onChange({ credits: value });
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value) || value < 0) {
                  onChange({ credits: 0 });
                }
              }}
              aria-label={config.creditLabel}
              className="w-12 sm:w-14 px-1 py-2 text-xs sm:text-sm font-bold font-mono text-center bg-background focus:outline-none focus:bg-accent/10 !border-0"
            />
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Increase units"
              className="w-10 h-full flex items-center justify-center border-l-2 border-foreground text-foreground hover:bg-accent/20 active:bg-accent/30 font-bold min-h-[44px]"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* S/U Button */}
        {config.passFail && (
          <button
            type="button"
            onClick={() => onChange({ isPassFail: !course.isPassFail })}
            aria-label={config.passFail.label}
            aria-pressed={course.isPassFail}
            className={cn(
              "px-2 py-2 text-xs font-bold font-mono min-h-[44px] whitespace-nowrap border-2 border-foreground self-end",
              course.isPassFail
                ? "bg-foreground text-background"
                : "bg-background text-foreground hover:bg-accent/20"
            )}
          >
            {config.passFail.label.split(" ")[0]}
          </button>
        )}

        {/* Delete Button */}
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete course"
          className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-accent/20 border-2 border-transparent hover:border-foreground min-h-[44px]"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
