import { colors as lightSakinaColors } from "./colors"
import { colors as darkSakinaColors } from "./colorsDark"
import { darkColor, elevation, lightColor, mizanTypography, radii, space } from "./mizan"

type ColorTree = { [key: string]: string | ColorTree }

const flattenColors = (value: ColorTree, prefix: string): Record<string, string> =>
  Object.entries(value).reduce<Record<string, string>>((result, [key, child]) => {
    const name = `${prefix}${key[0].toUpperCase()}${key.slice(1)}`
    return typeof child === "string"
      ? { ...result, [name]: child }
      : { ...result, ...flattenColors(child, name) }
  }, {})

const lightCoreColors = flattenColors(lightColor, "mizan")
const darkCoreColors = flattenColors(darkColor, "mizan")
type SakinaThemeColors = {
  palette: { [Key in keyof typeof lightSakinaColors.palette]: string }
  transparent: string
  text: string
  textDim: string
  background: string
  border: string
  tint: string
  tintInactive: string
  separator: string
  error: string
  errorBackground: string
}

const sakinaTheme = (colors: SakinaThemeColors, coreColors: Record<string, string>) => ({
  ...coreColors,
  background: colors.background,
  color: colors.text,
  colorDim: colors.textDim,
  borderColor: colors.border,
  tint: colors.tint,
  tintInactive: colors.tintInactive,
  separator: colors.separator,
  error: colors.error,
  errorBackground: colors.errorBackground,
  transparent: colors.transparent,
  ...flattenColors(colors.palette, "sakinaPalette"),
})

const fontName = (language: string, variant: string) =>
  `mizan${language === "ar" ? "Arabic" : "English"}${variant
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("")}`

const mizanFonts = Object.fromEntries(
  Object.entries(mizanTypography).flatMap(([language, variants]) =>
    Object.entries(variants).map(([variant, style]) => [
      fontName(language, variant),
      {
        family: style.fontFamily,
        size: { 1: style.fontSize },
        lineHeight: { 1: style.lineHeight },
      },
    ]),
  ),
)

export const tamaguiMapping = {
  core: {
    colors: { light: lightColor, dark: darkColor },
    colorTokens: lightCoreColors,
    darkColorTokens: darkCoreColors,
    space,
    radii,
    typography: mizanTypography,
    fonts: mizanFonts,
    elevation,
  },
  themes: {
    light: sakinaTheme(lightSakinaColors, lightCoreColors),
    dark: sakinaTheme(darkSakinaColors, darkCoreColors),
  },
}
