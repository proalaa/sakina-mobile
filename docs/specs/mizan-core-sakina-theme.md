## Problem Statement

Sakina users need a calm, readable, Arabic-first interface that accurately communicates mosque proximity and sound suppression. The current application still presents the Ignite welcome screen, starter colors, and Space Grotesk typography. Its reusable components do not implement the Mizan Design System.

Contributors also face conflicting sources: approved screen references contain local palettes, radii, controls, and illustrative diagnostic results that differ from the canonical Mizan reference and the agreed MVP. Copying those references literally would create inconsistent components and imply capabilities that have not been validated.

## Solution

Implement the Mizan Design System as reusable Mizan Core foundations and components, with a separate Sakina Theme for mosque-silencing presentation. Apply the source-authority decision consistently: restored Mizan v1.0 governs reusable tokens and Core/Theme architecture; approved screen references govern composition; the MVP brief governs functional behavior and factual claims.

Provide a reviewable in-app presentation surface demonstrating the reusable components and representative Sakina compositions in Arabic RTL and Latin LTR, in light and dark modes. Demonstration states must be identified as examples and must not enable automation or present synthetic data as measured device behavior. This issue establishes the presentation foundation; production screen workflows and Android automation are separate work.

## User Stories

1. As an Arabic-speaking Sakina user, I want an Arabic-first visual language, so that the interface feels natural and remains readable.
2. As a Latin-script Sakina user, I want equivalent typography and layout support, so that I can use the same interface comfortably.
3. As a Sakina user, I want consistent light and dark appearances, so that information remains legible in different environments.
4. As a Sakina user, I want familiar visual hierarchy across screens, so that I can identify primary information and actions quickly.
5. As a Sakina user, I want readable Arabic glyphs with sufficient line height, so that captions and descriptions are not clipped.
6. As a Sakina user, I want stable countdown digits, so that changing times do not distract me with shifting alignment.
7. As a Sakina user, I want times and coordinates to retain their punctuation in RTL layouts, so that I can interpret them correctly.
8. As a Sakina user, I want controls with at least 48 by 48 touch targets, so that compact controls remain easy to operate.
9. As a Sakina user, I want the switch thumb to remain visible in either text direction, so that its state is unambiguous.
10. As a Sakina user, I want directional navigation symbols to follow the layout direction, so that navigation feels predictable.
11. As a Sakina user, I want universal symbols such as location and battery to remain recognizable, so that mirroring does not change their meaning.
12. As a Sakina user, I want status text alongside status colors, so that I do not need color perception to understand a state.
13. As a Sakina user, I want visible feedback for disabled and pressed controls, so that I understand whether an action is available.
14. As a Sakina user using assistive technology, I want controls to expose meaningful names, roles, and states, so that I can operate them confidently.
15. As a Sakina user, I want content to respect system insets and increased text size, so that important information and controls remain accessible.
16. As a Sakina user, I want monitoring to be visually distinct from an active silencing session, so that I know whether sound suppression has actually been applied.
17. As a Sakina user, I want mosque proximity to be described accurately, so that I do not mistake a detected location for proof of physical entry.
18. As a Sakina user, I want unavailable prerequisites to be explained, so that I understand why enabled automation cannot operate.
19. As a Sakina user, I want prayer activation windows and maximum session duration to have distinct labels, so that I understand their different purposes.
20. As a Sakina user, I want Stop and Resume this visit to describe their intended effects clearly, so that I understand control over the app's restriction.
21. As a Sakina user, I want manual-override and timeout examples to explain same-episode restart blocking, so that the presentation does not suggest automatic reactivation.
22. As a Sakina user, I want settings presentation to reflect the agreed defaults and dependencies, so that mockup controls do not mislead me about intended behavior.
23. As a Sakina user, I want next-session settings to carry Applies next session guidance, so that I understand when changes are intended to take effect.
24. As a Sakina user, I want missing prayer information to be marked unavailable, so that sample values are not mistaken for usable local data.
25. As a Sakina user, I want unmeasured diagnostic results to be identified as untested or unavailable, so that I do not mistake a design illustration for verification.
26. As a Sakina user, I want detection timing and sound-application timing to remain distinguishable, so that latency presentation communicates what was actually measured.
27. As a contributor, I want one canonical set of semantic tokens, so that screens share colors, spacing, typography, radii, and elevation.
28. As a contributor, I want Mizan Core to remain independent of mosque-silencing concepts, so that its components can be reused across applications.
29. As a contributor, I want Sakina Theme to compose reusable primitives, so that application-specific status and settings presentations stay consistent.
30. As a contributor, I want clear source precedence when references conflict, so that I can resolve discrepancies without inventing a new design direction.
31. As a reviewer, I want a single presentation surface covering themes, directions, and important states, so that I can assess the implementation efficiently.
32. As a reviewer, I want approved screen hierarchy preserved while conflicting tokens and claims are reconciled, so that composition remains recognizable and credible.

## Implementation Decisions

- Scope is the Mizan Core and Sakina Theme presentation foundation inferred from the supplied glossary and design-source ADR. The glossary already defines the domain vocabulary, and the ADR is an accepted constraint rather than a decision to reopen.
- Preserve the existing React Native, Expo Router, TypeScript, theme-provider, and themed-style architecture where practical. The reference's mention of NativeWind does not require adopting a new styling framework.
- Extend the existing public theme interface to expose semantic canvas, surface, border, text, brand, and feedback roles, plus spacing, typography, radii, and elevation. Light and dark themes expose the same roles. Navigation and system surfaces must use the resolved application theme consistently.
- Mizan Core owns generic visual tokens and reusable text, button, switch, field, card, grouped-row, status-indicator, and permission-callout primitives. It must not depend on mosque proximity, prayer schedules, or Android sound mechanisms. Reuse and adapt existing primitives before introducing replacements.
- Sakina Theme owns domain-specific composition and copy, including proximity/session status, prayer-window rows, settings groups, and diagnostic result presentation. It consumes Mizan Core instead of duplicating token definitions.
- Use the full restored Mizan v1.0 semantic palette for both modes. Representative anchors are light canvas #F8FAF9 and primary brand #184E3F, and dark canvas #0A100D and primary brand #34D399. Screen-local palettes do not override these roles.
- Use the canonical spacing scale of 4, 8, 12, 16, 20, 24, 32, and 48 logical units; radii of 6, 10, 16, 24, and 9999; and the reference's restrained elevation definitions translated into supported native styles. Approved composition determines grouping and hierarchy, with reusable geometry reconciled to canonical tokens.
- Arabic typography uses IBM Plex Sans Arabic, with Alexandria or Tajawal as documented fallbacks; Latin typography uses IBM Plex Sans or Inter. Bundle/load the chosen font weights through the existing startup lifecycle. Use canonical Arabic and Latin size/line-height pairings and tabular figures for changing numeric displays.
- Use logical start/end alignment and directional isolation for mixed-script values. Mirror directional navigation icons only. The visible switch uses a 44 by 24 track and 18 by 18 thumb, with three-unit edge offsets and direction-aware state movement, inside a minimum 48 by 48 interactive wrapper.
- Check actual foreground/background contrast and readable state indicators; a token's presence in the canonical palette alone does not prove an accessible pairing. Support accessible control names, roles, disabled/checked states, text scaling, and system safe areas.
- Representative compositions cover status, prayer windows, settings/privacy, and Android diagnostics. Preserve their approved structural hierarchy while removing or adapting contradictions such as account/profile affordances, user-facing experimental radius setup, sound-engine selection, and fabricated pass rates.
- Presentation distinguishes automation off, monitoring, valid mosque proximity, actually applied sound suppression, unavailable prerequisites, and restart-blocked states. A proximity episode is not proven attendance. Sound suppression does not imply blocking calls/messages or hiding notifications.
- Settings examples reflect automation initially off; Silence outside prayer windows and Continue silencing after the prayer window closes initially on; Start on Device Boot initially off. The continuation setting becomes inactive with an explanation in mosque-presence mode while retaining its represented value.
- Timing examples reflect ordinary prayer offsets of 15 minutes before/45 after, Friday offsets of 30 before/60 after anchored to local Dhuhr, offsets from 0–120 in five-minute steps, and a 60-minute maximum session duration customizable from 20–180 in five-minute steps. These examples document presentation contracts, not implementation of eligibility or persistence.
- Demonstration actions may change local example presentation state. They must remain visibly identified as demonstrations and must not request background permissions, discover live mosques, change device sound settings, or pretend to execute real diagnostics.
- No new backend, schema, network API, sound-service interface, or automation state machine is required for this issue. Keep example data at the presentation boundary and avoid designing speculative service abstractions.

## Testing Decisions

- Confirmed primary seam: rendered component tests under the existing ThemeProvider, using public component and representative-composition interfaces, complemented by native visual checks on Android. Keep testing focused on critical components and theme consistency through this single existing boundary; do not add private token-helper tests, per-screen test harnesses, or new service seams.
- Extend the existing Jest and React Native Testing Library pattern used by the themed Text component test. Test externally observable text, accessible names/roles/states, control interactions, and conditional explanations. Tests must fail when the displayed behavior is wrong, rather than merely restating component implementation.
- Prioritize critical text, button, switch, and status/settings presentation in the shared provider-backed render setup. Use representative light/dark and Arabic RTL/Latin LTR cases to catch theme inconsistencies without exhaustively testing every primitive or every composition. Verify meaningful checked/disabled states, key demonstration callbacks, and that proximity alone is not presented as applied sound suppression.
- Cover the critical conditional presentation: settings dependencies and Applies next session guidance, unavailable/untested information, and same-proximity-episode restart-block copy. Prefer representative assertions over duplicating coverage across every screen. Do not infer correctness of the automation engine from these tests.
- Perform native visual checks on Android using the same review surface, focused on critical components and consistency across light/dark themes and RTL/LTR directions. Inspect font clipping, visual hierarchy, contrast, text scaling, safe areas, touch targets, mixed-direction punctuation, and RTL switch-thumb placement. Jest mocks cannot prove these native visual properties.
- Compare composition to approved screen references and reusable styling to restored Mizan v1.0. Resolve intentional differences through the source-authority rules rather than copying conflicting mockup values into visual baselines.
- Run TypeScript compilation, lint checking, and relevant component tests during implementation. Existing Maestro setup has a shared startup helper but no product flows; a new end-to-end suite is not a prerequisite for this presentation foundation.
- Physical-device sound suppression, proximity accuracy, latency, battery consumption, and recovery remain separate feasibility experiments. No design or component test establishes those capabilities.

## Out of Scope

- Implementing production screen workflows, prayer-window eligibility, session deadlines, same-episode restart blocking, or persistent automation preferences.
- Live mosque discovery, provider selection, travel refresh, offline data caches, location/background services, sound-mode selection, device sound changes, boot recovery, and diagnostic log collection/export/deletion.
- Declaring device validation, reliable physical-entry detection, guaranteed five-second activation, guaranteed 30-second release, validated battery safety, or verified diagnostic pass rates.
- Microphone/audio AI, accounts, social features, other silent venues, cloud travel history, city selection, and experimental radius or sound-engine setup controls.
- Changing the approved source-authority decision, creating a new visual direction, converting reference HTML into a production website, or publishing a standalone design-system package.

## Further Notes

- Source documents: the root domain glossary; ADR 0001, Separate reusable Mizan tokens from approved screen composition; the restored Mizan v1.0 reference; the applied Mizan/Sakina design guide; approved screen references; and the working MVP brief dated 13 October 2026.
- Current codebase evidence: an Ignite welcome route, light/dark ThemeProvider, starter reusable components, Space Grotesk loading, and a provider-backed Text component test. No mosque-silencing implementation or on-device validation is established by these sources.
- The MVP's next product milestone is the feasibility experiment. This presentation issue does not authorize live mosque automation or replace the required evidence gathering.
- Acceptance requires a reviewable surface showing reusable Mizan styling, both theme modes and text directions, recognizable approved composition, accurate domain terminology, and explicitly identified demonstration/unavailable states.
