# Native presentation verification

Use this procedure when implementing or reviewing layout, text direction, fonts, mixed-script values, scaling or system surfaces.

## Preflight

1. Confirm the affected platform first. Recheck tool/device availability for the current task; previous-session setup results may be stale.
2. Run `pnpm android:preflight`. It finds adb from PATH, SDK environment variables or standard user SDK paths, then requires an authorized target. For multiple devices, set `ANDROID_SERIAL` explicitly.
3. If platform-tools or a target is missing, configure them through Android Studio or connect an authorized device. Record native verification as pending until the target is available.

The preflight reads device availability; it does not change language, sound, permissions or other device settings.

## Inspect the running app

1. Open the in-app review surface. Verify Arabic RTL and English LTR in representative light/dark cases.
2. Inspect row order and text alignment separately. Rendered Jest style assertions establish component output, not Android's native interpretation of alignment.
3. Check mixed-script times/coordinates, glyph clipping, increased text size, safe areas and selected/disabled/pressed controls. Preserve intentional centered labels and isolated LTR values.
4. Capture screenshots after each screen settles. Confirm the labels and selected mode before interpreting the result; Fast Refresh can reset local example state.
5. When using coordinate input, read the original PNG dimensions and use coordinates from that same frame. Resized previews have different coordinates. Reinspect after scrolling or changing language/theme.

Read PNG dimensions without installing an image library:

```sh
python3 - /path/to/screenshot.png <<'PY'
import struct, sys
with open(sys.argv[1], "rb") as image:
    if image.read(8) != b"\x89PNG\r\n\x1a\n":
        raise SystemExit("Expected a PNG screenshot")
    image.seek(16)
    print("width, height:", *struct.unpack(">II", image.read(8)))
PY
```

Native SDK operations may require sandbox approval for USB/device access. Use read-only inspection first and reversible in-app controls for example checks.

## Evidence and review

Record device model/OS, locale, font scale, inspected modes, observed results and remaining checks in the feature's verification note. Claim only the cases actually inspected. Capture artifacts in a task-specific temporary directory; retain review evidence where the project requires it.

For a native direction/alignment change, the reviewer checks native evidence alongside rendered tests. When evidence is unavailable, mark native acceptance pending. Passing style assertions or a successful bundle export cannot close that requirement.

Read only the affected files and installed platform implementation first. Extract the relevant facts from connector responses; consult another platform when checking a concrete regression risk.
