# Agent design review checklist

## Objective and boundaries

- [ ] Objective, users, non-goals, and success criteria are explicit.
- [ ] Trust boundaries and authoritative state are diagrammed.
- [ ] Maximum autonomous blast radius is acceptable.
- [ ] Deterministic code owns authorization, deadlines, and termination.

## Tools and approvals

- [ ] Each tool has strict schemas, risk class, timeout, and error taxonomy.
- [ ] Exact normalized arguments are authorized at execution time.
- [ ] Credentials are short-lived and never model-visible.
- [ ] Side effects are idempotent or explicitly non-retryable.
- [ ] Approval binds to the final action, expires, and cannot be replayed.

## Data, context, and memory

- [ ] Retrieval enforces tenant and item ACLs.
- [ ] Untrusted content has provenance and cannot grant authority.
- [ ] Sensitive fields are minimized and redacted before model access.
- [ ] Memory requires a write policy, owner, provenance, and expiry.
- [ ] Users can inspect and delete personal memory.

## Reliability and operations

- [ ] End-to-end deadline, step, fan-out, token, and cost budgets exist.
- [ ] Unknown tool outcomes are reconciled before retry.
- [ ] Partial completion is represented truthfully.
- [ ] Traces correlate request, policy, approval, tool receipt, and response.
- [ ] Logs avoid secrets and unnecessary raw content.
- [ ] Kill switches, rollback, and incident ownership are tested.

## Evaluation and release

- [ ] Dataset includes failures, ambiguity, attacks, and permission denials.
- [ ] Forbidden effects are hard release gates.
- [ ] Quality, latency, and cost are segmented and compared with baseline.
- [ ] Canary scope cannot exceed evaluated permissions.
- [ ] Residual risks, owners, and review dates are documented in ADRs.
