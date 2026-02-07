"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { getUniversityConfig } from "@/lib/calculators";
import { University, Course } from "@/lib/types";
import { UniversitySelector } from "@/components/university-selector";
import { CourseForm } from "@/components/course-form";
import { CourseItem } from "@/components/course-item";
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

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
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
      setShowAddForm(false);
      setEditingCourse(null);
    }
    setShowConfirmDialog(false);
    setPendingUniversity(null);
  };

  const handleCancelUniversityChange = () => {
    setShowConfirmDialog(false);
    setPendingUniversity(null);
  };

  const handleSaveCourse = (course: Course) => {
    if (editingCourse) {
      updateCourse(course.id, course);
      setEditingCourse(null);
    } else {
      addCourse(course);
    }
    setShowAddForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowAddForm(false);
  };

  const handleDeleteCourse = (id: string) => {
    deleteCourse(id);
    if (editingCourse?.id === id) {
      setEditingCourse(null);
    }
  };

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingCourse(null);
  };

  return (
    <>
      <StructuredData />
      <main className="min-h-screen pb-20">
        {/* Hero Section */}
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          SGUniGPA
        </h1>
        <p className="text-lg md:text-xl text-secondary text-center mb-12 md:mb-16">
          Calculate your GPA effortlessly
        </p>

        {/* University Selector */}
        <UniversitySelector
          selected={university}
          onSelect={handleUniversitySelect}
        />
      </div>

      {/* Calculator Section */}
      {university && config && (
        <div className="mx-auto max-w-3xl px-6 space-y-8 md:space-y-12">
          {/* GPA Display */}
          <GPADisplay calculated={calculated} config={config} />

          {/* Courses Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Courses</h2>

            {courses.length === 0 && !showAddForm && !editingCourse && (
              <div className="text-center py-12 text-secondary">
                Add your first course to calculate your {config.gpaLabel}
              </div>
            )}

            {/* Course List */}
            {courses.length > 0 && (
              <div className="space-y-3">
                {courses.map((course) => (
                  <CourseItem
                    key={course.id}
                    course={course}
                    config={config}
                    onEdit={handleEditCourse}
                    onDelete={handleDeleteCourse}
                  />
                ))}
              </div>
            )}

            {/* Edit Form */}
            {editingCourse && (
              <CourseForm
                course={editingCourse}
                config={config}
                onSave={handleSaveCourse}
                onCancel={() => setEditingCourse(null)}
              />
            )}

            {/* Add Form */}
            {showAddForm && !editingCourse && (
              <CourseForm
                config={config}
                onSave={handleSaveCourse}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            {/* Add Button */}
            {!showAddForm && !editingCourse && (
              <button
                onClick={handleAddNew}
                aria-label="Add new course"
                className="w-full py-6 border-2 border-dashed border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all flex items-center justify-center gap-2 text-secondary hover:text-accent font-semibold"
              >
                <Plus size={24} />
                <span>Add Course</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-sm text-secondary">
        <p>Made with ❤️ in Singapore</p>
      </footer>

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
      </main>
    </>
  );
}
