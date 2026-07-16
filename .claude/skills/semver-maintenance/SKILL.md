---
name: semver-maintenance
description: Use after any change to data/nto_catalogue.yml or data/infrastructure_catalogue.yml, or when explicitly asked to cut a new registry version. Classifies the change under Semantic Versioning (MAJOR/MINOR/PATCH) and propagates the version bump consistently across catalogue-version, CITATION.cff, the README badge, and CHANGELOG.md so nothing drifts out of sync.
---

# SemVer Maintenance for the NTO Registry

**Purpose:** Given a pending or just-made change to the registry, determine
the correct SemVer bump and apply it consistently everywhere the version
number is referenced. This is the "common maintenance" counterpart to the
`add-nto-entry` skill — that skill decides *what* content changed; this
skill decides *how the version should move* and keeps every dependent file
in sync.

SemVer is treated as **very important** in this repository: downstream
consumers may pin to a `catalogue-version`, so the bump discipline below must
be followed exactly — never bump ad hoc or skip a file.

---

## Step 1 — Classify the change

Look at the diff (or the change about to be made) against
`data/nto_catalogue.yml`, `data/infrastructure_catalogue.yml`, and
`data/reform_initiatives.yml` and classify it:

| Change | Bump |
|---|---|
| Remove or rename a required field in the entry schema | **MAJOR** |
| Restructure the category set (add/remove/rename a category) | **MAJOR** |
| Remove an existing artefact `id` or infrastructure `id` | **MAJOR** |
| Add a new artefact type | **MINOR** |
| Add a new category (if deliberately expanding scope, not a breaking rename) | **MINOR** |
| Add a new supporting-infrastructure platform | **MINOR** |
| Add a new assessment reform initiative | **MINOR** |
| Add a new example to an existing artefact | **MINOR** |
| Add a new optional field to the schema | **MINOR** |
| Fix a typo, correct a description's wording | **PATCH** |
| Fix a broken/incorrect URL | **PATCH** |
| Re-categorise an entry without adding/removing anything | **PATCH** |

If a single change contains multiple classes (e.g. a new artefact type *and*
a typo fix elsewhere), use the highest-severity class present (MAJOR beats
MINOR beats PATCH) — SemVer bumps are for the release as a whole, not
per-file.

If genuinely ambiguous, ask the user rather than guessing — a wrong MAJOR/MINOR
call is expensive for downstream consumers to discover later.

## Step 2 — Compute the new version

Read the current `catalogue-version` from `data/nto_catalogue.yml`. Apply
standard SemVer arithmetic:
- MAJOR: `X.y.z` → `(X+1).0.0`
- MINOR: `x.Y.z` → `x.(Y+1).0`
- PATCH: `x.y.Z` → `x.y.(Z+1)`

## Step 3 — Apply the bump everywhere

Update, in this order:

1. **`data/nto_catalogue.yml`** — top-level `catalogue-version:`. Also set
   `last-modified-version` (to the new version) on every entry actually
   touched by this change; leave untouched entries' `last-modified-version`
   as-is. For brand-new entries, set both `added-in-version` and
   `last-modified-version` to the new version.
2. **`data/infrastructure_catalogue.yml`** and **`data/reform_initiatives.yml`**
   — same `last-modified-version` / `added-in-version` treatment for any
   touched/new entries in either file. (Neither file has a separate
   top-level version — both share `catalogue-version` from
   `data/nto_catalogue.yml`.)
3. **`CITATION.cff`** — update `version: vX.Y.Z` and `date-released:` to
   today's date (`YYYY-MM-DD`).
4. **`README.md`** — update the catalogue-version badge:
   ``[![Catalogue Version](https://img.shields.io/badge/catalogue--version-X.Y.Z-blue.svg)](CHANGELOG.md)``
5. **`CHANGELOG.md`** — insert a new `## [X.Y.Z] - YYYY-MM-DD` section above
   the previous entries (most recent first, Keep a Changelog style), with
   `### Added` / `### Changed` / `### Fixed` subsections as appropriate,
   describing what changed in plain language (not a raw diff dump).

## Step 4 — Sweep for drift

Before finishing, grep for the *old* version string across the repo to catch
anything the steps above missed:

```bash
grep -rn "OLD_VERSION" --include="*.md" --include="*.yml" --include="*.cff" .
```

Any remaining hit outside of `CHANGELOG.md`'s historical entries (which
should keep old version numbers — that's the point of a changelog) is a bug
in this sweep and must be fixed.

## Step 5 — Validate

```bash
python3 scripts/validate_yaml.py
```

Confirm it exits 0 (it checks `catalogue-version` is valid SemVer, among
other things, but does not itself check cross-file consistency — that's this
skill's job).

## Step 6 — Report

Summarize for the user: old version → new version, the bump class and why,
and the list of files touched.
