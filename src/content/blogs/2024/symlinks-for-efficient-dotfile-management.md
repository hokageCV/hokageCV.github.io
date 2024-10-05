---
title: Symlinks for efficient dotfile management
slug:  symlinks-for-efficient-dotfile-management
publishedDate: 2024-10-05
description: what are symlinks? How to use them for managing dotfiles efficiently?
draft: false
tags: ['command-line']
---

As developers, we can have lots of config files (.zshrc, .psqlrc, init.lua etc) to customize our development environments. Over time, managing these files across multiple systems becomes a hassle.

For this, I started saving them in a git repository. While this helped, it still an inefficient solution. Every time I changed a file, I had to manually update it in the repository as well. This resulted in extra work and sometimes I missed updating the repository.

Then I learned about symlinks, which eliminated the need to manually update both the file and the repository.

## What is symlink?

Symlink, short for symbolic link, is a file that points to another file called target.

Instead of copying a configuration file across different systems, you can create a symlink that references the original file. Any changes made to the original file are automatically reflected in the symlink.

You can create symlink for both file & directory.

## How to Create a Symlink?

### Creating Symlinks in Windows

- Open command prompt as an administrator
- Use this command to create symlink

```batch
mklink "\path\to\symlink" "\path\to\target\file"
```
- Make sure symlink doesn't exist already

eg
```batch
mklink "C:\Users\user\alias.sh"  "D:\path\to\dotfiles\alias.sh"
```

### Creating Symlinks in Linux

- Use this command to create symlink
```bash
ln -s /path/to/source/file /path/to/target/file
```

- **`-s`** stands for "symbolic" and tells `ln` to create a symlink rather than a hard link

eg
```bash
ln -s ~/dotfiles/.zshrc ~/.zshrc
```

- To know the target file of the symlink, we could use the following command: `ls -l /path/to/symlink`
- Linux syntax is opposite from windows, where target is given later

## Conclusion

In this article, we learned how to use symlinks for managing your files more efficiently. For further readings, check out symlink management tools such as stoa (linux), chezmoi (cross-platform).
