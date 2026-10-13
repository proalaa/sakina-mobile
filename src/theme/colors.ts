import { lightColor } from "./mizan"

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: lightColor.text.primary,
  /**
   * Secondary text information.
   */
  textDim: lightColor.text.secondary,
  /**
   * The default color of the screen background.
   */
  background: lightColor.canvas,
  /**
   * The default border color.
   */
  border: lightColor.border.strong,
  /**
   * The main tinting color.
   */
  tint: lightColor.brand.primary,
  /**
   * The inactive tinting color.
   */
  tintInactive: lightColor.border.subtle,
  /**
   * A subtle color used for lines.
   */
  separator: lightColor.border.subtle,
  /**
   * Error messages.
   */
  error: lightColor.feedback.error,
  /**
   * Error Background.
   */
  errorBackground: lightColor.feedback.errorSubtle,
} as const
