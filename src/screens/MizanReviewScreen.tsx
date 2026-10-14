import { useState } from "react"
import { View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { MizanReviewSection } from "@/components/MizanReviewSection"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { MizanLanguage, MizanTextVariant } from "@/theme/mizan"
import type { ThemedStyle } from "@/theme/types"

const copy = {
  ar: {
    title: "مراجعة ميزان",
    intro: "أمثلة عرض فقط. تغيّر الأزرار هذا المثال، ولا تغيّر إعدادات الجهاز.",
    controls: "المظهر واللغة",
    light: "فاتح",
    dark: "داكن",
    system: "حسب النظام",
    typography: "الخطوط والتدرّج",
    sample: "سكينة ووضوح في كل تفصيل",
    numbers: "أرقام توضيحية",
    time: "وقت توضيحي",
    coordinates: "إحداثيات توضيحية · ليست موقع الجهاز",
    actions: "أزرار توضيحية",
    ready: "المثال جاهز",
    complete: "اكتمل المثال",
    run: "تشغيل المثال",
    reset: "إعادة ضبط المثال",
    unavailable: "مثال غير متاح",
    fonts: "IBM Plex Sans Arabic · أوزان 400 / 500 / 600 / 700",
  },
  en: {
    title: "Mizan review",
    intro: "Presentation examples only. Actions change this example, not device settings.",
    controls: "Appearance and language",
    light: "Light",
    dark: "Dark",
    system: "System theme",
    typography: "Typography hierarchy",
    sample: "Calm and clarity in every detail",
    numbers: "Example numerals",
    time: "Example time",
    coordinates: "Example coordinates · not device location",
    actions: "Example actions",
    ready: "Example ready",
    complete: "Example complete",
    run: "Run example",
    reset: "Reset example",
    unavailable: "Unavailable example",
    fonts: "Inter · weights 400 / 500 / 600 / 700",
  },
}

const variants: MizanTextVariant[] = [
  "display-lg",
  "display-sm",
  "headline",
  "body-lg",
  "body-sm",
  "label-md",
  "caption",
]

export function MizanReviewScreen() {
  const { theme, themed, themeContextOverride, setThemeContextOverride } = useAppTheme()
  const [language, setLanguage] = useState<MizanLanguage>("ar")
  const [complete, setComplete] = useState(false)
  const labels = copy[language]

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom", "start", "end"]}
      contentContainerStyle={[themed($content), language === "ar" ? $rtl : $ltr]}
    >
      <Text
        text={labels.title}
        variant="display-sm"
        language={language}
        accessibilityRole="header"
      />
      <Text
        text={labels.intro}
        variant="body-sm"
        language={language}
        style={{ color: theme.color.text.secondary }}
      />

      <MizanReviewSection title={labels.controls} language={language}>
        <View style={themed($controls)}>
          <Button
            text={labels.light}
            preset={themeContextOverride === "light" ? "primary" : "secondary"}
            language={language}
            accessibilityState={{ selected: themeContextOverride === "light" }}
            onPress={() => setThemeContextOverride("light")}
            style={$control}
          />
          <Button
            text={labels.dark}
            preset={themeContextOverride === "dark" ? "primary" : "secondary"}
            language={language}
            accessibilityState={{ selected: themeContextOverride === "dark" }}
            onPress={() => setThemeContextOverride("dark")}
            style={$control}
          />
          <Button
            text={labels.system}
            preset={themeContextOverride === undefined ? "primary" : "secondary"}
            language={language}
            accessibilityState={{ selected: themeContextOverride === undefined }}
            onPress={() => setThemeContextOverride(undefined)}
            style={$control}
          />
        </View>
        <View style={themed($controls)}>
          <Button
            text="العربية · RTL"
            preset={language === "ar" ? "primary" : "secondary"}
            language="ar"
            accessibilityState={{ selected: language === "ar" }}
            onPress={() => setLanguage("ar")}
            style={$control}
          />
          <Button
            text="English · LTR"
            preset={language === "en" ? "primary" : "secondary"}
            language="en"
            accessibilityState={{ selected: language === "en" }}
            onPress={() => setLanguage("en")}
            style={$control}
          />
        </View>
      </MizanReviewSection>

      <MizanReviewSection title={labels.typography} language={language}>
        <Text
          text={labels.fonts}
          variant="body-sm"
          language={language}
          style={{ color: theme.color.text.secondary }}
        />
        {variants.map((variant) => (
          <View key={variant} style={themed($sample)}>
            <Text
              text={variant}
              variant="caption"
              language="en"
              style={{ color: theme.color.text.secondary }}
            />
            <Text text={labels.sample} variant={variant} language={language} />
          </View>
        ))}
      </MizanReviewSection>

      <MizanReviewSection title={labels.numbers} language={language}>
        <Text text={labels.time} variant="body-sm" language={language} />
        <Text text="00:44:12" variant="display-lg" language={language} numeric />
        <Text text={labels.coordinates} variant="body-sm" language={language} />
        <Text text="15.3694° N, 44.1910° E" variant="body-sm" language="en" numeric />
      </MizanReviewSection>

      <MizanReviewSection title={labels.actions} language={language}>
        <Text
          text={complete ? labels.complete : labels.ready}
          variant="body-lg"
          language={language}
          accessibilityLiveRegion="polite"
        />
        <Button
          text={labels.run}
          preset="primary"
          language={language}
          disabled={complete}
          onPress={() => setComplete(true)}
        />
        <Button
          text={labels.reset}
          preset="secondary"
          language={language}
          disabled={!complete}
          onPress={() => setComplete(false)}
        />
        <Button text={labels.unavailable} preset="primary" language={language} disabled />
      </MizanReviewSection>
    </Screen>
  )
}

const $content: ThemedStyle<ViewStyle> = ({ space }) => ({ padding: space[4], gap: space[6] })
const $controls: ThemedStyle<ViewStyle> = ({ space }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: space[2],
})
const $control: ViewStyle = { flexGrow: 1, flexBasis: 120 }
const $rtl: ViewStyle = { direction: "rtl" }
const $ltr: ViewStyle = { direction: "ltr" }
const $sample: ThemedStyle<ViewStyle> = ({ space, color }) => ({
  gap: space[1],
  paddingBottom: space[3],
  borderBottomWidth: 1,
  borderColor: color.border.subtle,
})
