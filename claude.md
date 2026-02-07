# Best Practices for SGUniGPA Development

This document outlines best practices for maintaining and extending the SGUniGPA calculator application.

## Project Structure

```
/app              — Next.js app router pages and layouts
/components       — Reusable UI components
/lib/calculators  — University-specific GPA calculation logic
/lib/types        — TypeScript interfaces and types
/lib/storage      — localStorage utilities
/lib/store.ts     — Zustand state management
/docs/plans       — Design documents and implementation plans
```

## Code Organization

### TypeScript Best Practices

1. **Always use strict typing** — No `any` types unless absolutely necessary
2. **Define interfaces in `/lib/types`** — Keep type definitions centralized
3. **Use type inference** where possible to reduce verbosity
4. **Export types from index files** for clean imports

### Component Structure

1. **Client components** — Mark with `"use client"` when using hooks or browser APIs
2. **Server components** — Default for static content and SEO
3. **Props interfaces** — Define above each component for clarity
4. **Accessibility first** — Include ARIA labels and semantic HTML

### State Management

1. **Use Zustand store** (`lib/store.ts`) for global state
2. **Local state** for component-specific UI (forms, modals)
3. **Debounced localStorage** — Save state changes after 500ms delay
4. **Pure calculation functions** — Keep calculator logic separate from UI

## Adding a New University

To add support for a new university:

1. **Update types** (`lib/types/index.ts`):
   ```typescript
   export type University = "NUS" | "NTU" | "SMU" | "NEWUNI";
   ```

2. **Create calculator** (`lib/calculators/newuni.ts`):
   ```typescript
   export const newuniConfig: UniversityConfig = {
     name: "NEWUNI",
     gpaScale: 4.0,
     grades: [...],
     creditLabel: "Credits",
     codeLabel: "Course Code",
     gpaLabel: "GPA",
     passFail: {
       label: "P/F Option",
       passThreshold: 2.0,
     },
   };

   export function calculateNEWUNIGPA(courses: Course[]): CalculatedGPA {
     // Implement calculation logic
   }
   ```

3. **Register in index** (`lib/calculators/index.ts`):
   ```typescript
   case "NEWUNI":
     return newuniConfig;
   ```

4. **Add to selector** (`components/university-selector.tsx`):
   ```typescript
   { id: "NEWUNI", name: "New University" }
   ```

## Styling Guidelines

### Tailwind CSS

1. **Use design tokens** from `tailwind.config.ts`:
   - `bg-background` — Eggshell (#FAF9F6)
   - `text-foreground` — Charcoal (#1A1A1A)
   - `text-secondary` — Gray (#71717A)
   - `border-border` — Light gray (#E5E7EB)
   - `text-accent` — Blue (#0071E3)

2. **Responsive design**:
   - Mobile-first approach
   - Use `sm:`, `md:`, `lg:` breakpoints
   - Ensure min 44px touch targets on mobile

3. **Spacing**:
   - Desktop: 80-120px vertical between sections
   - Mobile: 40-60px vertical between sections
   - Always generous padding around interactive elements

### Animation

1. **Respect `prefers-reduced-motion`**:
   ```typescript
   const prefersReducedMotion = window.matchMedia(
     "(prefers-reduced-motion: reduce)"
   ).matches;
   ```

2. **Smooth transitions**: Use 200ms for UI state changes
3. **GPA animation**: Eased counting animation, instant if reduced motion

## Performance

1. **Minimal bundle size** — Avoid heavy dependencies
2. **Static generation** — Use Next.js SSG where possible
3. **Lazy loading** — Load components only when needed
4. **localStorage caching** — Reduce recalculations

## Accessibility

### Required for all components:

1. **Semantic HTML** — Use `<button>`, `<input>`, `<label>`, etc.
2. **ARIA labels** — For icons and non-obvious controls
3. **ARIA live regions** — For dynamic content (GPA display)
4. **Keyboard navigation** — Tab order, Enter/Space for actions
5. **Focus indicators** — Visible outlines on all focusable elements
6. **Color contrast** — 4.5:1 minimum for body text

### Testing checklist:

- [ ] Tab through entire page without mouse
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Check color contrast ratios
- [ ] Verify reduced motion behavior

## SEO

1. **Metadata** — Keep in `app/layout.tsx`
2. **Structured data** — Use JSON-LD in `components/structured-data.tsx`
3. **Sitemap** — Auto-generated from `app/sitemap.ts`
4. **Robots.txt** — Configured in `app/robots.ts`
5. **Performance** — Target 90+ Lighthouse score

## Testing

### Manual testing checklist:

1. **Calculator accuracy**:
   - [ ] Verify GPA calculations against official calculators
   - [ ] Test S/U option (NUS only)
   - [ ] Test edge cases (all S/U, no courses, etc.)

2. **Data persistence**:
   - [ ] Add courses, reload page
   - [ ] Switch universities with data
   - [ ] Clear data and verify reset

3. **Responsive design**:
   - [ ] Test on mobile (iOS Safari, Chrome)
   - [ ] Test on tablet
   - [ ] Test on desktop

4. **Browser compatibility**:
   - [ ] Chrome
   - [ ] Safari
   - [ ] Firefox
   - [ ] Edge

## Common Pitfalls

1. **Don't enforce S/U limits** — Calculator should allow any number
2. **Handle localStorage failures** — Graceful fallback to in-memory
3. **Validate credit inputs** — Must be positive numbers
4. **Round GPA to 2 decimals** — For display consistency
5. **Clear confirmation** — Always confirm destructive actions

## Git Workflow

1. **Commit often** — Small, focused commits
2. **Clear messages** — Describe what and why
3. **Test before commit** — Run `npm run build`
4. **No generated files** — Keep `.next/`, `node_modules/` out of git

## Deployment (Vercel)

1. **Environment**: Production uses `main` branch
2. **Build command**: `npm run build`
3. **Output directory**: `.next`
4. **Node version**: 20.x or later
5. **Environment variables**: None required (client-side only)

## Future Enhancements

Ideas for v2+ (not in current scope):

- [ ] Semester/term organization
- [ ] Grade prediction / "what-if" scenarios
- [ ] Target GPA calculator
- [ ] Export to PDF
- [ ] Cloud sync (requires backend)
- [ ] Transcript upload / OCR
- [ ] Mobile app (PWA)
- [ ] More universities (international)

## Support

For bugs or feature requests:
- GitHub Issues: https://github.com/[username]/sgunigpa/issues

---

**Last updated**: 2026-02-08
