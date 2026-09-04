---
name: cut-release
description: Use when publishing a tagged GitHub release of the NTO Registry and archiving it to Zenodo for a DOI — "cut a release", "publish a release", "push the new catalogue version", "ship the catalogue overhaul", "archive to Zenodo", "mint a DOI", "tag vX.Y.Z". Runs AFTER semver-maintenance has already bumped and propagated the version; it publishes a version, it never decides one. Covers the pre-tag ordering rules Zenodo imposes, the release-notes template, and post-release verification.
---

# Cutting a Release of the NTO Registry

**Purpose:** Take a version that `semver-maintenance` has already settled and
publish it — a git tag, a GitHub release, and a Zenodo deposit with a minted
DOI — so the catalogue is citable at an exact version and downstream consumers
have an immutable snapshot to pin to.

This is the third skill in the maintenance chain, and the order is not
interchangeable:

| Skill | Decides |
|---|---|
| `add-nto-entry` | *what* content changed |
| `semver-maintenance` | *how the version number moves* in response |
| **`cut-release`** | *publishing and archiving* that version |

If the version has not been bumped and propagated yet, **stop and run
`semver-maintenance` first.** This skill never edits `catalogue-version`,
`CITATION.cff`, the README badge, or `CHANGELOG.md`.

---

## How the Zenodo integration works

`BioComputingUP/nto-registry` is connected to Zenodo through the GitHub
webhook on a maintainer's personal Zenodo account. Publishing a GitHub release
fires the webhook; Zenodo downloads GitHub's auto-generated source archive and
creates a deposit.

Two facts drive every hard rule below:

1. **Zenodo reads the repository as it stands at the tag.** Deposit metadata
   comes from `.zenodo.json` at the repo root at that moment. Anything not
   committed before the tag is not in the record, and cannot be corrected
   through this route afterwards.
2. **Zenodo mints two DOIs.** A **version DOI** unique to each release, and a
   **concept DOI** that never changes and always resolves to the newest
   version. The website and README cite the concept DOI only.

## Hard rules

- **Never tag before `.zenodo.json` and the `CHANGELOG.md` entry are committed
  and pushed.** This is the one ordering mistake that cannot be undone.
- **Never delete and re-push a tag that has already minted a DOI.** The DOI is
  permanent; re-pointing the tag orphans it. If a release is wrong, cut a new
  PATCH version instead.
- **Never hardcode a version DOI** into `site/src/pages/about.astro`,
  `README.md`, `CITATION.cff`, or `.zenodo.json`. Only the concept DOI is
  written down, exactly once. A version DOI goes stale one release later.
- **Never put `"version"` in `.zenodo.json`.** Zenodo takes it from the git
  tag; a hardcoded one silently contradicts every future release.
- **Batch the pre-release commits.** Every push to `main` touching `site/**`
  or `data/**` redeploys GitHub Pages — see the caching note in `AGENTS.md`.

---

## Step 1 — Preconditions

```bash
git status --porcelain          # must be empty
git rev-parse --abbrev-ref HEAD # must be main
git fetch origin && git status -sb   # must be up to date with origin/main
python3 scripts/validate_yaml.py     # must exit 0
```

Then confirm `semver-maintenance` has already run — all four must show the
same version:

```bash
grep -m1 '^catalogue-version:' data/nto_catalogue.yml   # 2.5.0
grep -m1 '^version:' CITATION.cff                       # v2.5.0
grep -m1 'catalogue--version' README.md                 # ...-2.5.0-blue...
grep -m1 '^## \[' CHANGELOG.md                          # ## [2.5.0] - ...
```

Note the `^` anchor on the first one — `data/nto_catalogue.yml`'s header
comment also contains the string `catalogue-version`, and an unanchored grep
matches the comment instead of the field. Note also that `CITATION.cff`
carries a `v` prefix (`v2.5.0`) where the catalogue does not (`2.5.0`); that
difference is expected, not drift.

If they genuinely disagree, **stop.** Run `semver-maintenance`, then come
back. Do not reconcile versions by hand here.

## Step 2 — Confirm the release does not already exist

```bash
VERSION=$(grep -m1 '^catalogue-version:' data/nto_catalogue.yml | sed 's/.*: *//' | tr -d '"')
git tag -l "v$VERSION"                              # must print nothing
gh release view "v$VERSION" 2>&1 | head -1          # must be "release not found"
```

If either exists, that version is already published — bump again rather than
overwriting.

## Step 3 — Check whether `.zenodo.json` needs a pre-tag change

Usually it does not. It only changes when the *deposit* changes: a new
creator, a changed affiliation or ORCID, a licence change, a new related
identifier. Catalogue content changes never touch it.

If it does need editing, edit, validate, and commit it **now** — before the
tag:

```bash
python3 -c "import json;d=json.load(open('.zenodo.json'));print(len(d['creators']),'creators')"
```

Creators must stay in sync with `data/CONTRIBUTORS.yml` — same people, same
ORCIDs, same affiliations, in `CITATION.cff` byline order.

## Step 4 — Compose the release notes

Write to a scratch file. **Regenerate the counts from the YAML** — never copy
the previous release's numbers:

```bash
python3 -c "
import yaml
n=len(yaml.safe_load(open('data/nto_catalogue.yml'))['entries'])
i=len(yaml.safe_load(open('data/infrastructure_catalogue.yml')))
r=len(yaml.safe_load(open('data/reform_initiatives.yml')))
print(n,'artefacts /',i,'platforms /',r,'initiatives')"
```

(`nto_catalogue.yml` is a mapping whose artefact list is under `entries`; the
other two files are bare top-level lists. `site/scripts/build-data.mjs`
renames `entries` to `artefacts` on the way into the site's JSON, which is why
the site reads `stats.artefactCount`.)

Template:

```markdown
<One paragraph: what actually moved in this version, in plain language.>

## What's in this release

The registry's primary assets are three curated YAML data files:

| Asset | Contents |
|---|---|
| `data/nto_catalogue.yml` | **N artefact types** — explanations, activities, examples, and the infrastructure that captures credit for each |
| `data/infrastructure_catalogue.yml` | **N platforms** — credit-capturing infrastructure, cross-walked onto CoARA OI4RRA tiers |
| `data/reform_initiatives.yml` | **N initiatives** — assessment reform initiatives and their NTO relevance |

Archived alongside them as supporting software: `site/` (the Astro + React
site published at https://nto-registry.org) and `scripts/validate_yaml.py`
(schema and reference-integrity validator).

## Changes in vX.Y.Z

<verbatim ## [X.Y.Z] section from CHANGELOG.md>

## Citation

This release is archived on Zenodo. Cite this exact version with its version
DOI, or the concept DOI <CONCEPT_DOI> to always resolve to the latest.
```

## Step 5 — Tag, push, release

```bash
git tag -a "v$VERSION" -m "NTO Registry v$VERSION"
git push origin "v$VERSION"
gh release create "v$VERSION" \
  --title "v$VERSION — NTO Registry" \
  --notes-file <notes-file> \
  data/nto_catalogue.yml \
  data/infrastructure_catalogue.yml \
  data/reform_initiatives.yml
```

The three attached YAMLs give the flagship assets stable, directly
downloadable `releases/download/` URLs on GitHub. **They do not change the
Zenodo deposit** — Zenodo archives GitHub's generated source zipball, not
release assets. Attach them anyway; just don't describe them as what Zenodo
stores.

## Step 6 — Verify the deposit

The webhook is not instant; give it a minute. Then check
`https://zenodo.org/account/settings/github/repository/BioComputingUP/nto-registry`
and confirm on the new record:

- resource type is **Dataset** (not Software);
- **all 13 creators** are present, each with an ORCID;
- licence is **CC BY 4.0**;
- version matches the tag;
- the preprint appears under related identifiers;
- the **concept DOI is unchanged** from the previous release — a changed
  concept DOI means Zenodo created a new record family rather than a new
  version, which needs investigating before the release is announced.

If the record is missing entirely, the webhook did not fire. Check that the
repository toggle is still on in Zenodo, and that the release was *published*
rather than left as a draft.

## Step 7 — Post-release sync

**Normally there is nothing to do**, by design. The website reads the version
and all three asset counts from `stats.json` (generated from `data/*.yml`) and
cites the stable concept DOI, so `site/src/pages/about.astro` needs no edit
per release. Do not hand-edit a version number or count into that page.

The only exception is the very first release, where the concept DOI does not
exist until after publishing and must be written once into
`site/src/pages/about.astro` (`ZENODO_CONCEPT_DOI`), the `README.md` badge,
and `CITATION.cff`'s top-level `doi:`.

## Step 8 — Report

Tell the user: the version released, the **version DOI** for this release, the
**concept DOI** for all versions, the GitHub release URL, and confirmation
that the Zenodo record's type, creators and licence verified correctly.
