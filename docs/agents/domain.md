# Domain docs

This repository uses a single-context layout.

## Before exploring

- Read root `GLOSSARY.md`.
- Read ADRs in `docs/adr/` relevant to the area being explored.

If these files are absent, proceed silently. Domain modeling creates
them lazily when terminology or decisions are resolved.

## File structure

- `GLOSSARY.md`: shared domain vocabulary.
- `docs/adr/`: architectural decisions.

## Use the glossary vocabulary

Use the glossary's terms in issue titles, proposals, hypotheses,
and test names. Respect its explicitly avoided synonyms.

If a needed concept is missing, reconsider the terminology or
note the gap for domain modeling.

## Surface ADR conflicts

Explicitly identify any proposal that contradicts an existing ADR,
including why the decision should be reconsidered.
