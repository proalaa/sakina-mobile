# Mosque silence app: working MVP brief

Date: 13 October 2026

This records the product exploration. It is not a claim of technical feasibility or approval to build the app. No tests have been performed on the user's phone.

## Purpose and first user

Automatically suppress phone sounds when eligible mosque proximity is detected. The MVP uses map-based mosque locations and proximity detection; it does not require precise mosque boundaries or promise proof of physical entry. The first user often forgets to silence the phone because calls are rare; an unexpected ring disrupts the user and nearby worshippers.

First device: Samsung SM-G996U, Android 14. Validate in Sana'a, Yemen, then repeat the relevant tests in Riyadh, Saudi Arabia. These are test locations, not city restrictions in the app.

## Agreed requirements

- Work with both locked and unlocked screens, without opening the app for each visit.
- Experimental timing target: aim to apply sound suppression within five seconds of an eligible arrival or eligibility beginning while already near a mosque. Measure actual performance, including location-event delay and sound-application time. Five seconds is not a strict requirement or release blocker; adjust the experimental target based on feasibility findings.
- Use map-based mosque locations and proximity detection for the MVP. Precise mapped boundaries are not required. Accept reasonable accuracy limitations and validate them during testing, recording missed arrivals and unintended activations.
- Prioritize avoiding unintended silencing over detecting every visit.
- Discover nearby mosques automatically from map or mosque data; users do not manually register each mosque.
- Refresh nearby discovery on travel. A city-selection screen is not needed for the initial MVP.
- Settings includes **Silence outside prayer windows**, enabled by default: silence whenever mosque proximity is detected, subject to the other activation safeguards. When disabled, local prayer times and local timezone filter activation. Ordinary prayers share customizable before/after offsets, initially 15 minutes before and 45 minutes after.
- Friday has a separate customizable activation window anchored to local Dhuhr time, replacing the ordinary Dhuhr window that day. Its defaults are 30 minutes before and 60 minutes after. Ordinary and Friday before/after offsets each allow 0–120 minutes in five-minute increments.
- In prayer-window-filtered mode, automatically activate when both mosque proximity and an eligible local prayer window are present, subject to manual-override and timeout blocks. Proximity established before a window opens can become eligible at window opening.
- Settings includes **Continue silencing after the prayer window closes**, enabled by default: an active session continues until departure, timeout, or manual override. When outside-window silencing is enabled, this preference is inactive, displays an explanation, and retains its saved value.
- When both preferences are disabled, release the app's restriction when the current eligible window ends. Overlapping windows count as continuous eligibility. A later eligible window can start a new session while mosque proximity remains valid, provided no timeout, manual-stop, or override block applies. Window closure does not reset such a block.
- Timing settings and window preferences are captured at session start; edits apply to the next session and are labeled **Applies next session**. Turning automation off or pressing Stop takes effect immediately. Turning automation back on does not bypass a same-visit restart block.
- Automation starts off until explicitly enabled. Preserve the user's automation preference, original session deadlines, and restart blocks across interruptions. Never automatically reset a session timer. Re-establish required proximity, data, and permissions before a new activation; display **Unavailable** when enabled automation cannot operate. Validate recovery behavior during testing.
- Provide an optional **Start on Device Boot** setting, **off by default**, subject to Android background execution restrictions. When enabled, it restores previously enabled automation without overriding a saved automation-off preference. When disabled, opening the app can resume previously enabled automation after checking prerequisites.
- Select Android Silent mode or DND based on verified sound suppression. DND itself is not a product requirement. The intended suppression covers incoming ringing, notification sounds, alarms, media, and ordinary system sounds, with no favourite/repeat-caller or other call exceptions.
- Release the app's sound restriction on detected departure, maximum-duration expiry, manual override, or configured window closure. The maximum is customizable from 20–180 minutes in five-minute increments, with a confirmed default of 60 minutes. The 20-minute minimum does not prevent departure from ending a shorter session.
- Feasibility target: release the app's restriction within 30 seconds of actual physical departure, preserving other sound restrictions. Test for false departure while the person remains inside. Timeout is the fallback when departure cannot be established. The timing target is not a guaranteed Android capability.
- Respect sound restrictions enabled manually by the user. Ending the app's session must not forcibly make the phone audible.
- Operate offline using previously downloaded, valid required data. Valid mosque data is required for activation. Prayer-time data is additionally required for prayer-window-filtered activation; it does not block mosque-presence mode. Clearly mark unavailable prayer information. If required data is missing or unusable, do not start a new sound restriction. Refresh data when connectivity returns.
- If required data becomes unusable during an active session, retain its original expiry and established end conditions, allow detected departure to end it, and prevent new activations. Data failure must not extend the restriction indefinitely or forcibly make the phone audible.
- Precise/background location and an experimental foreground location service with a visible indicator are acceptable for feasibility testing. Measure battery consumption before selecting the production approach.
- Postpone microphone/audio AI in the first MVP. Environmental audio recognition remains an intended future feature.

## Smallest useful MVP, conditional on feasibility

An Android app with automatic nearby mosque discovery, map-based proximity detection, optional prayer-window filtering, automatic sound suppression, departure/timeout release, and the agreed settings.

The next milestone is the feasibility experiment. Review observed detection accuracy, timing, battery use, and limitations before proceeding to live sound tests. Compare sound modes in a controlled setting before enabling mosque automation. Exceeding the experimental five-second target alone does not block release.

Use the approved screen composition in `design/screens/`, reconciled with these functional requirements. Include automation on/off, session status, settings, and local testing diagnostics.

Retain diagnostic logs locally until explicitly cleared. Record trial observations and relevant state transitions rather than unrelated continuous movement. Provide deletion and export to a local file; do not transmit logs automatically.

Confirmed scope and controls:

- No account, social features, other silent venues, or cloud travel-history storage in the first MVP.
- A pause/stop control releases only the app's restriction. Explicit user sound changes take precedence: a change making the phone audible ends the app's restriction.
- A **proximity episode** is continuous detected proximity around a particular mapped mosque. For restart blocking, "this visit" means the current proximity episode rather than proven physical attendance inside the mosque.
- Timeout, manual stop, or an explicit audible override prevents automatic reactivation during the same proximity episode. The block clears only after established departure from that mosque's detection area and subsequent re-entry. Uncertain location, prayer-window changes, and reboot do not clear it. Detection thresholds remain experimental. An explicit **Resume this visit** action starts a new session with a fresh maximum-duration deadline, provided mosque proximity and required data remain valid.
- Radius is an experimental parameter, not an established 50–100-metre promise.
- Device/source selection and reasonable internal implementation details can be determined from evidence rather than exposed as user setup choices.

## Feasibility experiments and validation

### 1. Data coverage

Check whether the chosen source discovers the mosques used in the test, including unfamiliar mosques. Compare coordinates with the actual buildings and nearby streets/buildings. Automatic discovery must work without manually entering mosque locations into the app.

Coverage in Sana'a and Riyadh has not been measured. Google Places and OpenStreetMap offer discovery mechanisms, but availability does not establish complete or accurate coverage. A data provider has not been selected.

### 2. Detection experiment without changing sound settings

The initial feasibility screen contains 80 cases: 20 actual arrivals and 20 nearby non-visits inside prayer windows, plus 20 actual arrivals and 20 nearby non-visits outside prayer windows. Aim for five-second responses and zero unintended activations as experimental benchmarks; report actual latency, missed arrivals, and unintended activations. Reasonable proximity-detection limitations are accepted for the MVP and must be evaluated from the results. Include both locked and unlocked screens, with 10 trials per screen state in each 20-case group. These benchmarks are not guaranteed capabilities.

Non-visits must include walking past, driving past, and remaining in an adjacent building without entering. Include each scenario in both screen states and in the inside-window and outside-window groups. Use mosque-presence mode for the detection screen so prayer filtering cannot hide location mistakes. Separately test already-inside activation, preference combinations, window boundaries, and same-visit restart blocking.

Record observed arrival/physical entry separately from detected proximity and the would-trigger timestamp, to expose early triggers and location-event delay. Precise mapped mosque boundaries are not required. For activation while already nearby, record when eligibility begins. Include the automatically discovered mosque, location accuracy, screen state, prayer-window eligibility, and outcome. Measure battery use against comparable use without the experiment running.

The initial 80-case test is a feasibility screen, not evidence of universal reliability. Also inspect departures against the 30-second release target, false departures, missing data, travel refresh, and offline use before enabling automation.

In subsequent sound tests, measure end-to-end time through applying the sound restriction, in addition to detection latency. Use actual results to evaluate and adjust the experimental five-second target. Do not infer end-to-end performance from detector latency alone.

Provisional battery acceptance budget: no more than five additional battery percentage points over eight hours of monitoring in the default mosque-presence mode, compared with similar use without monitoring on the test phone. Record the test conditions and results; revisit the approach if it exceeds the budget.

### 3. Sound-mode comparison on the actual phone

After reviewing the detection experiment's actual results and limitations, compare modes in a controlled setting away from worship. The comparison must check:

| Check | Silent/Mute result | DND No interruptions result |
|---|---|---|
| Ordinary incoming cellular call | Untested | Untested |
| Favourite and repeated caller | Untested | Untested |
| Incoming VoIP call | Untested | Untested |
| SMS and app notification, including any configured DND bypass | Untested | Untested |
| Alarm/timer; inspect Samsung Clock's silence setting | Untested | Untested |
| Already-playing music/video and newly started media | Untested | Untested |
| Ordinary system/touch sounds and alert vibration | Untested | Untested |
| Existing manual DND before app activation | Untested | Untested |
| Manual sound changes during the session | Untested | Untested |
| Departure/timeout restoration with another sound restriction active | Untested | Untested |

Repeat relevant checks with the screen locked and unlocked. Record the installed One UI and Clock versions. Select the simplest mechanism that passes the required suppression and restoration tests; do not choose from the mode name alone.

## Verified documentation versus unverified device behavior

| Category | Silent / Samsung Mute | DND No interruptions |
|---|---|---|
| Incoming ringing and normal notification alerts | Intended to silence | Intended to suppress |
| Alarm sound | Samsung Clock setting-dependent | Alarm stream muted under documented policy |
| Media | Separate volume; Silent alone provides no all-media guarantee | Media stream muted under documented policy |
| Ongoing call conversation | Not a conversation-audio mute | Phone-call streams are exempt |
| Every possible OS sound and vibration | Not guaranteed | Not guaranteed |

Android's strongest documented DND setting is `INTERRUPTION_FILTER_NONE`. A normal DND toggle using a priority policy can allow exceptions. Calls and messages still arrive: sound suppression does not mean delivery blocking or deletion. Visual notification hiding is separate from the current sound requirement.

For DND, an app-owned `AutomaticZenRule` is a candidate because it can be activated and deactivated without switching global DND off on exit. Android 14 manual DND precedence may prevent an automatic rule from making an existing permissive manual mode stricter; Samsung behavior must be tested. Silent-mode transitions can also interact with DND and policy-access permissions.

No direct phone-control connection is available in this session. Documentation checks are complete enough to define the tests, but neither mode has been verified on the actual handset. Accessibility/privileged audio and ongoing conversation audio prevent a blanket promise to suppress every possible device sound.

## Main challenge and AI roadmap

Map-based location indicates proximity; optional prayer-window filtering adds a timing condition. The MVP accepts that proximity does not prove physical mosque entry. Android's ordinary background geofencing can report events minutes later. More frequent location updates may improve timing but do not establish indoor precision and increase battery use. Measure these trade-offs on the test phone. The five-second target is experimental, not a strict requirement or release blocker.

If testing reveals Android limitations, document the observed results, test conditions, and limitations, then propose realistic alternatives. Experimental timing targets may be adjusted based on feasibility results; changes to agreed functional requirements require explicit user approval. Do not describe targets or mockup metrics as validated capabilities.

AI remains a planned follow-up. Recommended release gate: demonstrate that audio recognition reduces a measured detection problem, with acceptable microphone permissions and battery consumption. Hearing prayer audio outside a mosque is another potential false-positive case; audio recognition must be evaluated against physical-entry ground truth too.

## Sources

- [Android geofencing constraints and guidance](https://developer.android.com/develop/sensors-and-location/location/geofencing)
- [Android location accuracy, latency, and battery tradeoffs](https://developer.android.com/develop/sensors-and-location/location/battery)
- [Android Silent-mode API](https://developer.android.com/reference/android/media/AudioManager#setRingerMode(int))
- [Android No interruptions definition](https://developer.android.com/reference/android/app/NotificationManager#INTERRUPTION_FILTER_NONE)
- [App-owned DND rule state API](https://developer.android.com/reference/android/app/NotificationManager#setAutomaticZenRuleState(java.lang.String,android.service.notification.Condition))
- [Samsung DND configuration](https://www.samsung.com/us/support/answer/ANS10002889/)
- [Samsung alarm settings](https://www.samsung.com/us/support/answer/ANS10002623/)
- [Android 14 DND implementation and manual precedence](https://android.googlesource.com/platform/prebuilts/fullsdk/sources/+/88c7ff1cd72d6305ec59f97aadc2198cc2dc3592/android-34/com/android/server/notification/ZenModeHelper.java#1062)
- [Google Places nearby discovery](https://developers.google.com/maps/documentation/places/web-service/nearby-search)
- [OpenStreetMap mosque tagging](https://wiki.openstreetmap.org/wiki/Tag:building%3Dmosque)

## Current state

The requirements interview is complete and shared understanding was confirmed on 13 October 2026. Sound mechanism, mosque-data coverage, measured proximity accuracy and response timing, battery impact, boot/recovery behavior, and sound restoration remain technical questions to resolve through the specified tests. The next milestone is the feasibility experiment. No app implementation or on-device validation has been performed.
