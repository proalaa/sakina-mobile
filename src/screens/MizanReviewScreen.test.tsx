import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { fireEvent, render } from "@testing-library/react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import { ThemeProvider } from "@/theme/context"
import { useAppTheme } from "@/theme/context"
import { storage } from "@/utils/storage"

import { MizanReviewScreen } from "./MizanReviewScreen"

jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest"),
)
jest.mock(
  "react-native-safe-area-context",
  () => require("react-native-safe-area-context/jest/mock").default,
)

const Stack = createNativeStackNavigator()

beforeEach(() => storage.clearAll())

it("lets reviewers change direction and run/reset visibly labeled examples", () => {
  const { getByRole, getByText } = render(
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Mizan" component={MizanReviewScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>,
  )
  expect(getByText("مراجعة ميزان")).toBeOnTheScreen()
  expect(getByRole("button", { name: "العربية · RTL", selected: true })).toBeOnTheScreen()
  fireEvent.press(getByRole("button", { name: "English · LTR" }))
  expect(getByText("Mizan review")).toHaveStyle({
    direction: "ltr",
    textAlign: "auto",
    writingDirection: "ltr",
    fontFamily: "Inter_600SemiBold",
  })
  expect(
    getByText("Presentation examples only. Actions change this example, not device settings."),
  ).toBeOnTheScreen()
  expect(getByRole("button", { name: "Reset example", disabled: true })).toBeOnTheScreen()
  fireEvent.press(getByRole("button", { name: "Run example" }))
  expect(getByText("Example complete")).toBeOnTheScreen()
  fireEvent.press(getByRole("button", { name: "Reset example", disabled: false }))
  expect(getByText("Example ready")).toBeOnTheScreen()
  fireEvent.press(getByRole("button", { name: "العربية · RTL" }))
  expect(getByText("مراجعة ميزان")).toHaveStyle({
    direction: "rtl",
    textAlign: "auto",
    writingDirection: "rtl",
    fontFamily: "Tajawal_500Medium",
  })
})

function NavigationSample() {
  const { navigationTheme } = useAppTheme()
  return (
    <Text
      text="Navigation surface"
      style={{
        backgroundColor: navigationTheme.colors.background,
        color: navigationTheme.colors.text,
        borderColor: navigationTheme.colors.border,
      }}
    />
  )
}

it("resolves light/dark review and navigation surfaces together through the provider", () => {
  const { getByRole, getByText } = render(
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Mizan">
              {() => (
                <>
                  <MizanReviewScreen />
                  <NavigationSample />
                </>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>,
  )
  fireEvent.press(getByRole("button", { name: "English · LTR" }))
  expect(getByRole("button", { name: "System theme", selected: true })).toBeOnTheScreen()
  fireEvent.press(getByRole("button", { name: "Dark" }))
  expect(getByRole("button", { name: "Dark", selected: true })).toHaveStyle({
    backgroundColor: "#34D399",
  })
  expect(getByRole("button", { name: "System theme", selected: false })).toBeOnTheScreen()
  expect(getByText("Mizan review")).toHaveStyle({ color: "#EDF5F1" })
  expect(getByText("Navigation surface")).toHaveStyle({
    backgroundColor: "#0A100D",
    color: "#EDF5F1",
    borderColor: "#1E2B25",
  })
  fireEvent.press(getByRole("button", { name: "System theme" }))
  expect(getByRole("button", { name: "System theme", selected: true })).toBeOnTheScreen()
  expect(getByText("Navigation surface")).toHaveStyle({
    backgroundColor: "#F8FAF9",
    color: "#0F1A15",
    borderColor: "#E5EBE7",
  })
  fireEvent.press(getByRole("button", { name: "Light" }))
  expect(getByText("Navigation surface")).toHaveStyle({
    backgroundColor: "#F8FAF9",
    color: "#0F1A15",
    borderColor: "#E5EBE7",
  })
})
