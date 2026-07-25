# Changelog

All notable changes to the NTO Registry are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) — see
CONTRIBUTING.md for the exact MAJOR/MINOR/PATCH bump policy applied to
`catalogue-version`.

## [2.1.0] - 2026-07-25

### Added
- **Software Management Plan**: added Zenodo, `active` — it can archive a
  completed plan document with a citable DOI, shown on both its
  Infrastructure page card ("Currently captures credit for") and its
  Registry page card.

### Changed
- Replaced the placeholder favicon (an orange "N" on navy, explicitly
  marked in its own source as a stand-in) with the real NTO Registry logo
  mark — the same icon used in the site header.

## [2.0.0] - 2026-07-25

### Removed (breaking)
- The `planned` value for `supporting-infrastructure[].status` is no longer
  used anywhere in `data/nto_catalogue.yml`, and `scripts/validate_yaml.py`
  now rejects it — every reference in the catalogue must be a real,
  currently-live credit-capture pathway. Aspirational/not-yet-live
  pathways are simply not recorded, rather than kept as a "planned"
  placeholder.
- Removed all 17 existing `status: planned` entries (across 14 artefacts).
  For 7 of them, this was their *only* supporting-infrastructure content,
  so they now have an explicit empty list (`supporting-infrastructure: []`)
  instead — an honest gap rather than a guess: Supervised Student Project
  Output, Software Management Plan, Software Demo, Science Communication /
  Outreach Media, Administrative / Compliance Record, Grant Proposal, and
  Grant Evaluation Report.
- **Breaking for downstream consumers**: `data/nto_catalogue.yml` previously
  guaranteed every `supporting-infrastructure` list was non-empty and that
  `status` could be `active` or `planned`. Neither guarantee holds anymore —
  the list may now be empty, and `status` is always `active`. The generated
  `infrastructure-catalogue.json` also no longer includes a `plannedFor`
  field per infrastructure entry (only `activeFor` remains), and
  `site/src/lib/types.ts`'s `SupportingInfrastructureRef.status` type is
  narrowed to `"active"` only.

## [1.4.0] - 2026-07-24

### Added — infrastructure alignment with the updated Figure 2 wheel
- **New platform: PREreview** (`prereview.org`) — Publishing & PID
  provision. Open-source, journal-independent platform for publishing
  community preprint reviews under the reviewer's ORCID. Mapped active to
  **Published Peer Review Report**.
- **Data Management Plan (DMP)**: Zenodo raised from `planned` to
  `active` — it can archive a completed DMP with a citable DOI today.
- **Policy Brief**: Zenodo raised from `planned` to `active` — confirmed
  by the entry's own example, the ELIXIR STEERS Policy Brief, which is
  already hosted on Zenodo (zenodo.org/records/17076988).
- **Strategy Document**: added Zenodo, `active` — confirmed by its
  example (zenodo.org/records/7120997).
- **Event Output (Agenda / Proceedings / Report)**: added Zenodo,
  `active` — confirmed by its example (zenodo.org/records/11517780).
- **Grant Proposal**: added Zenodo, `planned` (not active) — most grant
  proposals stay proprietary/unpublished, matching this entry's existing
  ORCID caveat, so this one wasn't promoted to active.
- Left **Software Demo** and **Software Management Plan**'s Zenodo
  mappings as `planned`, unchanged — the updated figure may show Zenodo
  active for these too, but the exact badge-to-segment position wasn't
  legible enough to confirm confidently, and neither has a real example
  hosted on Zenodo yet to corroborate it. Flagging for a follow-up check
  against the source figure rather than guessing.

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
- Registry card "Supporting infrastructure" entries are now clickable —
  each platform name links out to its real homepage (e.g. clicking
  "bio.tools" goes to bio.tools), sourced directly from
  `data/infrastructure_catalogue.yml`'s own `url` field so the Registry
  and Infrastructure pages can't disagree on where a platform lives.

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
- Filled in 17 missing example URLs in `data/nto_catalogue.yml` (e.g.
  ELIXIR Software Management Plan, ELIXIR Cloud demos, ELIXIR EOSC
  strategy document, ELIXIR STEERS Policy Brief, and others across
  Training/Software/Research support/Peer review), extracted from the
  hyperlinks embedded in the paper's own examples table, so every Registry
  card example that has a real source link is now clickable. Also
  corrected two examples (TeSS Learning Paths, ELIXIR TeSS training
  material) to their precise subpages instead of the bare tess.elixir-europe.org
  homepage. One example (a generic "Bachelors, Masters, or PhD thesis")
  has no source link in the paper and is intentionally left without a URL
  rather than a fabricated one.

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
