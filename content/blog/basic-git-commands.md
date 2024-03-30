---
title: Common Git Commands
date: 2023-04-30
description: list of common git commands useful in day to day operations
draft: false
tags: ["git"]
---

### Github Repo to Local System

- copy SSH link of repo
- go to folder in pc where you want the project, then
- `git clone <link>`

### Configure Git for a project and Push files

- `git init`
  - initializes project
- `git add .`
  - adds files to staging area
  - . means all files. for specific files, give their names
- `git commit -m “message”`
  - "-m" is for message
- `git remote add origin <link>`
  - copy SSH link from repo
- `git push origin <branch_name>`
  - push command updates the remote repository with local commits
  - origin represents a remote name where the user wants to push the changes

### Branches

Basics

- `git branch <branch_name>`
  - create new branch
- `git checkout <branch_name>`
  - to go to another branch
  - add -b to create & go to new branch
- `git branch`
  - check current branch
- `git branch -a`
  - to see list of all branches

Merging branches

- go to branch where you want to merge
- `git merge <branch_name>`
- <branch_name> is the branch you want to merge into current branch

Renaming branch

- `git branch -m <oldname> <newname>`
- `git branch -m <newname>`
  - if you want to rename current branch

Deleting branch

- `git branch -d <local_branch_name>`
  - -d deletes only those branches which are merged and pushed to remote branch
- `git push origin --delete <remote_branch_name>`
  - to delete remote branch
