---
title: Updating Node
slug: update-node
publishedDate: 2023-08-15
description: Updating node on your system
draft: false
tags: []
---

Keeping your Node.js version up to date is essential to ensure security and take advantage of the latest features. You can check current node version using the command `node --version`.

There are multiple ways of updating the node version in our system. Here are some of them:

## Updating via NVM (Node Version Manager)

-   install nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

-   start nvm:

```bash
source ~/.nvm/nvm.sh
```

-   specify node version:

```bash
nvm install 18
```

-   use it:

```bash
nvm use 18
```

Thats it! You can verify the version using `node -v`.

## Manual Update from the Official Website:

You can also update Node.js manually by following these steps:

1. Visit the [official Node.js website](https://nodejs.org/)
2. Download the latest stable version.
3. Run the installer and follow the instructions.
