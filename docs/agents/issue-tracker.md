# Issue tracker: GitHub

Issues and specs live in GitHub Issues for `proalaa/sakina-mobile`:
https://github.com/proalaa/sakina-mobile/issues

Prefer the authenticated GitHub connector whenever it supports the operation.
Otherwise, briefly explain the fallback and use `gh`.

This checkout has no Git remote. Pass `--repo proalaa/sakina-mobile`
explicitly to `gh issue`, `gh pr`, and `gh label` commands.

## Conventions

- Publish a spec or ticket by creating a GitHub issue.
- Fetch a ticket by reading the issue, including labels and comments.
- List issues using the relevant state and label filters.
- For triage labels, use the mapping in `triage-labels.md`.
- Append conversation as issue comments.
- Close completed issues with a resolution comment.
- Issue assignment is optional while working solo with AI agents.
- Link child issues using GitHub sub-issues where supported.
  Otherwise, add `Part of #<parent>` to the child and a task-list
  reference to the parent.
- For multiline CLI bodies, write the exact Markdown to a temporary
  file and pass `--body-file`.

## Pull requests as a triage surface

**PRs as a request surface: no.**

GitHub shares issue and PR numbers. Resolve the resource type before
operating on a bare number.

## Wayfinding operations

- Map: one issue labelled `wayfinder:map`, containing Notes,
  Decisions-so-far, and Fog.
- Child ticket: a sub-issue of the map, labelled `wayfinder:<type>`
  (`research`, `prototype`, `grilling`, or `task`).
- Blocking: use native GitHub issue dependencies where supported.
  Otherwise, put `Blocked by: #<number>, #<number>` near the top
  of the child body. A ticket is unblocked when every blocker is closed.
- Frontier: choose the first open, unblocked, unclaimed child in map order.
  Check claim comments as well as any assignee.
- Claim: record who is beginning work in a short issue comment before
  starting. Assigning the ticket to the driving developer is optional.
- Resolve: comment with the answer, close the ticket, and append a brief
  finding and link to the map's Decisions-so-far.
