{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"],
    "rules": {
      "type-enum": [2, "always", [
        "feat", "fix", "chore", "docs", "style", "refactor", "perf",
        "test", "build", "ci", "revert"
      ]],
      "scope-enum": [2, "always", [
        "control-panel", "driver-app", "commercial", "ui", "types",
        "config", "infra", "deps"
      ]],
      "subject-case": [0]
    }
  }
}
