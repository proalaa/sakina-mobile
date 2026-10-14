import { View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { MizanLanguage } from "@/theme/mizan"
import type { ThemedStyle } from "@/theme/types"

export type MizanStatusTone = "neutral" | "info" | "success" | "warning" | "error"

export function MizanStatusIndicator({
  label,
  language,
  tone = "neutral",
}: {
  label: string
  language: MizanLanguage
  tone?: MizanStatusTone
}) {
  const { themed } = useAppTheme()

  return (
    <View style={themed((theme) => $indicator(theme, tone))}>
      <View style={themed((theme) => $dot(theme, tone))} importantForAccessibility="no" />
      <Text text={label} variant="label-md" language={language} />
    </View>
  )
}

const $indicator = (
  theme: Parameters<ThemedStyle<ViewStyle>>[0],
  tone: MizanStatusTone,
): ViewStyle => {
  const { space, radii, color } = theme
  const backgroundColor = {
    neutral: color.surface.subtle,
    info: color.feedback.infoSubtle,
    success: color.feedback.successSubtle,
    warning: color.feedback.warningSubtle,
    error: color.feedback.errorSubtle,
  }[tone]
  return {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: space[2],
    paddingHorizontal: space[3],
    paddingVertical: space[1],
    borderRadius: radii.full,
    backgroundColor,
  }
}

const $dot = (theme: Parameters<ThemedStyle<ViewStyle>>[0], tone: MizanStatusTone): ViewStyle => {
  const { space, color } = theme
  const dotColor = {
    neutral: color.text.secondary,
    info: color.feedback.info,
    success: color.feedback.success,
    warning: color.feedback.warning,
    error: color.feedback.error,
  }[tone]
  return { width: space[2], height: space[2], borderRadius: 99, backgroundColor: dotColor }
}
