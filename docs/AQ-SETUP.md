# Action-owned AngularJS testing

The workflow calls test-github-marketplace at a pinned commit. The application
has no test suite, test npm scripts, jsdom or test configuration.

- generate: the original Action reads PR source via GitHub APIs and asks Gemini
  to create a Node test suite and review. No PR code executes in this job.
- checks: a separate read-only runner installs app dependencies, downloads the
  generated suite, and calls the original Action. The Action prepares its own
  jsdom runtime, loads AngularJS and runs the generated tests plus syntax/audit.
- report: a separate job downloads the results and generation metadata, then
  calls the Action to update the PR comment. No project code executes here.

Set repository secret GEMINI_API_KEY. GEMINI_MODEL is optional and defaults to
gemini-3.1-flash-lite. The workflow must exist on the PR base branch.
Generated source is available in aq-generated-tests; results are in
quality-gate-results. The artifacts are kept for 7 days. Nothing is committed
back to the app by the Action.

AI errors and failed tests remain visible. report_only: true means findings do
not enforce merge rules. Coverage and SonarCloud integration remain deferred.
Never place the Gemini key or a write token in the checks job. The workflow uses
pull_request_target with isolated jobs to allow PR comments, including forks.

The report job publishes three linked comments: Test Results, Security Audit and AI Code Review. Reruns update these same comments; detailed test logs and source scope are collapsible.

