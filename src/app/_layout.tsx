import { useEffect, useState } from "react"
import { useFonts } from "expo-font"
import { Slot, SplashScreen } from "expo-router"
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { initI18n } from "@/i18n"
import { ThemeProvider, useAppTheme } from "@/theme/context"
import { SakinaTamaguiProvider } from "@/theme/tamagui-provider"
import { customFontsToLoad } from "@/theme/typography"
import { loadDateFnsLocale } from "@/utils/formatDate"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("@/devtools/ReactotronConfig")
}

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <KeyboardProvider>
          <ThemedRouter />
        </KeyboardProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

function ThemedRouter() {
  const { navigationTheme } = useAppTheme()
  return (
    <SakinaTamaguiProvider>
      <NavigationThemeProvider value={navigationTheme}>
        <Slot />
      </NavigationThemeProvider>
    </SakinaTamaguiProvider>
  )
}
