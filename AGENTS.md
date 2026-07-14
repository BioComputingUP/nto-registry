# Agent Guidance for the NTRA Registry

This file orients any AI coding agent (Claude Code, or otherwise) working in
this repository. Read this before making changes.

## What this repo is

A versioned, community-extensible YAML catalogue of Non-Traditional Research
Artefacts (NTRAs) in the Life Sciences — see [README.md](README.md) for
background and [ARTEFACT_TAXONOMY.md](ARTEFACT_TAXONOMY.md) for the full
taxonomy of 5 categories / 24 artefact types.

## Where things live

```
data/ntra_catalogue.yml            # the artefact entries (the core dataset)
data/infrastructure_catalogue.yml  # normalized platform definitions, referenced by id
data/reform_initiatives.yml        # research assessment reform initiatives (Table 1)
data/CONTRIBUTORS.yml              # content contributors
scripts/validate_yaml.py           # schema/reference-integrity validator — run before committing
ARTEFACT_TAXONOMY.md               # categories, artefact types, and inclusion criteria
CONTRIBUTING.md                    # full contribution workflow + SemVer policy
CHANGELOG.md                       # Keep a Changelog history
CITATION.cff                       # citation metadata, version kept in sync with the catalogue
.github/ISSUE_TEMPLATE/            # structured intake forms for submissions/corrections
site/                              # the public website — see "Website" section below
```

## The two things you'll usually be asked to do

1. **Add or correct a catalogue entry** — use the
   [`add-ntra-entry`](.claude/skills/add-ntra-entry/SKILL.md) skill. It covers
   both intake paths: resolving a filed GitHub issue, or an ad hoc request
   ("add X as an example of Curated Knowledgebase Entry").
2. **Bump the version consistently** — use the
   [`semver-maintenance`](.claude/skills/semver-maintenance/SKILL.md) skill
   any time `data/**` changes. Do not hand-edit `catalogue-version` in
   isolation; the skill keeps `CITATION.cff`, the README badge, and
   `CHANGELOG.md` in sync with it.

These are separate skills on purpose: `add-ntra-entry` decides *what* content
changed and appends it; `semver-maintenance` decides *how the version number
should move* in response and propagates it. Adding an entry should always be
followed by invoking the SemVer skill before a PR is opened.

## Hard rules

- **Never hand-write a `catalogue-version` bump without also updating
  `CITATION.cff`, the README badge, and `CHANGELOG.md`** — use the
  `semver-maintenance` skill so nothing drifts.
- **Every `supporting-infrastructure` reference must resolve** — an
  `infrastructure-id` must exist in `data/infrastructure_catalogue.yml`. If
  the platform isn't there yet, add it to that file first (this is itself a
  MINOR bump).
- **Never fabricate a URL.** If you don't have high confidence in a specific
  resource's real, stable URL, leave `url: ''` rather than guessing — this
  matches the existing convention in the seed data (see e.g. several
  `Research support` examples). Flag it to the user instead of inventing one.
- **`id` fields are lowercase kebab-case and must stay unique** within their
  file — the validator enforces this.
- **Run `python3 scripts/validate_yaml.py` before considering any data change
  done.** It checks required fields, category enum values, id uniqueness, and
  infrastructure-reference integrity. CI (`.github/workflows/validate.yml`)
  re-runs it on every PR touching `data/**`.
- **Categories are a closed set**: `Data`, `Training`, `Software`,
  `Research support`, `Peer review`. Proposing a new category is a MAJOR
  schema change — flag it explicitly rather than adding one silently.

## Style

- Follow the field order and formatting already used in
  `data/ntra_catalogue.yml` and `data/infrastructure_catalogue.yml` (each
  file's header comment documents the template). Use YAML `>-` folded block
  scalars for multi-sentence text, matching the existing entries.
- Keep documentation edits (README, CONTRIBUTING, ARTEFACT_TAXONOMY) in sync
  with schema changes — if you add a field to the entry schema, update the
  header comment in the YAML file, ARTEFACT_TAXONOMY.md if relevant, and the
  `add-ntra-entry` skill's field table.

## Website (`site/`)

The public site (deployed to https://gavinf97.github.io/ntra-registry/) is
an [Astro](https://astro.build) project with a React island for the
filterable Registry page, live at `site/`.

- **Data flow is one-directional and automatic.** `site/scripts/build-data.mjs`
  reads `data/*.yml` and writes JSON into `site/src/generated/` (gitignored).
  This runs via `predev`/`prebuild` npm hooks — **never hand-edit anything
  under `site/src/generated/`**; it will be overwritten on the next build. If
  you change the YAML schema, the JSON shape changes automatically; update
  the consuming `.astro`/`.tsx` files (`site/src/lib/types.ts`,
  `site/src/pages/*.astro`, `site/src/components/RegistryExplorer.tsx`) to
  match if you added/renamed fields the site reads.
- **Adding a new artefact/infrastructure/reform-initiative entry needs no
  site changes at all** — the next build picks it up automatically via the
  YAML → JSON pipeline.
- **Local dev:** from `site/`, either `npm run dev` (Node 22.12+) or
  `docker compose up` (no local Node needed — see `site/README.md`). Both
  give hot reload at `http://localhost:4321/ntra-registry/`.
- **Deploy:** `.github/workflows/deploy-site.yml` builds `site/` and deploys
  `site/dist` to GitHub Pages via the official `actions/deploy-pages` flow on
  every push to `main` touching `site/**` or `data/**`. There is no manual
  deploy step.
- **Styling:** design tokens (colors, type scale, spacing) live in
  `site/src/styles/tokens.css`, sourced from BioComputingUP/OSAI_ecosystem's
  ELIXIR-style branding (navy `#103344`/`#0b2735`, accent orange `#F66729`,
  font `Lato`). Reuse these tokens rather than introducing new one-off colors.
- **Site base path:** `site/astro.config.mjs` sets `base: '/ntra-registry/'`
  for the current free GitHub Pages URL. If a custom domain is attached
  later, update `site` and `base` there (and add a `public/CNAME` file) —
  nothing else needs to change.
