import { fireEvent, render } from "@testing-library/react-native"

import { ThemeProvider } from "@/theme/context"

import { Button } from "./Button"

describe("Mizan Button", () => {
  it("renders an accessible primary action with the canonical brand pairing and touch target", () => {
    const onPress = jest.fn()
    const { getByRole, getByText } = render(
      <ThemeProvider initialContext="dark">
        <Button text="Run example" preset="primary" language="en" onPress={onPress} />
      </ThemeProvider>,
    )
    const action = getByRole("button", { name: "Run example" })
    expect(action).toHaveStyle({
      backgroundColor: "#34D399",
      minHeight: 48,
      minWidth: 48,
      borderRadius: 10,
    })
    expect(getByText("Run example")).toHaveStyle({
      color: "#0A100D",
      fontFamily: "Inter_500Medium",
      lineHeight: 18,
    })
    fireEvent.press(action)
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it("keeps a disabled Arabic secondary action readable and prevents activation", () => {
    const onPress = jest.fn()
    const { getByRole, getByText } = render(
      <ThemeProvider initialContext="light">
        <Button text="مثال غير متاح" preset="secondary" language="ar" disabled onPress={onPress} />
      </ThemeProvider>,
    )
    const action = getByRole("button", { name: "مثال غير متاح", disabled: true })
    expect(action).toHaveStyle({
      opacity: 0.5,
      minHeight: 48,
      minWidth: 48,
      backgroundColor: "#FFFFFF",
      borderColor: "#CCD7D0",
    })
    expect(getByText("مثال غير متاح")).toHaveStyle({
      color: "#184E3F",
      fontFamily: "IBMPlexSansArabic_500Medium",
      lineHeight: 20,
    })
    fireEvent.press(action)
    expect(onPress).not.toHaveBeenCalled()
  })
})
