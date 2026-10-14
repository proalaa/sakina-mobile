# Shared Components on Tamagui Design

## Goal

Move Sakina's shared presentation components to Tamagui primitives internally while retaining the existing component APIs and application behavior. This makes Tamagui the implementation foundation for future design-driven components without introducing a second design system.

## Context

The app already has a Tamagui core configuration and provider. `src/theme/tamagui.mapping.ts` maps Mizan Core tokens and Sakina Theme values into Tamagui; the existing `ThemeProvider` still owns the theme preference and feeds the effective light or dark mode to `SakinaTamaguiProvider`.

Shared components currently combine React Native primitives with Sakina behavior such as translated copy, language-specific typography, RTL layout, safe-area handling, keyboard handling, accessibility, and native system bars. The conversion must preserve those responsibilities in the wrapper components.

## Scope

Convert the shared presentation layer in component families:

- Text and text-bearing components: `Text`, `Button`, `Card`, `EmptyState`, `Header`, and `ListItem`.
- Layout and form components: `Screen`, `TextField`, `Icon`, `PressableIcon`, and the shared `Toggle` with `Checkbox`, `Radio`, and `Switch`.
- Mizan presentation components: `MizanStatusIndicator`, `MizanReviewSection`, and Sakina wrappers that compose them.

Use the corresponding Tamagui primitives internally where they fit: text and layout primitives, pressable/button primitives, input primitives, and styled containers. Keep React Native or platform-specific primitives at the seam where Tamagui does not replace their responsibility, including keyboard-aware scrolling, safe-area/system-bar integration, image rendering, and animation.

`AutoImage`, icon asset resolution, and `ErrorBoundary` are utility/platform concerns and are not being converted as part of the shared presentation migration. No new UI component is introduced and no consumer is migrated to a new API.

## Design constraints

- Mizan remains the single source of truth for color, spacing, radii, typography, and elevation. Tamagui config consumes the existing mappings; component implementations must not add parallel token values or new theme tables.
- The existing theme preference and `ThemeProvider` remain authoritative. `SakinaTamaguiProvider` continues to receive effective light/dark state from `useAppTheme`.
- Preserve current props, refs, callbacks, style override behavior, accessibility roles/state, and component composition contracts.
- Preserve translation lookup and language overrides. Arabic and English typography continues to resolve through the current Mizan typography mapping.
- Preserve RTL behavior, including language review surfaces and any explicit LTR isolation for numeric content.
- Preserve native keyboard avoidance, safe-area behavior, navigation integration, and system-bar configuration.
- Keep the integration on `@tamagui/core`; do not add the full Tamagui component package, compiler, or a second preference mechanism.

## Migration approach

Convert one component family at a time, beginning with the core `Text` and layout wrappers that other components compose, then interactive components, then higher-level Mizan compositions. Maintain the public wrapper as the place for localization, theme adaptation, semantics, and compatibility. Use Tamagui's existing theme context and mapped tokens inside each wrapper.

When a required behavior cannot be expressed by a Tamagui primitive without changing a public contract or native behavior, retain the narrow React Native primitive for that behavior and document the seam. Avoid broad consumer rewrites and unrelated visual redesign.

## Acceptance criteria

- Every in-scope shared presentation component uses Tamagui primitives for its applicable presentation layer while preserving its existing public API.
- A preference change through the existing Sakina theme flow propagates to Tamagui, and representative rendered components resolve the correct light and dark Mizan/Sakina values.
- English LTR and Arabic RTL output remain correct, including text variants, controls, and numeric isolation.
- Existing callbacks, disabled/pressed states, accessibility semantics, refs, style overrides, screen scrolling, keyboard behavior, safe areas, and system bars remain intact.
- No duplicate token definitions, theme preference state, or unnecessary Tamagui dependencies are introduced.
- Build, lint, and relevant component tests pass; native visual checks cover representative Arabic/English and light/dark states where a device is available.

## Risks and response

Tamagui primitives may differ from React Native in event, style, ref, text measurement, and accessibility details. Preserve the wrapper API, migrate in small families, and check rendered behavior at each family boundary. Tamagui may not cover certain native services; keep those services at the existing native seams.

## Out of scope

- New screen designs or components based on Sketch/Figma.
- Replacing the existing theme preference, localization system, or RTL system.
- A full Tamagui package/compiler adoption.
- Changes to utility components unrelated to shared presentation.
