# Les biais qui transmettent

Serious game d'hygiène hospitalière sur les biais cognitifs qui favorisent la transmission des infections associées aux soins.

- 3 modules indépendants d'environ 10 minutes, par métier : IDE et aides-soignants, médecins et internes, cadres, EOH et CLIN.
- 15 enquêtes « détective des biais » : retourner les pièces à conviction, identifier le biais, choisir la parade, lire le débriefing sourcé.
- Biaisothèque de 15 cartes, rapport d'enquête par module (imprimable), mode clair et sombre.
- Guide d'animation pour l'EOH et le CLIN : déroulé de séance de 30 à 45 minutes, questions de discussion par module, règles pour l'animateur.
- Site statique, sans build ni dépendance. Progression conservée en mémoire de page seulement.

Prototype pédagogique, cas fictifs. Relecture par l'équipe opérationnelle d'hygiène requise avant usage institutionnel.

Fichiers : `index.html`, `style.css`, `base.css`, `data.js` (contenus et sources), `app.js` (moteur), `analytics.js` (filtre Plausible). Voir `ANALYTICS.md`.

## Attestation de fin de parcours

Le module commun `attestation.js` propose, à la fin d'un module ou d'un parcours complet, une attestation nominative imprimable (A4 paysage, impression ou PDF via le navigateur). Elle n'affiche que le palier atteint, jamais le score :

- **Réussite avec excellence** : au moins 95 % de réponses adaptées, sans erreur critique ;
- **Réussite** : au moins 80 %, sans erreur critique (seuil de réussite) ;
- **Participation** : en dessous du seuil.

Signature : Dr Jean-Etienne Podik, EOH AHNAC. Mention : outil pédagogique à partir de cas fictifs, sans valeur de validation des compétences ni d'action de DPC. Le nom saisi reste sur l'appareil ; seul l'événement de palier est compté par Plausible, commun à tous les jeux du site (filtrer par page pour un jeu donné) :

```
Attestation · Participation
Attestation · Réussite
Attestation · Excellence
```
