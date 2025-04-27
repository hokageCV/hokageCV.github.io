---
title: "Save Hours Each Week with a Text Expander"
slug: text-expander
publishedDate: 2025-04-27
description: How I use text-expander to have a productive workflow
draft: false
tags: ['productivity']
what is it that I want reader to take away from reading this?: |
  To know what a text expander is.
  How to use that in their workflow
---

Imagine you are filling forms where you have to enter the same values in multiple places. Or maybe you have certain words or phrases that you type all the time in your work. Or any prompt for an AI tool. Typing them every time is tedious and error-prone.

One solution is to keep these phrases somewhere and copy-paste when needed. But that's quite slow. A better solution is to automate it altogether. That's where text expanders come in.

## What is a text expander?

A text expander automatically replaces a short string you type with a longer, predefined text. You define a trigger phrase, and whenever you type it, the text expander replaces it with the corresponding expansion.

For example, typing `:greet` could expand into `Hello, How are, Khana kha ke jana`. Or maybe you have a super secure password that you use for all sites. Typing `;pswd` could expand into `ABCD@12340000`, saving you time and effort.

<video controls autoplay loop width="500">
  <source src="https://res.cloudinary.com/dmtacem5p/video/upload/v1745756342/blog/2025/text-expand.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

In this post, we will explore how to use espanso as your text expander.

## Install & Configure

Installing Espanso is quick and easy. Simply download the installer [from the website][install-page], and follow the on-screen instructions to complete the setup.

Once installed, you'll need to configure Espanso by adding snippets to the _match/_ directory. This is where you store all the custom trigger phrases and their corresponding text replacements.

The location of the match/ directory depends on your operating system:

- Linux:  `/home/$USER/.config/espanso`
- Windows: `C:\Users\%username%\AppData\Roaming\espanso`

In this directory, you can create multiple files to organize your snippets. Each snippet consists of a trigger (a short string you type) and its replacement text.
For example, to create a snippet that expands ;gc into @gmail.com, you'd add the following:

```yml
- trigger: ';gc'
  replace: '@gmail.com'
```
Now, whenever you type `;gc` in your system, it will automatically expand to `@gmail.com`.

## How I use espanso

Here are some example snippets from my configuration, saving me countless keystrokes.

**Correcting common typos**

I often mistype simple words. So, I maintain a misspelled-words.yml file that automatically corrects them. One of its trigger is as follows:

```yml
- triggers: [' tehn', ' hten']
  replace: ' then'
```

**Inserting a debugger**

As a developer, I frequently need to drop a binding.pry in my code. With this snippet, I can insert it almost instantly.

```yml
- trigger: ';bb'
  replace: 'binding.pry'
```

**Adding current date**

I often need to enter today's date when writing documents or messages. This snippet automatically expands to the current date in the format I prefer.

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

Before I found Espanso, I used [aText][atext], but it lacked linux support and relied on a GUI for configuration, which meant I had to manually recreate snippets on every machine. Espanso, on the other hand, allows easy configuration across all systems and platforms

That said, aText is still a good choice if you prefer a GUI-based configuration tool.

## Conclusion

Even small text expansions can collectively save a lot of time. I have been using a text expander for the past two or three years, and from the very first day, I noticed a clear improvement in my workflow. Today, a text expander has become a must-have tool for me along with a window manager (but that's a story for another blog post).

Take just a few minutes today to set up your first snippets. You’ll quickly see how this simple tool transforms your productivity.

[install-page]:<https://espanso.org/install>
[configuration]:<https://espanso.org/docs/configuration/basics>
[atext]:<https://www.trankynam.com/atext>
