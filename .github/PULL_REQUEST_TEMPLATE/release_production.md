## 🚀 Production Release PR

> [!IMPORTANT] > **Action Required**: You MUST apply one of the following labels to this PR in the GitHub sidebar before merging:
>
> - `release:major` (Breaking changes — e.g., `1.0.0` ➡️ `2.0.0`)
> - `release:minor` (New features / non-breaking schema additions — e.g., `1.0.0` ➡️ `1.1.0`)
> - `release:patch` (Bug fixes / chores — e.g., `1.0.0` ➡️ `1.0.1`)
>
> This label is required by the CD workflow to calculate the version bump and publish the release.

---

## 📝 Release Summary

_Briefly summarize the major changes included in this release._

## 📊 Included Changes (from main)

_List the features or fixes being promoted, or link to the PRs/Issues._

- [ ] Feature/Fix 1 (#PR-number)
- [ ] Feature/Fix 2 (#PR-number)

---

## 📋 Release Checklist

- [ ] **CI Validation**: Verify that the CI checks have passed on `main`.
- [ ] **PR Labels**: Applied the appropriate `release:major`, `release:minor`, or `release:patch` label to this PR.
- [ ] **Database Migrations**: Verified that any database migration scripts are tested and ready for production.
- [ ] **QA Approval**: Changes have been tested and verified in staging/dev environment.
