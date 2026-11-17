---
title: 2027 chassis
summary: UCD Formula Student's first full chassis redesign. I built the method that set its stiffness target, and the design now beats it by 13% while weighing the same as last year's frame.
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

## The brief

UCD Formula Student had always redesigned half of the chassis each year. For 2027 the team started from a clean sheet. The goals were a stiffer frame at no extra mass, plus mounts for a rocker-actuated suspension instead of the previous direct-acting layout.

## Setting the target

Before designing anything, we needed to know how stiff was stiff enough. If the chassis is too soft, it twists instead of the suspension doing its job, and setup changes stop doing what the vehicle dynamics team expects. If it's too stiff, the car carries weight for no gain.

This was the part I was most involved in. I built the framework the team used to set the target. It takes the suspension's roll stiffness and treats the chassis and suspension components as linear springs in series. From that, you can work out the chassis torsional stiffness at which the frame stops meaningfully diluting the roll stiffness the suspension was designed for. For the 2027 car, that gave a target of **1,750 Nm/°**.

## Three designs into one

The chassis started as three parallel designs. We narrowed those to two, then combined the strongest ideas from each into one master design.

The stiffness came from three changes:

- **Bigger tubes.** A mix of 30 mm and 28 mm outside diameter tubes, up from 25 mm the year before.
- **Better triangulation.** I used the FEA displacement plots to find the points moving most, and in which direction, then routed new tubes to triangulate those points. Bays that had been carrying load in bending now carry it in tension and compression instead.
- **Fewer tubes.** Every tube that wasn't earning its mass came out, which paid for the larger diameters.

## Proving it

I validated the design in Ansys with a beam model of the frame and rigid suspension geometry. A torque is applied at the front axle with the rear held, then the reverse. The current design reaches **1,980 Nm/°**, 13% above target and 68% stiffer than the previous chassis.

![Ansys total deformation plot of the chassis under torsion, largest at the front bulkhead and zero at the rear](/projects/chassis-2027/torsion-deformation.png)

## Mass

The bare frame comes in at 46 kg in 1020 steel, the same mass as last year's. With every mount added, the current estimate is about 54 kg. That's nearly 2 kg lighter than last year, even though it carries more mounts for the rocker suspension. The full-mount figure will firm up as the mounts are finalised.

## Where it is now

The chassis is in the final stages of analysis, ahead of release for manufacture.
