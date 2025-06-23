---
title: Your Git Commits Are Talking — What Are They Saying?
slug: communicating-with-git
publishedDate: 2025-08-24
description: My thoughts on why to have better commits
draft: false
tags: ['git', 'notes-to-self']
---

Git commit messages are more than technical logs. They are conversations we have with our future selves, our teammates, and sometimes even strangers. And just like spoken communication, they can be clear & helpful or confusing & frustrating.

Here are some commit patterns that can feel just like unclear conversations:

- Filler words ('uhm', 'ahh')
  - Merge commits are like filler words
  - Acceptable when merging feature branch into base branch. Avoid unnecessary merges elsewhere
- Rambling
  - Adding, then undoing changes
  - Like explaining something, then backtracking and confusing your listener.
- Speaking unclearly
  - Vague commit messages like "fix stuff", "changes", "update"
  - We leave others guessing what we meant
  - Be specific: what changed? why?
- Speaking too fast (information overload)
  - Huge commits with many unrelated changes
  - Hard to follow & harder to review
  - Break into logical chunks
- Over-communicating trivial details
  - "Fix typo", "run formatter", "resolve conflicts"
  - Squash these into main message to avoid forcing readers through unnecessary noise
- Frequent pauses
  - Commits after every tiny edit ("added one line", "changed one variable")
  - Forces the listener to keep reconnecting context
  - Group related changes together
