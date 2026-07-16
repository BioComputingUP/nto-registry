# Contributing to the NTO Registry

Thank you for your interest in contributing! This document outlines how to
contribute to the NTO Registry, a community-curated, versioned catalogue of
Non-Traditional Outputs (NTOs) in the Life Sciences.

We primarily use a GitHub-based workflow. Contributions are made via Pull
Requests (PRs) which are then reviewed and merged by the project maintainers.

## On this page
* [How to Contribute](#how-to-contribute)
    * [Reporting Issues or Suggesting Additions](#reporting-issues-or-suggesting-additions)
    * [Submitting Changes via Pull Requests](#submitting-changes-via-pull-requests)
* [What to Contribute](#what-to-contribute)
* [What Not to Contribute](#what-not-to-contribute)
* [Versioning Policy (SemVer)](#versioning-policy-semver)
* [Contribution Licensing](#contribution-licensing)
* [Review Process](#review-process)

## How to Contribute

### Reporting Issues or Suggesting Additions
If you find an error, want to suggest a new example, artefact type, or
supporting infrastructure entry without opening a Pull Request yourself, or
have an idea for improving the registry's structure:

1.  **Check existing issues:** See if someone has already reported the same thing or made a similar suggestion.
2.  **Open the right form:**
    * [Submit a New NTO Example/Type](../../issues/new?template=submit_nto_example.yml) — for a new example resource, a new artefact type, a new supporting-infrastructure platform, or a new assessment reform initiative.
    * [Suggest a Change](../../issues/new?template=suggest_change.yml) — for corrections to an existing entry (broken link, wording, wrong category, etc).
    * [General Issue](../../issues/new?template=general_issue.yml) — for questions, CI/validation bugs, documentation issues, or anything else. Blank issues are also enabled if none of the templates fit.

### Submitting Changes via Pull Requests
This is the preferred way to add or modify entries directly.

1.  **Fork the Repository:** Create your own copy of this repository on GitHub.
2.  **Create a Branch:** In your fork, create a new branch for your changes (e.g., `add-example-xyz` or `fix-typo-abc`).
    ```bash
    git checkout -b name-of-your-new-branch
    ```
3.  **Make Your Changes:**
    * New examples/artefact types/infrastructure/reform initiatives go in `data/nto_catalogue.yml`, `data/infrastructure_catalogue.yml`, and/or `data/reform_initiatives.yml` — see [ARTEFACT_TAXONOMY.md](ARTEFACT_TAXONOMY.md) for the taxonomy and each file's in-file template comment for exact field formatting.
    * Bump `catalogue-version` per the [Versioning Policy](#versioning-policy-semver) below, and add a `CHANGELOG.md` entry.
    * Run the validator before opening your PR:
      ```bash
      python3 scripts/validate_yaml.py
      ```
    * You do **not** need to touch anything under `site/` — the website
      regenerates from the YAML on every build. If you want to preview your
      change on the site locally, see `site/README.md` (`npm run dev` or
      `docker compose up` from `site/`).
4.  **Commit Your Changes:**
    ```bash
    git add .
    git commit -m "feat: Add example XYZ to Curated Knowledgebase Entry"
    ```
5.  **Push to Your Fork and Open a Pull Request**, describing your changes and their relevance.

**Note:** the live site redeploys automatically on every merge to `main`
that touches `site/**` or `data/**`. GitHub Pages caches pages and assets
for about 10 minutes, so if merges land in quick succession you may
briefly see an unstyled page (an already-cached page pointing at an
asset file a newer deploy has replaced). A hard refresh
(Ctrl/Cmd+Shift+R) fixes it — this is expected caching behaviour, not a
bug.

## What to Contribute
We welcome contributions that add or improve:

* **New examples** for an existing artefact type (a named database, tool, training course, report, etc., with a URL where one stably exists).
* **New artefact types** not yet represented, with a clear explanation, corresponding activities, and at least one example — see [ARTEFACT_TAXONOMY.md](ARTEFACT_TAXONOMY.md).
* **New supporting infrastructure** — platforms that capture credit for an artefact type (comparable to APICURON, ORCID, bio.tools).
* **New assessment reform initiatives** — international efforts supporting non-traditional research assessment (comparable to DORA, CoARA).
* **Corrections** — fixes for typos, broken links, outdated information, or mis-categorised entries.

## What Not to Contribute
* Purely commercial resources with no meaningful open/free access component.
* Off-topic content unrelated to credit/recognition for non-traditional research artefacts.
* Changes to core infrastructure files (GitHub Actions workflows, agent skills) without prior discussion with maintainers.
* Promotional material disguised as an example.

## Versioning Policy (SemVer)

`data/nto_catalogue.yml`'s `catalogue-version` field, `CITATION.cff`'s
`version`, and the README badge **must** move together, following strict
[Semantic Versioning](https://semver.org/):

* **MAJOR** — a breaking schema change: a required field is renamed/removed, the category set is restructured, or an existing artefact `id` is removed.
* **MINOR** — a backward-compatible addition: a new artefact type, a new category, a new infrastructure entry, a new reform initiative, a new example, or a new optional field.
* **PATCH** — a correction that adds/removes nothing: typo fixes, broken-URL fixes, wording clarifications.

Every PR that changes `data/**` must bump `catalogue-version` accordingly and
add a `CHANGELOG.md` entry. If you're using an AI coding agent to prepare the
change, point it at the `semver-maintenance` skill (`.claude/skills/semver-maintenance/SKILL.md`)
to apply the bump consistently across all dependent files.

## Contribution Licensing
By contributing, you agree that your contributions will be licensed under the
project's license, CC BY 4.0. All contributed content must respect the
copyrights of others.

## Review Process
Project maintainers will review Pull Requests.
* We aim to review contributions promptly.
* Feedback or requests for changes may be made via comments on the Pull Request.
* The `validate.yml` GitHub Action must pass before a PR can be merged.
* Once approved, a maintainer will merge it into the `main` branch.

We appreciate your contributions to building a valuable, versioned catalogue
of non-traditional research artefacts!
