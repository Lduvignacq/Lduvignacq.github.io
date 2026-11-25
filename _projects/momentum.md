---
title: Measuring momentum in NBA games
kind: research thesis
period: 2025 → 2026
order: 4
home: true
summary: |
  Fans swear by runs and hot streaks. Over a full NBA season we tested the idea four ways:
  copulas, ARMA-GARCH models, extreme value theory and Hawkes processes. Momentum is there,
  but faint. Fitted to the play-by-play of 50 Boston games, the Hawkes model has a median
  branching ratio of <strong class="hl">0.09</strong>: each basket sets off less than a
  tenth of an extra basket.
figure:
  src: /assets/img/projects/momentum-intensity.webp
  width: 1600
  height: 419
  alt: "Fitted conditional intensity of Charlotte's scoring over a 48-minute game against Boston: a sharp spike at every basket above a flat base rate of 0.81 events per minute."
  caption: "Charlotte against Boston, 13 April 2025. The fitted intensity λ(t) jumps at every basket, then falls straight back to its base rate μ = 0.81 per minute."
kv:
  team: group of three
  data: 1,240 games of the 2024-25 season, nba_api play-by-play
  stack: python · statsmodels · arch · pyvinecopulib · scipy
code: https://github.com/Lduvignacq/Analyse-statistique-du-momentum-dans-le-sport---Application-la-NBA
---

In a Hawkes process every event raises the rate of the next for a while,
λ(t) = μ + Σ α e<sup>−β(t − tᵢ)</sup>, and the branching ratio α/β counts the extra
events each one triggers. Fitted by maximum likelihood, it beats a homogeneous Poisson
process in some games but not in all of them (likelihood-ratio test). A bivariate
version, whose cross-effects may turn negative, finds mutual inhibition: when one team
scores, the other's intensity drops for about six seconds.

Copulas show that within a game the two offenses rise together (Kendall's τ ≈ 0.15),
and that the second night of a back-to-back costs a team 2 to 3 points. From one game to
the next, GARCH finds a volatility that persists without reacting to shocks (α₁ ≈ 0).
Extreme value theory fits GEV and generalized Pareto laws to runs and blowouts, and a
Monte Carlo model puts Boston's odds of erasing a 15-point deficit with 12 minutes left
at 7.4%.

It all agrees with the hot-hand literature, from Gilovich, Vallone and Tversky (1985) to
Miller and Sanjurjo (2018): the effect is real, and far smaller than it feels from the
stands.
