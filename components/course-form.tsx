"use client";

import { useState } from "react";
import { Course, UniversityConfig } from "@/lib/types";
import { GradeSelector } from "./grade-selector";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CourseFormProps {
  course?: Course;
  config: UniversityConfig;
  onSave: (course: Course) => void;
  onDelete?: (id: string) => void;
  onCancel?: () => void;
}

export function CourseForm({
  course,
  config,
  onSave,
  onDelete,
  onCancel,
}: CourseFormProps) {
  const [code, setCode] = useState(course?.code || "");
  const [name, setName] = useState(course?.name || "");
  const [credits, setCredits] = useState(course?.credits.toString() || "");
  const [grade, setGrade] = useState(course?.grade || config.grades[0].grade);
  const [isPassFail, setIsPassFail] = useState(course?.isPassFail || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const creditValue = parseFloat(credits);
    if (isNaN(creditValue) || creditValue <= 0) {
      return;
    }

    onSave({
      id: course?.id || crypto.randomUUID(),
      code,
      name,
      credits: creditValue,
      grade,
      isPassFail,
    });

    // Reset form if creating new course
    if (!course) {
      setCode("");
      setName("");
      setCredits("");
      setGrade(config.grades[0].grade);
      setIsPassFail(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-lg border border-border p-6 space-y-6"
    >
      {course && onDelete && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onDelete(course.id)}
            aria-label="Delete course"
            className="text-secondary hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`code-${course?.id || "new"}`}
            className="block text-sm font-medium mb-2"
          >
            {config.codeLabel}
          </label>
          <input
            id={`code-${course?.id || "new"}`}
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="e.g., CS1101S"
          />
        </div>

        <div>
          <label
            htmlFor={`name-${course?.id || "new"}`}
            className="block text-sm font-medium mb-2"
          >
            Course Name
          </label>
          <input
            id={`name-${course?.id || "new"}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="e.g., Programming Methodology"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`credits-${course?.id || "new"}`}
          className="block text-sm font-medium mb-2"
        >
          {config.creditLabel}
        </label>
        <input
          id={`credits-${course?.id || "new"}`}
          type="number"
          inputMode="decimal"
          step="0.5"
          min="0"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          placeholder="e.g., 4"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Grade</label>
        <GradeSelector
          grades={config.grades}
          selected={grade}
          onSelect={setGrade}
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id={`passfail-${course?.id || "new"}`}
          type="checkbox"
          checked={isPassFail}
          onChange={(e) => setIsPassFail(e.target.checked)}
          className="w-5 h-5 rounded border-border text-accent focus:ring-2 focus:ring-accent"
        />
        <label
          htmlFor={`passfail-${course?.id || "new"}`}
          className="text-sm font-medium cursor-pointer"
        >
          {config.passFail.label}
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          {course ? "Update Course" : "Add Course"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-secondary/10 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
