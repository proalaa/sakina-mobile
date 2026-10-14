import type { ViewStyle } from "react-native"

// Restored Mizan v1.0 is the authority for these reusable tokens (ADR 0001).
export const lightColor = {
  canvas: "#F8FAF9",
  surface: {
    base: "#FFFFFF",
    subtle: "#F1F5F3",
    elevated: "#FFFFFF",
    hover: "#E8EFEA",
  },
  border: {
    subtle: "#E5EBE7",
    strong: "#CCD7D0",
    focus: "#184E3F",
  },
  text: {
    primary: "#0F1A15",
    secondary: "#4A5D54",
    tertiary: "#7A8F85",
    inverse: "#FFFFFF",
    brand: "#184E3F",
  },
  brand: {
    primary: "#184E3F",
    primaryHover: "#123B2F",
    secondary: "#3A7D69",
    secondaryTint: "#E8F3EE",
    accent: "#0D9488",
  },
  feedback: {
    success: "#16A34A",
    successSubtle: "#DCFCE7",
    warning: "#D97706",
    warningSubtle: "#FEF3C7",
    error: "#DC2626",
    errorSubtle: "#FEE2E2",
    info: "#0284C7",
    infoSubtle: "#E0F2FE",
  },
}

export const darkColor = {
  canvas: "#0A100D",
  surface: {
    base: "#121A16",
    subtle: "#1A2420",
    elevated: "#222F2A",
    hover: "#2B3B34",
  },
  border: {
    subtle: "#1E2B25",
    strong: "#2D3F36",
    focus: "#34D399",
  },
  text: {
    primary: "#EDF5F1",
    secondary: "#A3B8AE",
    tertiary: "#687D73",
    inverse: "#0A100D",
    brand: "#34D399",
  },
  brand: {
    primary: "#34D399",
    primaryHover: "#2DD4BF",
    secondary: "#20725C",
    secondaryTint: "#132A22",
    accent: "#5EEAD4",
  },
  feedback: {
    success: "#22C55E",
    successSubtle: "#052E16",
    warning: "#F59E0B",
    warningSubtle: "#451A03",
    error: "#EF4444",
    errorSubtle: "#450A0A",
    info: "#38BDF8",
    infoSubtle: "#082F49",
  },
}

export type MizanColor = typeof lightColor

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 12: 48 } as const
export const radii = { sm: 6, md: 10, lg: 16, xl: 24, full: 9999 } as const

// Android uses elevation; iOS uses the dominant shadow from each canonical pair.
// Flat surfaces receive their semantic border color at the component boundary.
export const elevation = {
  flat: { elevation: 0, borderWidth: 1 },
  low: {
    elevation: 1,
    shadowColor: "#0F1A15",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  raised: {
    elevation: 2,
    shadowColor: "#0F1A15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  modal: {
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
  },
} satisfies Record<string, ViewStyle>

export type MizanLanguage = "ar" | "en"

export const mizanTypography = {
  ar: {
    "display-lg": { fontSize: 32, lineHeight: 44, fontFamily: "Tajawal_700Bold" },
    "display-sm": { fontSize: 24, lineHeight: 36, fontFamily: "Tajawal_700Bold" },
    "headline": { fontSize: 20, lineHeight: 30, fontFamily: "Tajawal_500Medium" },
    "body-lg": { fontSize: 16, lineHeight: 26, fontFamily: "Tajawal_400Regular" },
    "body-sm": { fontSize: 14, lineHeight: 22, fontFamily: "Tajawal_400Regular" },
    "label-md": { fontSize: 13, lineHeight: 20, fontFamily: "Tajawal_500Medium" },
    "caption": { fontSize: 11, lineHeight: 18, fontFamily: "Tajawal_400Regular" },
  },
  en: {
    "display-lg": { fontSize: 32, lineHeight: 40, fontFamily: "Inter_700Bold" },
    "display-sm": { fontSize: 24, lineHeight: 32, fontFamily: "Inter_600SemiBold" },
    "headline": { fontSize: 20, lineHeight: 28, fontFamily: "Inter_600SemiBold" },
    "body-lg": { fontSize: 16, lineHeight: 24, fontFamily: "Inter_400Regular" },
    "body-sm": { fontSize: 14, lineHeight: 20, fontFamily: "Inter_400Regular" },
    "label-md": { fontSize: 13, lineHeight: 18, fontFamily: "Inter_500Medium" },
    "caption": { fontSize: 11, lineHeight: 16, fontFamily: "Inter_400Regular" },
  },
} as const

export type MizanTextVariant = keyof typeof mizanTypography.ar
