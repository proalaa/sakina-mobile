import { useState } from "react"
import { View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { MizanReviewSection } from "@/components/MizanReviewSection"
import { Text } from "@/components/Text"
import { Switch } from "@/components/Toggle/Switch"
import { useAppTheme } from "@/theme/context"
import type { MizanLanguage } from "@/theme/mizan"
import type { ThemedStyle } from "@/theme/types"

const copy = {
  en: {
    title: "Settings and privacy",
    intro:
      "Example settings only. The controls do not start automation, access location, change device sounds, or save preferences. No account or profile setup is shown.",
    automation: "Automation",
    outside: "Silence outside prayer windows",
    continuation: "Continue silencing after the prayer window closes",
    boot: "Start on Device Boot",
    inactive: "Inactive while Silence outside prayer windows is on. Your preference is retained.",
    next: "Applies next session",
    immediate: "Turning automation off or selecting Stop ends the current session immediately.",
    duration: "Maximum session duration",
    departure: "Detected departure can end a shorter session.",
    decrease: "Decrease maximum session duration",
    increase: "Increase maximum session duration",
    minute: "min",
  },
  ar: {
    title: "الإعدادات والخصوصية",
    intro:
      "إعدادات توضيحية فقط. لا تشغّل الأتمتة أو تصل إلى الموقع أو تغيّر أصوات الجهاز أو تحفظ التفضيلات. لا يوجد إعداد لحساب أو ملف شخصي.",
    automation: "الأتمتة",
    outside: "الإسكات خارج نوافذ الصلاة",
    continuation: "متابعة الإسكات بعد انتهاء نافذة الصلاة",
    boot: "البدء عند تشغيل الجهاز",
    inactive: "غير نشط عند تفعيل الإسكات خارج نوافذ الصلاة. يبقى تفضيلك محفوظًا.",
    next: "يُطبّق في الجلسة التالية",
    immediate: "إيقاف الأتمتة أو اختيار إيقاف ينهي الجلسة الحالية فورًا.",
    duration: "المدة القصوى للجلسة",
    departure: "قد ينهي رصد المغادرة جلسة أقصر.",
    decrease: "تقليل المدة القصوى للجلسة",
    increase: "زيادة المدة القصوى للجلسة",
    minute: "دقيقة",
  },
} satisfies Record<MizanLanguage, Record<string, string>>

export function SakinaSettingsPreview({ language }: { language: MizanLanguage }) {
  const { theme, themed } = useAppTheme()
  const labels = copy[language]
  const [automation, setAutomation] = useState(false)
  const [silenceOutsideWindows, setSilenceOutsideWindows] = useState(true)
  const [continueAfterWindow, setContinueAfterWindow] = useState(true)
  const [startOnBoot, setStartOnBoot] = useState(false)
  const [maximumDuration, setMaximumDuration] = useState(60)

  return (
    <MizanReviewSection title={labels.title} language={language}>
      <Text
        text={labels.intro}
        variant="body-sm"
        language={language}
        style={{ color: theme.color.text.secondary }}
      />
      <SettingRow
        label={labels.automation}
        language={language}
        value={automation}
        onValueChange={setAutomation}
      />
      <Text
        text={labels.immediate}
        variant="caption"
        language={language}
        style={{ color: theme.color.text.secondary }}
      />
      <SettingRow
        label={labels.outside}
        hint={labels.next}
        language={language}
        value={silenceOutsideWindows}
        onValueChange={setSilenceOutsideWindows}
      />
      <SettingRow
        label={labels.continuation}
        hint={labels.next}
        language={language}
        value={continueAfterWindow}
        onValueChange={setContinueAfterWindow}
        disabled={silenceOutsideWindows}
      />
      {silenceOutsideWindows && (
        <Text
          text={labels.inactive}
          variant="caption"
          language={language}
          style={{ color: theme.color.text.secondary }}
        />
      )}
      <SettingRow
        label={labels.boot}
        language={language}
        value={startOnBoot}
        onValueChange={setStartOnBoot}
      />

      <View style={themed($durationGroup)}>
        <Text text={labels.duration} variant="label-md" language={language} />
        <Text
          text={labels.next}
          variant="caption"
          language={language}
          style={{ color: theme.color.text.secondary }}
        />
        <View style={themed($stepper)}>
          <Button
            text="−"
            preset="secondary"
            accessibilityLabel={labels.decrease}
            accessibilityRole="button"
            disabled={maximumDuration <= 20}
            onPress={() => setMaximumDuration((duration) => Math.max(20, duration - 5))}
            style={$stepButton}
          />
          <Text
            text={`${maximumDuration} ${labels.minute}`}
            variant="body-lg"
            language={language}
            numeric
            accessibilityLabel={`${labels.duration}: ${maximumDuration} ${labels.minute}`}
          />
          <Button
            text="+"
            preset="secondary"
            accessibilityLabel={labels.increase}
            accessibilityRole="button"
            disabled={maximumDuration >= 180}
            onPress={() => setMaximumDuration((duration) => Math.min(180, duration + 5))}
            style={$stepButton}
          />
        </View>
        <Text
          text={labels.departure}
          variant="caption"
          language={language}
          style={{ color: theme.color.text.secondary }}
        />
      </View>
    </MizanReviewSection>
  )
}

function SettingRow({
  label,
  hint,
  language,
  value,
  onValueChange,
  disabled = false,
}: {
  label: string
  hint?: string
  language: MizanLanguage
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
}) {
  const { theme, themed } = useAppTheme()
  return (
    <View style={themed($settingRow)}>
      <View style={themed($settingCopy)}>
        <Text text={label} variant="body-sm" language={language} />
        {!!hint && (
          <Text
            text={hint}
            variant="caption"
            language={language}
            style={{ color: theme.color.text.secondary }}
          />
        )}
      </View>
      <Switch
        accessibilityLabel={label}
        accessibilityRole="switch"
        layoutDirection={language === "ar" ? "rtl" : "ltr"}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        containerStyle={$switchTarget}
        inputWrapperStyle={$switchTarget}
        inputOuterStyle={{ backgroundColor: theme.color.border.strong }}
        inputInnerStyle={{
          backgroundColor: theme.color.brand.primary,
          borderColor: theme.color.brand.primary,
        }}
        inputDetailStyle={{ backgroundColor: theme.color.surface.base }}
      />
    </View>
  )
}

const $settingRow: ThemedStyle<ViewStyle> = ({ space, color }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: space[3],
  paddingVertical: space[2],
  borderBottomWidth: 1,
  borderColor: color.border.subtle,
})
const $settingCopy: ThemedStyle<ViewStyle> = ({ space }) => ({ flex: 1, gap: space[1] })
const $durationGroup: ThemedStyle<ViewStyle> = ({ space }) => ({
  gap: space[2],
  paddingTop: space[2],
})
const $stepper: ThemedStyle<ViewStyle> = ({ space }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: space[3],
})
const $switchTarget: ViewStyle = {
  minWidth: 48,
  minHeight: 48,
  justifyContent: "center",
  alignItems: "center",
}
const $stepButton: ViewStyle = { minWidth: 48, minHeight: 48 }
