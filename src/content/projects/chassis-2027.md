---
title: 2027 chassis
summary: Our first full chassis redesign. I worked out how stiff it needed to be, and the current design is 13% over that target at the same frame mass as last year.
team: UCD Formula Student
year: '2027'
role: Chassis mechanical engineer, stiffness targeting
tools:
  - Onshape
  - Ansys Mechanical (beam FEA)
stage: Analysis
cover: /projects/chassis-2027/chassis-render.png
coverAlt: CAD render of the 2027 steel spaceframe chassis, with the main and front roll hoops in orange and suspension mounting brackets in teal
metrics:
  - value: +68%
    label: torsional stiffness at the same frame mass
  - value: 1,980 Nm/°
    label: against a 1,750 Nm/° target
  - value: ~54 kg
    label: estimated with all mounts, about 2 kg lighter than 2026
gallery:
  - image: /projects/chassis-2027/torsion-deformed-overlay.png
    alt: Ansys total deformation plot with the undeformed chassis overlaid in grey
    caption: The same torsion case with the undeformed frame overlaid, showing how the front of the chassis winds up relative to the rear.
order: 1
---

## Starting from scratch

Until this year, UCD Formula Student redesigned about half of the chassis each season. For 2027 we started from a clean sheet. We wanted a stiffer frame that weighed no more than the old one, and it needed mounts for a rocker-actuated suspension instead of the direct-acting setup we had before.

## How stiff is stiff enough?

This is the part I spent most of my time on. When the car corners, load transfers to the outside tyres, and how that load transfer is split between the front and rear axles depends on the roll stiffness at each end. That split is a big part of how the car balances. If the chassis twists between the axles, some of that split is lost. You could make the chassis stiffer and stiffer, but it gets heavier every time, so we needed a number to design to.

I wrote the method the team uses to set that number, along with a calculator the rest of the team can rerun when the suspension changes. It's based on the paper *The Effect of Chassis Stiffness on Race Car Handling Balance* by Deakin, Crolla, Ramirez and Hanley (SAE 2000-01-3554), with some help from *Design, Analysis and Testing of a Formula SAE Car Chassis*.

The paper has a rule of thumb: the acceptable loss X (in percent) divided by 20 equals the ratio of total roll stiffness to chassis stiffness. That rule was read off a graph for a car with a 50:50 weight split and a 60:40 roll split, though, and ours is 55:45 and 52:48. So I went back to the paper's equations and derived a version that works for our numbers. It treats the car as three springs in series: the front roll stiffness ρK, the chassis K<sub>ch</sub>, and the rear roll stiffness (1 − ρ)K. Working out the torque the chassis carries gives the front load transfer distribution:

```text
LTD_front = w + (ρ − w)·η
η         = 1 / (1 + r·ρ(1 − ρ))
r         = K / K_ch
```

η is the fraction of the roll split you actually keep. A perfectly rigid chassis gives η = 1. A very soft one gives η = 0, and the split just falls back to the weight distribution w. If you call the loss X = 1 − η and rearrange, you get the chassis stiffness directly:

```text
K_ch = K(1 − X)·ρ(1 − ρ) / X
```

For our car the total roll stiffness is K = 542 Nm/°, with ρ = 0.52 and w = 0.55, and we allowed an 8% loss. That works out at 1,556 Nm/° at the wheels, about 2.9 times the roll stiffness and 10% stiffer than the rule of thumb would have given us.

The chassis isn't the only thing that flexes, either. The wishbones and uprights add their own compliance, so we gave them a placeholder target of 16,000 Nm/° (roughly ten times the chassis target) until we have FEA or test values for them. For simulation that's about 1,270 N/mm at each corner, assuming a 1.2 m track. Taking that out leaves a chassis-only target of 1,723 Nm/°, which we rounded to 1,750 Nm/°. An earlier version of my report used a higher roll stiffness of 713 Nm/° and came out at about 2,200 Nm/°. The roll stiffness was lowered after that, which brought the target down.

![Line chart of the share of the roll-split effect lost to flex, using the final roll stiffness of 542 Nm per degree and installation stiffness of 16,000. Loss falls from about 15% at 800 Nm per degree to about 5% at 3,000. The previous chassis, estimated at 1,180, loses 11.0%; the 1,750 target loses 7.9%, inside the 8% limit; the 2027 design at 1,980 loses 7.1%.](/projects/chassis-2027/roll-split-loss.png)

This chart is the same model run across a range of chassis stiffnesses. With this year's suspension, the old chassis would lose about 11% of the roll split, and the new one about 7%. I estimated the old chassis's stiffness by working back from the 68% gain, so take that point as approximate.

## Three designs, then one

We started with three different chassis designs, cut them down to two, and then took the best parts of both to make one master design.

![Bare chassis frame from the V3.5 iteration, a work-in-progress version from September 2026](/projects/chassis-2027/chassis-v3-5-wip.png)

Most of the extra stiffness came from going to bigger tubes, a mix of 30 mm and 28 mm outside diameter, where last year's car used 25 mm. I also used the displacement plots from the FEA to see which points were moving the most and in which direction, and added tubes to triangulate those areas, so bays that had been bending now carry their load in tension and compression. To pay for the bigger tubes, we took out any tube that wasn't doing much.

## Checking it in Ansys

I checked the design with a beam model in Ansys, with the suspension geometry modelled as rigid. I applied a torque at the front axle with the rear held, and then the other way round. The current design comes out at 1,980 Nm/°, which is 13% over the target and 68% stiffer than the previous chassis.

![Ansys total deformation plot of the chassis under torsion, largest at the front bulkhead and zero at the rear](/projects/chassis-2027/torsion-deformation.png)

## Weight

The bare frame is 46 kg in 1020 steel, the same as last year's. With all the mounts on, we're estimating about 54 kg, which is nearly 2 kg lighter than last year even with the extra mounts for the rockers. That number should firm up once the mounts are finished.

## What the method can't tell us

I put a section on limitations in the report, because the target is a guide and not a hard rule. The model is simplified. It treats the car as three torsional springs and assumes the chassis twists evenly between the axles, so it ignores bending, local flex around the suspension pickups and anything dynamic, and it assumes the same centre of gravity height at both ends. We also haven't been able to validate it against the original paper's curves yet.

The biggest judgement call is the acceptable loss. The paper allowed up to 20%. We went with 8% because a smaller, heavier electric car is harder to balance, but the target is sensitive to it: 7.5% would ask for about 1,860 Nm/° and 10% for about 1,320 Nm/°. Load transfer is also only part of the handling picture, since tyres, roll centres, kinematics and the differential all matter too.

So the plan is to test it. We'll do a static torsion test on the real chassis, measuring at several points along its length and loading and unloading it a few times to check it behaves linearly. We'll also test the stiffness of the corner assemblies and measure the real roll stiffness and centre of gravity height. Then skidpad runs, looking at understeer gradient and roll angle, should tell us whether the car handles the way the model says it should.

## Where it's at

The chassis is in the final stages of analysis, and the next step is releasing it for manufacture.
