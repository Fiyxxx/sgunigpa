# SGUniGPA.com — Full Project Context & Specification

You are helping me build **SGUniGPA.com**, a GPA calculator web app for students at Singapore's 3 major universities: NUS, NTU, and SMU. Below is everything we've decided so far. Pick up where we left off — we were in the middle of finalizing the design specification (error handling & validation section was the last discussed). Continue presenting remaining design sections and then help me build this.

---

## 1. Tech Stack (Decided)

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Context or Zustand (lightweight)
- **Data Persistence:** localStorage (client-side only, no backend DB)
- **Deployment:** Vercel (recommended)
- **API Routes:** Reserved for future features (not needed for v1)

---

## 2. Project Architecture (Decided)

```
/app              — Next.js app router pages and layouts
/components       — Reusable UI components (calculator inputs, results display)
/lib/calculators  — University-specific GPA calculation logic (nus.ts, ntu.ts, smu.ts)
/lib/types        — TypeScript interfaces for courses, grades, and university systems
/lib/storage      — localStorage utilities for saving/loading user data
```

Client-side first approach:
- All GPA calculations happen in the browser
- No backend database initially
- Data persists locally using browser storage
- Each page load restores previous session from localStorage

---

## 3. University-Specific Grading Systems

### NUS (National University of Singapore) — 5.0 CAP Scale

**Grade Point Table:**

| Grade | Grade Point |
|-------|-------------|
| A+    | 5.0         |
| A     | 5.0         |
| A-    | 4.5         |
| B+    | 4.0         |
| B     | 3.5         |
| B-    | 3.0         |
| C+    | 2.5         |
| C     | 2.0         |
| D+    | 1.5         |
| D     | 1.0         |
| F     | 0.0         |

**CAP Formula:**
```
CAP = Σ(Module Grade Point × MCs for that module) / Σ(MCs for all graded modules)
```

**S/U (Satisfactory/Unsatisfactory) System:**
- Students can declare modules as S/U after grades are released
- Grade of **C (2.0) and above** → **S** (Satisfactory) — earns MCs but grade excluded from CAP
- Grade of **D+ (1.5) and below** → **U** (Unsatisfactory) — no MCs earned, grade excluded from CAP
- S/U'd modules are excluded from BOTH numerator and denominator of CAP formula
- Typical quota: 32 MCs total (but **do NOT enforce limits in the calculator** — just label it correctly)
- CS/CU (Completed Satisfactorily/Unsatisfactorily) modules exist too — these are inherently pass/fail, different from student-elected S/U

**NUS-Specific Terminology:**
- GPA is called "CAP" (Cumulative Average Point) — recently renamed to GPA but CAP is still widely used
- Credits are called "MCs" (Modular Credits) — recently renamed to "Units"
- Use "Module Code" for course identifier
- Label the S/U toggle as "S/U Option"

**Degree Classification (160-unit Honours programmes):**

| Classification | CAP/GPA Range |
|---|---|
| Honours (Highest Distinction) | 4.50 and above |
| Honours (Distinction) | 4.00 – 4.49 |
| Honours (Merit) | 3.50 – 3.99 |
| Honours | 3.00 – 3.49 |
| Pass | 2.00 – 2.99 |

Minimum CAP to graduate: **2.0**

### NTU (Nanyang Technological University) — 5.0 GPA Scale

- Similar to NUS but with different grade boundaries
- Standard letter grades with + and - variations
- Pass/Fail modules handled separately
- Credits called "AUs" (Academic Units)
- Use "Course Code" for course identifier

### SMU (Singapore Management University) — 4.0 GPA Scale

| Grade | Grade Point |
|-------|-------------|
| A     | 4.0         |
| A-    | 3.7         |
| B+    | 3.3         |
| B     | 3.0         |
| B-    | 2.7         |
| C+    | 2.3         |
| C     | 2.0         |
| C-    | 1.7         |
| D+    | 1.3         |
| D     | 1.0         |
| F     | 0.0         |

- Different grading philosophy from NUS/NTU
- May have Pass/Fail options
- Use "Course Code" for course identifier, "Units" for credits

**Important:** Terminology MUST adapt dynamically based on selected university. The wording should be correct for each school (e.g., "S/U system" is NUS-specific, "MCs" is NUS-specific, other schools use "AUs" or "Units").

---

## 4. Core Features (Decided)

- **University selector** on initial load (NUS, NTU, SMU)
- **Basic GPA calculator** — enter courses, grades, credits → get GPA
- **University-specific logic** — correct grading scales, terminology, special options (S/U for NUS)
- **Client-side persistence** — all data saved to localStorage, restored on reload
- **No accounts/auth** for v1
- **No enforced limits** on S/U usage etc. — just correct labeling
- **Switch university** option with warning if data exists

---

## 5. Visual Design Specification (Decided)

**Style:** Minimal & Clean, typography-first. Inspired by **vintage Apple** aesthetics and **Perplexity's** clean layout.

### Typography
- **Primary font:** SF Pro Display/Text (if available) or Inter as fallback
- **Hero/Headings:** 48-72px, bold weight
- **Body text:** 18-20px (larger than typical — less content means more breathing room)
- **Line-height:** 1.7-1.9 (generous)

### Color Palette
- **Background:** Eggshell white (#FAF9F6 or #F5F5F0) — warm, soft, easy on eyes
- **Text:** Deep charcoal (#1A1A1A) — not pure black
- **Secondary text:** Warm gray (#71717A)
- **Accent:** Subtle blue (#0071E3) or muted option
- **Borders:** Soft gray (#E5E7EB)
- **Cards:** Pure white (#FFFFFF) on eggshell background for subtle contrast

### Layout Principles
- Extremely generous white space
- Centered content, max-width 720px for calculator
- Large padding between sections (80-120px vertical)
- Minimal card-based design with hairline borders
- Every element has room to breathe

### Interactive Elements
- Gentle hover states (slight color shift, no dramatic effects)
- Smooth 200ms transitions
- Clean inputs with subtle borders that strengthen on focus
- 8px rounded corners

---

## 6. UI Interaction Specifications (Decided)

### Grade Selection
- **NOT a dropdown.** All possible grades displayed as **square boxes** touching each other in a grid/row
- Each box has the grade letter written inside
- When a box is clicked, it **turns dark mode** (dark background, light text) to indicate selection
- Only one grade can be selected per course

### GPA Display Animation
- When GPA changes, the number should have a **counting animation**
- NOT a gimmick animation (no bouncing, no flashing)
- The number should **actually count up or down** — like a real-time odometer/ticker
- Should look like the GPA value is genuinely rising or falling to the new value
- Animation should be fast/instantaneous-feeling but visible (think: number smoothly rolling from 3.82 to 4.01)

---

## 7. Data Structure (Decided)

```typescript
{
  university: 'NUS' | 'NTU' | 'SMU',
  courses: [
    {
      id: string,
      code: string,        // Module Code (NUS) / Course Code (NTU, SMU)
      name: string,
      credits: number,     // MCs (NUS) / AUs (NTU) / Units (SMU)
      grade: string,
      isPassFail: boolean,  // S/U for NUS, P/F for others
    }
  ],
  calculated: {
    gpa: number,
    totalCreditsAttempted: number,
    totalCreditsEarned: number
  }
}
```

### Persistence Flow
1. User makes any change (add course, change grade, toggle S/U)
2. State updates in memory
3. Debounced save to localStorage (500ms delay)
4. On page load: check localStorage, restore state if exists
5. If switching universities: prompt user, then clear course data

### Calculation Trigger
- Recalculate GPA whenever courses array changes
- Pure functions in `/lib/calculators/` for each university
- Results update in real-time

---

## 8. Error Handling & Validation (Decided)

### Input Validation
- Credits field: positive numbers only (0.5–20 range typical)
- Grade selection: pre-populated boxes per university (no free-form input)
- Course code/name: optional but recommended (allow empty for quick calculations)

### User-Friendly Error States
- Empty state: welcoming message with "Add your first course" prompt
- Invalid inputs: inline validation messages below fields (not blocking alerts)
- Calculation errors: graceful fallback (show last valid GPA or 0.00)
- localStorage errors: silent failure with in-memory fallback

### Edge Cases
- All courses marked S/U (NUS): show message "No graded modules for CAP calculation"
- No courses entered: show placeholder GPA as "--" or "0.00"
- Browser doesn't support localStorage: show warning, continue with session-only storage
- Switching universities with existing data: confirmation dialog with clear warning

---

## 9. What's Left to Discuss

We were in the middle of presenting the design specification in sections. The following sections have NOT been discussed yet and need to be finalized:

- **Page structure / routing** (single page? multi-page? landing page?)
- **Mobile responsiveness** specifics
- **Accessibility considerations**
- **SEO / meta tags**
- **Any remaining UI details**
- **Implementation plan / build order**

Please continue from where we left off — present the remaining design sections one at a time, then help me build the application.
