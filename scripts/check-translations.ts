import { readdirSync, readFileSync } from "fs"
import { join, relative, resolve } from "path"
import ts from "typescript"

import ar from "../src/i18n/ar"
import en from "../src/i18n/en"

function translationKeys(value: object, prefix: string[] = []): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = [...prefix, key]
    if (typeof child === "object" && child !== null) return translationKeys(child, path)
    return [path.join(".").replace(".", ":")]
  })
}

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return entry.isFile() && /\.tsx?$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)
      ? [path]
      : []
  })
}

function literalText(node: ts.Node | undefined): string | undefined {
  if (node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))) {
    return node.text
  }
  if (node && ts.isJsxExpression(node)) return literalText(node.expression)
  return undefined
}

function references(file: string): { key: string; location: string }[] {
  const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true)
  const found: { key: string; location: string }[] = []
  const record = (node: ts.Node, key: string | undefined) => {
    if (key === undefined) return
    const { line } = source.getLineAndCharacterOfPosition(node.getStart(source))
    found.push({ key, location: `${relative(process.cwd(), file)}:${line + 1}` })
  }
  const visit = (node: ts.Node) => {
    if (ts.isJsxAttribute(node) && /^(tx|.*Tx)$/.test(node.name.getText(source))) {
      record(node, literalText(node.initializer))
    } else if (
      ts.isPropertyAssignment(node) &&
      /^(tx|.*Tx)$/.test(node.name.getText(source).replace(/["']/g, ""))
    ) {
      record(node, literalText(node.initializer))
    } else if (ts.isCallExpression(node)) {
      const callee = node.expression
      if (
        (ts.isIdentifier(callee) && ["translate", "t"].includes(callee.text)) ||
        (ts.isPropertyAccessExpression(callee) && callee.name.text === "t")
      ) {
        record(node, literalText(node.arguments[0]))
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return found
}

try {
  const directory = resolve(process.argv[2] ?? "src")
  const files = sourceFiles(directory)
  if (files.length === 0) throw new Error(`No TypeScript source files found in ${directory}`)
  const usages = files.flatMap(references)
  if (usages.length === 0)
    throw new Error(`No literal translation references found in ${directory}`)
  const languages = { ar: new Set(translationKeys(ar)), en: new Set(translationKeys(en)) }
  const missing = usages.flatMap(({ key, location }) =>
    Object.entries(languages)
      .filter(([, keys]) => !keys.has(key))
      .map(([language]) => `${location}: missing ${language} translation "${key}"`),
  )
  if (missing.length > 0) throw new Error(missing.join("\n"))
  process.stdout.write(
    `Checked ${usages.length} translation references in ${files.length} source files (ar, en).\n`,
  )
} catch (error) {
  process.stderr.write(
    `Translation check failed: ${error instanceof Error ? error.message : String(error)}\n`,
  )
  process.exitCode = 1
}
