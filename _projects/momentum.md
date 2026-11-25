---
title: Measuring momentum in NBA games
kind: research thesis
period: 2025 → 2026
order: 4
home: true
summary: |
  This thesis tests whether momentum, the idea that scoring runs feed themselves, can be
  measured in NBA games. Over a full season, we used four approaches: copulas, ARMA-GARCH
  models, extreme value theory and Hawkes processes. The effect exists but is weak. Fitted to
  the play-by-play of 50 Boston games, the Hawkes model has a median branching ratio of
  <strong class="hl">0.09</strong>, meaning each basket triggers less than a tenth of an
  additional basket on average.
figure:
  src: /assets/img/projects/momentum-intensity.webp
  width: 1600
  height: 419
  alt: "Fitted conditional intensity of Charlotte's scoring over a 48-minute game against Boston: a sharp spike at every basket above a flat base rate of 0.81 events per minute."
  caption: "Charlotte against Boston, 13 April 2025. The fitted intensity λ(t) jumps at each basket and decays back to its base rate μ = 0.81 per minute."
kv:
  team: group of three
  data: 1,240 games of the 2024-25 season, nba_api play-by-play
  stack: python · statsmodels · arch · pyvinecopulib · scipy
code: https://github.com/Lduvignacq/Analyse-statistique-du-momentum-dans-le-sport---Application-la-NBA
---

In a Hawkes process, each event temporarily raises the rate of the following ones,
λ(t) = μ + Σ α e<sup>−β(t − tᵢ)</sup>, and the branching ratio α/β gives the number of
additional events each one triggers. Fitted by maximum likelihood, the model outperforms a
homogeneous Poisson process in some games but not in all of them (likelihood-ratio test). A
bivariate version, whose cross-effects can be negative, shows mutual inhibition: after one
team scores, the other team's scoring intensity drops for about six seconds.

Copulas show that within a game the two offenses tend to rise together (Kendall's τ ≈ 0.15),
and that the second night of a back-to-back costs a team 2 to 3 points. Across games, GARCH
finds a persistent volatility that does not react to shocks (α₁ ≈ 0). Extreme value theory
fits GEV and generalized Pareto distributions to runs and blowouts, and a Monte Carlo model
estimates Boston's probability of overturning a 15-point deficit with 12 minutes left at
7.4%.

These results are consistent with four decades of research on the hot hand, which finds a
real effect, much smaller than spectators perceive it.
