---
title: Open source PR
slug: on-open-source
publishedDate: 2025-03-17
description: first open source pr
draft: true
tags: ['']
---

I was reading some newsletter, where I found about the tool. It was a theme generator.

I started using it for my projects. But it had no copy or export button. To get the generated colors, I had to manually copy each of them and add it in my code.

I checked its github, and export colors functionality was in plan, but not finished.

I decided to add that.

Forked the repository and started working on it.

I tested code locally, it worked. so i raised pr for it.

pr got merged.

Later, when I checked in deployed one, it wasn't working.

I found that I hadn't added bundle.js to my commit. It worked in local because, bundle.js was present, just not staged.

So I had to raise another pr for fixing it.

Now, its all good. colors can be copied.
