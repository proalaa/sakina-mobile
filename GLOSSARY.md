# Mosque Silencing

Language for the mosque-silencing product, based on the agreed requirements in `docs/products/MVP.md`.

## Language

**Sound suppression**:
Preventing audible ringing, notifications, alarms, media, and ordinary system sounds during an eligible proximity episode. Calls and messages still arrive; sound suppression does not imply blocking delivery or hiding visual notifications.
_Avoid_: Call blocking, notification blocking

**Prayer activation window**:
A period relative to a local prayer time, interpreted in the local timezone, used to filter activation when outside-window silencing is disabled. Friday has a separate activation window anchored to Dhuhr.
_Avoid_: Session duration

**Mosque visit**:
A person's actual attendance at a mosque, used as an observation when evaluating detection. The MVP detects proximity and does not establish that a physical visit occurred.
_Avoid_: Geofence presence

**Mosque proximity**:
Being near a mosque identified in map data. This is the MVP's activation signal and does not establish physical entry.
_Avoid_: Proven mosque entry

**Proximity episode**:
Continuous detected proximity around a particular mapped mosque, ending with established departure from its detection area. A new episode requires subsequent re-entry; uncertain location, prayer-window changes, and reboot do not establish departure.
_Avoid_: Proven mosque visit

**Silencing session**:
A bounded period during which the app applies its own sound restriction after eligible mosque proximity is detected. A session can end while the proximity episode continues.
_Avoid_: Mosque visit, global DND state

**Mosque-presence mode**:
Activation based on detected mosque proximity without filtering by prayer windows. This is the default mode when outside-window silencing is enabled.
_Avoid_: Prayer-window-filtered mode

**Prayer-window-filtered mode**:
Activation that requires detected mosque proximity and an eligible local prayer activation window. This mode applies when outside-window silencing is disabled.
_Avoid_: Mosque-presence mode

**Resume this visit**:
An explicit user request for a new silencing session during the current proximity episode, subject to valid mosque proximity and required data. It has a fresh maximum session duration.
_Avoid_: Automatic restart

**Manual override**:
An explicit user action that ends the app's sound restriction during a proximity episode, including a sound change that makes the phone audible. It prevents automatic reactivation during that episode.
_Avoid_: Departure

**Maximum session duration**:
The longest permitted duration of the app's sound restriction for a session. Detected departure can end a session sooner.
_Avoid_: Prayer activation window, minimum visit duration

**Mizan Design System**:
The reusable visual language used by the product, defined by `design/DESIGN.md` and `design/reference/`, with separate Mizan Core and Sakina Theme layers.
_Avoid_: Individual screen design

**Mizan Core**:
The shared visual foundations and components intended for reuse across applications.
_Avoid_: Sakina Theme

**Sakina Theme**:
The application-specific expression of Mizan for mosque silencing.
_Avoid_: Mizan Core
