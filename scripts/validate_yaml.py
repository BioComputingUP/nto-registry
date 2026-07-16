#!/usr/bin/env python3
"""Validate data/nto_catalogue.yml, data/infrastructure_catalogue.yml, and
data/reform_initiatives.yml.

Checks structural integrity so that community contributions (issues/PRs) can be
merged with confidence: required fields present, ids unique and kebab-case,
categories from the known set, and every supporting-infrastructure reference
resolves to a real entry in the infrastructure catalogue.

Usage: python3 scripts/validate_yaml.py
Exits 0 on success, 1 if any check fails (all failures are printed before exiting).
"""

import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
CATALOGUE_PATH = REPO_ROOT / "data" / "nto_catalogue.yml"
INFRA_PATH = REPO_ROOT / "data" / "infrastructure_catalogue.yml"
REFORMS_PATH = REPO_ROOT / "data" / "reform_initiatives.yml"

KNOWN_CATEGORIES = {"Data", "Training", "Software", "Research support", "Peer review"}
KEBAB_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
SEMVER_RE = re.compile(r"^\d+\.\d+\.\d+$")
YEAR_RE = re.compile(r"^\d{4}$")

REQUIRED_ARTEFACT_FIELDS = [
    "id",
    "category",
    "artefact",
    "explanation",
    "activities",
    "examples",
    "supporting-infrastructure",
    "added-in-version",
    "last-modified-version",
]

REQUIRED_INFRA_FIELDS = ["id", "name", "url", "function", "added-in-version", "last-modified-version"]

REQUIRED_REFORM_FIELDS = [
    "id",
    "initiative",
    "year",
    "core-philosophy",
    "relevance-to-ntos",
    "url",
    "added-in-version",
    "last-modified-version",
]


def load_yaml(path):
    with open(path) as fh:
        return yaml.safe_load(fh)


def check_semver(value, where, errors):
    if not SEMVER_RE.match(str(value)):
        errors.append(f"{where}: '{value}' is not valid SemVer (MAJOR.MINOR.PATCH)")


def validate_infrastructure(errors):
    data = load_yaml(INFRA_PATH)
    if not isinstance(data, list):
        errors.append(f"{INFRA_PATH}: expected a top-level list of infrastructure entries")
        return set()

    seen_ids = set()
    for i, entry in enumerate(data):
        where = f"{INFRA_PATH} entry #{i + 1}"
        if not isinstance(entry, dict):
            errors.append(f"{where}: not a mapping")
            continue
        for field in REQUIRED_INFRA_FIELDS:
            if field not in entry or entry[field] in (None, ""):
                errors.append(f"{where} ({entry.get('id', '?')}): missing required field '{field}'")
        entry_id = entry.get("id")
        if entry_id:
            if not KEBAB_RE.match(entry_id):
                errors.append(f"{where}: id '{entry_id}' is not lowercase kebab-case")
            if entry_id in seen_ids:
                errors.append(f"{INFRA_PATH}: duplicate infrastructure id '{entry_id}'")
            seen_ids.add(entry_id)
        url = entry.get("url", "")
        if url and not url.startswith("http"):
            errors.append(f"{where} ({entry_id}): url '{url}' does not start with http")
        for v_field in ("added-in-version", "last-modified-version"):
            if entry.get(v_field):
                check_semver(entry[v_field], f"{where} ({entry_id}).{v_field}", errors)

    return seen_ids


def validate_catalogue(known_infra_ids, errors):
    data = load_yaml(CATALOGUE_PATH)
    if not isinstance(data, dict):
        errors.append(f"{CATALOGUE_PATH}: expected a top-level mapping with 'catalogue-version' and 'entries'")
        return

    catalogue_version = data.get("catalogue-version")
    if catalogue_version is None:
        errors.append(f"{CATALOGUE_PATH}: missing top-level 'catalogue-version' field")
    else:
        check_semver(catalogue_version, f"{CATALOGUE_PATH} catalogue-version", errors)

    entries = data.get("entries")
    if not isinstance(entries, list) or not entries:
        errors.append(f"{CATALOGUE_PATH}: 'entries' must be a non-empty list")
        return

    seen_ids = set()
    for i, entry in enumerate(entries):
        where = f"{CATALOGUE_PATH} entry #{i + 1}"
        if not isinstance(entry, dict):
            errors.append(f"{where}: not a mapping")
            continue

        for field in REQUIRED_ARTEFACT_FIELDS:
            if field not in entry or entry[field] in (None, ""):
                errors.append(f"{where} ({entry.get('id', '?')}): missing required field '{field}'")

        entry_id = entry.get("id")
        if entry_id:
            if not KEBAB_RE.match(entry_id):
                errors.append(f"{where}: id '{entry_id}' is not lowercase kebab-case")
            if entry_id in seen_ids:
                errors.append(f"{CATALOGUE_PATH}: duplicate artefact id '{entry_id}'")
            seen_ids.add(entry_id)

        category = entry.get("category")
        if category and category not in KNOWN_CATEGORIES:
            errors.append(
                f"{where} ({entry_id}): unknown category '{category}', expected one of {sorted(KNOWN_CATEGORIES)}"
            )

        activities = entry.get("activities")
        if activities is not None and (not isinstance(activities, list) or len(activities) == 0):
            errors.append(f"{where} ({entry_id}): 'activities' must be a non-empty list")

        examples = entry.get("examples")
        if examples is not None:
            if not isinstance(examples, list) or len(examples) == 0:
                errors.append(f"{where} ({entry_id}): 'examples' must be a non-empty list")
            else:
                for ex in examples:
                    if not isinstance(ex, dict) or "name" not in ex or "url" not in ex:
                        errors.append(f"{where} ({entry_id}): each example needs 'name' and 'url'")
                        continue
                    url = ex.get("url") or ""
                    if url and not url.startswith("http"):
                        errors.append(f"{where} ({entry_id}): example url '{url}' does not start with http")

        infra_refs = entry.get("supporting-infrastructure")
        if infra_refs is not None:
            if not isinstance(infra_refs, list) or len(infra_refs) == 0:
                errors.append(f"{where} ({entry_id}): 'supporting-infrastructure' must be a non-empty list")
            else:
                for ref in infra_refs:
                    if not isinstance(ref, dict):
                        errors.append(f"{where} ({entry_id}): supporting-infrastructure item must be a mapping")
                        continue
                    infra_id = ref.get("infrastructure-id")
                    if not infra_id:
                        errors.append(f"{where} ({entry_id}): supporting-infrastructure item missing 'infrastructure-id'")
                    elif infra_id not in known_infra_ids:
                        errors.append(
                            f"{where} ({entry_id}): infrastructure-id '{infra_id}' not found in {INFRA_PATH.name}"
                        )
                    if ref.get("status") not in ("active", "planned"):
                        errors.append(
                            f"{where} ({entry_id}): supporting-infrastructure status must be 'active' or 'planned', got '{ref.get('status')}'"
                        )
                    if not ref.get("capture-function"):
                        errors.append(f"{where} ({entry_id}): supporting-infrastructure item missing 'capture-function'")

        for v_field in ("added-in-version", "last-modified-version"):
            if entry.get(v_field):
                check_semver(entry[v_field], f"{where} ({entry_id}).{v_field}", errors)


def validate_reform_initiatives(errors):
    data = load_yaml(REFORMS_PATH)
    if not isinstance(data, list) or not data:
        errors.append(f"{REFORMS_PATH}: expected a non-empty top-level list of reform initiatives")
        return

    seen_ids = set()
    for i, entry in enumerate(data):
        where = f"{REFORMS_PATH} entry #{i + 1}"
        if not isinstance(entry, dict):
            errors.append(f"{where}: not a mapping")
            continue

        for field in REQUIRED_REFORM_FIELDS:
            if field not in entry or entry[field] in (None, ""):
                errors.append(f"{where} ({entry.get('id', '?')}): missing required field '{field}'")

        entry_id = entry.get("id")
        if entry_id:
            if not KEBAB_RE.match(entry_id):
                errors.append(f"{where}: id '{entry_id}' is not lowercase kebab-case")
            if entry_id in seen_ids:
                errors.append(f"{REFORMS_PATH}: duplicate reform initiative id '{entry_id}'")
            seen_ids.add(entry_id)

        year = entry.get("year")
        if year is not None and not YEAR_RE.match(str(year)):
            errors.append(f"{where} ({entry_id}): year '{year}' is not a 4-digit year")

        url = entry.get("url", "")
        if url and not url.startswith("http"):
            errors.append(f"{where} ({entry_id}): url '{url}' does not start with http")

        for v_field in ("added-in-version", "last-modified-version"):
            if entry.get(v_field):
                check_semver(entry[v_field], f"{where} ({entry_id}).{v_field}", errors)


def main():
    errors = []
    known_infra_ids = validate_infrastructure(errors)
    validate_catalogue(known_infra_ids, errors)
    validate_reform_initiatives(errors)

    if errors:
        print(f"validate_yaml.py: {len(errors)} error(s) found\n", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print("validate_yaml.py: OK")


if __name__ == "__main__":
    main()
