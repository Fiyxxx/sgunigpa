import { University, Course, CalculatedGPA, UniversityConfig } from "../types";
import { nusConfig, calculateNUSGPA } from "./nus";
import { ntuConfig, calculateNTUGPA } from "./ntu";
import { smuConfig, calculateSMUGPA } from "./smu";

export function getUniversityConfig(university: University): UniversityConfig {
  switch (university) {
    case "NUS":
      return nusConfig;
    case "NTU":
      return ntuConfig;
    case "SMU":
      return smuConfig;
  }
}

export function calculateGPA(
  university: University,
  courses: Course[]
): CalculatedGPA {
  switch (university) {
    case "NUS":
      return calculateNUSGPA(courses);
    case "NTU":
      return calculateNTUGPA(courses);
    case "SMU":
      return calculateSMUGPA(courses);
  }
}

export { nusConfig, ntuConfig, smuConfig };
