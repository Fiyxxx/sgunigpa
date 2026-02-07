import { Course, CalculatedGPA, UniversityConfig, GradeMapping } from "../types";

export const nusConfig: UniversityConfig = {
  name: "NUS",
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
  creditLabel: "MCs",
  codeLabel: "Module Code",
  gpaLabel: "CAP",
  passFail: {
    label: "S/U Option",
    passThreshold: 2.0, // C and above = S
  },
  degreeClassifications: [
    { name: "Honours (Highest Distinction)", minGPA: 4.5 },
    { name: "Honours (Distinction)", minGPA: 4.0 },
    { name: "Honours (Merit)", minGPA: 3.5 },
    { name: "Honours", minGPA: 3.0 },
    { name: "Pass", minGPA: 2.0 },
  ],
};

export function calculateNUSGPA(courses: Course[]): CalculatedGPA {
  // Filter out S/U'd courses (isPassFail = true)
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
    const gradeMapping = nusConfig.grades.find((g) => g.grade === course.grade);
    if (gradeMapping) {
      totalPoints += gradeMapping.points * course.credits;
      totalCredits += course.credits;

      // For NUS, credits are earned if grade >= D (1.0)
      if (gradeMapping.points >= 1.0) {
        earnedCredits += course.credits;
      }
    }
  }

  // Add earned credits from S/U'd courses
  const suCourses = courses.filter((course) => course.isPassFail);
  for (const course of suCourses) {
    const gradeMapping = nusConfig.grades.find((g) => g.grade === course.grade);
    // S/U: C and above (>= 2.0) = S = earn credits
    if (gradeMapping && gradeMapping.points >= nusConfig.passFail.passThreshold) {
      earnedCredits += course.credits;
    }
  }

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return {
    gpa: Math.round(gpa * 100) / 100, // Round to 2 decimal places
    totalCreditsAttempted: totalCredits + suCourses.reduce((sum, c) => sum + c.credits, 0),
    totalCreditsEarned: earnedCredits,
  };
}
