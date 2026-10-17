# Automated Quality Gate for this AngularJS project

The workflow calls the original action from
[test-github-marketplace](https://github.com/NonnaritRammaneekultawat-6609650459/test-github-marketplace),
pinned to a specific commit. Both test execution and PR reporting come from that
action's generate-tests.js and its AngularJS adapter. There is no independent
inline review implementation in this repository.

## Configuration

- Repository secret GEMINI_API_KEY: used only by the report job.
- Optional repository variable GEMINI_MODEL: defaults to gemini-3.1-flash-lite.
- Open or update a PR to run. The bot updates its existing report comment.

The checks job installs dependencies and calls the original action to run syntax
checks, the existing Node/jsdom tests and npm audit. Test counts and logs are
passed in a commit-bound artifact to the report job. The report job calls the
same action to read AngularJS source/template context through GitHub APIs, request
Gemini review and post the report. Source is sent to Gemini when configured.

Failed checks and unavailable AI results remain visible. report_only: true
keeps the workflow informational; it does not enforce merge rules. AI-generated
tests, coverage and SonarCloud integration are deferred in this AngularJS mode.
Other installed GitHub apps may post their own separate comments.

The workflow must be on the base branch because it uses pull_request_target.
PR code runs on a separate read-only runner without AI secrets or persistent
checkout credentials. Never add PR checkout or execution to the report job.
Missing or mismatched artifacts produce unavailable results, never a pass.

See the engine's [AngularJS documentation](https://github.com/NonnaritRammaneekultawat-6609650459/test-github-marketplace/blob/feat/angularjs-pr-report/docs/angularjs.md).
