# Tamagui integration

Tamagui is the styling implementation foundation for future Mizan-based work. Mizan remains the design authority. The integration does not replace or wrap existing Sakina components.

## Token and theme source

`src/theme/tamagui.mapping.ts` projects the current Mizan Core values from `src/theme/mizan.ts` and the current Sakina semantic colors from `src/theme/colors.ts` and `src/theme/colorsDark.ts`. `src/theme/tamagui.config.ts` turns those projections into Tamagui tokens, fonts, and the `light` and `dark` themes.

Use the semantic theme values such as `$background`, `$color`, `$borderColor`, and `$tint` for Sakina Theme values. Mizan Core colors are available as `$mizanCanvas`, `$mizanSurfaceBase`, `$mizanTextPrimary`, and similarly named values. Spacing and radii use the existing Mizan keys, for example `$space.4` and `$radius.md`. The size scale references the same Mizan spacing values because Tamagui uses both categories; it does not define another scale.

Mizan typography is projected into language and variant font configurations such as `mizanArabicBodyLg` and `mizanEnglishDisplayLg`. Select the font configuration that matches the active locale and variant, and use its `$1` size and line-height entries together. The configured font family names are the same loaded Tajawal and Inter families used by Sakina. Continue to let the platform apply text scaling.

Mizan elevation remains the original React Native style map at `tamaguiMapping.core.elevation`. Tamagui has no matching structured elevation token category, so future components should apply the selected Mizan elevation style at the component boundary. Do not copy its shadow or elevation values into a second scale.

## Provider and appearance

`SakinaTamaguiProvider` reads `themeContext` from Sakina's existing `useAppTheme()` hook and passes it as Tamagui's `defaultTheme`. Sakina's persisted override and system appearance fallback remain the only appearance selection mechanism. The provider is mounted at the Expo Router boundary so native and web routes share the same config.

Localization and RTL remain owned by `src/i18n`. Choose the matching Arabic or English Mizan font configuration in future designed components; keep directional layout based on Sakina's current localization behavior and use logical start/end properties where appropriate.

## Future component work

Implement a Tamagui-backed component only for a feature with a reviewed Sketch or Figma design. Follow that design for composition and behavior. Extend Mizan only when the design demonstrates a reusable token or rule that is missing; keep one-off styling within the feature. Preserve accessible names, roles, states, keyboard focus on web, and dynamic text sizing. Do not migrate existing components as part of unrelated feature work.

The app uses Tamagui Core without the full component kit, optimizing compiler, or a custom Babel/Metro plugin. A future feature can add the component package when its reviewed design calls for Tamagui primitives. Add build tooling only when that feature demonstrates a need for it.

## Verification

`pnpm run check` covers TypeScript, lint, and the full Jest suite. Expo production exports were run for web, iOS, and Android, and Android preflight found an authorized `SM_G996U` device. Native bundle exports emitted Tamagui package subpath fallback warnings but completed successfully.

On-device visual inspection was not performed. The existing screens do not use Tamagui components, so this integration adds no rendered text or directional layout to inspect. Arabic/English font metrics, dynamic text sizing, and RTL presentation remain a visual check for the first designed Tamagui component.
