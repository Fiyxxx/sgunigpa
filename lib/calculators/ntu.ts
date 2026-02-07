import { Course, CalculatedGPA, UniversityConfig } from "../types";

export const ntuConfig: UniversityConfig = {
  name: "NTU",
  gpaScale: 5.0,
  grades: [
    { grade: "A+", points: 5.0 },
    { grade: "A", points: 5.0 },
    { grade: "A-", points: 4.5 },
    { grade: "B+", points: 4.0 },
    { grade: "B", points: 3.5 },
    { grade: "B-", points: 3.0 },
    { grade: "C+", points: 2.5 },
    { grade: "C", points: 2.0 },
    { grade: "D+", points: 1.5 },
    { grade: "D", points: 1.0 },
    { grade: "F", points: 0.0 },
  ],
  creditLabel: "AUs",
  codeLabel: "Course Code",
  gpaLabel: "GPA",
  passFail: {
    label: "P/F Option",
    passThreshold: 2.0, // C and above = Pass
  },
};

export function calculateNTUGPA(courses: Course[]): CalculatedGPA {
  // Filter out P/F courses
  const gradedCourses = courses.filter((course) => !course.isPassFail);

  if (gradedCourses.length === 0) {
    return {
      gpa: 0,
      totalCreditsAttempted: 0,
      totalCreditsEarned: 0,
    };
  }

  let totalPoints = 0;
  let totalCredits = 0;
  let earnedCredits = 0;

  for (const course of gradedCourses) {
    const gradeMapping = ntuConfig.grades.find((g) => g.grade === course.grade);
    if (gradeMapping) {
      totalPoints += gradeMapping.points * course.credits;
      totalCredits += course.credits;

      // Credits earned if grade >= D (1.0)
      if (gradeMapping.points >= 1.0) {
        earnedCredits += course.credits;
      }
    }
  }

  // Add earned credits from P/F courses
  const pfCourses = courses.filter((course) => course.isPassFail);
  for (const course of pfCourses) {
    const gradeMapping = ntuConfig.grades.find((g) => g.grade === course.grade);
    // P/F: C and above (>= 2.0) = Pass = earn credits
    if (gradeMapping && gradeMapping.points >= ntuConfig.passFail.passThreshold) {
      earnedCredits += course.credits;
    }
  }

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {
    gpa: Math.round(gpa * 100) / 100,
    totalCreditsAttempted: totalCredits + pfCourses.reduce((sum, c) => sum + c.credits, 0),
    totalCreditsEarned: earnedCredits,
  };
}
