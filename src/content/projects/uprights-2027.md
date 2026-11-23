---
title: 2027 uprights
summary: I ran most of the simulation on our new front knuckles, using linear runs to find the worst load case and nonlinear runs to check the bolted joints, and helped redesign them along the way.
team: UCD Formula Student
year: '2027'
role: Simulation, and helping with the redesign
tools:
  - Ansys Mechanical
  - OptimumK
  - Onshape
stage: Analysis
cover: /projects/uprights-2027/new-front-view.png
coverAlt: Front view of the final 2027 front knuckle in Onshape, with the bolt-on brackets shown see-through
metrics:
  - value: '2.29'
    label: minimum safety factor, nonlinear bolted model
  - value: 0.823 kg
    label: front knuckle with brackets, down from 0.89 kg
  - value: 80 mm
    label: bearings, now in the knuckle (was 62 mm in the hub)
gallery:
  - image: /projects/uprights-2027/nonlinear-contact-pressure.png
    alt: Ansys contact pressure plot on the two bracket faces, peaking at 172 MPa around the bolt holes
    caption: Contact pressure under the brackets in the Max Brake case. It peaks at 172 MPa right around the bolt holes, where the preload is.
order: 2
draft: true
---

## What changed this year

After competition we got a lot of feedback on the 2026 uprights, so they changed a lot for 2027.

This is the 2026 front knuckle on the car. It's made from smaller CNC machined parts welded together, and you can see the welds near the bottom:

![The 2026 front knuckle fitted to the car inside its 13 inch wheel, with the wishbones, steering arm and brake disc attached and welds visible near the lower bracket](/projects/uprights-2027/knuckle-2026-fitted.jpg)

And the same part in CAD:

![The 2026 front knuckle in Onshape, made from smaller machined parts welded together, with a small spindle and the bearings in the hub rather than the knuckle](/projects/uprights-2027/knuckle-2026.png)

The bearings went from 62 mm, sitting in the hub, to 80 mm OD bearings mounted in the knuckle and spaced well apart. The knuckle is fully machined now, with no welding at all, and the upper pickup bracket and the steering bracket bolt on.

The wheels are also going from 13 inch to 10 inch for 2027, and fitting everything inside the smaller wheel was a huge challenge. There's very little clearance to the rim once you fit 80 mm bearings, two brackets and enough material around them.

That's also what decided the material. We started the 2027 knuckle in 6061, the same as last year, and it failed in simulation. 6082 failed too. A 6000 series knuckle could have worked with extra material, but then it wouldn't have cleared the wheel. So we went to 7075, which is much stronger and let us keep the part the size it needed to be.

The suspension team and I worked on them together. My main job was the simulation, and I helped with the redesign when the results showed the first version wasn't strong enough.

## Where the loads come from

We generated the load cases in OptimumK for the different situations the suspension will see: maximum cornering, maximum braking, maximum acceleration, braking while cornering (for both the outside and the inside wheel), a kerb strike and a 3g bump. Each one gives the forces at the upper and lower ball joints and at the steering pickup. In Ansys I applied those through remote points at the joints, so the load goes into the part the way it would on the car, and held the knuckle at the bearing bore.

Here's the setup for Brake + Corner. The lower pickup takes the most, at about 4.2 kN, with roughly 2.1 kN at the upper pickup and 2.2 kN at the steering arm. The 515 N·m of brake torque goes in through the caliper mounts, and the bearing bore is held fixed:

![Ansys setup for the Brake + Corner case on the front knuckle: 2145.6 N at the upper pickup, 2230.2 N at the steering arm, 4157.5 N at the lower pickup, 515 N·m braking torque at the caliper mounts, and a fixed support at the bearing bore](/projects/uprights-2027/setup-brake-corner.png)

## Two ways of simulating the same part

I simulated the knuckle in two different ways, and they don't give quite the same answer. Most of what I learned on this project came from understanding why.

### Linear: finding the worst load case

The first pass was a linear static analysis of every load case. In a linear model the brackets are bonded to the knuckle, as if they were glued on, so nothing can slide or separate. That makes it quick to solve and easy to compare cases, which is exactly what you want when you're looking for the worst one.

These are the results for the final design. Loads are in kN, and the minimum safety factor is against yield:

| Load case | Weak spot | Upper | Lower | Steering | Min SF |
|---|---|---|---|---|---|
| Brake + Corner (outside) | Steering arm fillet | 2.15 | 4.16 | 2.23 | 2.32 |
| Max Brake | Lower pickup clevis | – | – | – | 2.54 |
| Kerb Strike | Top bracket, by the bolt holes | 2.13 | 3.15 | 0.24 | 3.03 |
| Max Corner (outside) | Below the top bracket | 1.56 | 3.48 | 0.33 | 3.80 |
| Brake + Corner (inside) | Lower pickup clevis | 0.81 | 2.01 | 0.38 | 7.20 |
| 3g Bump | – | 2.65 | 1.04 | 0.27 | – |
| Max Accel | None | 0.09 | 0.03 | 0.01 | over 15 |

Under acceleration the weight moves to the rear, so the front knuckle hardly sees any load. The braking cases are the ones that matter, because the brake torque (515 N·m on the outside wheel) goes through the knuckle as well.

Brake + Corner on the outside wheel came out worst, with a minimum safety factor of 2.32. The weak spot was the fillet where the steering arm joins the body of the knuckle.

![Ansys safety factor plot for the Brake + Corner case, mostly blue, with a minimum of 2.32 at the root of the steering arm](/projects/uprights-2027/linear-brake-corner-sf.png)

Zoomed in, it's a small area right on the edge of the fillet, a few millimetres across:

![Close-up of the minimum safety factor region at the steering arm fillet, minimum 2.32](/projects/uprights-2027/linear-brake-corner-sf-zoom.png)

### Nonlinear: modelling the bolted joints

The trouble with the linear model is that the brackets aren't actually glued on. They're held by bolts, and what matters is whether the clamping force is enough to stop them from slipping. So for the worst cases I built a nonlinear model with the real joints in it. It has bolt pretension on all four bolts, and frictional contact between each bracket and the knuckle, so the faces can stick, slide or separate.

It runs in two steps. Step 1 tightens the bolts, and step 2 applies the load on top of that preload. That's how the joint actually sees it on the car.

In the Max Brake case, the minimum safety factor came out at 2.29. That's close to the linear answer, but in a completely different place: around the bolt holes on the top bracket.

![Ansys safety factor plot for the nonlinear Max Brake case, minimum 2.29 at the bolt holes of the top bracket](/projects/uprights-2027/nonlinear-max-brake-sf.png)

The contact results are what this model was really for. Almost all of each bracket face stays sticking, with a ring of "near" contact around the edges where the faces just start to open up. The most any point slides is about 0.025 mm, right at the edge of the top bracket. So the joint holds, and the bolts are clamping rather than taking the load in shear.

![Ansys contact status plot of the two bracket faces, mostly sticking around the bolts with near contact at the edges](/projects/uprights-2027/nonlinear-contact-status.png)

![Ansys sliding distance plot, maximum about 0.025 mm at the edge of the top bracket](/projects/uprights-2027/nonlinear-sliding-distance.png)

### Why the two answers are different

The two models put the weak spot in different places because they pass the load through the joint differently. With bonded contact, the bracket and knuckle act as one solid piece. The load spreads across the whole face, and the highest stress ends up wherever the geometry is sharpest, which here is the steering arm fillet.

With real bolts and friction, the load goes through the clamped area around each bolt instead. The preload already squeezes the material there before any load is applied, and that's where the contact pressure peaks, at 172 MPa. So the stress concentrates around the holes, and that becomes the critical spot.

Neither model is wrong. They answer different questions. The linear one is fast enough to run every load case and find the worst one. The nonlinear one takes much longer, but it's the only way to check that the joints hold and to set the torque spec and bolt grade. We used the nonlinear results to pick both: M8 12.9 bolts at 36 N·m dry (27 N·m oiled), with hardened washers under the heads and nuts.

### Checking the joints by hand

I didn't want to trust the nonlinear model without a quick hand check on whether the brackets should slip. A bolted joint holds by friction, so the most shear it can carry before it slips is the clamp force times the friction coefficient:

```text
F_slip = μ · n · F_preload
```

At 36 N·m an M8 12.9 bolt should give about 22.8 kN of preload. Torque is a rough way to set preload, though, and it can be 25% out either way, so I used the low end, 17.1 kN, which is the worst case for slip. That's the same value I used in Ansys. With two bolts and μ = 0.15 for dry aluminium on aluminium:

```text
F_slip = 0.15 × 2 × 17.1 kN = 5.1 kN
```

The biggest load through the top bracket is in the 3g bump, where the upper pickup puts 2.65 kN through it. That gives a margin of about 1.9 against slip, and still about 1.3 if the friction drops to μ = 0.1. I treated the whole force as shear, which overestimates the shear on the joint, so the real margin is a bit higher.

The steering bracket started out with a single bolt, but we were worried one bolt wouldn't keep it in alignment, so it now has two as well. That also helps with slip. Its biggest load is 2.23 kN in Brake + Corner, which gives a margin of about 2.3, or 1.5 at μ = 0.1. With one bolt it would only have been 1.15, and at μ = 0.1 friction alone wouldn't have held it.

The bolts and the knuckle also have to survive the top end of the scatter, 28.5 kN:

```text
Bolt stress    = 28.5 kN / 36.6 mm² = 779 MPa
Washer bearing = 28.5 kN / 146 mm²  = 195 MPa
```

That's 71% of the bolt's 1,100 MPa yield, and well under the roughly 460 MPa yield of 7075.

Without a washer, a bare socket head would press about 370 MPa into the aluminium, which is too close to yield. That's why the washers are hardened.

The hand calculation agrees with the nonlinear result that both brackets stick. What it can't capture is the moment from the pickup sitting out from the joint, which tries to peel the bracket off at one edge. That shows up in Ansys as the ring of "near" contact around the edges, and it's why I still needed the nonlinear model.

## What the results changed

The first version wasn't strong enough. In the linear runs, Brake + Corner came out at a minimum safety factor of 0.77 and the 3g bump at 1.10. Anything under 1 means the material yields, so that version would have failed on the car, and we were aiming for around 2.

The Brake + Corner case showed two problems. The plates of the lower bracket were bending, with red patches along both of them:

![Linear Brake + Corner safety factor plot on the earlier knuckle, with red regions below 1 along the plates of the lower bracket](/projects/uprights-2027/early-brake-corner-bracket-sf.png)

And the minimum, 0.77, sat in the sharp corner where the upper bracket meets the knuckle:

![Close-up of the earlier knuckle under Brake + Corner, with the minimum safety factor of 0.77 marked in the sharp corner where the upper bracket meets the knuckle](/projects/uprights-2027/early-brake-corner-fillet-sf.png)

We tried refining the mesh there first, but that only made it worse. A perfectly sharp corner is a singularity in FEA: the stress there has no real value, so the finer the mesh, the higher the number goes, and it never settles. Instead of chasing it, we changed the geometry and added fillets so the stress had a real radius to spread over. That's what led to the recess in the final version.

The 3g bump case didn't quite fail, but at 1.10 it was nowhere near the target, and the weak spot was the same kind of place, a sharp corner:

![Close-up of the earlier knuckle under a 3g bump, with a small red region and a minimum safety factor of 1.10 at a sharp corner](/projects/uprights-2027/early-3g-bump-sf.png)

That version had other problems too. The steering mount was poor, with problems with bolt clearance and with clearance to the suspension wishbones. The sharp edges were where the stress was collecting, so rounding them off was one of the main fixes.

![Side-by-side Onshape views of the earlier knuckle, with sharper edges and a boxy steering mount, and the final version with rounded edges and a stepped top bracket mount](/projects/uprights-2027/old-vs-new.png)

The biggest change in the final version is the step inwards on the top bracket mount. The bracket now sits in a recess instead of meeting the knuckle at a sharp corner, which is exactly where the 0.77 was. On top of that, the bolt clearances are better all over, and the edges are rounded off. Even with the bigger bearings, the front knuckle with its brackets is 0.823 kg, down from 0.89 kg last year. That doesn't include the bearings or bolts. It will be CNC machined.

## Where it's at

I'm running the same process on the rear knuckles now: OptimumK load cases, linear runs to find the worst ones, then nonlinear runs for the joints.

![The 2027 rear knuckle in Onshape, with its two bolt-on brackets shown in grey and yellow](/projects/uprights-2027/rear-knuckle.png)

