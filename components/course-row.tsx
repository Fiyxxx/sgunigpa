"use client";

import { Course, UniversityConfig } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseRowProps {
  course: Course;
  config: UniversityConfig;
  onChange: (updates: Partial<Course>) => void;
  onDelete: () => void;
}

export function CourseRow({ course, config, onChange, onDelete }: CourseRowProps) {
  return (
    <div className="bg-card border-2 border-foreground p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2">
        {/* Course Code */}
        <input
          type="text"
          value={course.code}
          onChange={(e) => onChange({ code: e.target.value })}
          placeholder="CS1101S"
          className="w-24 px-2 py-2 text-xs border-2 border-foreground bg-background focus:outline-none focus:bg-accent/10"
        />

        {/* Grade Selector - Inline boxes with overlapping borders */}
        <div className="flex border-2 border-foreground">
          {config.grades.map((g, index) => (
            <button
              key={g.grade}
              type="button"
              onClick={() => onChange({ grade: g.grade })}
              className={cn(
                "px-2 py-2 text-xs font-bold hover:bg-accent/20 transition-colors min-w-[2.5rem]",
                index > 0 && "border-l-2 border-foreground",
                course.grade === g.grade && "bg-foreground text-background"
              )}
            >
              {g.grade}
            </button>
          ))}
        </div>

        {/* Credits */}
        <input
          type="number"
          step="0.5"
          min="0"
          max="20"
          value={course.credits}
          onChange={(e) => onChange({ credits: parseFloat(e.target.value) || 0 })}
          className="w-14 px-2 py-2 text-xs border-2 border-foreground bg-background text-center focus:outline-none focus:bg-accent/10"
        />

        {/* S/U Toggle */}
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={course.isPassFail}
            onChange={(e) => onChange({ isPassFail: e.target.checked })}
            className="w-4 h-4 border-2 border-foreground accent-foreground"
          />
          <span className="text-xs font-bold">{config.passFail.label.split(" ")[0]}</span>
        </label>

        {/* Delete */}
        <button
          onClick={onDelete}
          aria-label="Delete course"
          className="ml-auto p-1 hover:bg-accent/20 border-2 border-transparent hover:border-foreground transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
