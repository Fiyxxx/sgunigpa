# SGUniGPA.com — Complete Design Specification

**Last updated:** 2026-02-07
**Status:** Finalized — Ready for implementation

---

## Overview

SGUniGPA.com is a GPA calculator web app for students at Singapore's three major universities: NUS, NTU, and SMU. The tool provides accurate GPA calculations using each university's specific grading system, with special features like NUS's S/U option.

**Key principles:**
- Client-side first (no backend required for v1)
- University-specific accuracy (correct terminology, grading scales, special options)
- Clean, minimal design inspired by vintage Apple and Perplexity
- Mobile-first approach (students calculate on their phones)

---

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Context or Zustand (lightweight)
- **Data Persistence:** localStorage (client-side only, no backend DB)
- **Deployment:** Vercel
- **API Routes:** Reserved for future features (not needed for v1)

---

## Project Architecture

```
/app              — Next.js app router pages and layouts
/components       — Reusable UI components (calculator inputs, results display)
/lib/calculators  — University-specific GPA calculation logic (nus.ts, ntu.ts, smu.ts)
/lib/types        — TypeScript interfaces for courses, grades, and university systems
/lib/storage      — localStorage utilities for saving/loading user data
```

**Client-side first approach:**
- All GPA calculations happen in the browser
- No backend database initially
- Data persists locally using browser storage
- Each page load restores previous session from localStorage

---

## University-Specific Grading Systems

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

## Core Features

- **University selector** on initial load (NUS, NTU, SMU)
- **Basic GPA calculator** — enter courses, grades, credits → get GPA
- **University-specific logic** — correct grading scales, terminology, special options (S/U for NUS)
- **Client-side persistence** — all data saved to localStorage, restored on reload
- **No accounts/auth** for v1
- **No enforced limits** on S/U usage etc. — just correct labeling
- **Switch university** option with warning if data exists

---

## Visual Design Specification

**Style:** Minimal & Clean, typography-first. Inspired by **vintage Apple** aesthetics and **Perplexity's** clean layout.

### Typography
- **Primary font:** SF Pro Display/Text (if available) or Inter as fallback
- **Hero/Headings:** 48-72px desktop, 36-48px mobile, bold weight
- **Body text:** 18-20px desktop, 16-18px mobile (larger than typical — less content means more breathing room)
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
- Large padding between sections (80-120px vertical desktop, 40-60px mobile)
- Minimal card-based design with hairline borders
- Every element has room to breathe

### Interactive Elements
- Gentle hover states (slight color shift, no dramatic effects)
- Smooth 200ms transitions
- Clean inputs with subtle borders that strengthen on focus
- 8px rounded corners

---

## UI Interaction Specifications

### University Selector
- Always visible at top of page (not hidden after selection)
- Appears as 3 large buttons/cards: "NUS" | "NTU" | "SMU"
- Selected university highlighted with accent color border or dark mode treatment
- Clicking a different university triggers confirmation dialog if courses exist
- Mobile: stacks vertically, full-width buttons with good tap targets (min 44px height)

### Course Addition Flow
- Start with empty state (no courses visible)
- Large "+" button/card always present at the bottom
- Click "+" to add a new course entry
- After courses are added, "+" stays at the bottom to add more
- No separate "Add Course" submit button — just the persistent "+"

### Grade Selection
- **NOT a dropdown.** All possible grades displayed as **square boxes** touching each other in a grid/row
- Each box has the grade letter written inside
- When a box is clicked, it **turns dark mode** (dark background, light text) to indicate selection
- Only one grade can be selected per course
- Mobile: 2-3 columns, still grid layout but narrower
- Keyboard accessible: Tab to focus, arrow keys to navigate, Enter to select

### GPA Display Animation
- When GPA changes, the number should have a **counting animation**
- NOT a gimmick animation (no bouncing, no flashing)
- The number should **actually count up or down** — like a real-time odometer/ticker
- Should look like the GPA value is genuinely rising or falling to the new value
- Animation should be fast/instantaneous-feeling but visible (think: number smoothly rolling from 3.82 to 4.01)
- **Respect `prefers-reduced-motion`** — instant update if user has reduced motion enabled

### Course List Display
- Each course as a card with edit/delete buttons
- Show: course code, name, credits, grade, S/U status (if NUS)
- Delete with confirmation or simple undo toast
- Full-width inputs with large touch targets on mobile

---

## Data Structure

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

## Error Handling & Validation

### Input Validation
- Credits field: positive numbers only (0.5–20 range typical)
- Grade selection: pre-populated boxes per university (no free-form input)
- Course code/name: optional but recommended (allow empty for quick calculations)
- Mobile: number pad keyboard for credits input (`type="number" inputmode="decimal"`)

### User-Friendly Error States
- Empty state: friendly message "Add your first course to calculate your GPA"
- Invalid inputs: inline validation messages below fields (not blocking alerts)
- Calculation errors: graceful fallback (show last valid GPA or 0.00)
- localStorage errors: silent failure with in-memory fallback

### Edge Cases
- All courses marked S/U (NUS): show message "No graded modules for CAP calculation"
- No courses entered: show placeholder GPA as "--" or "0.00"
- Browser doesn't support localStorage: show warning, continue with session-only storage
- Switching universities with existing data: confirmation dialog with clear warning

---

## Page Structure & Routing

**Approach: Single-page application (SPA)**

The calculator lives on a single route (`/`) with no additional pages needed for v1.

**Structure:**
- **Hero section** at top: "SGUniGPA" title, tagline ("Calculate your GPA effortlessly"), university selector
- **Calculator section** below: course entry form, grade selection, results display
- **Footer** (minimal): link to source code, feedback email, "Made with ❤️ in Singapore"

**Why single-page:**
- No need for separate landing page — the hero section IS the landing
- Calculator is the only feature, so routing adds unnecessary complexity
- Faster initial load, no navigation delays
- Easier state management (everything in one React component tree)

---

## Mobile Responsiveness

**Mobile-first approach** — most students will use this on their phones while checking grades or planning their modules.

**Breakpoints:**
- Mobile: < 640px (default styling)
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile-specific adaptations:**
- University selector: stack vertically, full-width buttons
- Grade selection boxes: 2-3 columns on mobile
- Credits input: number pad keyboard on mobile
- "+" button: full-width, prominent
- Spacing adjustments: reduce vertical padding from 80-120px to 40-60px
- All interactive elements min 44x44px for comfortable tapping

---

## Accessibility Considerations

**Goal:** WCAG 2.1 AA compliance

**Keyboard Navigation:**
- All interactive elements accessible via Tab key
- Grade selection boxes navigable with arrow keys
- Enter key confirms selections
- Clear focus indicators (visible outline on all focusable elements)

**Screen Reader Support:**
- Semantic HTML (`<button>`, `<input>`, `<label>`, `<main>`, `<section>`)
- ARIA labels for grade selection boxes: "Select grade A+" etc.
- ARIA live region for GPA display — announces changes when GPA updates
- Descriptive labels for all form fields
- University selector buttons have clear aria-labels

**Visual Accessibility:**
- Color contrast: minimum 4.5:1 for body text, 3:1 for large text
- Grade selection doesn't rely on color alone — selected state has border + background change
- Focus states use both color AND border/outline
- Font sizes large enough for readability (18-20px body)

**Motion:**
- Respect `prefers-reduced-motion` media query
- If user has reduced motion enabled, skip the GPA counting animation (instant update instead)

---

## SEO & Meta Tags

**Page Title & Description:**
```html
<title>SGUniGPA — GPA Calculator for NUS, NTU & SMU Students</title>
<meta name="description" content="Free GPA calculator for Singapore university students. Supports NUS CAP (with S/U), NTU, and SMU grading systems. Calculate your GPA instantly in your browser." />
```

**Open Graph tags:**
```html
<meta property="og:title" content="SGUniGPA — GPA Calculator for Singapore Universities" />
<meta property="og:description" content="Calculate your GPA for NUS, NTU, or SMU. Supports S/U options, accurate grading scales, and saves your data locally." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://sgunigpa.com" />
```

**Keywords focus:**
- NUS CAP calculator
- NTU GPA calculator
- SMU GPA calculator
- Singapore university GPA
- S/U calculator NUS

**Additional optimizations:**
- Structured Data (JSON-LD) with WebApplication schema
- Viewport meta tag for mobile
- Theme color matching eggshell background
- Brief explanatory text below hero for search engines
- Heading hierarchy (H1 for title, H2 for sections)
- Target 90+ Lighthouse score (Next.js + Vercel handles most performance)

---

## Loading States & UI Details

**Loading states:**
- Initial page load: show skeleton UI for calculator
- localStorage restoration: instant (no loader needed)

**Confirmation dialogs:**
- Switch university warning: clean modal with "Cancel" and "Switch & Clear Data" buttons
- Use shadcn/ui Dialog component for consistency

**Empty states:**
- No courses: friendly message "Add your first course to calculate your GPA"
- Icon or illustration optional (keep it minimal)

---

## Out of Scope for v1

- User accounts / authentication
- Backend database
- Cloud sync across devices
- Semester/term organization
- Grade prediction / "what-if" scenarios
- Transcript upload / OCR
- Sharing GPA results
- Export to PDF
- Target GPA calculator
- Mobile app (PWA possible later)

---

## Success Metrics

- Students can accurately calculate their GPA in under 2 minutes
- Works offline after initial load (thanks to localStorage)
- Fast load time (< 2s on 3G)
- Zero calculation errors for standard grade inputs
- Positive feedback from students at all three universities

---

**This design is finalized and ready for implementation.**
