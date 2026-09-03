---
name: add-nto-entry
description: Use when adding a new example, a new artefact type, a new supporting-infrastructure platform, or a new assessment reform initiative to the NTO Registry, or when correcting an existing entry — whether the source is a filed GitHub issue (submit_nto / submit_reform / submit_infrastructure) or an ad hoc request from a maintainer. Appends/edits data/nto_catalogue.yml, data/infrastructure_catalogue.yml, and data/reform_initiatives.yml correctly and validates before finishing.
---

# Add / Correct an NTO Registry Entry

**Purpose:** Resolve a submission — filed as a GitHub issue or requested ad
hoc — into a correctly formatted entry in `data/nto_catalogue.yml`,
`data/infrastructure_catalogue.yml`, and/or `data/reform_initiatives.yml`.

The public website (`site/`) reads these files at build time and mostly
needs no manual update — see AGENTS.md's "Website" section. Never edit
anything under `site/src/generated/` to reflect a data change; it's
regenerated automatically. **The one exception is new infrastructure
platforms**, which need a manual `site/src/pages/infrastructure.astro`
update too — see procedure C, step 6 below; skipping it breaks the build.

This skill only handles the *content* change. After it, always invoke the
`semver-maintenance` skill to bump the version consistently — do not bump
`catalogue-version` from within this skill.

---

## Step 1 — Determine the intake path and submission type

**From a GitHub issue:** read the issue body. It was filed via one of:
- `submit_nto.yml` — submission type is one of "New example for an existing
  artefact type", "New artefact type", or "Correction to an existing entry"
  (identified by its `id`) in `data/nto_catalogue.yml`.
- `submit_infrastructure.yml` — submission type is "New infrastructure
  platform" or "Correction to an existing entry" in
  `data/infrastructure_catalogue.yml`.
- `submit_reform.yml` — submission type is "New reform initiative" or
  "Correction to an existing entry" in `data/reform_initiatives.yml`.
- `general_suggestion.yml` — free-form; only relevant here if it turns out to
  actually describe one of the above (redirect the reporter to the right
  template if so, rather than guessing at a structured entry from prose).

**From an ad hoc request:** infer the same classification from what the user
asks for (e.g. "add the Ersilia Model Hub as an example of Curated
Knowledgebase Entry" = new example; "there's no artefact type for X" = new
artefact type).

## Step 2 — Route to the right procedure

### A. New example for an existing artefact

1. Find the target entry in `data/nto_catalogue.yml` by `artefact` name or
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
   `data/nto_catalogue.yml`:

   | Field | How to determine |
   |---|---|
   | `id` | kebab-case of `artefact` (e.g. "Curated Knowledgebase Entry" → `curated-knowledgebase-entry`). Must be unique. |
   | `category` | one of the 5 known categories |
   | `opus-raf-domain` | one of `Research`, `Education`, `Leadership`, `Valorisation` — the OPUS Research Assessment Framework domain (https://zenodo.org/records/14672476) this artefact best fits. Derive it, don't default it: `category` Data/Software/Peer review → `Research`; `category` Training → `Education`; `category` Research support → judge individually against the OPUS domain definitions based on what the artefact's `activities` actually involve — Research support entries span Research, Leadership, and Valorisation depending on the specific artefact, never assume the whole category maps to one domain. Optional in the schema, but every entry should have one — don't skip it. |
   | `artefact` | full human-readable name |
   | `explanation` | 1–3 sentences, what it is (not how to make it) |
   | `activities` | list of 1+ activities that produce this artefact — this can and often should have multiple items |
   | `examples` | list of `{name, url}`, url `''` if not confident |
   | `supporting-infrastructure` | list of `{infrastructure-id, capture-function, status: active}` — see procedure C below. `[]` if nothing live exists yet; never fabricate an entry to avoid an empty list |
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
   incentives, Academic profiles, Ontologies & controlled vocabularies — or a
   short new phrase if none fit — see the Infrastructure page's Essential vs.
   Intermediary tiers, which are derived directly from this field).
3. Fill in `coara-tiers` — a list of one or more of `Tier 0`, `Tier 1`,
   `Tier 2`, `Tier 3` from the CoARA OI4RRA reference architecture
   (https://doi.org/10.5281/zenodo.15297695), which powers the Infrastructure
   page's optional CoARA OI4RRA tier view. Tier 0 is the standards/PID/protocol
   layer, Tier 1 the publishing venues, Tier 2 the aggregators and knowledge
   graphs, Tier 3 the services generating metrics, analytics and indicators.
   Give a platform a second tier only where it performs that tier's function
   as a first-class capability — ORCID is Tier 0 + Tier 3, and it is the only
   platform that is. **Assigning a DOI does not make a repository Tier 0** —
   Tier 0 is the layer a repository consumes, Tier 1 is the venue consuming
   it; without that rule every publishing platform collapses into Tier 0.
   Schema-optional, but every current entry has one — don't skip it. See
   ARTEFACT_TAXONOMY.md's "CoARA OI4RRA cross-mapping" for the full table.
4. Optionally fill in `usability` — 1-2 sentences on practical applicability
   (cost, who it's for, what's required to get value from it), NOT which
   artefact types it applies to. Shown on the Infrastructure page's "Show
   details" panel for every platform outside "Publishing & PID provision".
5. Append to `data/infrastructure_catalogue.yml`.
6. Then add `{infrastructure-id, capture-function, status}` references to it
   from the relevant artefact entries in `data/nto_catalogue.yml` — write a
   `capture-function` specific to *that* artefact, not a generic copy of
   `function`. `status` must be `active` and you need real evidence the
   pathway is live today — we no longer record aspirational/"planned"
   entries. If you don't have evidence of a live pathway, don't add the
   reference at all (a real gap is better than a fabricated one).
7. **Required, not optional — the site build crashes without this:** add an
   entry for the new `id` to the `LOGOS` map in
   `site/src/pages/infrastructure.astro`. Source a *real* logo (fetch it from
   the platform's own site; the file's own top-of-file comment documents the
   fetch/crop/rasterise pattern already used for every existing entry — e.g.
   preferring a small hosted SVG/PNG icon mark over a huge auto-vectorised
   asset, cropping via `viewBox` windowing rather than hand-editing complex
   path data, rasterising to PNG if the source SVG is bloated). Never leave
   an `id` out of `LOGOS` — `logoBoxStyle()` dereferences it unconditionally
   and throws `Cannot read properties of undefined (reading 'type')` at build
   time if it's missing, which `scripts/validate_yaml.py` will **not** catch
   (it only validates the YAML, not the site). Also add the `id` to
   `NTO_CATEGORY` in the same file (which category tag/colour the card
   shows) — this one is optional and falls back to "General" if omitted.
   If the platform's `function` introduces a genuinely new category phrase
   (not one of the existing six — check `FUNCTION_META` in that file), you
   must also add a matching `FUNCTION_META` entry, or it won't be grouped
   into either the Essential or Intermediary tier section at all.
8. Verify with an actual site build, not just the YAML validator:
   ```bash
   cd site && npm run build
   ```
   (or `npm run dev`/`docker compose up` and visually check the
   Infrastructure page renders the new card with a real logo).

**Note on the Registry page:** an artefact's "Supporting infrastructure" list
there is *not* the same as its full `supporting-infrastructure` in the YAML —
it's automatically filtered to only the platforms whose `function` in
`data/infrastructure_catalogue.yml` starts with "Publishing & PID provision"
(computed in `site/src/pages/registry.astro`, not a hand-maintained list).
An artefact whose only active infrastructure is e.g. APICURON or ORCID
(Contribution tracking / Academic profiles, not PID provision) will
correctly show "No active Publishing & PID Provision infrastructure yet." on
its Registry card even though the Infrastructure page shows it as active
elsewhere — that's by design, not a bug to fix.

### D. Correction (from `submit_nto.yml` / `submit_reform.yml` /
    `submit_infrastructure.yml`'s "Correction to an existing entry" path, or ad hoc)

1. Locate the entry by `id`.
2. Apply the minimal fix requested (wording, URL, category, infrastructure
   reference). Do not rewrite unrelated fields. If the correction changes
   `category`, re-check whether `opus-raf-domain` still fits — moving an
   entry (e.g. out of Research support) can change its OPUS domain too.
3. Bump that entry's `last-modified-version` (value TBD by `semver-maintenance`).

### E. New assessment reform initiative

1. Check `data/reform_initiatives.yml` for an existing entry first.
2. Fill in every field using the template at the top of that file: `id`
   (kebab-case of `initiative`), `initiative` (full name), `year`,
   `core-philosophy` (1-2 sentences), `relevance-to-ntos` (how it
   specifically supports non-traditional research outputs), `url`. Only
   set `url` to a real, confident homepage — `''` otherwise.
3. Append to `data/reform_initiatives.yml`. This file has no top-level
   version field of its own — it shares `catalogue-version` from
   `data/nto_catalogue.yml`.

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

**If this change touched `data/infrastructure_catalogue.yml`** (procedure C),
the YAML validator alone is not enough — it has no awareness of the site.
Also do procedure C's step 8 (an actual `site` build) before considering the
change complete; a missing `LOGOS` entry passes YAML validation cleanly but
crashes the site build.

## Step 5 — Hand off to versioning

Do not finish here. Tell the user (or proceed automatically if operating
autonomously) to invoke the `semver-maintenance` skill to classify this
change under SemVer and propagate the version bump across
`catalogue-version`, `CITATION.cff`, the README badge, and `CHANGELOG.md`.

---

## Formatting rules

- `id`: lowercase kebab-case only (e.g. `ersilia-model-hub`), no spaces or underscores.
- Multi-sentence text fields use YAML folded block scalar `>-`, matching surrounding entries.
- Field order for artefact entries: `id`, `category`, `opus-raf-domain`,
  `artefact`, `explanation`, `activities`, `examples`,
  `supporting-infrastructure`, `added-in-version`, `last-modified-version`.
- Field order for infrastructure entries: `id`, `name`, `url`, `function`,
  `coara-tiers`, `usability` (optional), `added-in-version`,
  `last-modified-version`.
- `examples[].url` and infrastructure `url` are `''` (not omitted) when no
  confident URL exists.

## Example: adding a new example to an existing artefact

```yaml
# In data/nto_catalogue.yml, under the "curated-knowledgebase-entry" entry's examples:
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
