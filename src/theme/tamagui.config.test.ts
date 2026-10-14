import { colors as lightSakinaColors } from "./colors"
import { colors as darkSakinaColors } from "./colorsDark"
import { darkColor, elevation, lightColor, mizanTypography, radii, space } from "./mizan"
import { tamaguiMapping } from "./tamagui.mapping"

describe("Tamagui Mizan mapping", () => {
  it("maps every Mizan Core color, spacing, radius, and typography value", () => {
    expect(tamaguiMapping.core.colors.light).toEqual(lightColor)
    expect(tamaguiMapping.core.colors.dark).toEqual(darkColor)
    expect(tamaguiMapping.core.space).toEqual(space)
    expect(tamaguiMapping.core.radii).toEqual(radii)
    expect(tamaguiMapping.core.typography).toEqual(mizanTypography)
    expect(tamaguiMapping.core.elevation).toBe(elevation)
    expect(tamaguiMapping.core.fonts.mizanArabicDisplayLg).toEqual({
      family: mizanTypography.ar["display-lg"].fontFamily,
      size: { 1: mizanTypography.ar["display-lg"].fontSize },
      lineHeight: { 1: mizanTypography.ar["display-lg"].lineHeight },
    })
    expect(Object.keys(tamaguiMapping.core.fonts)).toHaveLength(14)
    expect(Object.keys(tamaguiMapping.core.colorTokens)).toHaveLength(26)
    expect(Object.keys(tamaguiMapping.core.darkColorTokens)).toHaveLength(26)
    expect(
      Object.keys(tamaguiMapping.themes.light).filter((key) => key.startsWith("mizan")),
    ).toHaveLength(26)
    expect(
      Object.keys(tamaguiMapping.themes.dark).filter((key) => key.startsWith("mizan")),
    ).toHaveLength(26)
  })

  it("maps the existing Sakina semantic colors into distinct light and dark themes", () => {
    expect(tamaguiMapping.themes.light).toMatchObject({
      background: lightSakinaColors.background,
      color: lightSakinaColors.text,
      borderColor: lightSakinaColors.border,
      mizanTextPrimary: lightColor.text.primary,
    })
    expect(tamaguiMapping.themes.dark).toMatchObject({
      background: darkSakinaColors.background,
      color: darkSakinaColors.text,
      borderColor: darkSakinaColors.border,
      mizanTextPrimary: darkColor.text.primary,
    })
    expect(tamaguiMapping.themes.light.background).not.toBe(tamaguiMapping.themes.dark.background)
    expect(
      Object.keys(tamaguiMapping.themes.light).filter((key) => key.startsWith("sakinaPalette")),
    ).toHaveLength(Object.keys(lightSakinaColors.palette).length)
    expect(
      Object.keys(tamaguiMapping.themes.dark).filter((key) => key.startsWith("sakinaPalette")),
    ).toHaveLength(Object.keys(darkSakinaColors.palette).length)
  })
})
