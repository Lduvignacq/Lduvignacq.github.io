---
title: A team's playstyle, read off its numbers
kind: data visualization
period: dec 2025
order: 6
summary: |
  Two teams can finish with the same record and play nothing alike. This D3.js dashboard
  is our attempt to show why. Pick a season and a team on the map and every panel
  follows: where it shoots from, who it passes to, how its ratings compare with the rest
  of the league.
figure:
  src: /assets/img/projects/nba-radar.webp
  side: true   # square picture next to the text on the card
  alt: "Radar chart of the Lakers and the Pacers in 2024-25 on win percentage and on offensive, defensive, net, rebounding and turnover ratings. The two shapes match except on rebounds and turnovers, where the Lakers sit further out."
  caption: "2024-25, Lakers against Pacers: same record, not the same shape."
kv:
  team: group project
  data: nba_api exports, GeoJSON map
  stack: d3.js · d3-hexbin · svg
code: https://github.com/Lduvignacq/Nba-teams-visualization
---

The idea was to describe how a team plays without watching a single game, then hold it
up against the others. We looked at two things: what the team likes to do, and how
well it does it.

What it likes to do shows up in its shots and its passes. The shot chart filters by
three-pointers, paint or mid-range, down to a single player, so you see right away
whether a team lives at the rim, from deep or somewhere in between. The passing network
tells you who runs the offense. On the 2024-25 Clippers, a lot of roads lead to
James Harden.

<div class="duo">
{% include figure.html src="/assets/img/projects/nba-shot-chart.webp" alt="Hexagonal heat map of a team's shots on a half court, with buttons to keep all shots, three-pointers, paint or mid-range, a player menu, and a tooltip reading 2 shots at 0% from the field." caption="A whole season of shots in hexagons. Filter by shot type or by player, and hover a cell for its attempts and field-goal percentage." %}
{% include figure.html src="/assets/img/projects/nba-passing-network.webp" alt="Chord diagram of passes between ten players of the 2024-25 Clippers. James Harden's arc is by far the widest, ahead of Ivica Zubac and Kris Dunn." caption="Clippers, 2024-25: who passes to whom. The wider the arc, the more of the ball goes through that player." %}
</div>

How well it does it comes from the ratings: points scored and conceded per 100
possessions, which keeps fast and slow teams on the same scale. The scatter puts all
thirty teams on two axes of your choice, with the league mean as dashed lines. Just
remember that on defense, lower is better.

Comparing two teams is where it gets fun. Shift-click a second one on the map and it
shows up in red next to the first. The Lakers and the Pacers both finished 2024-25 at
50-32, and on the radar up top their offensive, defensive and net ratings almost
overlap. They didn't get there the same way, though: the Lakers grabbed more rebounds,
and gave the ball away more often too.

<div class="duo">
{% include figure.html src="/assets/img/projects/nba-ratings.webp" alt="Scatter plot of every team's offensive rating against its defensive rating, the Lakers in yellow a little above the league mean on both, with histograms of each rating along the axes." caption="Offensive against defensive rating, one dot per team, the Lakers in yellow. The bars along the axes show how the league is spread." %}
{% include figure.html src="/assets/img/projects/nba-map.webp" alt="Map of the United States with Western Conference states in pink and Eastern ones in blue, a circle per team sized by win percentage, the Lakers ringed in yellow and the Pacers in red." caption="Where it all starts. West in pink, East in blue, and the more a team wins, the bigger its circle." %}
</div>

Around all of this, a calendar of wins and losses and the team's run through the
playoffs fill in the rest of the season.
