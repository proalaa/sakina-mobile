import { createFont, createTamagui, createTokens } from "@tamagui/core"
import type { CreateTamaguiProps } from "@tamagui/core"

import { radii, space } from "./mizan"
import { tamaguiMapping } from "./tamagui.mapping"

const mizanFontConfigs = Object.fromEntries(
  Object.entries(tamaguiMapping.core.fonts).map(([name, font]) => [name, createFont(font)]),
) satisfies CreateTamaguiProps["fonts"]

const tokens = createTokens({
  color: {
    ...tamaguiMapping.core.colorTokens,
    ...Object.fromEntries(
      Object.entries(tamaguiMapping.themes.light).filter(([key]) =>
        key.startsWith("sakinaPalette"),
      ),
    ),
  },
  space,
  size: space,
  radius: radii,
})

export const tamaguiConfig = createTamagui({
  tokens,
  themes: tamaguiMapping.themes,
  fonts: mizanFontConfigs,
})

export { tamaguiMapping } from "./tamagui.mapping"

export type TamaguiConfig = typeof tamaguiConfig

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends TamaguiConfig {}
}

export default tamaguiConfig
