import { PropsWithChildren } from "react"
import { View, ViewStyle } from "react-native"

import { MizanStatusIndicator, MizanStatusTone } from "@/components/MizanStatusIndicator"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { MizanLanguage } from "@/theme/mizan"
import type { ThemedStyle } from "@/theme/types"

export function SakinaStatusCard({
  label,
  title,
  description,
  note,
  language,
  tone,
  children,
}: PropsWithChildren<{
  label: string
  title: string
  description: string
  note?: string
  language: MizanLanguage
  tone: MizanStatusTone
}>) {
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($card)}>
      <MizanStatusIndicator label={label} language={language} tone={tone} />
      <Text text={title} variant="headline" language={language} accessibilityRole="header" />
      <Text text={description} variant="body-lg" language={language} />
      {note ? (
        <Text
          text={note}
          variant="body-sm"
          language={language}
          style={{ color: theme.color.text.secondary }}
        />
      ) : null}
      {children}
    </View>
  )
}

const $card: ThemedStyle<ViewStyle> = ({ color, elevation, radii, space }) => ({
  ...elevation.flat,
  backgroundColor: color.surface.base,
  borderColor: color.border.subtle,
  borderRadius: radii.lg,
  padding: space[5],
  gap: space[4],
})
