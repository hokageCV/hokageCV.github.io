---
title: "Transfer files from local system to a virtual machine"
publishedDate: "2026-04-27"
tags: ["ssh"]
---

Usually I used `scp` to transfer files between my local system & VM.

Today, I had to transfer multiple files from my `~/.agents/skills/` directory. A copy of it was already on the local system, but multiple files were updated in the VM.

Instead of overwriting the full directory, I found `rsync` a much better command here because of its delta transfer. It will copy only the modified files.

## Secure Copy Protocol (`scp`)


```bash
scp [options] <source> <destination>
```
- `-r`: recursively copy all files in a directory

## Remote Synchronization (`rsync`)

```bash
rsync [options] <source> <destination>
```

- `-a`: archive. preserves permissions, timestamps, etc
- `-v`: verbose
- `--progress`: show progress

For example, we can sync directories between a remote location and local system like this:

```sh
rsync -av user@host:/remote/path/to/directory/ /local/path/to/directory/
```
