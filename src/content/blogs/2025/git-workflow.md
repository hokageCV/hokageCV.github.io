---
title: My Git workflow for managing code changes
slug: git-workflow
publishedDate: 2025-02-28
description: My current git workflow.
draft: false
tags: ['git']
---

A Git workflow is a structured way to manage code changes.

Here's my current git workflow, which makes it easier for me to navigate and understand my commits.

- Create feature branch from base branch.
- Commit changes regularly.
  - I often use `git commit --amend --no-edit`, one of my favourite git commands, to refine a commit while preserving a working state.
- Before a pull request, I like to squash related commits to keep things tidy.
- For feature branches, I like rebase instead of merge — it keeps commit history clean without extra merge commits.

### Further Reading

- https://about.gitlab.com/topics/version-control/what-is-git-workflow: This article covers other common git workflows.
