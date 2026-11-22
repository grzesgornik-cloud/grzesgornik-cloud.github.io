---
title: Circle of Doom
summary: A live race display I'm building on a Raspberry Pi. It shows every car on a circle by time gap, and where a driver would come out if they pitted now.
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
order: 4
draft: false
---

## The idea

When I watch a race, the question I always want answered is where a driver would come out if they pitted this lap. The timing tower doesn't really show you that, so I started building something that does.

The circle is one lap. Every car sits on it by time gap rather than where it is on track, so a car 25 seconds behind on a 100-second lap sits a quarter of the way round. Two buttons cycle through the drivers, and for whoever is selected, an arc shows where they'd rejoin after a stop. The plan is for it to run on a Raspberry Pi 4 in a 3D-printed case I've designed, and to start straight into the display when it's switched on.

## Who did what

I should be upfront that the Python is written with a lot of help from AI. What I've done is decide how it should work, which is really the strategy side of it, plus the hardware and the enclosure.

The gaps are measured at the three timing points on each lap (the line and the two sector ends), using the last point both cars have passed. That one rule handles cars ahead, cars behind, lapped cars and cars in the pits.

The size of the circle comes from a typical lap time, which is the median of the last 40 clean laps. Lap 1, in-laps, out-laps and any lap with a yellow flag, VSC, Safety Car or red flag are left out. Without that, the whole circle would shrink and stretch every time the field slowed down.

Race control messages are turned into periods (green, VSC, Safety Car or red flag), so the display knows when the gaps can be trusted. A car counts as retired once the rest of the field has done two laps without it. I first tried a time-based rule, but after the red flag restart at Zandvoort it marked 16 cars as retired.

## Testing it on real races

Everything is built and tested on recorded race data first, using the same code the live version will use. I replayed three 2026 races as if they were live, updating every 10 seconds, and compared every car's gap with OpenF1's own figure:

| Race | What made it tricky | Median difference | Laps down matched |
|---|---|---|---|
| Silverstone | Two VSCs, then a Safety Car to the flag | 0.07 s | 99.7% |
| Zandvoort | Red flag on lap 2 | 0.07 s | 99.7% |
| Singapore | Two VSCs | 0.07 s | 99.8% |

While doing this I found that OpenF1's pit stop time is when the car leaves the pit lane, not when it goes in. Across more than 70 stops, the car always entered about 6 seconds before crossing the line, which matters a lot once I start working out rejoin positions.

## Where it's at

The data side, the gap maths and the race status logic are built and tested, which is steps 2 to 5 of an 11-step plan. I've got all the hardware. Next up is working out pit loss and the rejoin window, and after that the screen itself, the buttons, getting it to start on boot, and switching it over to live data.
