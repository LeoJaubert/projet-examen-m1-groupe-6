## Projet TechWeb Examen M1
## Groupe 6: Julien Devos, Pierre-Antoine Gilbert, Léo Jaubert & Saona Moussard

## Résumé
Notre objectif est de créer un site permettant à des utilisateurs de lister les livres qu'ils lisent et leurs auteurs.

## Build Status
Last update: 8/11

Impossibilité d'accéder aux pages de détails individuelles des auteurs, livres et utilisateurs.
Pas de photos ni de nombre de livres écrits pour les auteurs 
Pas de barre de recherche pour les utilisateurs

## Conception
On commence par la création d'une base de données en back-end afin d'avoir des listes d'auteurs, d'utilisateurs, de livres et de genres de livres. 
En même temps, un premier design de site et de menu hamburger sont créés pour avoir une base.

Dans un second temps, le back-end a été lié au front-end pour permettre d'afficher les utilisateurs/auteurs/livres pendant que des routes fûrent créées pour ajouter ou supprimer des auteurs/utilisateurs/livres.
Des modales ont été ajoutées à la suite pour permettre la fonctionnalité précédemment mentionnée.
Un tri et un filtrage selon le genre des livres ont été implémentés.

## Style de code
Standard

## Fonctionnalités
Back-end: NestJS, librairie Swagger
Front-end: React, Tailwind CSS
Général: TypeScript, ESLint, Prettier

# Back end
Nous utilisons des bases de données pour lister les auteurs, utilisateurs, livres et genres des livres.

# Front end
Nous pouvons afficher la listes des auteurs, livres et utilisateurs sur leur page globale respective. 
Nous pouvons ajouter et supprimer des auteurs, livres et utilisateurs (une modale est utilisée pour le faire). 
Une option pour filtrer des livres selon leur titre et leur genre a été implémentée.

## API
Toutes les APIs peuvent être trouvées dans le dossier 'library-api'

## Tests
En back-end uniquement

## Utilisation
Lors de la connexion, on arrive sur la page d'accueil
/!\ Il faut être en mode clair sinon le menu hamburger en haut à gauche n'est pas visible.

En cliquant sur le menu, 4 choix apparaissent:
- Accueil
- Auteurs
- Livres
- Utilisateurs
/!\ Si vous cliquez sur la page sur laquelle vous êtes, rien ne se passe

Les différentes options sont expliquées ci-dessous:
- Accueil: reviens au menu avec le texte d'accueil

- Auteurs: la liste des auteurs apparaît et un bouton "Ajouter un auteur" se trouve en haut à droite. Si ce bouton est cliqué, une modale apparaît demandant diverses informations afin d'ajouter un auteur dans la base de données.

- Livres: la liste des livres apparaît et un bouton "Ajouter un livre" se trouve en haut à droite. Si ce bouton est cliqué, une modale apparaît demandant diverses informations afin d'ajouter un livre dans la base de données.

- Utilisateurs: la liste des utilisateurs apparaît et un bouton "Ajouter un utilisateur" se trouve en haut à droite. Si ce bouton est cliqué, une modale apparaît demandant diverses informations afin d'ajouter un utilisateur dans la base de données.

## Contributions

Julien: Back-end (base de données)
Pierre-Antoine: Affichage livres/auteurs | Tri et filtrage par genre des livres et debug de l'ESLint
Léo: Front-end (Menu + design)
Saona: Documentation

## Credits
Utilisation du répertoire projet-examen-m1 de Gerald Gallet
