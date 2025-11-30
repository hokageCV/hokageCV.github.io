---
title: How to Use Multiple Git Accounts on One System
slug: multiple-git-accounts
publishedDate: 2025-11-30
description: How to configure multiple git accounts in one system.
draft: false
tags: ['git']
---

We usually have to switch between multiple git accounts for personal and work projects. This can be confusing at first because git doesn't automatically know which account to use.

In this post, we will set up separate SSH keys and connect each one to a different GitHub account.

## Configure Multiple Git Accounts

Create separate SSH keys for each GitHub account and add the public keys to GitHub. You can also see my [article on SSH keys][github_ssh] for this part.

Now open ~/.ssh/config and add one profile for each account.

For example, we will use two accounts, "hokageCV" & "account_two".

```
# personal github account (primary account)
Host hokageCV
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_ed25519_hokageCV

# work github account
Host account_two
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_ed25519_account_two
```

Each profile tells SSH which key to use when connecting.

Here, hokageCV and account_two are just aliases. They don't need to match your GitHub username or github.com.

## Using the second account

Clone using the Host defined in SSH config:

```
git clone git@account_two:work-username/work-project-repo.git
```

Inside that repo, set the username and email for this account:

```
git config user.email "your_work_email"
git config user.name "your_work_username"
```

This ensures commits from this repo show up under the correct profile.

With this setup, each GitHub account has its own SSH key and its own identity.
This keeps your work and personal projects separate without changing global Git settings.

[github_ssh]: </blogs/what-are-ssh-keys>
