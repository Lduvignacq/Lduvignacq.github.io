# lduvignacq.github.io

Site perso, construit par Jekyll (GitHub Pages le recompile à chaque `git push`).

## Où est quoi

| Fichier / dossier          | Contenu                                                        |
|----------------------------|----------------------------------------------------------------|
| `_config.yml`              | Titre, liens (CV, github, linkedin, email), date de mise à jour |
| `index.html`               | Accueil : présentation + projets marqués `home: true`          |
| `projects.html`            | Tous les projets + « other projects »                          |
| `about.html`               | Parcours, compétences, hors travail                            |
| `_projects/*.md`           | Un fichier par projet → une carte + une page `/projects/<nom>/` |
| `_data/other_projects.yml` | Les petits projets (une ligne chacun, pas de page)             |
| `_layouts/`, `_includes/`  | Gabarits communs (en-tête, menu, pied de page, carte, figure)  |
| `assets/`                  | CSS, JS, images, CV                                            |

## Ajouter un projet

Créer `_projects/mon-projet.md` :

```markdown
---
title: Titre du projet
kind: deep learning            # à gauche dans la barre de la carte
period: jan → mar 2027         # à droite
order: 7                       # position dans les listes
home: true                     # l'afficher aussi sur l'accueil
summary: |
  Le texte de la carte. Chiffre mis en avant : <strong class="hl">90%</strong>.
figure:                        # facultatif
  src: /assets/img/projects/mon-image.webp
  alt: Ce que montre l'image
  caption: Légende
kv:
  team: group of three
  stack: python · pytorch
code: https://github.com/...   # ou bien  status: in progress
---

Le texte détaillé, affiché seulement sur la page du projet (Markdown).

{% include figure.html src="/assets/img/projects/autre.webp" alt="..." caption="..." %}
```

## Prévisualiser en local (facultatif)

Nécessite Ruby ≥ 3 (`brew install ruby`), puis :

```sh
bundle install
bundle exec jekyll serve    # http://localhost:4000
```
