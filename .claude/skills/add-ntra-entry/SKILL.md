---
name: add-ntra-entry
description: Use when adding a new example, a new artefact type, a new supporting-infrastructure platform, or a new assessment reform initiative to the NTRA Registry, or when correcting an existing entry — whether the source is a filed GitHub issue (submit_ntra_example / suggest_change) or an ad hoc request from a maintainer. Appends/edits data/ntra_catalogue.yml, data/infrastructure_catalogue.yml, and data/reform_initiatives.yml correctly and validates before finishing.
---

# Add / Correct an NTRA Registry Entry

**Purpose:** Resolve a submission — filed as a GitHub issue or requested ad
hoc — into a correctly formatted entry in `data/ntra_catalogue.yml`,
`data/infrastructure_catalogue.yml`, and/or `data/reform_initiatives.yml`.

The public website (`site/`) reads these files at build time and needs no
manual update — see AGENTS.md's "Website" section. Never edit anything under
`site/src/generated/` to reflect a data change; it's regenerated automatically.

This skill only handles the *content* change. After it, always invoke the
`semver-maintenance` skill to bump the version consistently — do not bump
`catalogue-version` from within this skill.

---

## Step 1 — Determine the intake path and submission type

**From a GitHub issue:** read the issue body. It was filed via one of:
- `submit_ntra_example.yml` — submission type is one of "New example for an
  existing artefact", "New artefact type", or "New supporting infrastructure".
- `suggest_change.yml` — a correction to an existing entry (identified by
  its `id`).

**From an ad hoc request:** infer the same classification from what the user
asks for (e.g. "add the Ersilia Model Hub as an example of Curated
Knowledgebase Entry" = new example; "there's no artefact type for X" = new
artefact type).

## Step 2 — Route to the right procedure

### A. New example for an existing artefact

1. Find the target entry in `data/ntra_catalogue.yml` by `artefact` name or
   `id`. If ambiguous, check [ARTEFACT_TAXONOMY.md](../../../ARTEFACT_TAXONOMY.md).
2. Determine `{name, url}`. Use the resource's real, canonical URL. **If you
   are not confident of a stable public URL, use `url: ''`** — do not
   fabricate one (see AGENTS.md "Hard rules").
3. Append to that entry's `examples` list, matching existing formatting.
4. Bump that entry's `last-modified-version` — but leave the actual version
   *number* to be decided by the `semver-maintenance` skill; just mark that
   it changed.

### B. New artefact type

1. Confirm it doesn't already exist under a different name (check
   `ARTEFACT_TAXONOMY.md` and grep `artefact:` values in the YAML).
2. Determine `category` — must be one of `Data`, `Training`, `Software`,
   `Research support`, `Peer review`. If none fit, this is a MAJOR schema
   change (a new category) — stop and flag it explicitly to the user rather
   than proceeding silently.
3. Fill in every field using the template at the top of
   `data/ntra_catalogue.yml`:

   | Field | How to determine |
   |---|---|
   | `id` | kebab-case of `artefact` (e.g. "Curated Knowledgebase Entry" → `curated-knowledgebase-entry`). Must be unique. |
   | `category` | one of the 5 known categories |
   | `artefact` | full human-readable name |
   | `explanation` | 1–3 sentences, what it is (not how to make it) |
   | `activities` | list of 1+ activities that produce this artefact — this can and often should have multiple items |
   | `examples` | list of `{name, url}`, url `''` if not confident |
   | `supporting-infrastructure` | list of `{infrastructure-id, capture-function, status}` — see Step 3 |
   | `added-in-version` / `last-modified-version` | leave as a placeholder; `semver-maintenance` fills in the real next version |

4. Show the complete draft YAML block to the user before writing it.
5. Once confirmed, append it under the correct category section (matching the
   `# Category: X` comment banners already in the file) at the end of that
   category's entries.
6. Add a row to the table in `ARTEFACT_TAXONOMY.md`.

### C. New supporting infrastructure

1. Check `data/infrastructure_catalogue.yml` for an existing entry first.
2. Fill in `id` (kebab-case), `name`, `url`, `function` (one of: Publishing &
   PID provision, Aggregation, Metadata enrichment, Contribution tracking &
   incentives, Academic profiles — or a short new phrase if none fit).
3. Append to `data/infrastructure_catalogue.yml`.
4. Then add `{infrastructure-id, capture-function, status}` references to it
   from the relevant artefact entries in `data/ntra_catalogue.yml` — write a
   `capture-function` specific to *that* artefact, not a generic copy of
   `function`. Set `status: active` only if you have real evidence the
   pathway is live today; otherwise `status: planned`.

### D. Correction (from `suggest_change.yml` or ad hoc)

1. Locate the entry by `id`.
2. Apply the minimal fix requested (wording, URL, category, infrastructure
   reference). Do not rewrite unrelated fields.
3. Bump that entry's `last-modified-version` (value TBD by `semver-maintenance`).

### E. New assessment reform initiative

1. Check `data/reform_initiatives.yml` for an existing entry first.
2. Fill in every field using the template at the top of that file: `id`
   (kebab-case of `initiative`), `initiative` (full name), `year`,
   `core-philosophy` (1-2 sentences), `relevance-to-ntras` (how it
   specifically supports non-traditional research artefacts), `url`. Only
   set `url` to a real, confident homepage — `''` otherwise.
3. Append to `data/reform_initiatives.yml`. This file has no top-level
   version field of its own — it shares `catalogue-version` from
   `data/ntra_catalogue.yml`.

## Step 3 — Show the draft, then write

Before writing anything, display the complete YAML block(s) you intend to add
or change and ask the user to confirm or correct it — mirroring the review
step used in the sibling OSAI_ecosystem repo's equivalent skill.

## Step 4 — Validate

Run:
```bash
python3 scripts/validate_yaml.py
```
Fix any reported errors before considering the change complete.

## Step 5 — Hand off to versioning

Do not finish here. Tell the user (or proceed automatically if operating
autonomously) to invoke the `semver-maintenance` skill to classify this
change under SemVer and propagate the version bump across
`catalogue-version`, `CITATION.cff`, the README badge, and `CHANGELOG.md`.

---

## Formatting rules

- `id`: lowercase kebab-case only (e.g. `ersilia-model-hub`), no spaces or underscores.
- Multi-sentence text fields use YAML folded block scalar `>-`, matching surrounding entries.
- Field order for artefact entries: `id`, `category`, `artefact`, `explanation`,
  `activities`, `examples`, `supporting-infrastructure`, `added-in-version`,
  `last-modified-version`.
- Field order for infrastructure entries: `id`, `name`, `url`, `function`,
  `added-in-version`, `last-modified-version`.
- `examples[].url` and infrastructure `url` are `''` (not omitted) when no
  confident URL exists.

## Example: adding a new example to an existing artefact

```yaml
# In data/ntra_catalogue.yml, under the "curated-knowledgebase-entry" entry's examples:
  examples:
    - name: UniProt entry
      url: https://www.uniprot.org
    - name: DisProt entry
      url: https://disprot.org
    - name: PomBase entry
      url: https://www.pombase.org
    - name: Ersilia Model Hub curated entry   # newly added
      url: https://ersilia.io/model-hub
```
