"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { getUniversityConfig } from "@/lib/calculators";
import { University, Course } from "@/lib/types";
import { UniversitySelector } from "@/components/university-selector";
import { CourseRow } from "@/components/course-row";
import { GPADisplay } from "@/components/gpa-display";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  const {
    university,
    courses,
    calculated,
    setUniversity,
    addCourse,
    updateCourse,
    deleteCourse,
    loadData,
    clearData,
  } = useStore();

  const [pendingUniversity, setPendingUniversity] = useState<University | null>(
    null
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const config = university ? getUniversityConfig(university) : null;

  const handleUniversitySelect = (selectedUniversity: University) => {
    if (university === selectedUniversity) return;

    if (courses.length > 0) {
      setPendingUniversity(selectedUniversity);
      setShowConfirmDialog(true);
    } else {
      setUniversity(selectedUniversity);
    }
  };

  const handleConfirmUniversityChange = () => {
    if (pendingUniversity) {
      clearData();
      setUniversity(pendingUniversity);
    }
    setShowConfirmDialog(false);
    setPendingUniversity(null);
  };

  const handleCancelUniversityChange = () => {
    setShowConfirmDialog(false);
    setPendingUniversity(null);
  };

  const handleAddCourse = () => {
    if (!config) return;
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: "",
      name: "",
      credits: 4,
      grade: config.grades[0].grade,
      isPassFail: false,
    };
    addCourse(newCourse);
  };

  const handleUpdateCourse = (id: string, updates: Partial<Course>) => {
    updateCourse(id, updates);
  };

  const handleDeleteCourse = (id: string) => {
    deleteCourse(id);
  };

  return (
    <>
      <StructuredData />
      <main className="min-h-screen p-4 pb-16 max-w-4xl mx-auto">
        {/* Compact Header */}
        <div className="mb-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <h1 className="text-6xl font-serif font-bold mb-1">
                SGUniGPA
              </h1>
              <p className="text-sm text-secondary mb-4">Calculate your GPA</p>
            </div>
            <div className="flex-1 flex justify-end">
              <a
                href="https://linkedin.com/in/goh-han-sheng"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border-2 font-bold text-sm transition-all bg-card text-foreground border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <UniversitySelector
              selected={university}
              onSelect={handleUniversitySelect}
            />
          </div>
        </div>

        {/* Calculator Section */}
        {university && config && (
          <div className="space-y-3">
            {/* GPA Display */}
            <GPADisplay calculated={calculated} config={config} />

            {/* Course Headers */}
            <div className="px-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-secondary">
                <div className="w-24">Code</div>
                <div className="flex-1">Grade</div>
                <div className="w-14 text-center">{config.creditLabel}</div>
                <div className="flex items-center gap-1">
                  <div className="w-4"></div>
                  <span>{config.passFail.label.split(" ")[0]}</span>
                </div>
                <div className="ml-auto w-[30px]"></div>
              </div>
            </div>

            {/* Course List */}
            <div className="space-y-2">
              {courses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  config={config}
                  onChange={(updates) => handleUpdateCourse(course.id, updates)}
                  onDelete={() => handleDeleteCourse(course.id)}
                />
              ))}
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddCourse}
              aria-label="Add new course"
              className="w-full py-2 border-2 border-dashed border-foreground hover:bg-muted transition-all flex items-center justify-center gap-1 text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <Plus size={16} />
              <span>Add Course</span>
            </button>
          </div>
        )}

        {!university && (
          <div className="text-center py-12 text-secondary text-sm">
            Select your university to get started
          </div>
        )}

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={showConfirmDialog}
          title="Switch University?"
          message="Switching universities will clear all your current course data. This action cannot be undone."
          confirmLabel="Switch & Clear Data"
          cancelLabel="Cancel"
          onConfirm={handleConfirmUniversityChange}
          onCancel={handleCancelUniversityChange}
        />

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 py-3 border-t-2 border-foreground bg-background text-center">
          <p className="text-xs text-secondary">
            made by{" "}
            <a
              href="https://www.hansheng.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors underline font-bold"
            >
              han sheng
            </a>{" "}
            ❤️
          </p>
        </footer>
      </main>
    </>
  );
}
