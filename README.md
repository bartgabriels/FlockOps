# Schapentracker

Een eenvoudige app om schapen, weides en verplaatsingen te beheren.

## Functies
- Voeg weides toe met naam en oppervlakte
- Voeg schapen toe met tag, ras, gewicht en toegewezen weide
- Verplaats schapen tussen weides
- Bekijk een log van alle verplaatsingen
- Slaat gegevens lokaal op in de browser

## Gebruik
1. Open `index.html` in een browser
2. Voeg eerst minimaal één weide toe
3. Voeg schapen toe en selecteer de weide
4. Verplaats schapen tussen weides om de log bij te werken

## Ontwikkeling
Dit is een statische webapp zonder buildstap. Open `index.html` direct of gebruik een lokale server zoals VS Code Live Server.

## Deployment
Deze repository bevat een backend en container-setup voor SaaS-hosting.

- `Dockerfile` - bouwt de API-server
- `docker-compose.yml` - start de API en PostgreSQL
- `proxmox-lxc-deploy.md` - Proxmox LXC deployment guide

Voor een Proxmox LXC deployment, volg de stappen in `proxmox-lxc-deploy.md`.
