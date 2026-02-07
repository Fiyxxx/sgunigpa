import { create } from "zustand";
import { University, Course, CalculatedGPA, AppState } from "./types";
import { calculateGPA } from "./calculators";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage";

interface GPAStore extends AppState {
  setUniversity: (university: University) => void;
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  recalculateGPA: () => void;
  loadData: () => void;
  clearData: () => void;
}

export const useStore = create<GPAStore>((set, get) => ({
  university: null,
  courses: [],
  calculated: {
    gpa: 0,
    totalCreditsAttempted: 0,
    totalCreditsEarned: 0,
  },

  setUniversity: (university) => {
    set({ university });
    const state = get();
    saveToLocalStorage({
      university: state.university,
      courses: state.courses,
      calculated: state.calculated,
    });
  },

  addCourse: (course) => {
    set((state) => ({
      courses: [...state.courses, course],
    }));
    get().recalculateGPA();
  },

  updateCourse: (id, updates) => {
    set((state) => ({
      courses: state.courses.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
    get().recalculateGPA();
  },

  deleteCourse: (id) => {
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== id),
    }));
    get().recalculateGPA();
  },

  recalculateGPA: () => {
    const state = get();
    if (state.university && state.courses.length > 0) {
      const calculated = calculateGPA(state.university, state.courses);
      set({ calculated });
      saveToLocalStorage({
        university: state.university,
        courses: state.courses,
        calculated,
      });
    } else {
      const calculated = {
        gpa: 0,
        totalCreditsAttempted: 0,
        totalCreditsEarned: 0,
      };
      set({ calculated });
      saveToLocalStorage({
        university: state.university,
        courses: state.courses,
        calculated,
      });
    }
  },

  loadData: () => {
    const data = loadFromLocalStorage();
    if (data) {
      set(data);
    }
  },

  clearData: () => {
    set({
      university: null,
      courses: [],
      calculated: {
        gpa: 0,
        totalCreditsAttempted: 0,
        totalCreditsEarned: 0,
      },
    });
    saveToLocalStorage({
      university: null,
      courses: [],
      calculated: {
        gpa: 0,
        totalCreditsAttempted: 0,
        totalCreditsEarned: 0,
      },
    });
  },
}));
