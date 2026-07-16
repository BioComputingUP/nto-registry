# Changelog

All notable changes to the NTO Registry are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) — see
CONTRIBUTING.md for the exact MAJOR/MINOR/PATCH bump policy applied to
`catalogue-version`.

## [1.2.2] - 2026-07-16

### Fixed
- Corrected BIP! Scholar's URL to `https://bip.imsi.athenarc.gr/scholar`
  (`data/infrastructure_catalogue.yml`).
- Pruned ORCID from `data/nto_catalogue.yml` supporting-infrastructure down
  to artefact types it can genuinely register as a discretely-identified
  work in a researcher's ORCID record: Public Dataset Entry Submission,
  Training Material, Educational Module, FAIR Training Material Release,
  and Software Package. Removed the `orcid` mapping from Public Data
  Service, Curated Knowledgebase Entry, FAIR Metadata Record, Data
  Management Plan (DMP), Learning Path, Software Management Plan, and
  Software Demo — these credit ongoing service/stewardship or an
  un-identified sub-object rather than a separately citable ORCID work.

## [1.2.1] - 2026-07-16

### Fixed
- Corrected `data/nto_catalogue.yml` supporting-infrastructure mappings:
  `bio-tools` now credits `public-data-service` (Public Data Service) instead
  of `public-dataset-entry-submission`, and the `fairsharing` mapping on
  `curated-knowledgebase-entry` was removed as inaccurate (FAIRsharing
  remains linked to `public-data-service`).

## [1.2.0] - 2026-07-14

### Added
- `fairsharing` added to `data/infrastructure_catalogue.yml` — FAIRsharing
  registers data/metadata standards, databases, and repositories with a
  discoverable, citable record independent of where the underlying data is
  hosted. Linked as active supporting infrastructure on the `public-data-
  service` and `curated-knowledgebase-entry` artefacts in
  `data/nto_catalogue.yml`.

## [1.1.0] - 2026-07-14

### Added
- `data/reform_initiatives.yml`, seeding the 5 key international research
  assessment reform initiatives from Table 1 of Farrell et al. (2026) — DORA,
  Leiden Manifesto, Hong Kong Principles, Hidden REF, and CoARA — each with
  its core philosophy, relevance to non-traditional research artefacts, and
  homepage URL. Validated by an extended `scripts/validate_yaml.py`.
- A public GitHub Pages website (`site/`), built with Astro + React and
  deployed automatically via GitHub Actions, presenting the registry as a
  filterable Home / Registry / Assessment Reforms / Infrastructure / About
  site. See `AGENTS.md` for the site's build/deploy contract.

## [1.0.0] - 2026-07-14

### Added
- Initial release of `data/nto_catalogue.yml`, seeding all 24 artefact types
  across the 5 categories (Data, Training, Software, Research support, Peer
  review) landscaped in Table 3 of Farrell et al. (2026), "Credit,
  recognition, and reward for non-traditional research artefacts in the Life
  Sciences."
- Initial release of `data/infrastructure_catalogue.yml`, seeding 11
  supporting-infrastructure platforms (APICURON, ORCID, bio.tools,
  WorkflowHub, ELIXIR TeSS, Zenodo, GitHub, OpenAIRE Graph, BIP!, OpenEBench,
  BIP! Scholar) per Table 2 / Figure 2 of the same paper.
- `data/CONTRIBUTORS.yml` seeded with the paper's co-authors.
- Governance docs (README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT,
  ARTEFACT_TAXONOMY, CITATION.cff), adapted from
  [OSAI_ecosystem](https://github.com/BioComputingUP/OSAI_ecosystem).
- `scripts/validate_yaml.py` and a `validate.yml` GitHub Action enforcing
  schema integrity on PRs touching `data/**`.
- GitHub issue templates for submitting new NTO examples/types and
  suggesting corrections.
- Agent guidance (`AGENTS.md`) and two Claude Code skills:
  `add-nto-entry` and `semver-maintenance`.
