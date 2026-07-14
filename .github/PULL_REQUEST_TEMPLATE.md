## Summary

<!-- What does this PR add or fix? -->

## Checklist

- [ ] `python3 scripts/validate_yaml.py` passes locally
- [ ] Every new `id` is unique and lowercase kebab-case
- [ ] Every new `examples[].url` is either a verified live URL or left as `''`
- [ ] Every `supporting-infrastructure.infrastructure-id` resolves to an entry in `data/infrastructure_catalogue.yml`
- [ ] `catalogue-version` bumped per [CONTRIBUTING.md's SemVer policy](../CONTRIBUTING.md#versioning-policy-semver) (see the `semver-maintenance` skill)
- [ ] `CITATION.cff` version/date-released updated to match
- [ ] README catalogue-version badge updated to match
- [ ] `CHANGELOG.md` entry added
