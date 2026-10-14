import { spawnSync } from "child_process"
import { mkdtempSync, rmSync, writeFileSync } from "fs"
import { tmpdir } from "os"
import { join, resolve } from "path"

const projectRoot = resolve(__dirname, "..")
const checker = resolve(projectRoot, "scripts/check-translations.ts")

function checkTranslations(sourceDirectory?: string) {
  return spawnSync(
    process.execPath,
    ["--import", "tsx", checker, ...(sourceDirectory ? [sourceDirectory] : [])],
    {
      cwd: projectRoot,
      encoding: "utf8",
      timeout: 10000,
    },
  )
}

const fixtures: string[] = []
function fixture(source?: string) {
  const directory = mkdtempSync(join(tmpdir(), "sakina-translations-"))
  fixtures.push(directory)
  if (source !== undefined) writeFileSync(join(directory, "sample.tsx"), source)
  return directory
}

afterEach(() => {
  fixtures.splice(0).forEach((directory) => rmSync(directory, { recursive: true, force: true }))
})

it("checks literal translation keys in the actual src directory", () => {
  const result = checkTranslations()
  expect(result.error).toBeUndefined()
  expect(result.stderr).toBe("")
  expect(result.status).toBe(0)
  expect(result.stdout).toMatch(/Checked \d+ translation references in \d+ source files/)
})

it("accepts literal props, object keys and translate calls while ignoring comments", () => {
  const result = checkTranslations(
    fixture(`
    // <Text tx="missing:comment" />
    const sample = <Text tx={"common:ok"} />
    const options = { labelTx: "common:back" }
    translate("welcomeScreen:readyForLaunch")
  `),
  )
  expect(result.status).toBe(0)
  expect(result.stdout).toContain("Checked 3 translation references")
})

it("fails with a location when a literal translation key is missing", () => {
  const result = checkTranslations(fixture('<Text tx="missing:key" />'))
  expect(result.status).toBe(1)
  expect(result.stderr).toContain('sample.tsx:1: missing en translation "missing:key"')
  expect(result.stderr).toContain('missing ar translation "missing:key"')
})

it("fails when the source directory does not exist", () => {
  const missingDirectory = join(fixture(), "missing-directory")
  const result = checkTranslations(missingDirectory)
  expect(result.status).toBe(1)
  expect(result.stderr).toContain(missingDirectory)
  expect(result.stderr).toContain("Translation check failed")
})

it("fails when the source scan is empty", () => {
  const result = checkTranslations(fixture())
  expect(result.status).toBe(1)
  expect(result.stderr).toContain("No TypeScript source files found")
})

it("fails when source files contain no literal translation references", () => {
  const result = checkTranslations(fixture('const sample = "no translation usage"'))
  expect(result.status).toBe(1)
  expect(result.stderr).toContain("No literal translation references found")
})
