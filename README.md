# FlockOps

FlockOps is a sheep management SaaS web app for paddocks and zones.

Important:
- FlockOps is provided as a SaaS application.
- End users do not need to install or run a backend.
- The app now requires authentication before use.
- After successful authentication, the app can still be used offline.
- While offline, cloud sync is not possible.
- Offline changes may be overwritten later and can lead to data loss.

---

## Nederlands

### Overzicht

FlockOps is een webapp voor schapenbeheer per weide en zone.
De frontend draait in de browser (HTML/CSS/JavaScript).

Belangrijk:
- FlockOps is een SaaS-app.
- Eindgebruikers moeten zelf geen backend installeren of draaien.
- De app werkt niet meer zonder login.
- Na succesvolle authenticatie kan je wel offline blijven werken.
- Tijdens offline gebruik kan er niet met de cloud gesynchroniseerd worden.
- Offline wijzigingen kunnen later overschreven worden en dataverlies veroorzaken.

### Belangrijkste functies

- Weides en zones beheren
- Schapen beheren (verplaatsen, injecties, scheren)
- Verplaats-modals met checkboxselectie (2 kolommen, standaard alles geselecteerd)
- Zone verwijderen met selectieve verplaatsing van enkel aangevinkte schapen
- Schapen uit de kudde zetten in plaats van verwijderen
- Historiek en planning bijhouden
- Stamboom per schaap tonen
- JSON configuratie opslaan en uploaden
- Meertalige interface (NL/EN/FR)

### Authenticatie en cloud sync

- Registratie en login met e-mail + wachtwoord
- E-mail is uniek
- De app is pas bruikbaar na authenticatie
- Na login wordt cloud-state opgehaald
- Wijzigingen worden automatisch naar de cloud gesynchroniseerd zolang er verbinding is
- Bij offline gebruik na authenticatie:
  - Je kan verder werken met lokale data
  - Cloud sync is niet beschikbaar
  - Er is risico op dataverlies van offline wijzigingen
- Bij afmelden:
  - Eerst nog een laatste sync naar de database
  - Daarna lokale browser-opslag van de app leegmaken
  - Daarna sessie sluiten

Opmerking:
- Als de config leeg is en de gebruiker niet is aangemeld, opent meteen het login/registratie venster.

### Navigatie

Zichtbare tabs:
- Weides en zones
- Schapen
- Historiek
- Planning
- Stamboom

Facturatie:
- Facturatie staat niet als losse zichtbare tabknop.
- Open facturatie via de titel FlockOps.

### Data-opslag

- Lokale key voor configuratie: flockops:data
- Lokale key voor taal: flockops:lang
- Auth/session keys gebruiken ook prefix flockops:

### Projectstructuur

- index.html: layout, tabs, modals
- app.js: state, rendering, workflows, i18n, auth, sync
- styles.css: styling
- dummy-data.json: voorbeelddata
- locales/translations.csv: vertaalmatrix
- server/: Express + Prisma backend

### Frontend starten

Geen build-stap nodig.

1. Open index.html in een moderne browser.
2. Of gebruik de gehoste versie: https://bartgabriels.github.io/FlockOps/

### Backend starten (alleen voor lokale development/self-hosting)

Voor normaal gebruik van de SaaS-versie is dit niet nodig.

Vereisten:
- Node.js 18+
- PostgreSQL database (bijvoorbeeld Neon)

Stappen:

1. Ga naar de server map.
2. Installeer dependencies.
3. Maak server/.env op basis van server/.env.example.
4. Genereer Prisma client.
5. Voer migraties uit.
6. Start de server.

Commando's:

```bash
cd server
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

Productie:

```bash
npm run prisma:migrate:deploy
npm start
```

### API endpoints (backend)

- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/me
- GET /state
- PUT /state
- GET /health
- GET /health/db

---

## English

### Overview

FlockOps is a web app for sheep management across paddocks and zones.
The frontend runs in the browser (HTML/CSS/JavaScript).

Important:
- FlockOps is a SaaS app.
- End users do not need to install or run a backend.
- The app no longer works without login.
- After successful authentication, you can keep working offline.
- While offline, cloud sync is unavailable.
- Offline changes can be overwritten later and may cause data loss.

### Main features

- Manage paddocks and zones
- Manage sheep (moves, injections, shearing)
- Move modals with checkbox selection (2 columns, all selected by default)
- Zone deletion with selective move of checked sheep only
- Move sheep out of flock instead of deleting them
- Keep history and planning items
- View pedigree per sheep
- Save and upload JSON configuration
- Multilingual UI (NL/EN/FR)

### Authentication and cloud sync

- Register and sign in with email + password
- Email must be unique
- The app is only usable after authentication
- Cloud state is fetched after login
- Changes are auto-synced to cloud while connected
- When working offline after authentication:
  - You can continue with local data
  - Cloud sync is unavailable
  - Offline changes may be lost later
- On logout:
  - One final sync is sent to the database
  - Local browser storage for app keys is cleared
  - Session is closed

Note:
- If the configuration is empty and the user is signed out, the login/register modal opens immediately.

### Navigation

Visible tabs:
- Paddocks and zones
- Sheep
- History
- Planning
- Pedigree

Move behavior:
- Zone move modals use a two-column checkbox list.
- All sheep are selected by default.
- Only checked sheep are moved.
- The same selective behavior is used in zone delete -> move flow.

Billing:
- Billing is intentionally not a visible tab button.
- Open Billing from the FlockOps title.

### Data storage

- Local config key: flockops:data
- Local language key: flockops:lang
- Auth/session keys also use the flockops: prefix

### Project structure

- index.html: layout, tabs, modals
- app.js: state, rendering, workflows, i18n, auth, sync
- styles.css: styling
- dummy-data.json: sample data
- locales/translations.csv: translation matrix
- server/: Express + Prisma backend

### Run frontend

No build step is required.

1. Open index.html in a modern browser.
2. Or use the hosted version: https://bartgabriels.github.io/FlockOps/

### Run backend (only for local development/self-hosting)

You do not need this to use the hosted SaaS app.

Requirements:
- Node.js 18+
- PostgreSQL database (for example Neon)

Steps:

1. Go to the server folder.
2. Install dependencies.
3. Create server/.env from server/.env.example.
4. Generate Prisma client.
5. Run migrations.
6. Start server.

Commands:

```bash
cd server
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

Production:

```bash
npm run prisma:migrate:deploy
npm start
```

### API endpoints (backend)

- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/me
- GET /state
- PUT /state
- GET /health
- GET /health/db

---

## Francais

### Vue d'ensemble

FlockOps est une application web pour la gestion des moutons par paturage et zone.
Le frontend tourne dans le navigateur (HTML/CSS/JavaScript).

Important:
- FlockOps est une application SaaS.
- Les utilisateurs finaux n'ont pas besoin d'installer ni d'executer un backend.
- L'application ne fonctionne plus sans connexion.
- Apres authentification, vous pouvez continuer a travailler hors ligne.
- Hors ligne, la synchro cloud est indisponible.
- Les changements hors ligne peuvent etre ecrases plus tard et provoquer une perte de donnees.

### Fonctions principales

- Gerer les paturages et les zones
- Gerer les moutons (deplacements, injections, tonte)
- Modales de deplacement avec cases a cocher (2 colonnes, tout selectionne par defaut)
- Suppression de zone avec deplacement selectif des seuls moutons coches
- Sortir un mouton du troupeau au lieu de le supprimer
- Suivre l'historique et la planification
- Afficher le pedigree par mouton
- Sauvegarder et charger la configuration JSON
- Interface multilingue (NL/EN/FR)

### Authentification et synchro cloud

- Inscription et connexion avec e-mail + mot de passe
- E-mail unique
- L'application est utilisable seulement apres authentification
- L'etat cloud est charge apres connexion
- Les changements sont synchronises automatiquement tant que la connexion est disponible
- En mode hors ligne apres authentification:
  - Vous pouvez continuer avec les donnees locales
  - La synchro cloud est indisponible
  - Il y a un risque de perte de donnees sur les changements hors ligne
- A la deconnexion:
  - Une derniere synchro est envoyee a la base de donnees
  - Le stockage local navigateur des cles applicatives est vide
  - La session est fermee

Remarque:
- Si la configuration est vide et l'utilisateur est deconnecte, la fenetre connexion/inscription s'ouvre immediatement.

### Navigation

Onglets visibles:
- Paturages et zones
- Moutons
- Historique
- Planning
- Pedigree

Facturation:
- La facturation n'apparait pas comme bouton d'onglet visible.
- Ouvrir la facturation via le titre FlockOps.

### Stockage des donnees

- Cle locale config: flockops:data
- Cle locale langue: flockops:lang
- Les cles auth/session utilisent aussi le prefixe flockops:

### Structure du projet

- index.html: layout, onglets, modales
- app.js: state, rendu, workflows, i18n, auth, sync
- styles.css: styles
- dummy-data.json: donnees exemple
- locales/translations.csv: matrice de traduction
- server/: backend Express + Prisma

### Lancer le frontend

Pas de build requis.

1. Ouvrir index.html dans un navigateur moderne.
2. Ou utiliser la version hebergee: https://bartgabriels.github.io/FlockOps/

### Lancer le backend (seulement pour dev local/self-hosting)

Ce n'est pas necessaire pour utiliser la version SaaS hebergee.

Pre-requis:
- Node.js 18+
- Base PostgreSQL (par exemple Neon)

Etapes:

1. Aller dans le dossier server.
2. Installer les dependances.
3. Creer server/.env a partir de server/.env.example.
4. Generer Prisma client.
5. Executer les migrations.
6. Demarrer le serveur.

Commandes:

```bash
cd server
npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

Production:

```bash
npm run prisma:migrate:deploy
npm start
```

### API endpoints (backend)

- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/me
- GET /state
- PUT /state
- GET /health
- GET /health/db
