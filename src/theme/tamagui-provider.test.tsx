import { render } from "@testing-library/react-native"

import { Text } from "@/components/Text"

import { ThemeProvider } from "./context"
import { SakinaTamaguiProvider } from "./tamagui-provider"

jest.mock("@tamagui/core", () => {
  const React = require("react")
  const { Text: AppText } = require("@/components/Text")
  return {
    createFont: (font: unknown) => font,
    createTamagui: (config: unknown) => config,
    createTokens: (tokens: unknown) => tokens,
    TamaguiProvider: ({
      defaultTheme,
      children,
    }: {
      defaultTheme: string
      children: React.ReactNode
    }) => React.createElement(AppText, { testID: "tamagui-theme" }, defaultTheme, children),
  }
})

describe("Sakina Tamagui provider", () => {
  it("passes Sakina's effective appearance to Tamagui", () => {
    const view = render(
      <ThemeProvider initialContext="light">
        <SakinaTamaguiProvider>
          <Text>Screen content</Text>
        </SakinaTamaguiProvider>
      </ThemeProvider>,
    )

    expect(view.getByTestId("tamagui-theme").props.children[0]).toBe("light")

    view.rerender(
      <ThemeProvider initialContext="dark">
        <SakinaTamaguiProvider>
          <Text>Screen content</Text>
        </SakinaTamaguiProvider>
      </ThemeProvider>,
    )

    expect(view.getByTestId("tamagui-theme").props.children[0]).toBe("dark")
  })
})
