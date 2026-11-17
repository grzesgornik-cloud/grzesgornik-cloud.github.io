---
title: Circle of Doom
summary: A live F1 strategy display for a Raspberry Pi. One lap is a circle, every car sits on it by time gap, and the selected driver's pit rejoin window is drawn as an arc.
team: Personal project
year: '2026'
role: Strategy logic, hardware and enclosure
tools:
  - Python (AI-assisted)
  - OpenF1 API
  - Raspberry Pi 4
  - 3D printing
stage: Design
cover: /projects/circle-of-doom/circle-singapore-lap30.png
coverAlt: A circle representing one lap of Singapore 2026, lap 30, with every driver placed around it by their time gap to Verstappen at the top, and lapped cars shown as hollow markers
metrics:
  - value: 0.07 s
    label: median gap difference from OpenF1, across three 2026 races
  - value: 99.7%
    label: agreement on laps down
  - value: '100'
    label: automated tests passing
order: 3
draft: false
---

## The idea

During a race, the strategy question that matters most is "if we pit now, where do we come out?". A timing tower can't show that at a glance. The Circle of Doom can.

The circle is one lap. Every car sits on it by **time gap**, not track position: a car 25 s behind on a 100 s lap sits a quarter of the way round. Two buttons step through the drivers, and for the selected one, an arc shows where they would rejoin if they pitted now. It will run on a Raspberry Pi 4 in a 3D-printed enclosure I designed, booting straight into the display.

## How I split the work

The Python is written with AI assistance. My part is the strategy logic, which defines what the code has to get right, plus the hardware and the enclosure. The rules include:

- **How a gap is measured.** Each car crosses three timing points a lap: the line and the two sector ends. The gap between two cars is taken at the last point both have crossed. One rule covers cars ahead, cars behind, lapped cars and pit stops, with no special cases.
- **What lap time sets the circle's scale.** It's the median of the 40 most recent representative laps. That leaves out lap 1, in-laps and out-laps, and any lap touched by a yellow, VSC, Safety Car or red flag. Without that filtering, the whole circle would visibly shrink and stretch every time the field was neutralised.
- **What the race is doing.** Race control messages are turned into periods (green, VSC, Safety Car, red flag), so the display knows when gaps can be trusted.
- **When a car has retired.** A car counts as stale once the rest of the field has moved on two laps without it, measured against the field rather than the clock. A clock-based rule marked 16 cars as retired just after the Zandvoort red-flag restart.

## Proving it on real races

Everything is built and tested on recorded data first, using the same code path the live version will use. I replayed three 2026 races exactly as the display would have seen them live, every 10 seconds, and compared each car's gap with OpenF1's own figure:

| Race | What made it hard | Median difference | Laps down agree |
|---|---|---|---|
| Silverstone | Two VSCs, then a Safety Car to the flag | 0.07 s | 99.7% |
| Zandvoort | Red flag on lap 2 | 0.07 s | 99.7% |
| Singapore | Two VSCs | 0.07 s | 99.8% |

Along the way, the data turned up something that matters for pit strategy. OpenF1's pit stop timestamp is when the car **leaves** the pit lane, not when it enters. Across more than 70 stops, entry was always about 6 seconds before the car crossed the line. The rejoin maths depends on getting that right.

## Where it is now

The data pipeline, the gap maths and the race-status logic are built and validated: steps 2–5 of an 11-step plan. The hardware is in hand. Next is the part the display is named for: **pit loss and the rejoin window**, followed by the screen renderer, the buttons, the Pi's start-up service and live data.
