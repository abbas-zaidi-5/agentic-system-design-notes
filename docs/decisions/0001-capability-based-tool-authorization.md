# ADR 0001: Capability-based tool authorization

- **Status:** accepted
- **Date:** 2026-07-27
- **Owners:** maintainers

## Context

An agent may access tools with different data and side-effect risks. Hiding tools in a prompt does not enforce authorization, and broad service credentials create a confused-deputy risk.

## Decision drivers

- Limit the effect of malicious content or faulty model output.
- Preserve initiating-user and tenant permissions.
- Make grants short-lived, revocable, and auditable.
- Authorize exact arguments at execution time.

## Considered options

### Prompt-only tool rules

Simple, but probabilistic and unenforceable. Rejected.

### Role-based access at the orchestrator

Familiar and useful for coarse eligibility, but broad roles do not constrain exact resource, recipient, quantity, or purpose. Insufficient alone.

### Narrow signed capabilities

The policy engine issues a short-lived grant binding principal, tenant, tool, resource constraints, purpose, and approval. The adapter validates it before execution.

## Decision

Use narrow capabilities for every tool invocation. Coarse roles may decide which capabilities can be requested, but they are not execution authority. Tool adapters reject missing, expired, revoked, wrong-audience, or argument-mismatched capabilities.

## Consequences

### Positive

- Compromise is bounded to a specific operation and interval.
- Authorization evidence travels with the invocation.
- Adapters do not need broad trust in the orchestrator.

### Negative

- Requires canonical argument hashing, key rotation, revocation, and clock-skew handling.
- Adds a policy decision to the critical path.

### Risks and controls

| Risk | Control | Owner |
| --- | --- | --- |
| Stale permissions | short expiry plus execution-time ACL check | platform |
| Capability theft | audience binding, TLS, redact logs | security |
| Replay | nonce/idempotency binding and receipt store | tool owner |
| Policy outage | fail closed for side effects; documented read fallback | platform |

## Verification

Contract tests cover changed arguments, expiry, revocation, wrong tenant/audience, replay, and policy failure. Review when a new risk class or delegation model is introduced.
