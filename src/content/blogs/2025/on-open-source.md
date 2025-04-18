---
title: "My First Open Source Contribution: A Small Fix That Taught Me a Lot"
slug: on-open-source
publishedDate: 2025-04-18
description: Learning from my first open source contribution.
draft: false
tags: ['learnings', 'deploy']
---

One day while going through one of the many dev newsletters I subscribe to, I came across a [color palette generator][theme-generator-repo].

I used it to generate a palette for my ongoing project. At that moment, it had no copy or export button. To get the colors, you had to copy each one manually.

I checked the GitHub repo. The export colors feature was planned, but not implemented yet. I figured I'd try adding it myself.

## Adding the copy colors feature

### First PR

I forked the repository and started working on the feature.

After finishing the changes, I tested them locally, and everything worked. So I raised a PR.

During the review, Francis (the creator) pointed out that I had unintentionally replaced an existing feature. I had meant to add a new button but ended up overwriting the old one.

So instead of guessing, I asked how he had envisioned it. Based on his feedback, I [updated the PR][first-pr], and it was merged soon after.

### Missing bundle

Later, when I checked, the copy button wasn't working on the deployed site.

I realised that I hadn't added `bundle.js` to my commit. It still worked locally because the file was already present in my working directory.

I raised [another PR][second-pr] to fix that, and this time, everything worked as expected.

## Learnings

This showed me how useful open source can be. People can contribute, collaborate, and improve things for everyone.

I also learned that just testing things locally isn't enough. It's better to test in a setup that's closer to production.

[theme-generator-repo]:<https://github.com/thisisfranciswu/enterprise-ui-palette-generator>
[first-pr]:<https://github.com/thisisfranciswu/enterprise-ui-palette-generator/pull/2>
[second-pr]:<https://github.com/thisisfranciswu/enterprise-ui-palette-generator/pull/3>
