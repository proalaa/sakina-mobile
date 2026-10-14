# Tamagui and Mizan Integration Implementation Plan

> **For agentic workers:** Implement task-by-task in this session. Keep the changes limited to the configuration, provider seam, verification, and usage documentation.

**Goal:** Configure Tamagui as a future implementation foundation while Mizan remains the sole source of design tokens and Sakina remains the source of effective theme selection.

**Architecture:** Add a typed adapter that projects the existing Mizan Core and Sakina Theme values into Tamagui tokens and `light`/`dark` themes. Nest `TamaguiProvider` at the existing Expo Router root and pass the current effective theme from `useAppTheme`; do not add a preference store or migrate existing components.

**Tech Stack:** Expo SDK 55, React Native 0.83, React 19, TypeScript, Tamagui v3, Jest, React Native Testing Library.

**Spec:** GitHub issue [#7](https://github.com/proalaa/sakina-mobile/issues/7), plus ADR 0001 and ADR 0002.

## Global Constraints

- Mizan is the single source of truth for reusable design tokens.
- Preserve Sakina's existing persisted and system-fallback theme selection, locale, RTL behavior, and components.
- Do not create components or introduce a parallel theme preference mechanism.
- Support iOS, Android, and web with the current Expo setup.
- Document how future components consume Tamagui and when Mizan can be extended.

## Review Focus

- A light/dark selection change must reach Tamagui through the existing provider state.
- Mapping must derive values from Mizan modules rather than repeat token literals.
- Arabic and English font families and direction must not gain LTR assumptions in the adapter.
- The root provider must leave the existing navigation and Sakina providers functional.
- Configuration must avoid importing default palettes that establish a second token authority.

---

### Task 1: Add Tamagui token and theme adapter

**Files:**
- Create: `src/theme/tamagui.config.ts`
- Test: `src/theme/tamagui.config.test.ts`
- Modify: `package.json`, `pnpm-lock.yaml`

**Interfaces:**
- Export the created Tamagui config and its inferred type.
- Map Mizan Core colors, spacing, radii, typography, and elevation, plus Sakina semantic theme colors, by referencing the current theme modules.

- [ ] Write focused tests for token values, light/dark semantic theme values, and category completeness.
- [ ] Run the focused test and confirm it fails because the adapter is absent.
- [ ] Add compatible Tamagui runtime/config packages and implement the adapter without default palette values.
- [ ] Run the focused test and TypeScript compile.

### Task 2: Connect the current theme provider to Tamagui

**Files:**
- Modify: `src/app/_layout.tsx`
- Test: `src/theme/tamagui-provider.test.tsx`

**Interfaces:**
- Root app reads `themeContext` from `useAppTheme()` and supplies the matching `light` or `dark` name to `TamaguiProvider`.
- Existing theme selection remains the only preference mechanism.

- [ ] Write a provider-boundary test that renders under light and dark Sakina themes and reads Tamagui's effective theme values.
- [ ] Run it and confirm it fails because Tamagui is not connected.
- [ ] Add the provider at the root boundary without changing child components or navigation behavior.
- [ ] Run the focused tests and TypeScript compile.

### Task 3: Document use and verify platform configuration

**Files:**
- Create: `docs/design/tamagui-integration.md`
- Modify: `babel.config.js`, `metro.config.js`, or Expo config only if the installed compatible Tamagui setup requires them.

- [ ] Document the token/theme adapter, provider boundary, locale/font and RTL expectations, and design-led rules for future Mizan extensions.
- [ ] Run lint, the full test suite, and the web production export.
- [ ] Check native configuration/build feasibility for iOS and Android; record device-only RTL/visual checks as pending if no target is available.
- [ ] Review the final diff against issue #7 and commit the implementation.
