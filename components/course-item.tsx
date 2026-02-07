"use client";

import { Course, UniversityConfig } from "@/lib/types";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseItemProps {
  course: Course;
  config: UniversityConfig;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export function CourseItem({
  course,
  config,
  onEdit,
  onDelete,
}: CourseItemProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground">{course.code}</span>
          {course.name && (
            <span className="text-secondary text-sm truncate">
              {course.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm">
          <span className="text-secondary">
            {course.credits} {config.creditLabel}
          </span>
          <span
            className={cn(
              "font-semibold",
              course.isPassFail ? "text-accent" : "text-foreground"
            )}
          >
            {course.grade}
            {course.isPassFail && ` (${config.passFail.label.split(" ")[0]})`}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(course)}
          aria-label="Edit course"
          className="p-2 text-secondary hover:text-foreground transition-colors"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(course.id)}
          aria-label="Delete course"
          className="p-2 text-secondary hover:text-red-600 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
