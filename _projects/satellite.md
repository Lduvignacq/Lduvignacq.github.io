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

An agile satellite can tilt in any direction, so each ground target can be captured from
several positions along the orbit, called access windows. Rescheduling a local part of the
plan means choosing one window per target so that the satellite always has time to turn
between two shots, with the first and last acquisitions fixed and some targets shot twice
from different angles for stereo imaging. The problem can be written on a graph whose nodes
are candidate acquisitions and whose edges are the feasible maneuvers between them.

We first built exact solvers, one based on dynamic programming and a constraint programming
model with OR-Tools CP-SAT. They always find the right answer, but their running time grows
quickly with the number of targets. Their solutions serve both as a reference and as
training labels.

Each instance is then encoded as a graph, and a GNN is trained by imitation learning to
predict the decisions of the exact solver. The network is used to guide the search, pruning
poor branches early. We are studying whether a model trained on small neighborhoods keeps
making good decisions on instances ten times larger.

All methods run through the same evaluator under the same time limit, and are compared on
feasibility, solution quality and how runtime scales with problem size.
