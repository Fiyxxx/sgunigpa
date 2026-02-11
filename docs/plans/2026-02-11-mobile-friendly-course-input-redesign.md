# Mobile-Friendly Course Input Redesign

**Date:** 2026-02-11
**Status:** Validated — Ready for implementation

---

## Overview

Redesign the course input cards to be more mobile-friendly and fix responsive layout issues. Key changes include switching to traditional dropdowns for grade selection, implementing a consistent two-row layout, and improving units and S/U controls.

---

## Problems Being Solved

1. **Grade selection boxes wrap awkwardly** on small screens - the last grade (F) stretches to fill the entire row
2. **Scrolling mechanism not UX-friendly** on mobile and small windows
3. **Units field difficult to adjust** - needs easier increment/decrement
4. **S/U toggle needs improvement** for mobile usability
5. **Inconsistent layout** across different screen sizes

---

## Solution: Consistent Two-Row Layout

### Overall Approach

Replace the grid of grade boxes with a traditional dropdown and restructure each course card into a fixed two-row layout that works consistently across all screen sizes.

**Component Structure**:
```
CourseCard
├── Row 1 (flex container)
│   ├── Code input (30% width, min-width: 80px)
│   └── Name input (70% width, flexible)
├── Row 2 (flex container)
│   ├── Grade dropdown (40% width)
│   ├── Units stepper (30% width: minus btn + input + plus btn)
│   └── S/U button (30% width, only for NUS)
```

---

## Control Specifications

### Grade Dropdown

- **Type**: Native HTML `<select>` element
- **Styling**: Matches minimal aesthetic with border, padding, 8px rounded corners
- **Font size**: 16-18px (prevents iOS auto-zoom)
- **Placeholder**: "Grade" when empty
- **Options**: All available grades for selected university (A+, A, A-, B+, etc.)
- **Mobile behavior**: Triggers native picker UI (wheel on iOS, list on Android)

**Benefits**:
- Works perfectly on all devices
- Familiar interaction pattern
- No custom scrolling implementation needed
- Accessible by default

### Units Stepper

**Layout**: `[−] [4] [+]`

Three-part component:
- **Minus button (−)**:
  - Decrements by 1
  - Disabled when value ≤ 0
  - Minimum size: 44x44px
- **Input field**:
  - `type="number"`, `inputmode="numeric"` for mobile keyboard
  - Accepts decimal values (e.g., 3.5)
  - Editable for direct typing
  - Takes remaining space in stepper
- **Plus button (+)**:
  - Increments by 1
  - No upper limit
  - Minimum size: 44x44px

**Interaction**:
- Click +/- for quick adjustments
- Type directly for specific values
- Validates on blur: must be ≥0
- Invalid entries reset to last valid value or 0

### S/U Button (NUS Only)

- **Type**: Single toggle button
- **Text**: "S/U"
- **Default state**: Light background, dark text, border visible
- **Active state**: Black background (#1A1A1A), white text, no border
- **Size**: Minimum 44px height, full width of column
- **Transition**: 200ms ease for smooth state change
- **Visibility**: Hidden completely for NTU/SMU (not just disabled)

---

## Two-Row Layout Details

### Row 1 - Course Identity
```
[CS1010      ] [Introduction to Programming         ]
 ↑ Code         ↑ Name
```

- Flex container with 8-12px gap
- **Code input**:
  - Desktop: ~80-100px width
  - Mobile: ~60px width
- **Name input**: Flexible, takes remaining space
- **Height**: 44-48px (both inputs same height)
- **Padding**: 12px horizontal

### Row 2 - Grading Details
```
[Grade ▼     ] [−][4][+] [S/U]
 ↑ Dropdown     ↑ Stepper  ↑ Toggle (NUS only)
```

- Flex container with 8-12px gap
- **Desktop width distribution**:
  - Grade dropdown: 40% (~150px)
  - Units stepper: 30% (~120px combined)
  - S/U button: 30% (~100px)
- **Without S/U** (NTU/SMU): Grade 50%, Units 50%
- **Mobile** (<640px): Same proportions, full card width

### Card Styling

- **Gap between rows**: 12px
- **Card padding**:
  - Desktop: 16-20px
  - Mobile: 12-16px
- **Margin between cards**: 16px
- **Background**: White (#FFFFFF) on eggshell background
- **Border**: 1px solid #E5E7EB
- **Border radius**: 8px

### Mobile Adaptations (<640px)

- All inputs minimum 44px height
- Touch targets minimum 44x44px
- Card padding reduced to 12px
- Gaps reduced to 8px
- Font size minimum 16px (prevents iOS zoom)

---

## Interaction States

### Grade Dropdown States

- **Empty**: Placeholder "Grade" in secondary text (#71717A)
- **Selected**: Grade letter in primary text (#1A1A1A)
- **Focus**: Border changes to accent (#0071E3), 2px width
- **Hover** (desktop): Subtle border color shift

### Units Stepper Behavior

- **Default value**: 4 (common credit value) or empty
- **Minus button**:
  - Decrements by 1 per click
  - Disabled (grayed + no pointer) at value = 0
  - Cannot go below 0
- **Plus button**:
  - Increments by 1 per click
  - No maximum limit
  - Always enabled
- **Direct input**:
  - Accepts decimals (3.5, 2.5, etc.)
  - Validates on blur: must be ≥0
  - Invalid entries reset to last valid value
- **Button feedback**: Background darkens on click

### S/U Button Behavior (NUS Only)

- **Default**: Starts "off" (graded mode)
- **Toggle**: Click to switch graded ↔ S/U
- **States**:
  - Off: Light background, dark text, border
  - On: Black background, white text, no border
- **Transition**: 200ms ease for smooth color change
- **No validation**: User can select any grade with S/U active

---

## Validation Rules

- **Grade**: Required before GPA calculation (courses without grades are excluded)
- **Units**: Must be > 0 for course to count toward GPA
- **Course code/name**: Optional (allows quick calculations)
- **Empty course cards**: Ignored in calculations, can be deleted

---

## Accessibility

### Keyboard Navigation

**Tab order**: Code → Name → Grade → Units − → Units input → Units + → S/U → Delete

- **Grade dropdown**: Native `<select>` keyboard support (arrow keys, Enter)
- **Units stepper**:
  - Minus/Plus buttons: Space or Enter to activate
  - Input field: Direct typing, arrow up/down to increment/decrement
- **S/U button**: Space or Enter to toggle
- **Focus indicators**: Visible 2px outline on all interactive elements

### Screen Reader Support

- **Grade dropdown**: `<label>` associated with `<select>`
- **Units stepper**:
  - Minus button: `aria-label="Decrease units"`
  - Input: Labeled with "Units" or university-specific term (MCs, AUs)
  - Plus button: `aria-label="Increase units"`
- **S/U button**:
  - `aria-label="Toggle S/U option"`
  - `aria-pressed="true/false"` for state
- **Course card**: Grouped with `role="group"`, `aria-label="Course X"`

### Visual Accessibility

- All text meets WCAG AA contrast (4.5:1 minimum)
- S/U active state (white on black): 21:1 contrast
- Focus outlines: High contrast, visible on all backgrounds
- Button states use border changes, not just color

---

## Implementation Notes

### Files to Modify

- `/components/course-input.tsx` (or similar) - Main course card component
- `/components/grade-selector.tsx` - Replace grid with dropdown
- `/lib/types/index.ts` - Verify Course interface supports all fields
- Tailwind classes for two-row flex layout

### Edge Cases to Handle

1. **Units at 0**: Disable minus button, exclude from GPA calculation
2. **Empty grade**: Don't calculate GPA for that course
3. **S/U with F grade** (NUS): Valid input (results in U = no credits earned)
4. **Switching universities**: Preserve course data, hide S/U button for NTU/SMU
5. **Very long course names**: Truncate with ellipsis or wrap gracefully

### Browser Compatibility

- Native `<select>` works universally
- Input `type="number"` with `inputmode="numeric"` for mobile
- CSS Flexbox for layout (modern browser support)
- Test on: Safari iOS, Chrome Android, desktop browsers

### Testing Checklist

- [ ] Grade dropdown works on all browsers
- [ ] Units stepper increments/decrements correctly
- [ ] Minus button disables at 0
- [ ] Direct input accepts decimals (3.5, 2.5)
- [ ] S/U button toggles state visually
- [ ] Two-row layout responsive at all breakpoints
- [ ] No awkward wrapping on half-screen MacBook window
- [ ] Touch targets 44x44px minimum on mobile
- [ ] Keyboard navigation works through all controls
- [ ] Screen reader announces all states correctly
- [ ] localStorage persists all data correctly

---

## Success Criteria

1. ✅ Grade selection works smoothly on mobile (native picker)
2. ✅ Course cards maintain consistent two-row layout at all screen sizes
3. ✅ No awkward wrapping or stretching of elements
4. ✅ Units can be adjusted quickly with +/- buttons
5. ✅ S/U toggle is clear and easy to use
6. ✅ All interactive elements are touch-friendly (44x44px minimum)
7. ✅ Keyboard navigation works flawlessly
8. ✅ Meets WCAG AA accessibility standards

---

**This design is validated and ready for implementation.**
