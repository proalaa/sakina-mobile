import { PropsWithChildren } from "react"
import { View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { MizanLanguage } from "@/theme/mizan"
import type { ThemedStyle } from "@/theme/types"

import { Text } from "./Text"

/** Shared review structure for Core samples and later application compositions. */
export function MizanReviewSection({
  title,
  language,
  children,
}: PropsWithChildren<{ title: string; language: MizanLanguage }>) {
  const { themed } = useAppTheme()
  return (
    <View style={themed($section)}>
      <Text text={title} variant="headline" language={language} accessibilityRole="header" />
      {children}
    </View>
  )
}

const $section: ThemedStyle<ViewStyle> = ({ color, space, radii, elevation }) => ({
  ...elevation.flat,
  backgroundColor: color.surface.base,
  borderColor: color.border.subtle,
  borderRadius: radii.lg,
  padding: space[5],
  gap: space[4],
})
