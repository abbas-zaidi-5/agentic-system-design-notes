# Cost and latency

[← Multi-agent coordination](multi-agent-coordination.md) · [Notes map](../../README.md#notes-map)

Cost and latency are correctness constraints when exceeding them causes timeouts, abandoned workflows, or uncontrolled spend.

## Budget hierarchy

Set budgets at four levels:

1. **Organization:** daily spend, provider quotas, emergency cutoff.
2. **Tenant or user:** fair-use limits and priority class.
3. **Workflow:** maximum wall time, model tokens, tool calls, and retries.
4. **Step:** deadline and maximum input/output size.

Reserve capacity for producing a truthful final status. An agent that consumes its entire budget planning cannot explain partial completion.

## Latency budget example

| Stage | p95 budget |
| --- | ---: |
| Authentication and policy | 100 ms |
| Retrieval | 500 ms |
| First model decision | 2.5 s |
| Tool execution | 3.0 s |
| Validation/final response | 1.5 s |
| **Total** | **7.6 s** |

Budgets are workload-specific. Measure queue time separately from service time and enforce an end-to-end deadline propagated to every dependency.

## Levers and trade-offs

- Route simple classification and extraction to smaller models after evaluation proves parity.
- Cache only deterministic or acceptably stale results; include tenant, policy, model, prompt, and data version in keys.
- Parallelize independent reads, but cap fan-out and cancel losing work.
- Reduce context by relevance and provenance, not blind truncation.
- Stream user-visible progress without claiming completion before effects are confirmed.
- Apply backpressure at admission; queues without limits merely move the outage.

## Cost attribution

Record model input/output tokens, cached tokens, tool charges, compute time, retry cost, and wasted/cancelled work against workflow and tenant identifiers. Do not place raw prompts or secrets in billing labels.

## Degradation ladder

Predefine ordered degradation: reduce optional retrieval → use a validated smaller model → skip nonessential enrichment → switch to read-only mode → reject with retry guidance. Never degrade by bypassing authorization, validation, or audit controls.

## Alerts

Alert on sudden cost per successful task, retry amplification, cache miss shifts, queue age, tail latency, and budget-exhausted outcomes—not only aggregate spend.
