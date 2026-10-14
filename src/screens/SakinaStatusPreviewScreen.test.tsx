import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { fireEvent, render } from "@testing-library/react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { ThemeProvider } from "@/theme/context"
import { storage } from "@/utils/storage"

import { SakinaStatusPreviewScreen } from "./SakinaStatusPreviewScreen"

jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest"),
)
jest.mock(
  "react-native-safe-area-context",
  () => require("react-native-safe-area-context/jest/mock").default,
)

const Stack = createNativeStackNavigator()

function renderPreview() {
  const screen = render(
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SakinaStatus" component={SakinaStatusPreviewScreen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>,
  )
  fireEvent.press(screen.getByRole("button", { name: "English · LTR" }))
  return screen
}

beforeEach(() => storage.clearAll())

it("keeps detected mosque proximity distinct from an active silencing session", () => {
  const { getByText, getByRole } = renderPreview()

  fireEvent.press(getByRole("button", { name: "Mosque proximity" }))

  expect(getByText("Mosque proximity detected")).toBeOnTheScreen()
  expect(getByText("No silencing session is active.")).toBeOnTheScreen()
  expect(
    getByText(
      "Mosque proximity does not itself mean sound suppression is active. A proximity episode can continue after a silencing session ends.",
    ),
  ).toBeOnTheScreen()
  expect(
    getByText("Presentation example only. No live location or device audio is used."),
  ).toBeOnTheScreen()
})

it("explains unavailable prerequisites and restart blocks without implying they clear", () => {
  const { getByText, getByRole, queryByRole } = renderPreview()

  fireEvent.press(getByRole("button", { name: "Unavailable prerequisites" }))
  expect(
    getByText("Required mosque data or a required permission is unavailable."),
  ).toBeOnTheScreen()
  expect(
    getByText("A new silencing session cannot start until required data is available."),
  ).toBeOnTheScreen()
  expect(queryByRole("button", { name: "Resume this visit" })).toBeNull()

  fireEvent.press(getByRole("button", { name: "Timeout blocked" }))
  expect(
    getByText("Automatic restart is blocked for this proximity episode after timeout."),
  ).toBeOnTheScreen()
  expect(
    getByText(
      "A prayer-window change, uncertain location, or reboot does not clear this block. It clears only after established departure from this mosque's detection area and subsequent re-entry.",
    ),
  ).toBeOnTheScreen()
  expect(getByRole("button", { name: "Resume this visit" })).toBeOnTheScreen()

  fireEvent.press(getByRole("button", { name: "Manual override blocked" }))
  expect(
    getByText("Automatic restart is blocked for this proximity episode after manual override."),
  ).toBeOnTheScreen()
})

it("demonstrates Stop and an explicit new session request locally", () => {
  const { getByText, getByRole, queryByRole } = renderPreview()

  fireEvent.press(getByRole("button", { name: "Applied sound suppression" }))
  expect(getByText("Sound suppression is active for this silencing session.")).toBeOnTheScreen()
  expect(
    getByText("Calls and messages still arrive; visual notifications are not hidden."),
  ).toBeOnTheScreen()

  fireEvent.press(getByRole("button", { name: "Stop app sound suppression" }))
  expect(
    getByText("The app restriction was released. Device sound settings were not changed."),
  ).toBeOnTheScreen()
  expect(
    getByText("Automatic restart is blocked for this proximity episode after manual stop."),
  ).toBeOnTheScreen()

  fireEvent.press(getByRole("button", { name: "Resume this visit" }))
  expect(getByText("New demonstration silencing session requested.")).toBeOnTheScreen()
  expect(
    getByText(
      "This explicit request uses a fresh maximum session duration, subject to valid proximity and required data.",
    ),
  ).toBeOnTheScreen()
  expect(
    getByText("A request does not confirm that sound suppression has been applied."),
  ).toBeOnTheScreen()
  expect(queryByRole("button", { name: "Stop app sound suppression" })).toBeNull()
})

it("preserves independent language direction and theme controls on the Sakina preview", () => {
  const { getByText, getByRole } = renderPreview()

  expect(getByText("Sakina status preview")).toHaveStyle({
    direction: "ltr",
    writingDirection: "ltr",
  })
  fireEvent.press(getByRole("button", { name: "العربية · RTL" }))
  expect(getByText("معاينة حالة سكينة")).toHaveStyle({ direction: "rtl", writingDirection: "rtl" })

  fireEvent.press(getByRole("button", { name: "داكن" }))
  expect(getByRole("button", { name: "داكن", selected: true })).toBeOnTheScreen()
  expect(getByText("تم رصد القرب من مسجد")).toHaveStyle({ color: "#EDF5F1" })

  fireEvent.press(getByRole("button", { name: "English · LTR" }))
  expect(getByText("Sakina status preview")).toHaveStyle({
    direction: "ltr",
    writingDirection: "ltr",
  })
})
