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
non-traditional research outputs in the Life Sciences" (2026), and is
explicitly designed to be extended by the community over time (see
CONTRIBUTING.md).

## Categories

- **Data** — curation, deposition, and stewardship of research data.
- **Training** — design, delivery, and FAIRification of educational content.
- **Software** — development, packaging, documentation, and release of research software.
- **Research support** — the activities that keep scientific networks and projects running (strategy, events, outreach, compliance, policy, funding).
- **Peer review** — critical evaluation of manuscripts and grant applications.

## OPUS RAF cross-mapping

Alongside these 5 categories, every artefact type is also mapped to a domain
in the **OPUS Research Assessment Framework (RAF)**
(https://zenodo.org/records/15826745) — a discipline-neutral 4-domain model
some institutions already use for assessment. This is optional, supplementary
metadata (the Registry page's OPUS RAF view is off by default), stored as
`opus-raf-domain` in `data/nto_catalogue.yml`.

- **Research** — writing proposals, developing methods, managing data,
  developing software, writing publications, creating research materials,
  and peer reviewing research outputs.
- **Education** — developing educational courses, creating educational
  resources, teaching students, supervising students, and developing
  personal and professional skills.
- **Leadership** — leading personnel and projects, taking management roles
  within the organisation, and being recognised as an expert and for
  significant contributions.
- **Valorisation** — science communication to peer and general audiences,
  academic and intersectoral collaboration and engagement, and exploitation
  and entrepreneurship.

`Data`, `Software`, and `Peer review` map to Research; `Training` maps to
Education. `Research support` entries are mapped **individually**, not as a
block — see the "OPUS RAF Domain" column below.

## Artefact types by category

| Category | Artefact | One-line definition | OPUS RAF Domain |
|---|---|---|---|
| Data | Public Data Service | A fully functional, maintained live data service (e.g. a knowledgebase). | Research |
| Data | Curated Knowledgebase Entry | A structured record synthesised from literature/secondary analysis. | Research |
| Data | FAIR Metadata Record | Comprehensive, standard-format metadata making a dataset FAIR. | Research |
| Data | Public Dataset Entry Submission | A packaged primary dataset deposited to a public archive. | Research |
| Data | Data Management Plan (DMP) | A formal plan for a project's data lifecycle. | Research |
| Training | Training Material | Standalone instructional content (slides, recordings, e-learning). | Education |
| Training | Educational Module | A formally accredited unit within a degree curriculum. | Education |
| Training | FAIR Training Material Release | A preserved, versioned, citable training resource. | Education |
| Training | Learning Path | A structured sequence of training materials. | Education |
| Training | Supervised Student Project Output | A scholarly output authored by a supervised student. | Education |
| Software | Documentation | Manuals, developer docs, or notebooks explaining software use. | Research |
| Software | Research Software Code Repository | Actively maintained, version-controlled source code. | Research |
| Software | Software Package | A bundled, installable distribution of functional code. | Research |
| Software | FAIR Software Release | A preserved, versioned, citable software release. | Research |
| Software | Software Management Plan | A strategic document on a software project's lifecycle/sustainability. | Research |
| Software | Software Demo | A live or recorded demonstration of software functionality. | Research |
| Research support | Strategy Document | A document guiding network strategic direction or engagement. | Leadership |
| Research support | Event Output (Agenda / Proceedings / Report) | Materials captured from organising a community event. | Valorisation |
| Research support | Science Communication / Outreach Media | Public-facing content translating research for broad audiences. | Valorisation |
| Research support | Administrative / Compliance Record | Institutional/legal paperwork (ethics, financial audits, etc). | Leadership |
| Research support | Policy Brief | A concise research summary advising policy/standardisation bodies. | Valorisation |
| Research support | Grant Proposal | An authored funding application document. | Research |
| Peer review | Published Peer Review Report | A formal manuscript evaluation, sometimes published openly. | Research |
| Peer review | Grant Evaluation Report | A critical assessment of a grant application's viability. | Research |

## When to propose a new artefact **type** vs. a new **example**

- **New example** — you know of a specific resource (e.g. a named database, a
  named training course) that illustrates an *existing* artefact type. Open a
  ["Submit or Update: Registry Output"](.github/ISSUE_TEMPLATE/submit_nto.yml)
  issue, or a PR adding it to that artefact's `examples` list.
- **New artefact type** — you believe there is a distinct category of
  non-traditional output not represented by any row above (it has its own
  explanation, activities, and typical examples that don't fit an existing
  row). Open the same issue template but select "New artefact type", and
  explain how it differs from the closest existing type.
- **New supporting infrastructure** — you know of a platform that captures
  credit for one or more artefact types (comparable to APICURON, ORCID,
  bio.tools, etc). Propose it via
  ["Submit or Update: Supporting Infrastructure"](.github/ISSUE_TEMPLATE/submit_infrastructure.yml);
  it will be added to `data/infrastructure_catalogue.yml` and referenced from
  the relevant artefact entries.

## Out of scope

- Purely commercial resources with no meaningful open/free access path.
- Generic AI/ML tooling not specific to capturing or producing an NTO (see
  the sibling [OSAI_ecosystem](https://github.com/BioComputingUP/OSAI_ecosystem)
  repository for that scope instead).
- Duplicate entries for a resource already covered by an existing artefact's
  examples.
