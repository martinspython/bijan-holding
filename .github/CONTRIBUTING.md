# Contributing to Bijan Holding Digital Suite

## Getting Started

1. Fork the repository
2. Create a branch (`git checkout -b feat/your-feature`)
3. Install dependencies (`pnpm install`)
4. Make changes
5. Run typecheck (`pnpm typecheck`)
6. Commit using conventional commits
7. Push and open a PR

## Development Rules

- **Zero `any` types** — TypeScript strict mode enforced
- **No regressions** — `pnpm build` must pass for all apps
- **RTL first** — all UI must work in Persian (right-to-left)
- **Dark mode** — all components must support both themes
- **Accessibility** — WCAG 2.1 AA via `eslint-plugin-vuejs-accessibility`

## Code Review Process

1. PR is created against `develop`
2. CI runs typecheck + build for all apps
3. At least one CODEOWNER must approve
4. PR is squash-merged into `develop`
5. Release PR merges `develop` → `main` with version bump

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

### Types

- `feat` — new feature
- `fix` — bug fix
- `chore` — maintenance, deps
- `docs` — documentation
- `refactor` — code change with no behavior change
- `perf` — performance improvement
- `test` — adding or fixing tests
- `ci` — CI/CD changes

### Scopes

- `control-panel` — Fleet management app
- `driver-app` — Driver PWA
- `commercial` — Commercial platform
- `ui` — Shared UI package
- `types` — Shared types package
- `config` — Shared config package
- `infra` — Vercel, CI/CD, GitHub config
- `deps` — Dependency updates

### Examples

```
feat(control-panel): add vehicle filter by status
fix(driver-app): offline map tiles not caching
chore(infra): add Vercel deployment workflow
docs(readme): update architecture diagram
```
