---
title: Teaching a satellite to reschedule its photos in under two seconds
kind: operations research · graph neural networks
period: oct 2026 → ongoing
order: 3
home: true
status: private repository
summary: |
  An Earth observation satellite has a long list of images to take, and only a few seconds
  over each target to point its camera, shoot, and swing to the next one. When the plan
  changes, the order of the upcoming acquisitions has to be recomputed fast, without breaking
  any physical constraint.

  We first solve this rescheduling problem exactly, and use the exact solutions as ground
  truth. We then train a graph neural network to imitate the solver, so that it makes its
  decisions within the <strong class="hl">2-second</strong> budget, even on much larger
  instances.
figure:
  src: /assets/img/projects/satellite-solvers.gif
  width: 1100
  height: 710
  alt: "Four solvers build a plan on the same instance, one row per request along a time axis. Chronological greedy never backtracks and leaves 2 of the 7 requests unreached. Chronological depth-first search finds a solution after examining 67 acquisitions, the search guided by gradient boosting after 33, and the search guided by the GNN after 19."
  caption: "One instance, four solvers: 443 possible acquisitions for 7 requests. The greedy sweep never backtracks and misses 2 requests; depth-first search finds a plan after examining 67 acquisitions, 33 when guided by gradient boosting, 19 when guided by the GNN."
kv:
  team: 4 students, ISAE-SUPAERO research project
  data: satellite mission scenarios from the project partner (confidential)
  stack: python · or-tools cp-sat · pytorch · pytorch geometric
---

**The problem.** An agile satellite can tilt in any direction, so it can capture the same
ground target from several positions along its orbit: each one is an access window.
Rescheduling means choosing exactly one window for each target in a local neighborhood of the
plan, so that the satellite always has time to turn from one shot to the next. Some targets
must be shot twice, from two different angles, to build 3D (stereo) images, and the first and
last acquisitions of the neighborhood are fixed. In the end it is a feasibility problem on a
graph: nodes are candidate acquisitions, and edges are the maneuvers physically possible
between them.

**Exact baselines.** We started with deterministic solvers: a dynamic programming approach
and a constraint programming model (Google OR-Tools CP-SAT). They always return the right
answer, but their running time grows quickly with the number of targets. They give us both a
reference to measure against and the labels to learn from.

**Learning to search.** Following Gasse et al. (2019), we encode each instance as a graph and
train a GNN by imitation learning to predict the decisions the exact solver would make. The
network does not replace the solver: it guides the search, and prunes the bad branches early.
The open question is generalization: does a model trained on small neighborhoods still make
good decisions when the number of targets grows tenfold?

**Benchmark.** Every method goes through the same evaluator, under the same time limit. We
compare them on three things: feasibility, solution quality, and how runtime scales with
problem size.
