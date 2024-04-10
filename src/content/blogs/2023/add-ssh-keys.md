---
title: What are SSH keys?
slug: what-are-ssh-keys
publishedDate: 2023-05-01
description: What are SSH keys. Steps to create SSH key and add it to github
draft: false
tags: ['git']
---

Secure Socket Shell (SSH) keys are mainly used to access systems remotely, without the need for a password.

SSH keys are generated in pairs, public & private key. The private key is kept on the local system and the public key is uploaded to the remote system.

When accessing the remote system, it will use the public key to encrypt a message that can only be decrypted by the private key. If the local system decrypts the message successfully, the remote system will grant access.

## Generating SSH key

- `$ ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/<file_name>`
  - -t specifies the type of encryption
  - -C is for comment, write email id so that you can identify the key
  - -f specifies the file name
- `$ eval $(ssh-agent -s)`
  - to run the ssh-agent
- `$ ssh-add ~/.ssh/fileName`
  - in macOS add -k
- `$ clip < ~/.ssh/fileName.pub`
  - copy the content from the file to clipboard

## Adding SSH key to github

- Go to settings in github
- Go to SSH and GPG keys
- Click on New SSH key button
- Give title to the system
- Paste the content from clipboard
- Done
