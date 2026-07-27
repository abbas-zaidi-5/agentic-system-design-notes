# Threat model

[← Prompt-injection defense](prompt-injection-defense.md) · [Notes map](../../README.md#notes-map)

This baseline threat model assumes an agent can process untrusted content, read private data, and invoke tools. Tailor it to the actual deployment and revisit it whenever tools, models, data sources, or autonomy change.

## Assets

- user and tenant data;
- credentials and capability tokens;
- action authority and approval records;
- model/system configuration;
- durable memory and retrieval indexes;
- audit evidence and evaluation results;
- availability and cost budgets.

## Adversaries

Malicious users, authors of retrieved content, compromised data sources or tools, cross-tenant attackers, insiders, and opportunists abusing cost or availability. Also model non-determinism and ordinary operator error: harmful outcomes do not require a malicious model.

## Abuse cases and controls

| Abuse case | Boundary crossed | Preventive controls | Detection |
| --- | --- | --- | --- |
| Indirect prompt injection triggers a send | content → action | scoped tool, argument policy, approval | provenance-linked tool trace |
| Cross-tenant retrieval | tenant → tenant | ACL filtering before/after retrieval, tenant keys | canary documents, access audit |
| Secret exfiltration | secret → model/network | secret isolation, egress allowlist, DLP | outbound entropy/destination alert |
| Approval replay | human → action | bound digest, nonce, expiry | reused/expired nonce alert |
| Duplicate transaction after timeout | workflow → external system | idempotency key, reconciliation | duplicate effect metric |
| Tool result spoofs success | tool → orchestrator | authenticated adapter, typed receipt | missing receipt alert |
| Memory poisoning | content → future context | write policy, provenance, expiry | anomalous write/retrieval review |
| Cost exhaustion | public ingress → compute | quotas, admission control, step budget | cost/task and fan-out alerts |
| Audit tampering | runtime → evidence | append-only remote sink, access separation | sequence-gap and integrity checks |
| Dependency compromise | supply chain → runtime | pinning, provenance, minimal image | artifact/SBOM monitoring |

## Security objectives

1. A model compromise cannot exceed the current principal’s narrow capability.
2. Untrusted content cannot create authority.
3. Cross-tenant data remains inaccessible across retrieval, caches, traces, and memory.
4. High-impact actions require fresh, exact, attributable approval.
5. Side effects are reconcilable after ambiguous failures.
6. Investigators can reconstruct who requested, authorized, executed, and observed each effect.

## Trust-boundary review

For every arrow in the architecture, document authentication, authorization, schema, confidentiality, integrity, size/time limits, failure mode, logging, and ownership. Threats often hide in “internal” callbacks and background jobs.

## Residual risk

Output filtering cannot guarantee semantic correctness. Human approval can fail through fatigue or deceptive previews. Providers and dependencies remain supply-chain risks. Document accepted residual risks, owner, review date, and compensating controls in an ADR.

## Verification plan

- Run injection and exfiltration suites before releases.
- Exercise tenant-isolation tests with seeded canary data.
- Chaos-test timeouts and ambiguous tool outcomes.
- Replay revoked and expired approvals.
- Verify audit completeness against external side effects.
- Conduct periodic credential, egress, and dependency reviews.
