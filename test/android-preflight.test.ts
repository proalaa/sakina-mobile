import { spawnSync } from "child_process"
import { mkdtempSync, rmSync, writeFileSync } from "fs"
import { tmpdir } from "os"
import { delimiter, join, resolve } from "path"

it("rejects an ambiguous Android target even when only one device is authorized", () => {
  const directory = mkdtempSync(join(tmpdir(), "sakina-adb-"))
  try {
    writeFileSync(
      join(directory, "adb"),
      `#!/bin/sh
case "$1" in
  version) printf 'fixture adb\n' ;;
  devices) printf 'List of devices attached\nready device model:test\nother offline\n' ;;
  get-state) printf 'device\n' ;;
esac
`,
      { mode: 0o755 },
    )
    const result = spawnSync("bash", [resolve(__dirname, "../scripts/android-preflight.sh")], {
      encoding: "utf8",
      timeout: 5000,
      env: {
        ...process.env,
        PATH: `${directory}${delimiter}${process.env.PATH}`,
        ANDROID_SERIAL: "",
      },
    })
    expect(result.error).toBeUndefined()
    expect(result.status).toBe(1)
    expect(result.stderr).toContain("set ANDROID_SERIAL")
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
