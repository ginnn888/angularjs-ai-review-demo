# AQ AngularJS PR review

The workflow `.github/workflows/aq-review.yml` reports on every opened,
updated or reopened PR. Existing bot comments are updated, rather than duplicated.

## Setup

1. Put the workflow on the repository default branch.
2. In Settings → Secrets and variables → Actions, add repository secret
   `GEMINI_API_KEY`. Never put the key in a committed file.
3. Optionally set repository variable `GEMINI_MODEL` (default `gemini-3.8-flash`).
4. Open a PR. Read the AQ comment and follow its Actions log link.

Reports include dependency installation, syntax, existing Node/jsdom tests,
npm audit and an AI review of AngularJS source and template context.
Missing keys, Gemini API errors and failed checks are reported without blocking
merge. Test generation, coverage enforcement and SonarCloud are deferred.
Audit failure alone does not distinguish a vulnerability from a network error;
consult the linked log. This is a reporting workflow, not a quality enforcement gate.

## Permissions and isolation

The `pull_request_target` event allows comments on fork PRs. Its privileged
report job only uses GitHub APIs to read PR files as data; it never checks out or
executes PR code. PR tests run on a separate runner with read-only contents
permission, no Gemini secret and checkout credential persistence disabled.
Do not add PR checkout or PR scripts to the report job. Repository source and
diffs are sent to Google Gemini when a key is configured. Source limits are
20 files, 40 KB per file and approximately 100 KB total (plus bounded diffs).
Skipped files are listed in the report; this is not a whole-repository audit.

If no comment appears, verify Actions is enabled, this workflow is on the base
branch, and organization policy allows `pull-requests: write`. The report is
also written to the Actions job summary when comment delivery fails.
