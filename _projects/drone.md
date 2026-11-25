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

  The classical planner remains fully explainable, and in every run it brought the drone
  within <strong class="hl">2 m</strong> of the target.
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

The mission has three phases: exploration, target acquisition and final guidance. Since the
target is occluded, the drone has to choose where to look next and update its map, while
keeping a collision-free trajectory through space it has only partly seen.

The environment is represented as a 3D voxel grid (free, occupied or unknown), updated by
raycasting at each observation. Frontier voxels, free cells next to unknown space, are
grouped into clusters, each with a candidate viewpoint. The drone heads for the viewpoint
with the best balance between information gain and path cost, A* plans the path on the
grid, and the loop replans as new obstacles appear.

To turn the grid path into a flyable trajectory, I used Safe Flight Corridors (RA-L, 2017).
Each segment of the path is inflated into an obstacle-free convex polyhedron, by growing an
ellipsoid around it and cutting it with tangent half-spaces. Keeping the trajectory inside
this chain of polyhedra only takes linear constraints, so a smooth trajectory with velocity
and acceleration bounds comes from a single quadratic program and is collision-free by
construction.

In the comparison, the RL agent only replaces the frontier-selection rule: a PPO policy
picks the next frontier cluster among K candidates, while A* and the corridors still fly the
drone, which keeps the decision horizon short and every trajectory safe. Both approaches
were evaluated on the same unseen maps, on success rate and on the number of steps to
acquisition.
