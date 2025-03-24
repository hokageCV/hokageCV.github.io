---
title: Move changes across repositories with git format-patch
slug: git-format-patch
publishedDate: 2025-03-28
description: How to move code from one repo to another with git format-patch
draft: false
tags: ['git']
what is it that I want reader to take away from reading this?: |
  Get to know about format-patch

---

We use `cherry-pick` to move changes between branches in the same repository. But what if we need to move changes to a different repository?
This is where git format-patch helps — it allows us to move commits as patch files and apply them elsewhere, preserving history and reducing manual work.

One common scenario where I use this is when setting up a new project and needing to apply default configurations to it.

Let’s say I start a new Rails project and set up some common configurations:

- Add debugging tools (e.g., pry-byebug)
- Configure logging for better visibility
- Set up authentication using Devise
- Add essential gems such as dotenv for environment variables

Instead of manually reapplying these changes for every new project, I create a patch once and apply it to new repositories, avoiding repetitive work and reducing errors

## Steps

Here's how you can create and apply a patch across repositories step by step.

1. Create patch

```shell
git format-patch --stdout afe599d 780bc16 > starter_config.patch
```

- Generates a patch containing all changes from commit afe599d to 780bc16
- `--stdout` combines all the patches into a single file
  - When stdout flag is omitted, a patch file is generated for each commit

2. Move the patch

Move the generated patch file to the root of second repository.

`mv starter_config.patch path/to/new/repo`

3. Apply the patch

```shell
git am < starter_config.patch
```

- `git am` applies commits sequentially from the patch file.
- It will be as if they were committed in the new repository. This method saves time and ensures consistency across projects.
