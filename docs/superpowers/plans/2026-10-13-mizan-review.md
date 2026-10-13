# Mizan review surface implementation plan

**Goal:** Implement issue #2, “Show Mizan typography and actions in a themed review surface.”

**Architecture:** Extend the existing ThemeProvider and Text/Button interfaces compatibly. Generic Mizan tokens live in `src/theme`; example copy and state live in a review screen, with a reusable section container for subsequent compositions.

**Tech stack:** React Native, Expo Router, TypeScript, Jest and React Native Testing Library.

**Spec:** GitHub issue #2 and `docs/specs/mizan-core-sakina-theme.md`. Execute inline on the current branch as requested by the implement skill.

## Constraints

- Restored Mizan v1.0 governs tokens; ADR 0001 governs source precedence.
- Preserve startup font-loading, i18n, safe-area and keyboard boundaries.
- Preserve starter theme keys and component props.
- Use IBM Plex Sans Arabic and Inter, with bundled regular/medium/semibold/bold weights.
- All actions change labeled local examples only; no device permissions or automation.
- Confirmed seam: public rendered Text/Button/review components under ThemeProvider. No private token-helper tests or new end-to-end suite.

## 1. Render canonical typography in both themes

- [x] Add a failing rendered Text test using `variant="display-lg" language="ar"`, expecting 32/44 typography and the canonical font/color.
- [x] Add full semantic color palettes, spacing, radii, elevation and Arabic/Latin typography in `src/theme/mizan.ts`; extend `Theme` and both theme objects.
- [x] Load canonical fonts through `customFontsToLoad`; extend Text with optional variant/language/numeric props, preserving existing presets.
- [x] Run `pnpm test --runInBand src/components/Text.test.tsx` and `pnpm compile`.

## 2. Render working accessible actions

- [x] Add a failing provider-backed Button test for primary/secondary actions, disabled state and 48-unit targets.
- [x] Extend Button presets with primary/secondary semantic styles and canonical typography; retain accessory and override support.
- [x] Verify disabled actions cannot run and pressed state has visible feedback.
- [x] Run the focused component tests and typechecking.

## 3. Provide a reachable review surface

- [x] Add a failing rendered review-screen test: switch Arabic/Latin, change theme, run/reset an example, and observe selected/disabled states.
- [x] Add `MizanReviewScreen`, a shared `MizanReviewSection` container and a `/mizan` route linked from the welcome screen.
- [x] Demonstrate the full hierarchy, isolated times/coordinates and primary/secondary/disabled actions with local example state.
- [x] Resolve navigation and native system backgrounds from the application theme.
- [x] Run focused tests, `pnpm compile`, `pnpm lint:check`, and the full Jest suite once.
- [x] Check Android availability and record native visual results or the exact pending limitation in `docs/verification/mizan-review.md`.
- [x] Review changes against the starting commit `437761d5d0633e5091e4c911df570438d5d2e4aa` on standards and spec axes, fix findings, then commit to the current branch.
