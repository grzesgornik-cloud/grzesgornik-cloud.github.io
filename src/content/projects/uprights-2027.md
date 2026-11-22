---
title: 2027 uprights
summary: I ran most of the simulation on our new front knuckles, from the OptimumK load cases through to nonlinear bolted-joint checks, and helped redesign them when the first results showed they weren't strong enough.
team: UCD Formula Student
year: '2027'
role: Simulation, and helping with the redesign
tools:
  - Ansys Mechanical
  - OptimumK
  - Onshape
stage: Analysis
cover: /projects/uprights-2027/front-knuckle.png
coverAlt: Render of the 2027 front knuckle with its bolt-on upper pickup bracket and steering bracket shown in a darker grey
metrics:
  - value: 0.823 kg
    label: front knuckle with brackets, down from 0.89 kg
  - value: ~2
    label: design factor of safety
  - value: 80 mm
    label: bearings, now in the knuckle (was 62 mm in the hub)
order: 2
draft: true
---

## What changed this year

After competition we got a lot of feedback on the 2026 uprights, and for 2027 they changed quite a bit. The bearings went from 62 mm, sitting in the hub, to much bigger 80 mm OD bearings mounted in the knuckle itself and spaced well apart. The material went from 6061 to 7075 aluminium for the extra strength, and the knuckle is now fully machined with no welding at all. The pickup and steering brackets bolt on.

On top of that, the whole thing has to fit inside a 10 inch wheel. Getting 80 mm bearings, the brackets and enough material around them into that space was a huge challenge, because there's very little clearance to the rim.

The suspension team and I worked on them together. My main job was the simulation, and when the first results showed the knuckles wouldn't be strong enough, I helped redesign them.

## Where the loads come from

The loads changed from 2026 as well. We generated them in OptimumK for the different situations the suspension will see, like hard cornering, braking while cornering and a 3g bump. Each case gives the forces at the upper and lower ball joints and at the steering pickup.

In Ansys I applied those forces through remote points at the upper pickup, the lower pickup and the steering arm, and held the knuckle at the bearing bore. That way the loads go into the part the way they would on the car, through the joints, instead of being stuck onto one face.

## Linear runs first

I ran every load case as a linear static analysis first, to find where the stress was highest and which cases were worst. The meshes were fine, at just over a million elements each, so I could trust the stresses around the bearing bore and the bracket mounts. The target was a factor of safety of about 2.

I also set up 6061-T6 and 6082-T6 alongside 7075 to compare them. In the end we went with 7075 for the strength.

## Checking the bolted joints

A linear run treats the brackets as if they were glued to the knuckle, which isn't how they really behave. So for the worst load cases I set up a nonlinear analysis with the actual bolts. It had bolt pretension on all four bolts and frictional contact between each bracket and the knuckle.

That told us two things. First, whether the brackets would slip under load. If they do, the bolts end up carrying the load in shear and the joint loosens over time. Second, how much clamping force we need to stop that, which we used to set the torque specs and the bolt grade.

## How it turned out

The front knuckle, including its brackets, is 0.823 kg, down from 0.89 kg last year. That doesn't include the bearings or bolts. It's designed to a factor of safety of about 2, even with the bigger bearings and the tighter packaging, and it will be CNC machined.

![Render of the 2027 rear knuckle, which is still being simulated](/projects/uprights-2027/rear-knuckle.png)

## Where it's at

I'm running the simulations on the rear knuckles now. The same process applies: OptimumK load cases, linear runs to find the worst ones, then nonlinear runs for the bolted joints.
