---
title: How to move code from one repo to another with git format-patch
slug: git-format-patch
publishedDate: 2025-03-28
description: How to move code from one repo to another with git format-patch
draft: true
tags: ['git']
what is it that I want reader to take away from reading this?: |
---

its like cherry-pick between repositories.

## Create patch

git format-patch --stdout start_commit end_commit> file.patch

--stdout send patch direclty to file

```shell
git format-patch --stdout --root b20dc36 > starter_config.patch
```

## move patch to desired repo

mv file.patch path/to/new/repo

## apply patch

git init
git am < file.patch

git am applies the commits one by one.
