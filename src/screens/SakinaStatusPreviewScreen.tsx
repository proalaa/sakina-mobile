import { useState } from "react"
import { View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { MizanReviewSection } from "@/components/MizanReviewSection"
import type { MizanStatusTone } from "@/components/MizanStatusIndicator"
import { SakinaStatusCard } from "@/components/sakina/SakinaStatusCard"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { MizanLanguage } from "@/theme/mizan"
import type { ThemedStyle } from "@/theme/types"

type Example =
  | "automationOff"
  | "monitoring"
  | "proximity"
  | "applied"
  | "unavailable"
  | "timeoutBlocked"
  | "manualStopBlocked"
  | "manualOverrideBlocked"
  | "resumed"

type StatusCopy = { title: string; description: string; note?: string; tone: MizanStatusTone }
type PreviewCopy = {
  title: string
  intro: string
  controls: string
  light: string
  dark: string
  system: string
  arabic: string
  english: string
  states: string
  stateNames: Record<Example, string>
  content: Record<Example, StatusCopy>
  demoOnly: string
  stop: string
  stopEffect: string
  resume: string
  resumeNotice: string
}

const copy: Record<MizanLanguage, PreviewCopy> = {
  en: {
    title: "Sakina status preview",
    intro: "Presentation examples only. Actions change this example, not device settings.",
    controls: "Appearance and language",
    light: "Light",
    dark: "Dark",
    system: "System theme",
    arabic: "العربية · RTL",
    english: "English · LTR",
    states: "Example status states",
    stateNames: {
      automationOff: "Automation off",
      monitoring: "Monitoring",
      proximity: "Mosque proximity",
      applied: "Applied sound suppression",
      unavailable: "Unavailable prerequisites",
      timeoutBlocked: "Timeout blocked",
      manualStopBlocked: "Manual stop blocked",
      manualOverrideBlocked: "Manual override blocked",
      resumed: "New session requested",
    },
    content: {
      automationOff: {
        title: "Automation is off",
        description: "The app does not monitor mosque proximity or apply a sound restriction.",
        tone: "neutral",
      },
      monitoring: {
        title: "Monitoring is on",
        description: "No mosque proximity has been detected in this example.",
        note: "Monitoring alone does not mean sound suppression is active.",
        tone: "info",
      },
      proximity: {
        title: "Mosque proximity detected",
        description: "No silencing session is active.",
        note: "Mosque proximity does not itself mean sound suppression is active. A proximity episode can continue after a silencing session ends.",
        tone: "info",
      },
      applied: {
        title: "Sound suppression is active for this silencing session.",
        description: "The app's sound restriction is active during this example session.",
        note: "Calls and messages still arrive; visual notifications are not hidden.",
        tone: "success",
      },
      unavailable: {
        title: "Automation is unavailable",
        description: "Required mosque data or a required permission is unavailable.",
        note: "A new silencing session cannot start until required data is available.",
        tone: "warning",
      },
      timeoutBlocked: {
        title: "Restart blocked after timeout",
        description: "Automatic restart is blocked for this proximity episode after timeout.",
        note: "A prayer-window change, uncertain location, or reboot does not clear this block. It clears only after established departure from this mosque's detection area and subsequent re-entry.",
        tone: "error",
      },
      manualStopBlocked: {
        title: "Restart blocked after manual stop",
        description: "Automatic restart is blocked for this proximity episode after manual stop.",
        note: "A prayer-window change, uncertain location, or reboot does not clear this block. It clears only after established departure from this mosque's detection area and subsequent re-entry.",
        tone: "error",
      },
      manualOverrideBlocked: {
        title: "Restart blocked after manual override",
        description:
          "Automatic restart is blocked for this proximity episode after manual override.",
        note: "A prayer-window change, uncertain location, or reboot does not clear this block. It clears only after established departure from this mosque's detection area and subsequent re-entry.",
        tone: "error",
      },
      resumed: {
        title: "A new silencing session was requested.",
        description: "A request does not confirm that sound suppression has been applied.",
        note: "This explicit request uses a fresh maximum session duration, subject to valid proximity and required data.",
        tone: "info",
      },
    },
    demoOnly: "Presentation example only. No live location or device audio is used.",
    stop: "Stop app sound suppression",
    stopEffect: "The app restriction was released. Device sound settings were not changed.",
    resume: "Resume this visit",
    resumeNotice: "New demonstration silencing session requested.",
  },
  ar: {
    title: "معاينة حالة سكينة",
    intro: "أمثلة للعرض فقط. تغيّر الإجراءات المثال ولا تغيّر إعدادات الجهاز.",
    controls: "المظهر واللغة",
    light: "فاتح",
    dark: "داكن",
    system: "حسب النظام",
    arabic: "العربية · RTL",
    english: "English · LTR",
    states: "حالات توضيحية",
    stateNames: {
      automationOff: "الأتمتة متوقفة",
      monitoring: "المراقبة",
      proximity: "القرب من مسجد",
      applied: "تم تطبيق كتم الصوت",
      unavailable: "المتطلبات غير متاحة",
      timeoutBlocked: "الحظر بعد انتهاء المدة",
      manualStopBlocked: "الحظر بعد الإيقاف اليدوي",
      manualOverrideBlocked: "الحظر بعد التجاوز اليدوي",
      resumed: "تم طلب جلسة جديدة",
    },
    content: {
      automationOff: {
        title: "الأتمتة متوقفة",
        description: "لا يراقب التطبيق القرب من المساجد ولا يطبق قيداً على الصوت.",
        tone: "neutral",
      },
      monitoring: {
        title: "المراقبة مفعلة",
        description: "لم يُكتشف القرب من مسجد في هذا المثال.",
        note: "المراقبة وحدها لا تعني أن كتم الصوت نشط.",
        tone: "info",
      },
      proximity: {
        title: "تم رصد القرب من مسجد",
        description: "لا توجد جلسة كتم صوت نشطة.",
        note: "القرب من المسجد لا يعني بحد ذاته أن كتم الصوت نشط. قد تستمر فترة القرب بعد انتهاء جلسة كتم الصوت.",
        tone: "info",
      },
      applied: {
        title: "كتم الصوت نشط لهذه الجلسة.",
        description: "قيد الصوت الذي يطبقه التطبيق نشط في هذه الجلسة التوضيحية.",
        note: "تصل المكالمات والرسائل، ولا تُخفى الإشعارات المرئية.",
        tone: "success",
      },
      unavailable: {
        title: "الأتمتة غير متاحة",
        description: "بيانات المسجد المطلوبة أو أحد الأذونات المطلوبة غير متاح.",
        note: "لا يمكن بدء جلسة كتم جديدة حتى تتوفر البيانات المطلوبة.",
        tone: "warning",
      },
      timeoutBlocked: {
        title: "إعادة التشغيل محظورة بعد انتهاء المدة",
        description: "إعادة التشغيل التلقائية محظورة خلال فترة القرب الحالية بعد انتهاء المدة.",
        note: "تغيير نافذة الصلاة أو عدم يقين الموقع أو إعادة تشغيل الجهاز لا يزيل هذا الحظر. يُرفع فقط بعد مغادرة مؤكدة لنطاق رصد هذا المسجد ثم الدخول إليه مجدداً.",
        tone: "error",
      },
      manualStopBlocked: {
        title: "إعادة التشغيل محظورة بعد الإيقاف اليدوي",
        description: "إعادة التشغيل التلقائية محظورة خلال فترة القرب الحالية بعد الإيقاف اليدوي.",
        note: "تغيير نافذة الصلاة أو عدم يقين الموقع أو إعادة تشغيل الجهاز لا يزيل هذا الحظر. يُرفع فقط بعد مغادرة مؤكدة لنطاق رصد هذا المسجد ثم الدخول إليه مجدداً.",
        tone: "error",
      },
      manualOverrideBlocked: {
        title: "إعادة التشغيل محظورة بعد التجاوز اليدوي",
        description: "إعادة التشغيل التلقائية محظورة خلال فترة القرب الحالية بعد التجاوز اليدوي.",
        note: "تغيير نافذة الصلاة أو عدم يقين الموقع أو إعادة تشغيل الجهاز لا يزيل هذا الحظر. يُرفع فقط بعد مغادرة مؤكدة لنطاق رصد هذا المسجد ثم الدخول إليه مجدداً.",
        tone: "error",
      },
      resumed: {
        title: "تم طلب جلسة كتم جديدة.",
        description: "لا يؤكد الطلب أنه تم تطبيق كتم الصوت.",
        note: "يستخدم هذا الطلب الصريح مدة جلسة قصوى جديدة، بشرط استمرار القرب وتوفر البيانات المطلوبة.",
        tone: "info",
      },
    },
    demoOnly: "مثال للعرض فقط. لا يستخدم الموقع المباشر أو صوت الجهاز.",
    stop: "إيقاف كتم صوت التطبيق",
    stopEffect: "تم تحرير قيد التطبيق فقط. لم تتغير إعدادات صوت الجهاز.",
    resume: "استئناف هذه الزيارة",
    resumeNotice: "تم طلب جلسة توضيحية جديدة لكتم الصوت.",
  },
}

export function SakinaStatusPreviewScreen() {
  const { themed, theme, themeContextOverride, setThemeContextOverride } = useAppTheme()
  const [language, setLanguage] = useState<MizanLanguage>("ar")
  const [example, setExample] = useState<Example>("proximity")
  const [actionNotice, setActionNotice] = useState<"stop" | "resume" | undefined>()
  const labels = copy[language]
  const current = labels.content[example]

  function selectExample(next: Example) {
    setExample(next)
    setActionNotice(undefined)
  }

  function stopSuppression() {
    setExample("manualStopBlocked")
    setActionNotice("stop")
  }

  function resumeVisit() {
    setExample("resumed")
    setActionNotice("resume")
  }

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
            text={labels.arabic}
            preset={language === "ar" ? "primary" : "secondary"}
            language="ar"
            accessibilityState={{ selected: language === "ar" }}
            onPress={() => setLanguage("ar")}
            style={$control}
          />
          <Button
            text={labels.english}
            preset={language === "en" ? "primary" : "secondary"}
            language="en"
            accessibilityState={{ selected: language === "en" }}
            onPress={() => setLanguage("en")}
            style={$control}
          />
        </View>
      </MizanReviewSection>

      <MizanReviewSection title={labels.states} language={language}>
        <View style={themed($controls)}>
          {(Object.keys(labels.stateNames) as Example[]).map((name) => (
            <Button
              key={name}
              text={labels.stateNames[name]}
              preset={example === name ? "primary" : "secondary"}
              language={language}
              accessibilityState={{ selected: example === name }}
              onPress={() => selectExample(name)}
              style={$control}
            />
          ))}
        </View>
      </MizanReviewSection>

      <SakinaStatusCard
        label={labels.stateNames[example]}
        title={current.title}
        description={current.description}
        note={current.note}
        tone={current.tone}
        language={language}
      >
        {actionNotice ? (
          <Text
            text={actionNotice === "stop" ? labels.stopEffect : labels.resumeNotice}
            variant="body-sm"
            language={language}
            accessibilityLiveRegion="polite"
          />
        ) : null}
        {example === "applied" ? (
          <Button
            text={labels.stop}
            preset="secondary"
            language={language}
            onPress={stopSuppression}
          />
        ) : null}
        {example === "timeoutBlocked" ||
        example === "manualStopBlocked" ||
        example === "manualOverrideBlocked" ? (
          <Button text={labels.resume} preset="primary" language={language} onPress={resumeVisit} />
        ) : null}
      </SakinaStatusCard>

      <Text
        text={labels.demoOnly}
        variant="caption"
        language={language}
        style={{ color: theme.color.text.secondary }}
      />
    </Screen>
  )
}

const $content: ThemedStyle<ViewStyle> = ({ space }) => ({ padding: space[4], gap: space[6] })
const $controls: ThemedStyle<ViewStyle> = ({ space }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: space[2],
})
const $control: ViewStyle = { flexGrow: 1, flexBasis: 128 }
const $rtl: ViewStyle = { direction: "rtl" }
const $ltr: ViewStyle = { direction: "ltr" }
