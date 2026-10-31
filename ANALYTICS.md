# Mesure d'audience

Plausible, sans cookie, chargé uniquement sur `jetpod.github.io/angles-morts/` (site Plausible `jetpod.github.io`, partagé avec les autres jeux).

Schéma fermé (`analytics.js`) : URL réduite à origine + chemin, référent supprimé, aucune propriété personnalisée. Aucun score, réponse ou identifiant n'est transmis.

## Objectifs à créer dans Plausible

Settings, puis Goals, puis Add goal, puis Custom event, avec ces noms exacts (les objectifs ne sont pas rétroactifs) :

1. `Angles morts · Jeu démarré`
2. `Angles morts · Module 1 démarré`
3. `Angles morts · Module 1 terminé`
4. `Angles morts · Module 2 démarré`
5. `Angles morts · Module 2 terminé`
6. `Angles morts · Module 3 démarré`
7. `Angles morts · Module 3 terminé`
8. `Angles morts · Parcours terminé`

Chaque événement est envoyé au plus une fois par chargement de page.
