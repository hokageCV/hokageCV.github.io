AGENTS.md
This file defines build, test, and coding guidelines for agents operating in this repository.

Overview
- Build, lint, test commands are provided here for quick infusion into agent workflows.
- Code style guidelines help maintain consistency across contributors and automated agents.

1) Build, lint, test commands
- Prerequisites:
  - Install dependencies: use the project’s package manager as configured. This repo declares pnpm in package.json.
    Commands: `pnpm install`.
- Common tasks:
  - Development server: `pnpm run dev`
  - Build for production: `pnpm run build`

2) Code style guidelines
- General philosophy: write clear, maintainable, and type-safe code. Favor explicitness over cleverness.
- Imports
  - External packages first, then internal modules, then relative imports.
  - Use absolute imports via path aliases when available (e.g. import X from '@/path').
  - Keep imports sorted (grouped and alphabetized within groups).
  - Remove unused imports; enable lint rule to catch them if possible.
- Types and interfaces
  - Prefer explicit types over implicit any; use `unknown` when input shape is uncertain.
  - Use `export type` for type aliases; prefer `interface` for object shapes when extending is common.
  - Enable strict mode in tsconfig (this repo already does). Avoid `any` where possible.
- Naming conventions
  - Functions and variables: camelCase; React components and classes: PascalCase.
  - Constants: UPPER_SNAKE_CASE when representing fixed literals; otherwise camelCase.
  - File names: kebab-case
- Error handling
  - Do not swallow errors; propagate or log with context.
  - Create domain-specific error classes when relevant; prefer `throw new AppError('message')` over plain strings.
- Asynchronous code
  - Always await promises; use try/catch around async/await flows.
  - Favor early returns to reduce nesting.
- Performance and resource usage
  - Avoid unnecessary re-renders; memoize expensive computations; lazy-load heavy assets where possible.
  - Favor streaming or incremental rendering for large outputs.
- Environment and configuration
  - Do not hard-code secrets; use environment variables with safe defaults.
  - Add clear fallbacks for optional features.
- Example conventions
  - Example import block:
    +import React from 'react';
    +import { formatDate } from '@/utils/date';
    +import type { User } from '@/types';
  - Example function header with types:
    +export function greet(name: string): string {
    +  return `Hello, ${name}`;
    +}

3) Repository rules and extensions
- Branching and commits: follow conventional commits where possible; avoid amending pushed commits unless explicitly requested.
- Code ownership: respect existing module boundaries; prefer contributing small, well-scoped changes.

4) Maintenance notes
- Before large refactors, add a brief changelog entry or PR description explaining intent and potential side effects.
- Run full build and at least a basic test suite after changes to catch regressions early.
- If you modify public APIs, update types and documentation accordingly.

---

Code overview
- pages directory contains individual layout for sections for blogs, projects, contact etc.
- content directory only has the markdown files for content, so nothing much to look into it.
- styles is in global.css; along with component specific stylings in individual component
