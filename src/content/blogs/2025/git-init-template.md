---
title: Setting up git template
slug: git-init-template
publishedDate: 2025-09-25
description: Setting up git init template to reduce repetitive work
draft: true
tags: ['git']
---

<!-- ============= -->

- in root directory, add git-templates directory
  - in it, add file info/exclude
    - write notes.md in it
- configure git to use that globally
  - git config --global init.templateDir "<path/to/git-templates>"
  - Use forward slashes / even on Windows — Git handles them correctly.

<!-- ============= -->

there are some config that i do for every local project.
it is - adding notes folder in my git/info/exludes file

I automated it with git template directory.

steps are simple

- In your root directory, create for directory that will be the template
  -
- configure it to use it globally

[official_docs]: <https://git-scm.com/docs/git-init/2.2.3#_template_directory>
