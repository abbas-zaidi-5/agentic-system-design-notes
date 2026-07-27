# Contributing

Thank you for improving this field guide. Contributions should make an engineering claim clearer, more testable, or better supported by operational experience.

## Before opening a change

- Search existing issues and discussions.
- Open a design issue for new sections or changes to core invariants.
- Keep examples vendor-neutral unless a vendor detail is necessary.
- Do not include confidential incident data, credentials, private prompts, or proprietary evaluation cases.

## Writing standard

Prefer explicit threat boundaries, failure semantics, trade-offs, and verification steps. Avoid claims such as “secure,” “production-ready,” or “fully autonomous” without defining conditions and evidence. Expand acronyms on first use and use inclusive language.

## Local checks

With Node.js 20+:

```sh
npx --yes markdownlint-cli2@0.23.2 "**/*.md" "#node_modules"
node scripts/check-local-links.mjs
```

The link checker validates relative file links and anchors without network access.

## Pull requests

1. Create a focused branch and update `CHANGELOG.md` for reader-visible changes.
2. Use the pull request template and link the motivating issue.
3. Ensure documentation CI passes.
4. Expect review of technical accuracy, risk claims, accessibility, and navigation.

By contributing, you agree that your contribution is licensed under the repository’s [MIT License](LICENSE).
