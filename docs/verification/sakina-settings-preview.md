# Sakina settings preview verification — issue #4

The Mizan review surface includes an explicitly labeled settings/privacy example in Arabic RTL and English LTR. The controls change local example state only. They do not start automation, access location, change device sounds, or persist preferences.

## Rendered evidence

- Provider-backed rendered tests cover the initial automation, outside-window, continuation and boot defaults; accessible switch labels, checked and disabled states; the retained continuation value when its dependency becomes available; immediate-off guidance; and the maximum session duration's 20–180 minute range in five-minute steps.
- The shared switch uses a 44×24 track and an 18×18 thumb, with three-unit logical edge offsets, inside a 48×48 minimum target. Its thumb movement follows the preview language direction.
- TypeScript compilation and ESLint checks pass.

## Android native visual checks — pending

On 14 October 2026, `pnpm android:preflight` found Android SDK platform-tools, but ADB listed no authorized device or emulator. The sandboxed attempt could not start the ADB daemon; the authorized retry reached ADB and confirmed that no target is connected. No native screenshot or visual result is claimed.

Inspect the review surface on Android in representative Arabic RTL and English LTR, in light and dark themes. Check thumb placement in both switch states, row order and text alignment, Arabic glyph clipping, text scaling, safe areas, target sizes and disabled styling. Record device model/OS, locale, font scale and observations here when a target is available.
