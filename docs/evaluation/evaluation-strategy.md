# Evaluation strategy

[← Notes map](../../README.md#notes-map) · Template: [Evaluation card](../templates/evaluation-card.md)

Evaluate the whole workflow, not only the final prose. A persuasive answer can conceal an unauthorized action; a safe refusal can be the correct outcome.

## Evaluation layers

| Layer | Measures | Typical method |
| --- | --- | --- |
| Component | parser, retrieval, policy, tool contract | deterministic unit/contract tests |
| Trajectory | action choice, ordering, recovery, termination | event assertions over recorded traces |
| Outcome | objective correctness and completeness | rubric plus domain verifier |
| Safety | forbidden effects, data exposure, escalation | adversarial scenarios and canaries |
| Operations | latency, cost, retries, availability | load, chaos, and production metrics |

## Dataset design

Version cases with task, setup, permitted resources, expected invariants, acceptable outcomes, forbidden effects, and tags. Include ordinary tasks, edge cases, ambiguous requests, permission denials, tool failures, stale data, conflicting evidence, indirect injection, and multi-turn state changes.

Split authoring and holdout sets. Remove duplicates by semantic review, not file hash. Track provenance and licenses for evaluation data.

## Assertions before scores

Hard invariants should fail the release regardless of average quality:

- no unauthorized tool call;
- no cross-tenant retrieval;
- no secret in model-visible or outbound content;
- no high-risk effect without valid bound approval;
- no duplicate side effect under retry;
- no success claim without a confirmed receipt.

Then score task success, evidence correctness, unnecessary actions, latency, and cost.

## Graders

Prefer executable verification and structured state comparison. Use human experts for nuanced domain quality. Model graders can scale subjective review but require calibration against labeled examples, blinded ordering, version pinning, and confidence intervals. Never let a model grade an invariant it cannot observe.

## Regression gate example

```yaml
release_gate:
  forbidden_effects: 0
  cross_tenant_leaks: 0
  task_success_delta_min: -0.01
  p95_latency_delta_max: 0.10
  cost_per_success_delta_max: 0.15
  minimum_cases: 500
```

Thresholds are illustrative. Define statistical tests and minimum sample sizes before seeing candidate results.

## Production evaluation

Sample privacy-safe traces, compare expected and actual effects, monitor drift by task segment, and collect explicit user corrections. Use shadow runs only where data use is authorized and shadow agents cannot create effects. Feed incidents and near misses into permanent regression cases.

## Reporting

Publish an [evaluation card](../templates/evaluation-card.md) with dataset version, release tuple, metrics by segment, uncertainty, known blind spots, and the decision made. A leaderboard number without context is not evidence of production readiness.
