## Projet TechWeb Examen M1
## Groupe 6: Julien Devos, Pierre-Antoine Gilbert, Léo Jaubert & Saona Moussard

## Résumé
Notre objectif est de créer un site permettant à des utilisateurs de lister les livres qu'ils lisent et leurs auteurs.

## Build Status
Last update: 10/11

## Conception
On commence par la création d'une base de données en back-end afin d'avoir des listes d'auteurs, d'utilisateurs, de livres et de genres de livres. 
En même temps, un premier design de site et de menu hamburger sont créés pour avoir une base.

Dans un second temps, le back-end a été lié au front-end pour permettre d'afficher les utilisateurs/auteurs/livres pendant que des routes fûrent créées pour ajouter ou supprimer des auteurs/utilisateurs/livres dans les fichiers en back-end.
Des modales ont été ajoutées à la suite pour permettre la fonctionnalité précédemment mentionnée.
Tris: alphabétique pour livres
Filtres avec barre de recherche: livres/utilisateurs/auteurs
Filtre avec choix multiples: livres (par genre), auteurs (par nombre de livres écrits) & utilisateurs (par livre possédé)

Les bases de données des utilisateurs et des livres ont été liées.
Accès aux pages de détails individuelles des auteurs, livres et utilisateurs mais sans beaucoup plus d'informations.

## Style de code
Standard

## Fonctionnalités
Back-end: NestJS, librairie Swagger
Front-end: React, Tailwind CSS
Général: TypeScript, ESLint, Prettier

# Back end
Nous utilisons des bases de données pour lister les auteurs, utilisateurs, livres et genres des livres.
Le backend a été fait concernant les suppressions d'auteurs, livres et utilisateurs, mais nous n'avons pas eu le temps de le relier au front end.

# Front end
Nous pouvons afficher la listes des auteurs, livres et utilisateurs sur leur page globale respective. 
Nous pouvons ajouter des auteurs, livres et utilisateurs (une modale est utilisée pour le faire). Cela modifie la base de donnée en interne.
Filtrage avec barres de recherches pour utilisateurs/livres/auteurs
Filtre des livres par genre
Filtre des auteurs par nombre de livres écrits
Tri des livres par ordre alphabétique

## API
Toutes les APIs peuvent être trouvées dans le dossier 'library-api'

## Tests
En back-end uniquement
GetById & Create pour les utilisateurs, livres et auteurs

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
- Accueil: revient au menu avec le texte d'accueil

- Auteurs: la liste des auteurs apparaît et un bouton "Ajouter un auteur" se trouve en haut à droite. Si ce bouton est cliqué, une modale apparaît demandant diverses informations afin d'ajouter un auteur dans la base de données.
Si on souhaite trouver un auteur particulier, une barre de recherche a été implémentée pour cette exacte fonction.
On peut filtrer les auteurs selon le nombre de livres qu'ils ont écrit grâce à un menu défilant - pour que le filtre soit appliqué, il faut cliquer sur le bouton "Filter OFF/ON"
On peut cliquer sur Détails pour voir tous les livres de cet auteur.

- Livres: la liste des livres apparaît et un bouton "Ajouter un livre" se trouve en haut à droite. Si ce bouton est cliqué, une modale apparaît demandant diverses informations afin d'ajouter un livre dans la base de données.
On peut trier les livres par ordre alphabétique selon leur titre, le nom et le prénom de leur auteur.
On peut filtrer les livres selon leur nom grâce à une barre de recherche et selon leur genre grâce à un menu défilant - pour confirmer son choix, on doit cliquer sur le bouton "filtrer".

- Utilisateurs: la liste des utilisateurs apparaît et un bouton "Ajouter un utilisateur" se trouve en haut à droite. Si ce bouton est cliqué, une modale apparaît demandant diverses informations afin d'ajouter un utilisateur dans la base de données.
On peut filtrer les utilisateurs selon leur nom et leurs livres possédés grâce à une barre de recherche.

## Contributions

Julien: Back-end (base de données)
Pierre-Antoine: Mixte (Affichage livres/auteurs | Tri par genre des livres et debug de l'ESLint | Filtrer les auteurs/utilisateurs/livres)
Léo: Front-end (Menu + design du site)
Saona: Documentation

## Crédits
Utilisation du répertoire projet-examen-m1 de Gerald Gallet
