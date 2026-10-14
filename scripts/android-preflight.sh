#!/usr/bin/env bash
set -euo pipefail

adb_path="$(command -v adb || true)"
if [[ -z "$adb_path" ]]; then
  for sdk_path in "${ANDROID_SDK_ROOT:-}" "${ANDROID_HOME:-}" "$HOME/Library/Android/sdk" "$HOME/Android/Sdk"; do
    if [[ -n "$sdk_path" && -x "$sdk_path/platform-tools/adb" ]]; then
      adb_path="$sdk_path/platform-tools/adb"
      break
    fi
  done
fi

if [[ -z "$adb_path" ]]; then
  printf '%s\n' "Android platform-tools were not found. Configure the SDK and adb before native verification." >&2
  exit 1
fi

printf 'adb: %s\n' "$adb_path"
"$adb_path" version
devices="$("$adb_path" devices -l)"
printf '%s\n' "$devices"

if [[ -n "${ANDROID_SERIAL:-}" ]]; then
  state="$("$adb_path" -s "$ANDROID_SERIAL" get-state)"
else
  target_count="$(printf '%s\n' "$devices" | awk 'NR > 1 && NF > 1 { count++ } END { print count+0 }')"
  if [[ "$target_count" != "1" ]]; then
    printf '%s\n' "Connect one authorized device/emulator, or set ANDROID_SERIAL to the intended device." >&2
    exit 1
  fi
  state="$("$adb_path" get-state)"
fi

if [[ "$state" != "device" ]]; then
  printf '%s\n' "The selected target is not ready. Authorize it or start the emulator before native verification." >&2
  exit 1
fi

printf '%s\n' "Android device access is ready. Native visual acceptance still requires inspecting the running app."
