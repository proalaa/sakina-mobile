# Mizan Design System and Sakina Theme

## Source authority

- Functional requirements: [`docs/products/MVP.md`](../docs/products/MVP.md).
- Canonical reusable tokens and Core/Theme architecture: [restored Mizan v1.0](reference/stitch_mosque_silencer_design_system/mizan_design_system_design.md_v1.0_restored.md).
- Approved screen composition: [`design/screens/`](screens/). These references contain illustrative content; their metrics and implementation choices are not evidence of validated behavior.
- Decision: [ADR 0001](../docs/adr/0001-design-source-authority.md).

The canonical reference takes precedence over conflicting colors, typography, spacing, and radii previously present in this document or the screen HTML. This document describes their application. Values below are drawn from the canonical reference.

## Architecture and voice

**Mizan Core** contains reusable visual foundations and mobile components with Arabic-first, bidirectional ergonomics. **Sakina Theme** applies them to mosque silencing, prayer windows, session status, and diagnostic views.

Sakina uses quiet, precise language and restrained surfaces. Avoid gamification and decorative metrics. Status copy must distinguish monitoring, detected mosque proximity, applied sound restriction, unavailable prerequisites, and unverified experimental behavior. A nearby location event alone must not be described as proven physical entry.

## Color tokens

| Role | Light | Dark |
|---|---|---|
| Canvas | `#F8FAF9` | `#0A100D` |
| Base surface | `#FFFFFF` | `#121A16` |
| Subtle surface | `#F1F5F3` | `#1A2420` |
| Elevated surface | `#FFFFFF` | `#222F2A` |
| Hover surface | `#E8EFEA` | `#2B3B34` |
| Subtle border | `#E5EBE7` | `#1E2B25` |
| Strong border | `#CCD7D0` | `#2D3F36` |
| Focus border | `#184E3F` | `#34D399` |
| Primary text | `#0F1A15` | `#EDF5F1` |
| Secondary text | `#4A5D54` | `#A3B8AE` |
| Tertiary text | `#7A8F85` | `#687D73` |
| Inverse text | `#FFFFFF` | `#0A100D` |
| Brand text / primary brand | `#184E3F` | `#34D399` |
| Primary hover | `#123B2F` | `#2DD4BF` |
| Secondary brand | `#3A7D69` | `#20725C` |
| Secondary tint | `#E8F3EE` | `#132A22` |
| Brand accent | `#0D9488` | `#5EEAD4` |
| Success / subtle | `#16A34A` / `#DCFCE7` | `#22C55E` / `#052E16` |
| Warning / subtle | `#D97706` / `#FEF3C7` | `#F59E0B` / `#451A03` |
| Error / subtle | `#DC2626` / `#FEE2E2` | `#EF4444` / `#450A0A` |
| Information / subtle | `#0284C7` / `#E0F2FE` | `#38BDF8` / `#082F49` |

Use semantic roles when expressing status. Color must be accompanied by readable text or another indicator. Check contrast for the actual foreground/background pairing before treating a component as accessible.

## Typography

Arabic uses IBM Plex Sans Arabic, with Alexandria or Tajawal as fallbacks. Latin uses IBM Plex Sans or Inter. Use tabular lining figures for changing numerical displays.

When the selected Arabic fallback lacks a canonical weight, use its nearest available face while preserving the hierarchy. The bundled Tajawal set provides 400, 500, and 700; `display-sm` uses Tajawal 700 as the closest available face to canonical 600 semibold. This substitution is specific to the current bundled font set.

| Token | Arabic size / line height | Latin size / line height | Weight |
|---|---|---|---|
| `display-lg` | 32 / 44 | 32 / 40 | 700 |
| `display-sm` | 24 / 36 | 24 / 32 | 600 |
| `headline` | 20 / 30 | 20 / 28 | Medium / semibold |
| `body-lg` | 16 / 26 | 16 / 24 | 400 |
| `body-sm` | 14 / 22 | 14 / 20 | Regular / medium |
| `label-md` | 13 / 20 | 13 / 18 | 500 |
| `caption` | 11 / 18 | 11 / 16 | 400 |

Retain sufficient vertical space for Arabic glyphs. Numeral localization is distinct from text direction. Isolate dynamic times, coordinates, and mixed-direction content using the canonical reference's bidirectional guidance.

## Spacing, shapes, and elevation

Spacing follows the reference's 4-unit cadence: `space-1` 4, `space-2` 8, `space-3` 12, `space-4` 16, `space-5` 20, `space-6` 24, `space-8` 32, and `space-12` 48. Preserve approved screen composition using this scale.

| Radius token | Value | Typical use |
|---|---|---|
| `radius-sm` | 6 | Small tags |
| `radius-md` | 10 | Buttons, fields, segmented controls |
| `radius-lg` | 16 | Cards and grouped rows |
| `radius-xl` | 24 | Sheets and prominent status modules |
| `radius-full` | 9999 | Circular controls and pill status chips |

Use the canonical `elevation-0`, `elevation-1`, `elevation-2`, and `elevation-modal` definitions. Prefer restrained tonal separation and borders; avoid heavy decorative blur and shadows. Respect top and bottom system insets. Every interactive surface requires a minimum 48 by 48 touch target, including compact visible controls.

## Reusable component guidance

- **Buttons:** Clear primary and secondary hierarchy. A session stop or resume action describes its effect on the app's restriction, preserving other user-enabled restrictions.
- **Status chips:** Pair a dot or symbol with explicit text. Show active silence only when the restriction has actually been applied.
- **Prayer rows:** Use start/end alignment, an adequate touch target, and a distinct current-window treatment. Prayer-window eligibility and maximum session duration are separate concepts.
- **Status cards:** Group the relevant proximity/session state and available actions without presenting experimental geofence radius or sound-engine selection as established product settings.
- **Permission callouts:** Explain missing required capabilities and their effect on automation. Refer to DND access only if the validated sound mechanism requires it.
- **Settings groups:** Expose the agreed controls, including outside-window silencing and continuation after window close, both enabled by default, and Start on Device Boot, off by default. Use the MVP brief for the complete settings semantics.
- **Diagnostics:** Show real observations and explicitly identify unavailable results. Keep testing logs local as required by the MVP.

## Bidirectional behavior

Use start/end layout properties. Mirror directional navigation symbols while leaving universal symbols such as volume, battery, and location unchanged. Follow the canonical reference's RTL switch-thumb positioning and keep its visible 44 by 24 track inside the minimum touch target. Isolate countdowns, coordinates, and mixed-script labels to prevent direction changes from rearranging punctuation.
