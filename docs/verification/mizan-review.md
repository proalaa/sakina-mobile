# Mizan review verification — issue #2

Open the welcome screen's **مراجعة ميزان · Mizan review** button, or the `/mizan` route. The review starts with Arabic RTL examples. Light, dark, system-theme and Arabic/English controls operate through the existing provider and local review state. Run/reset actions only change labeled examples.

## Automated evidence

- Provider-backed rendered tests cover Arabic display typography, Latin dark-theme tabular numerals and directional isolation, accessible primary/secondary actions, disabled activation, language changes, example run/reset behavior and light/dark navigation colors.
- TypeScript compilation and repository lint checking pass.
- Android Metro/Hermes export succeeds, including the bundled canonical font assets. This proves bundling, not native layout.
- Full Jest suite after the RTL follow-up: 6 suites, 27 tests passed.

## Contrast inspection

Calculated WCAG relative-luminance ratios for the actual foreground/background pairs used in the review:

| Pair                     | Light   | Dark    |
| ------------------------ | ------- | ------- |
| Body on base surface     | 17.81:1 | 15.98:1 |
| Secondary text on canvas | 6.71:1  | 9.17:1  |
| Primary button label     | 9.54:1  | 10.00:1 |
| Pressed primary label    | 12.41:1 | 10.32:1 |
| Secondary button label   | 9.54:1  | 9.22:1  |
| Pressed secondary label  | 8.16:1  | 6.14:1  |

Disabled controls use reduced opacity and explicit disabled accessibility state. Tertiary and feedback palette tokens are exposed but not used for small foreground text in this slice; their presence does not validate every future pairing.

## Native Android visual checks — partially complete

The initial implementation had no configured Android SDK or device available. On 14 October 2026, the SDK and a Samsung SM-G996U running Android 14 were available, with device locale `en-US`.

Native inspection reproduced left-aligned Arabic text while the control rows already followed RTL. The shared Text wrapper now gives each text element its language direction and uses automatic native alignment, preserving centered button labels and isolated numerals. Web retains explicit physical alignment because CSS does not support `text-align: auto`.

Screenshots after the fix confirm Arabic title/body/display text aligns right in light and dark modes; embedded English typography names align left. Switching to English restores left-aligned text and LTR control order. The English numeric section preserves `00:44:12` and `15.3694° N, 44.1910° E`. System-mode selection is visibly distinct from the resolved dark appearance.

These focused checks cover the reported direction bug. Increased font-scale, pressed-state, touch-target measurement and the remaining numeric/action cases below are still pending. Issue #2 remains open until its remaining native acceptance checks are recorded.

Use the same review surface for light/dark and Arabic RTL/Latin LTR cases. Inspect Arabic dots and ascenders at every hierarchy level, numeric colons/degree symbols, wrapping at increased system text size, top/bottom safe areas and the navigation/status bar appearance. Long-press primary/secondary actions to inspect pressed feedback; run/reset the example to inspect disabled feedback and confirm that each target remains at least 48 by 48 logical units. Confirm RTL control order changes immediately without restarting the app, and test Android hardware Back to the welcome screen.

Record device/OS, font scale, inspected cases and observed results here. Native checks validate presentation only; they do not establish location detection or sound suppression behavior.

## Code review

Two independent reviewers examined the complete worktree against starting commit `437761d5d0633e5091e4c911df570438d5d2e4aa`.

**Standards:** No documented-standard breaches or actionable heuristic smells. Existing provider/component conventions, glossary terminology and ADR 0001 source authority are preserved. Generic Mizan components remain independent of mosque-silencing concepts.

**Spec:** No code mismatch or scope creep. Canonical typography, runtime direction, loaded weights, numeric isolation and local run/reset behavior match issue #2. The required Android native visual checks remain an explicitly disclosed verification gap.

Totals: Standards 0 findings; Spec 0 code findings and 1 pending verification requirement.
