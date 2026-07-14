# Changelog

All notable changes to the NTRA Registry are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/) — see
CONTRIBUTING.md for the exact MAJOR/MINOR/PATCH bump policy applied to
`catalogue-version`.

## [1.0.0] - 2026-07-14

### Added
- Initial release of `data/ntra_catalogue.yml`, seeding all 24 artefact types
  across the 5 categories (Data, Training, Software, Research support, Peer
  review) landscaped in Table 3 of Farrell et al. (2025), "Credit,
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
- GitHub issue templates for submitting new NTRA examples/types and
  suggesting corrections.
- Agent guidance (`AGENTS.md`) and two Claude Code skills:
  `add-ntra-entry` and `semver-maintenance`.
