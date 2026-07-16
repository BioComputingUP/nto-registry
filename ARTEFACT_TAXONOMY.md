# Artefact Taxonomy & Selection Criteria

This page defines the categories and artefact types captured by the **NTO
Registry** (`data/nto_catalogue.yml`), and the criteria for proposing new
entries. It mirrors the role of `TOOLS_SELECTION_CRITERIA.md` in the sibling
[OSAI_ecosystem](https://github.com/BioComputingUP/OSAI_ecosystem) repository.

The registry captures **Non-Traditional Outputs (NTOs)**: outputs
and activities that sustain modern research but are systematically
under-represented in publication-centric assessment — data curation, research
software, training, research support, and peer review. The taxonomy is seeded
from Table 3 of Farrell et al., "Credit, recognition, and reward for
non-traditional research artefacts in the Life Sciences" (2026), and is
explicitly designed to be extended by the community over time (see
CONTRIBUTING.md).

## Categories

- **Data** — curation, deposition, and stewardship of research data.
- **Training** — design, delivery, and FAIRification of educational content.
- **Software** — development, packaging, documentation, and release of research software.
- **Research support** — the activities that keep scientific networks and projects running (strategy, events, outreach, compliance, policy, funding).
- **Peer review** — critical evaluation of manuscripts and grant applications.

## Artefact types by category

| Category | Artefact | One-line definition |
|---|---|---|
| Data | Public Data Service | A fully functional, maintained live data service (e.g. a knowledgebase). |
| Data | Curated Knowledgebase Entry | A structured record synthesised from literature/secondary analysis. |
| Data | FAIR Metadata Record | Comprehensive, standard-format metadata making a dataset FAIR. |
| Data | Public Dataset Entry Submission | A packaged primary dataset deposited to a public archive. |
| Data | Data Management Plan (DMP) | A formal plan for a project's data lifecycle. |
| Training | Training Material | Standalone instructional content (slides, recordings, e-learning). |
| Training | Educational Module | A formally accredited unit within a degree curriculum. |
| Training | FAIR Training Material Release | A preserved, versioned, citable training resource. |
| Training | Learning Path | A structured sequence of training materials. |
| Training | Supervised Student Project Output | A scholarly output authored by a supervised student. |
| Software | Documentation | Manuals, developer docs, or notebooks explaining software use. |
| Software | Research Software Code Repository | Actively maintained, version-controlled source code. |
| Software | Software Package | A bundled, installable distribution of functional code. |
| Software | FAIR Software Release | A preserved, versioned, citable software release. |
| Software | Software Management Plan | A strategic document on a software project's lifecycle/sustainability. |
| Software | Software Demo | A live or recorded demonstration of software functionality. |
| Research support | Strategy Document | A document guiding network strategic direction or engagement. |
| Research support | Event Output (Agenda / Proceedings / Report) | Materials captured from organising a community event. |
| Research support | Science Communication / Outreach Media | Public-facing content translating research for broad audiences. |
| Research support | Administrative / Compliance Record | Institutional/legal paperwork (ethics, financial audits, etc). |
| Research support | Policy Brief | A concise research summary advising policy/standardisation bodies. |
| Research support | Grant Proposal | An authored funding application document. |
| Peer review | Published Peer Review Report | A formal manuscript evaluation, sometimes published openly. |
| Peer review | Grant Evaluation Report | A critical assessment of a grant application's viability. |

## When to propose a new artefact **type** vs. a new **example**

- **New example** — you know of a specific resource (e.g. a named database, a
  named training course) that illustrates an *existing* artefact type. Open a
  ["Submit a new NTO example"](.github/ISSUE_TEMPLATE/submit_nto_example.yml)
  issue, or a PR adding it to that artefact's `examples` list.
- **New artefact type** — you believe there is a distinct category of
  non-traditional output not represented by any row above (it has its own
  explanation, activities, and typical examples that don't fit an existing
  row). Open the same issue template but select "New artefact type", and
  explain how it differs from the closest existing type.
- **New supporting infrastructure** — you know of a platform that captures
  credit for one or more artefact types (comparable to APICURON, ORCID,
  bio.tools, etc). Propose it via the same template; it will be added to
  `data/infrastructure_catalogue.yml` and referenced from the relevant
  artefact entries.

## Out of scope

- Purely commercial resources with no meaningful open/free access path.
- Generic AI/ML tooling not specific to capturing or producing an NTO (see
  the sibling [OSAI_ecosystem](https://github.com/BioComputingUP/OSAI_ecosystem)
  repository for that scope instead).
- Duplicate entries for a resource already covered by an existing artefact's
  examples.
