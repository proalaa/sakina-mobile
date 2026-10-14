# Sakina status preview verification — issue #3

## Automated evidence

- Provider-backed rendered tests cover the distinction between mosque proximity and active sound suppression, unavailable prerequisites, timeout/manual-stop/manual-override restart blocks (including their exact clearing condition), a local Resume request that does not imply suppression has been applied, and independent language/direction and theme controls.
- TypeScript compilation and repository lint checking pass.
- No automation, live location, device sound, permission, or background service APIs are used by the preview.

## Focused native Android visual check

- Device: Samsung model SM-G996U; Android 14 (API 34); locale `ar-YE,en-US`; font scale 1.0.
- Inspected the separate Sakina preview in Arabic RTL with light appearance and in English LTR with dark appearance.
- Checked the status card hierarchy, text wrapping, selected-state visibility, semantic status label alongside its color, and visible action sizing. The Arabic restart-block copy wrapped without visible clipping. In English dark mode, the timeout-block explanation and Resume this visit action remained readable.
- An Android floating accessibility shortcut overlaid the left side of the state selector during inspection. Native review of that obscured selector area is limited; rendered component tests cover the selector actions.
- No device location or audio behavior was tested or implied.

Screenshots captured in `/private/tmp/sakina-status-preview-2026-10-14/`.
