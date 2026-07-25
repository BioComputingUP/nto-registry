# Changelog

All notable changes to the NTO Registry are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) — see
CONTRIBUTING.md for the exact MAJOR/MINOR/PATCH bump policy applied to
`catalogue-version`.

## [1.4.0] - 2026-07-24

### Added
- Four new supporting-infrastructure entries in
  `data/infrastructure_catalogue.yml`, per Table 2 and Figure 2 of the
  paper: ELIXIR EDD (ELIXIR Deposition Databases), DMPonline, Software
  Heritage, and CRediT (Contributor Roles Taxonomy) — the last introducing
  a new "Ontologies & controlled vocabularies" infrastructure function.
- Filled active credit-mapping gaps shown in Figure 2 but missing from
  `data/nto_catalogue.yml`: DMPonline → Data Management Plan (DMP),
  ELIXIR EDD → Public Dataset Entry Submission, Software Heritage →
  Research Software Code Repository.
- An optional `usability` field on infrastructure entries outside
  Publishing & PID Provision (ORCID, BIP! Scholar, OpenAIRE Graph, BIP!,
  OpenEBench, APICURON, CRediT) — practical applicability/cost notes shown
  on the Infrastructure page's "Show details" panel.

### Changed
- Clarified APICURON's function description to note it also supports
  direct registration of new curation activities, not just tracking
  credit for activity on already-registered entries.

### Fixed
- Removed an inaccurate bio.tools → Public Data Service credit-capture
  mapping in `data/nto_catalogue.yml`; bio.tools registers software and
  tools, not live data services like Ensembl or BacDive (FAIRsharing
  already covers that registration role for this artefact).
- Replaced an inaccurate OpenEBench → FAIR Metadata Record mapping with
  ELIXIR EDD; OpenEBench benchmarks research software, it doesn't enrich
  dataset metadata. ELIXIR EDD's deposition databases require
  standardised, comprehensive metadata as a condition of acceptance,
  which is a genuine fit for this artefact.
- The Registry page's "Show details" panel only listed supporting
  infrastructure from APICURON, ORCID, or BIP! Scholar — a stale filter
  left over from before the Infrastructure page's Essential/Intermediary
  restructure. It now ingests its "Supporting infrastructure" list
  directly from whichever platforms the Infrastructure page classifies
  under Publishing & PID Provision, so the two pages can't drift out of
  sync with each other again.

## [1.3.0] - 2026-07-16

### Added
- APICURON now actively credits FAIR Training Material Release and FAIR
  Software Release — the discrete FAIRification/release-preparation event
  fits its granular, activity-timeline contribution-tracking model, the
  same model already active for Public Data Service and Curated
  Knowledgebase Entry.
- BIP! Scholar now actively credits Public Dataset Entry Submission and
  Published Peer Review Report. Verified against BIP! Scholar's own
  service description and its founding paper ("BIP! Scholar: A Service to
  Facilitate Fair Researcher Assessment," arXiv:2205.03152), which
  explicitly names dataset production and peer reviewing as contribution
  types it highlights on a researcher's profile, sourced mainly from the
  OpenAIRE Graph.

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
