# NTO Registry: Non-Traditional Outputs in the Life Sciences

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Catalogue Version](https://img.shields.io/badge/catalogue--version-2.6.0-blue.svg)](CHANGELOG.md)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22306726.svg)](https://doi.org/10.5281/zenodo.22306726)

### 🌐 [Browse the live registry](https://nto-registry.org/)

Welcome to the **NTO Registry**! This repository hosts a community-curated,
versioned catalogue of **Non-Traditional Outputs (NTOs)** — the
data curation, research software, training, research support, and peer review
work that sustains modern science but is systematically under-represented in
publication-centric research assessment.

Our goal is to provide a machine-readable, extensible vocabulary of these
artefact types — what they are, the activities that produce them, real
examples, and the technical infrastructure capable of capturing credit for
them — so that institutions, funders, and tool builders have a concrete,
reusable foundation for recognising this work.

---

## Background and Purpose

This registry operationalises the landscaping presented in Farrell G, Alloza
E, Bouhraoua A, Capella-Gutierrez S, Goble C, Hermjakob H, Makaronidou M,
Smith A, Sufi S, Vergoulis T, Zoubiri M, Quaglia F, Tosatto SCE, "Credit,
recognition, and reward for non-traditional research outputs in the Life
Sciences" (2026). That paper maps 24 non-traditional artefact types across 5
categories (Data, Training, Software, Research support, Peer review),
illustrated with Life Science examples from ELIXIR Europe, and calls for a
community-developed controlled vocabulary and ontology for these assets.

The primary goal of this registry is to serve as a dynamic, community-
maintained inventory, explicitly **designed for reuse and adaptation**. While
the initial catalogue is grounded in the Life Sciences, the structure — a
categorised artefact taxonomy paired with a normalized catalogue of
credit-capturing infrastructure — is intended to be copied and repurposed for
other data-intensive research domains.

The catalogue data is maintained in human-readable YAML files within the
`/data` directory:

* `data/nto_catalogue.yml` — the 24 artefact types, their explanations,
  corresponding activities, examples, and supporting infrastructure.
* `data/infrastructure_catalogue.yml` — the normalized registry of platforms
  (APICURON, ORCID, bio.tools, Zenodo, etc.) referenced by the entries above,
  each cross-walked onto the CoARA OI4RRA four-tier architecture.
* `data/reform_initiatives.yml` — key international research assessment reform
  initiatives (DORA, Leiden Manifesto, Hong Kong Principles, Hidden REF, CoARA,
  UN Open Source Principles, OPUS RAF)
  and their relevance to non-traditional research outputs.
* `data/CONTRIBUTORS.yml` — contributors to the registry's content.

Every tagged release is archived on Zenodo as a citable dataset. The DOI badge
above is the **concept DOI** — it is stable across all releases and always
resolves to the most recent one; each individual release also has its own
version DOI. See the [Archive section](https://nto-registry.org/about/#archive)
or [the releases](https://github.com/BioComputingUP/nto-registry/releases).

See [ARTEFACT_TAXONOMY.md](ARTEFACT_TAXONOMY.md) for the full taxonomy and
selection criteria.

A public website ([`site/`](site/), built with Astro + React and deployed to
GitHub Pages at the custom domain https://nto-registry.org/ via
[`.github/workflows/deploy-site.yml`](.github/workflows/deploy-site.yml) and
[`site/public/CNAME`](site/public/CNAME)) presents this data as a filterable
Registry, an Assessment Reforms table, an Infrastructure directory, a
role-based Get Started guide, and an About page — built directly from the
YAML above on every push, so the site and the data never drift apart. See
[Local Development & Preview](#local-development--preview) below to run it
locally, and the "Website" section of [AGENTS.md](AGENTS.md) for the
build/deploy contract.

> [!NOTE]
> This registry is under active development and curation. Contributions and
> suggestions are highly encouraged!

## Local Development & Preview

Before opening a PR — or any time you're planning a catalogue update or
debugging the site — you can run a full local copy of the registry website to
see your changes rendered before they're committed. Both options below
support hot reload for anything under `site/`; **editing `data/*.yml`,
however, requires restarting the dev server** — `build-data.mjs` regenerates
`site/src/generated/*.json` once, via the `predev` npm hook, before the
server starts, not on an ongoing watch basis.

### Docker (recommended — no local Node install needed)

Also the quickest way to sidestep Node version mismatches, since Astro
requires Node **22.12+** and the container always matches regardless of
what's installed on your host:

```sh
cd site
docker compose up
```

Opens at `http://localhost:4321/` with hot reload. `Ctrl+C` to stop; after
editing `data/*.yml`, stop and run `docker compose up` again to pick up the
change.

### Node directly

```sh
cd site
npm install
npm run dev
```

Requires Node.js **22.12+**. Same behaviour as Docker — `Ctrl+C` and rerun
`npm run dev` after editing `data/*.yml`.

See [`site/README.md`](site/README.md) for the full command reference
(`build-data`, `build`, `preview`) and the "Website" section of
[AGENTS.md](AGENTS.md) for the build/deploy contract.

## Versioning

This registry is versioned with strict [Semantic Versioning](https://semver.org/)
(`catalogue-version` in `data/nto_catalogue.yml`). See
[CONTRIBUTING.md](CONTRIBUTING.md#versioning-policy-semver) for the exact
MAJOR/MINOR/PATCH policy, and [CHANGELOG.md](CHANGELOG.md) for the release
history.

## Contributing

We welcome contributions to help grow and maintain this registry. We have two
straightforward ways to propose an addition:

### Option 1: Submit an Issue (Recommended)
1. Navigate to the [Issues tab](../../issues).
2. Choose **Submit a New NTO Example/Type** to propose a new example, a new
   artefact type, or a new supporting-infrastructure platform, or
   **Suggest a Change** to correct an existing entry.
3. Fill out the form and submit. Maintainers will review and add it.

### Option 2: Submit a Pull Request (PR)
1. Edit `data/nto_catalogue.yml`, `data/infrastructure_catalogue.yml`, and/or
   `data/reform_initiatives.yml` directly, following the in-file template
   comments and [ARTEFACT_TAXONOMY.md](ARTEFACT_TAXONOMY.md). No site changes
   are needed — the website regenerates from this data on every build.
2. Bump `catalogue-version` per the SemVer policy and update `CHANGELOG.md`.
3. Run `python3 scripts/validate_yaml.py` locally.
4. Open a Pull Request describing your contribution.

Full details are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Agentic contributions

This repository ships agent-facing guidance so AI coding assistants can
contribute cohesively: see [AGENTS.md](AGENTS.md) for the repository
orientation, and `.claude/skills/` for two Claude Code skills —
`add-nto-entry` (resolve a submission into the catalogue) and
`semver-maintenance` (bump versions consistently across all dependent files).

## License

The content of this registry is licensed under the **Creative Commons
Attribution 4.0 International (CC BY 4.0)** license. See
[LICENSE.md](LICENSE.md). By contributing, you agree that your contributions
will be licensed under CC BY 4.0.

## Citation

If you use this registry in your work, please cite it using the
[CITATION.cff](CITATION.cff) file in the repository root.

## Code of Conduct

All participants are expected to adhere to the project's
[Code of Conduct](CODE_OF_CONDUCT.md).

## Contact

For questions, suggestions, or to report issues, please open an
[Issue](../../issues) in this repository, or contact the primary maintainer
at **gavinmichael.farrell@phd.unipd.it**.

## Acknowledgements

This repository's governance structure (README style, LICENSE, CONTRIBUTING,
CODE_OF_CONDUCT, issue templates, and agent-skill pattern) is adapted from
[BioComputingUP/OSAI_ecosystem](https://github.com/BioComputingUP/OSAI_ecosystem),
a sibling registry for Open and Sustainable AI ecosystem components, used
under its CC BY 4.0 license. That repository's own structure and
documentation approach in turn draw on the [Research Software Quality Kit (RSQKit)](https://github.com/EVERSE-ResearchSoftware/RSQKit)
and ELIXIR's [Research Data Management Kit (RDMKit)](https://rdmkit.elixir-europe.org/).

The artefact taxonomy captured here is derived from the landscaping work of
the ELIXIR Europe community, including contributions via the ELIXIR STEERS
and EOSC EVERSE Horizon Europe projects — see `data/CONTRIBUTORS.yml` for the
full list of contributors to that landscaping effort.
