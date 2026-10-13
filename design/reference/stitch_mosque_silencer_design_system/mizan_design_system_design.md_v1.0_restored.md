# Mizan Design System (نظام ميزان للتصميم) — الإصدار الأصلي (v1.0 المحدث بإصلاح مفتاح RTL)
**Production-Grade Arabic-First Mobile Design System & "Sakina" (سكينة) Mosque Automation Theme**
*Target Implementation: React Native + Expo + NativeWind / TypeScript*

---

## 1. Executive Summary & Design Architecture

Mizan is a dual-layered, production-ready design architecture:
1. **Mizan Core (ميزان العام)**: Universal, industry-agnostic mobile primitives, tokens, and components with native RTL-first ergonomics, rigorous 4px spacing rhythm, WCAG 2.2 AA contrast compliance, and React Native / Android 14 parity.
2. **Sakina Theme (سمة سكينة)**: Application-specific sensory layer for autonomous mosque silence management, prioritizing serenity, high-trust transparency, precise location status, and prayer-window diagnostics.

---

## 2. Design Tokens Architecture (Original v1.0 Palette)

### 2.1 Color Tokens & Semantics

```json
{
  "theme": {
    "light": {
      "color": {
        "canvas": "#F8FAF9",
        "surface": {
          "base": "#FFFFFF",
          "subtle": "#F1F5F3",
          "elevated": "#FFFFFF",
          "hover": "#E8EFEA"
        },
        "border": {
          "subtle": "#E5EBE7",
          "strong": "#CCD7D0",
          "focus": "#184E3F"
        },
        "text": {
          "primary": "#0F1A15",
          "secondary": "#4A5D54",
          "tertiary": "#7A8F85",
          "inverse": "#FFFFFF",
          "brand": "#184E3F"
        },
        "brand": {
          "primary": "#184E3F",
          "primary-hover": "#123B2F",
          "secondary": "#3A7D69",
          "secondary-tint": "#E8F3EE",
          "accent": "#0D9488"
        },
        "feedback": {
          "success": "#16A34A",
          "success-subtle": "#DCFCE7",
          "warning": "#D97706",
          "warning-subtle": "#FEF3C7",
          "error": "#DC2626",
          "error-subtle": "#FEE2E2",
          "info": "#0284C7",
          "info-subtle": "#E0F2FE"
        }
      }
    },
    "dark": {
      "color": {
        "canvas": "#0A100D",
        "surface": {
          "base": "#121A16",
          "subtle": "#1A2420",
          "elevated": "#222F2A",
          "hover": "#2B3B34"
        },
        "border": {
          "subtle": "#1E2B25",
          "strong": "#2D3F36",
          "focus": "#34D399"
        },
        "text": {
          "primary": "#EDF5F1",
          "secondary": "#A3B8AE",
          "tertiary": "#687D73",
          "inverse": "#0A100D",
          "brand": "#34D399"
        },
        "brand": {
          "primary": "#34D399",
          "primary-hover": "#2DD4BF",
          "secondary": "#20725C",
          "secondary-tint": "#132A22",
          "accent": "#5EEAD4"
        },
        "feedback": {
          "success": "#22C55E",
          "success-subtle": "#052E16",
          "warning": "#F59E0B",
          "warning-subtle": "#451A03",
          "error": "#EF4444",
          "error-subtle": "#450A0A",
          "info": "#38BDF8",
          "info-subtle": "#082F49"
        }
      }
    }
  }
}
```

---

## 3. Typography Hierarchy (Arabic & Latin Pairings)

- **Primary Arabic Typeface**: `IBM Plex Sans Arabic` (Fallback: `Alexandria` / `Tajawal`)
  - Evaluated for optical clarity, tall x-height, distinct dots (*nuqat*), and balanced horizontal baseline distribution in both small mobile captions and prominent display numerals.
- **Latin Complement**: `IBM Plex Sans` / `Inter`
- **Numeral Rendering**: Tabular lining figures (`tnum`) for timers, prayer countdowns, and geofence coordinates.

| Token | Arabic Size / Line Height | Latin Size / Line Height | Weight | Usage |
|---|---|---|---|---|
| `display-lg` | 32px / 44px (1.37) | 32px / 40px (1.25) | Bold (700) | Hero metrics, active status statement |
| `display-sm` | 24px / 36px (1.50) | 24px / 32px (1.33) | SemiBold (600) | Screen primary headers |
| `headline` | 20px / 30px (1.50) | 20px / 28px (1.40) | Medium / SemiBold | Card titles, sectional groupings |
| `body-lg` | 16px / 26px (1.62) | 16px / 24px (1.50) | Regular (400) | Primary narrative, setting descriptions |
| `body-sm` | 14px / 22px (1.57) | 14px / 20px (1.42) | Regular / Medium | Secondary list rows, explanatory notes |
| `label-md` | 13px / 20px (1.53) | 13px / 18px (1.38) | Medium (500) | Interactive controls, tabs, chip pills |
| `caption` | 11px / 18px (1.63) | 11px / 16px (1.45) | Regular (400) | Telemetry logs, timestamps, micro-metadata |

---

## 4. Spacing, Elevation & Radii Scales

### 4.1 Spacing Scale (4px Base)
- `space-1`: 4px (micro-gaps, badge padding)
- `space-2`: 8px (icon-to-text spacing, chip padding)
- `space-3`: 12px (inner card compact padding)
- `space-4`: 16px (standard component padding, screen horizontal gutters)
- `space-5`: 20px (card body padding)
- `space-6`: 24px (section gaps, header bottom margins)
- `space-8`: 32px (macro section boundaries)
- `space-12`: 48px (minimum accessible touch target dimension)

### 4.2 Radii Scale
- `radius-sm`: 6px (micro tags, tooltips)
- `radius-md`: 10px (buttons, input fields, segmented control pills)
- `radius-lg`: 16px (standard content cards, list item groups)
- `radius-xl`: 24px (bottom sheet modal top bounds, prominent state banners)
- `radius-full`: 9999px (circular icon buttons, live state pill chips)

### 4.3 Elevation & Android 14 Shadows
- `elevation-0`: Flat with hairline border `1px solid var(--border-subtle)`
- `elevation-1`: `box-shadow: 0 1px 3px rgba(15, 26, 21, 0.05), 0 1px 2px rgba(15, 26, 21, 0.03)`
- `elevation-2`: `box-shadow: 0 4px 12px -2px rgba(15, 26, 21, 0.08), 0 2px 6px -1px rgba(15, 26, 21, 0.04)`
- `elevation-modal`: `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)`

---

## 5. Bidirectional (RTL / LTR) & RTL Switch Engineering Fix

### 5.1 RTL Switch Implementation Fix
In v1.0, standard `transform: translateX(20px)` caused the thumb to disappear or clip off track in RTL layouts.
The standardized fix preserves the original visual styling while ensuring correct logical positioning:
- Track: Width `44px`, Height `24px`, Border-radius `9999px`.
- Thumb: `18px × 18px`, Border-radius `50%`.
- In LTR:
  - Inactive: Thumb positioned at `left: 3px` (or `margin-inline-start: 3px`).
  - Active: Thumb transitions to `left: 23px` (`transform: translateX(20px)`).
- In RTL:
  - Inactive: Thumb positioned at `right: 3px`.
  - Active: Thumb transitions to `right: 23px` (`transform: translateX(-20px)`).
- Alternatively via logical properties:
  - `margin-inline-start: 3px` (Off) to `margin-inline-start: 23px` (On).
- Interactive touch-target wrapper maintained at minimum `48px × 48px`.

### 5.2 Number & Formatting Isolation
- Wrap phone numbers, coordinates (`15.3694° N, 44.1910° E`), and countdown clocks (`00:44:12`) in `<bdi>` or unicode directional isolators (`\u2066...\u2069`) to guarantee that mathematical signs and colons do not flip arbitrarily.
