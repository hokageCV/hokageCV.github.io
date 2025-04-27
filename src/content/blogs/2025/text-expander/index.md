---
title: A blazingly fast improvement to your workflow with text expander
slug: text-expander
publishedDate: 2025-04-23
description: How I use text-expander to have a productive workflow
draft: true
tags: ['productivity']
what is it that I want reader to take away from reading this?: |
  To know what a text expander is.
  How to use that in their workflow
---

## problem

<!-- ⭐️ use story telling; add some story depicting the problem and scenario -->

Imagine you are filling a form or writing some repetative text in your work

in our IDE, we can create snippets for it. But, this can be extended to anywhere, not just IDEs.

One solution to this is to put those texts in a common place from where you can copy and paste wherever needed. Buts that quite slow. With text exander, we could write the full text with a shortcut.

## What is a text expander?

As the name suggests, text expander expands the text.
we write a trigger string, and it gets expanded into full text.

Suppose we write `:greet` we could expand it to `Hello, How are, Khana kha ke jana`

or maybe you have a super secure password that you use for all sites. `;pswd` could expand into `ABCD@12340000`.

In this post, we will see how to use espanso as your text editor.

## Install & Configure

Installation of espanso is very simple. Just download the installer [from the website][install-page] and execute it.

### Configure

To [configure espanso][configuration], we write snippets in the `match/` directory.

Default location of match directory depends on the operating system
- Linux:  `/home/$USER/.config/espanso`
- Windows: `C:\Users\%username%\AppData\Roaming\espanso`

In the directory, we can create multiple files to organize our snippets. For each snippet, we have to provide a trigger and its replace.
For example:

```yml
- trigger: ';gc'
  replace: '@gmail.com'
```
With this, whenever you type `;gc` in your system, it will expand to `@gmail.com`.

## How I use espanso

Here are some example snippets from my configuration.

**Common misspelled words**

```yml
- triggers: [' tehn', ' hten']
  replace: ' then'
```
I have a long list of misspelled-words.yml that gets auto-corrected.

**Add a debugger**

```yml
- trigger: ';bb'
  replace: 'binding.pry'
```

This is one of my most used snippet.

**Add current date**
```yml
- trigger: ';date'
  replace: "{{mydate}}"
  vars:
    - name: mydate
      type: date
      params:
        format: "%d %b %Y"
```

## Alternative

Before espanso, I used [aText][atext] as my text expander. But I switched because aText is not available in linux, and mainly, it was configurable only from GUI, and no config files. This meant that I had to replicate all snippets in each system that I used.

aText is good if you prefer gui based configuration.

## CTA

These minor replacements collectively save lot of time. I have been using a text expander from past two-three years, and right from day one I could see the improvement in my workflow. A text expander has become a must-have tool for me along with a window manager, but thats for another blog post.

Find out few some repetative texts that you use frequently and try to use a text-expander for them

[install-page]:<https://espanso.org/install>
[configuration]:<https://espanso.org/docs/configuration/basics>
[atext]:<https://www.trankynam.com/atext>
