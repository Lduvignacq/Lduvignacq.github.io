---
title: "Finding a hidden target with a drone: classical planning vs. reinforcement learning"
kind: robotics · hackathon
period: nov 2026
order: 2
home: true
summary: |
  During a defense hackathon, our team built an autonomous drone that has to find and reach a
  target hidden behind obstacles, starting from only a rough prior map. I designed the
  deterministic exploration and obstacle-avoidance pipeline, and benchmarked it against a
  reinforcement learning agent. Over <strong class="hl">140</strong> unseen maps, the target
  was found before timeout in every run, and intercepted on <strong class="hl-2">75%</strong> of them.

  The classical planner also stays fully explainable and under control, and in every run it
  brought the drone within <strong class="hl">2 m</strong> of the target.
figure:
  src: /assets/img/projects/drone-village.gif
  width: 900
  height: 435
  alt: "Simulation run over a village, sped up three times. On the left, the drone's camera climbs, dives toward the houses and ends on a SUCCESS banner, above its telemetry. On the right, the map it builds: blue frontiers, green obstacles, and its track to the target."
  caption: "A run on the village map, sped up ×3. Left, what the drone sees and its telemetry; right, the map it builds as it explores (blue frontiers, green obstacles) and its track to the target."
kv:
  setting: defense hackathon, team project
  methods: frontier exploration · a* · safe flight corridors (qp) · ppo
  stack: python
---

**The problem.** The mission has three phases: exploration, target acquisition and final
guidance. The target is occluded, so the drone cannot fly straight to it. It has to decide
where to look next, update what it knows, and keep a collision-free trajectory while the map
is still being discovered.

**Deterministic exploration.** The environment is a 3D voxel grid whose cells are free,
occupied or unknown. Each observation updates it by raycasting, which handles occlusions
naturally. Frontier voxels, free cells next to unknown space, are clustered, and each cluster
gets a candidate viewpoint. The drone heads for the one with the best trade-off between
information gain (the unknown voxels visible from it) and path cost. A* plans the path on the
grid, and the loop replans as new obstacles show up.

**Safe Flight Corridors.** A grid path is not a flyable trajectory. Following Liu et al.
(RA-L 2017), I inflate each segment of the path into an obstacle-free convex polyhedron: an
ellipsoid grows around the segment, then tangent half-spaces cut it. The trajectory must stay
inside this chain of overlapping polyhedra. Every constraint is linear, so generating a smooth
trajectory under velocity and acceleration bounds comes down to a single quadratic program,
and the result is collision-free by construction.

**The RL comparison.** Rather than learning motor commands end to end, the RL agent only
replaces the frontier-selection rule: a PPO policy picks the next frontier cluster among K
candidates, and A* and the corridors still fly the drone. The decision horizon is shorter,
and every trajectory stays safe. Both methods were evaluated on the same unseen maps, on success rate and on the number of
steps to acquisition.
