# NTRA Registry — website

An [Astro](https://astro.build) site (with a React island for the filterable
Registry page) that presents the versioned YAML data in `../data/` as a
browsable website, deployed to GitHub Pages at
https://gavinf97.github.io/ntra-registry/.

## How data flows

`scripts/build-data.mjs` reads `../data/ntra_catalogue.yml`,
`../data/infrastructure_catalogue.yml`, and `../data/reform_initiatives.yml`
directly and writes plain JSON into `src/generated/` (gitignored). This runs
automatically before `dev` and `build` (`predev`/`prebuild` npm scripts) —
**never hand-edit `src/generated/`**; edit the YAML in `../data` instead.

## Local development

### Option A — Node directly

Requires Node.js **22.12+**.

```sh
npm install
npm run dev
```

Opens at `http://localhost:4321/ntra-registry/` with hot reload.

### Option B — Docker (no local Node needed)

```sh
docker compose up
```

Mounts this directory into the container and runs `astro dev` with hot
reload — edit files locally and the browser at
`http://localhost:4321/ntra-registry/` updates live. `Ctrl+C` or
`docker compose down` to stop.

## Commands

| Command | Action |
| :--- | :--- |
| `npm run build-data` | Regenerate `src/generated/*.json` from `../data/*.yml` |
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment

Deployment is automatic: `.github/workflows/deploy-site.yml` builds and
publishes `dist/` to GitHub Pages on every push to `main` that touches
`site/**` or `data/**`. See the repo root `AGENTS.md` for the full
build/deploy contract.
