# Ly Gia Huy — Game Marketing Portfolio

React portfolio built from the screens in the repository's `design/` directory. The UI uses React Router and SCSS; profile, brand, project, and contact content currently comes from static service modules in `src/services/`.

## Requirements

- Docker and Docker Compose, or Node.js 20+ with npm.

## Run with Docker Compose

From the repository root:

```bash
docker compose up --build --renew-anon-volumes
```

Open [http://localhost](http://localhost). Nginx publishes port 80 and proxies requests to the frontend development server on the Compose network. Source files are mounted for hot reload. The renew flag refreshes the anonymous `node_modules` volume so dependency changes in the image take effect.

To stop the services:

```bash
docker compose down
```

## Run the frontend directly

From `frontend/`:

```bash
npm ci
npm start
```

The development server runs at [http://localhost:3000](http://localhost:3000).

Create an optimized static build with:

```bash
npm run build
```

## Routes

- `/` — profile, experience, education, achievements, skills, and contact call to action.
- `/projects` — redirects to the first brand.
- `/projects/crossfire-legends` — Crossfire: Legends case studies.
- `/projects/play-together` — Play Together VNG case studies.
- `/contact` — direct contact details and links.
- Any other path — not-found page.

## Update portfolio content

Edit the static resources in `src/services/`:

- `profileService.js` — profile and career content.
- `brandService.js` — brands and their URL slugs.
- `projectService.js` — case studies, media, gallery assets, scope, learnings, and results.
- `contactService.js` — email, phone, location, LinkedIn, and contact-page copy.

Keep each service's return shape stable when replacing static values with a third-party API. Pages own loading/error states; presentational components receive resource values through props.

## Styling convention

Every page and component has a paired `.jsx` and `.scss` file in its own directory. Global tokens and reset rules live in `src/styles/`. Do not add plain `.css` files.

Format source and public metadata files consistently with:

```bash
npm run format
```

Check formatting without changing files with:

```bash
npm run format:check
```
