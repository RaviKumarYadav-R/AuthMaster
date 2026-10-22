# Guided solutions — Registration, Validation, and Duplicate-Account Races

Attempt the exercises first. These answers focus on reasoning; exact code depends on the framework and storage system.

## Core reasoning

Validate server-side, bound expensive work, and handle unique-index conflicts without exposing database internals.

## Debugging answer format

1. **Invariant:** what must always remain true?
2. **Reproduction:** the smallest failing example.
3. **Observation:** safe status/error category and relevant state changes.
4. **Root cause:** the missing control or incorrect assumption.
5. **Fix:** the smallest correct change.
6. **Regression test:** a test that fails before the fix and passes after it.

## Design answer format

Compare the threat model, client type, revocation needs, deployment topology, usability, and operational burden. State assumptions and residual risks; do not claim that a design is “100% secure.”

## Teach-back rubric

A good explanation defines the concept, draws the flow, demonstrates code, shows one mistake, tests the failure, compares an alternative, and states limitations. Repeating a definition alone is not mastery.
