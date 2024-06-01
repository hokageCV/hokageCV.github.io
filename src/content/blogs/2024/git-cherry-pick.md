---
title: Git cherry-pick
slug:  git-cherry-pick
publishedDate: 2024-05-31
description: Git cherry-pick bascic usage
draft: false
tags: ['git']
---

Many times we need to move some commits from one branch to another. For example, you added commits for issue-1 in the branch of issue-2.  One way to fix this is by using git cherry-pick.

This command creates a new commit with changes of specified commit(s).

## Commit Hash

Git identifies each commit by a SHA-1 hash. It consists of 40 characters (61e42590b8d5e6691c311b47960be54c09b0583e). The hash can also be abbreviated to the first 7 characters (61e4259).

Commit hash can be found using `git log`.

## Usage

### Apply single commit

To apply commit from another branch to current branch, we just give the commit hash as an argument

```bash
git cherry-pick 04527c084
```
Now that commit will be applied to current branch

### Apply multiple commits

When we have to move multiple commits,  we can pass all those to the command in order oldest to latest.

```bash
git cherry-pick 04527c084 68a0ffffd 0998c7ea4
```

Alternately, we can give the range of the commits instead of writing all the hashes
```bash
git cherry-pick 04527c084..0998c7ea4
```

### Edit commit before applying

Sometimes, we want to add the commit but with some additional changes before committing it. For that, we can use --no-commit flag.

```bash
git cherry-pick --no-commit 04527c084
```
This will get the changes but will not commit them to current branch.

## Caution

Use cherry-pick with caution. Avoid using it in branches that are to be merged, as it could cause merge conflicts.
