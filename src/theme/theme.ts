import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import { darkColor, elevation, lightColor, radii, space } from "./mizan"
import { spacing as spacingLight } from "./spacing"
import { spacing as spacingDark } from "./spacingDark"
import { timing } from "./timing"
import type { Theme } from "./types"
import { typography } from "./typography"

// Here we define our themes.
export const lightTheme: Theme = {
  color: lightColor,
  space,
  radii,
  elevation,
  colors: colorsLight,
  spacing: spacingLight,
  typography,
  timing,
  isDark: false,
}
export const darkTheme: Theme = {
  color: darkColor,
  space,
  radii,
  elevation,
  colors: colorsDark,
  spacing: spacingDark,
  typography,
  timing,
  isDark: true,
}
