import { NavigationContainer } from "@react-navigation/native"
import { render } from "@testing-library/react-native"

import { Text } from "./Text"
import { ThemeProvider } from "../theme/context"

/* This is an example component test using react-native-testing-library. For more
 * information on how to write your own, see the documentation here:
 * https://callstack.github.io/react-native-testing-library/ */
const testText = "Test string"

describe("Text", () => {
  it("renders canonical Arabic display typography in the light theme", () => {
    const { getByText } = render(
      <ThemeProvider initialContext="light">
        <Text text="ميزان" variant="display-lg" language="ar" />
      </ThemeProvider>,
    )
    expect(getByText("ميزان")).toHaveStyle({
      fontFamily: "IBMPlexSansArabic_700Bold",
      fontSize: 32,
      lineHeight: 44,
      color: "#0F1A15",
      writingDirection: "rtl",
      textAlign: "right",
    })
  })

  it("should render the component", () => {
    const { getByText } = render(
      <ThemeProvider>
        <NavigationContainer>
          <Text text={testText} />
        </NavigationContainer>
      </ThemeProvider>,
    )
    expect(getByText(testText)).toBeDefined()
  })

  it("renders Latin numerals with dark theme typography and directional isolation", () => {
    const { getByText } = render(
      <ThemeProvider initialContext="dark">
        <Text text="00:44:12" variant="display-sm" language="en" numeric />
      </ThemeProvider>,
    )
    expect(getByText("\u206600:44:12\u2069")).toHaveStyle({
      fontFamily: "Inter_600SemiBold",
      fontSize: 24,
      lineHeight: 32,
      color: "#EDF5F1",
      writingDirection: "ltr",
      fontVariant: ["tabular-nums"],
    })
  })
})
