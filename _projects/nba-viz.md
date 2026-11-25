---
title: A team's playstyle, read off its numbers
kind: data visualization
period: dec 2025
order: 6
summary: |
  A D3.js dashboard that describes a team's playstyle from its statistics, since two teams
  with the same record can play very differently. Selecting a season and a team on the map
  updates every panel: shot locations, passing network, and ratings compared with the rest
  of the league.
figure:
  src: /assets/img/projects/nba-radar.webp
  side: true   # square picture next to the text on the card
  alt: "Radar chart of the Lakers and the Pacers in 2024-25 on win percentage and on offensive, defensive, net, rebounding and turnover ratings. The two shapes match except on rebounds and turnovers, where the Lakers sit further out."
  caption: "Lakers and Pacers in 2024-25: same record, different profiles."
kv:
  team: group project
  data: nba_api exports, GeoJSON map
  stack: d3.js · d3-hexbin · svg
code: https://github.com/Lduvignacq/Nba-teams-visualization
---

The dashboard looks at two aspects of a team: how it plays, and how efficient it is.

Playstyle is read from shots and passes. The shot chart can be filtered by three-pointers,
paint or mid-range shots, down to a single player, which shows whether a team relies on
shots at the rim, from long range or in between. The passing network shows how the offense
is organized; on the 2024-25 Clippers, a large share of passes goes through one player.

<div class="duo">
{% include figure.html src="/assets/img/projects/nba-shot-chart.webp" alt="Hexagonal heat map of a team's shots on a half court, with buttons to keep all shots, three-pointers, paint or mid-range, a player menu, and a tooltip reading 2 shots at 0% from the field." caption="Shot chart of a full season in hexagonal bins, filterable by shot type and player, with attempts and field-goal percentage on hover." %}
{% include figure.html src="/assets/img/projects/nba-passing-network.webp" alt="Chord diagram of passes between ten players of the 2024-25 Clippers. One player's arc is by far the widest." caption="Passing network of the 2024-25 Clippers. Arc width reflects the share of passes going through each player." %}
</div>

Efficiency comes from the ratings, points scored and conceded per 100 possessions, which
put fast and slow teams on the same scale. The scatter plot places the thirty teams on two
axes chosen by the user, with the league mean as dashed lines (on defense, a lower rating is
better).

Shift-clicking a second team on the map adds it in red for comparison. The Lakers and the
Pacers both finished 2024-25 at 50-32, and their offensive, defensive and net ratings almost
overlap on the radar chart. The Lakers, however, collected more rebounds and committed more
turnovers.

<div class="duo">
{% include figure.html src="/assets/img/projects/nba-ratings.webp" alt="Scatter plot of every team's offensive rating against its defensive rating, the Lakers in yellow a little above the league mean on both, with histograms of each rating along the axes." caption="Offensive against defensive rating, one dot per team, the Lakers in yellow, with the distribution of each rating along the axes." %}
{% include figure.html src="/assets/img/projects/nba-map.webp" alt="Map of the United States with Western Conference states in pink and Eastern ones in blue, a circle per team sized by win percentage, the Lakers ringed in yellow and the Pacers in red." caption="Team selection map: West in pink, East in blue, circle size proportional to win percentage." %}
</div>

A calendar of wins and losses and the team's playoff run complete the view of the season.
