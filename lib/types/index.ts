export type University = "NUS" | "NTU" | "SMU";

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: string;
  isPassFail: boolean;
}

export interface CalculatedGPA {
  gpa: number;
  totalCreditsAttempted: number;
  totalCreditsEarned: number;
}

export interface AppState {
  university: University | null;
  courses: Course[];
  calculated: CalculatedGPA;
}

export interface GradeMapping {
  grade: string;
  points: number;
}

export interface UniversityConfig {
  name: string;
  gpaScale: number;
  grades: GradeMapping[];
  creditLabel: string; // "MCs", "AUs", "Units"
  codeLabel: string; // "Module Code", "Course Code"
  gpaLabel: string; // "CAP", "GPA"
  passFail: {
    label: string; // "S/U Option", "P/F Option"
    passThreshold: number; // minimum grade points for pass
  };
  degreeClassifications?: {
    name: string;
    minGPA: number;
  }[];
}
