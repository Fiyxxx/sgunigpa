import { AppState, University, Course } from "../types";

const STORAGE_KEY = "sgunigpa-data";

export function saveToLocalStorage(state: AppState): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

export function loadFromLocalStorage(): AppState | null {
  try {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as AppState;
      }
    }
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
  }
  return null;
}

export function clearLocalStorage(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
}

export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined") return false;
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}
