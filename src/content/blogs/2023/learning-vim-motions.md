---
title: My journey of learning Vim Motions
slug: my-journey-of-learning-vim-motions
publishedDate: 2023-12-10
updatedDate: 2024-01-05
description: My journey of learning vim motions
draft: false
tags: ['vim']
---

## Why vim motions ?

Couple of months back I started having little bit pain around my wrists. So I started doing some basic wrist stretches. There was temporary relief but for a long term solution, I looked around for other solutions as well.

I found that ergonomically it was bad for wrists to move from letter keys to arrow keys & moves frequently. Shifting from letter keys to arrow keys every time when I had to navigate seemed slow. For this I landed upon vim. With vim's mode based editing, there would be less wrist movement and most of navigation could be done from the home row of keyboard.

However, shifting entirely to terminal based editor(vim) from VS Code felt overwhelming and unnecessary for now. So I decided to focus only on vim motions.

I am using 'amVim' extension in VS Code with which we can get some vim features in vscode.

## What are vim motions?

Vim motions are ways with which we can edit text efficiently. Most basic example is that instead of arrow keys to navigate, we use `h`, `j`, `k`, `l`, so no need to lift hand from home row of keyboard.

Another example would be selecting some text inside parenthesis. For that we could use mouse and drag, or in keyboard we could press `ctrl + shift ` + arrow key until we select all text. But with vim motions, we just press three characters. Stay inside parenthesis and press `vi(` thats it.

More examples would be navigating each word with `w`, deleting word with `dw`, toggle upper/lower case of characters with `~`.

And these are just on single word or line. By adding numbers in front of commands we can perform them in multiple lines. For example, `10j` will move cursor 5 lines below, `5dw` will delete next 5 words.

## Resources

Most of the learning was from [Jaime Gonzalez Garcia's guide][vim-in-vscode] on Vim in VS Code. This is a fantastic guide for anyone looking for vim motions. The site [vim adventures][vim-adventures] and ThePrimagen's [youtube playlist][primagen] are also good for introduction.
After this, it was just google searches for what I needed.

## Learning journey

To increase the chances of using vim motions, I enabled them in both VS Code and [Obsidian][obsidian] (tool I use for note taking).

For the first few weeks, I enabled vim mode only during weekends, so I don't get slowed down in my day work. One I got comfortable with vim motions, I started using vim mode full time on both apps.

I already used lot of keybindings instead of using mouse in my vscode so adding new commands to memory was not a challenge. Though getting habituated to using those commands instead of arrow keys took some time.
Also remapping caps lock key to escape key was helpful.

## Two weeks into vim motions

Now that I am using it for two weeks for full time, editing text has become simpler and fast. The ease of navigation, selecting and modifying text is amazing.

Stil, more practice is required to develop the muscle memory. And I might also change the extension to 'Vim' instead of 'amVim' so that I could add my own key bindings.

Update: I did moved to 'Vim' extension. And because of all the custom settings, I am finding it much better.

[vim-in-vscode]: https://www.barbarianmeetscoding.com/boost-your-coding-fu-with-vscode-and-vim/table-of-contents
[vim-adventures]: https://vim-adventures.com
[primagen]: https://youtube.com/playlist?list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R&si=daQyEc2SkKnhYy2Y
[obsidian]: https://obsidian.md
