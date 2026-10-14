import type { PropsWithChildren } from "react"
import { TamaguiProvider } from "@tamagui/core"

import { useAppTheme } from "./context"
import { tamaguiConfig } from "./tamagui.config"

export function SakinaTamaguiProvider({ children }: PropsWithChildren) {
  const { themeContext } = useAppTheme()

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={themeContext}>
      {children}
    </TamaguiProvider>
  )
}
