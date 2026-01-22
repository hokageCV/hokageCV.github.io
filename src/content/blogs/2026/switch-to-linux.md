---
title: What Switching to Linux Taught Me
slug: switch-to-linux
publishedDate: 2026-01-22
description: On switching to linux as full time OS.
draft: false
tags: ['linux']
---

A couple of months back, I switched to Linux as my full time operating system. Earlier I had only used Windows as my main OS.
But with my laptop getting crashed frequently due to Window's unexpected errors, I finally switched.

![microsoft_unexpected_error][microsoft_unexpected_error]

I had been using Workspacer, a tiling window manager, on Windows, so switching to Hyprland on Linux felt like the obvious next step.

After installing hyprland, it was a completely different ecosystem. My initial thought was to not continue using hyprland. I was staring at an empty screen, with no panel, and no idea how to move a window. That was the moment I realized how much dependent I was on common GUI tools.

I never thought about WiFi connectivity. It was a click away in the system tray. And with the new setup, following steps had to be configured to connect to WiFi

```sh
# get new connections
nmcli device status
nmcli device wifi list

# connect to a connection
nmcli device wifi connect "WIFI_NETWORK_NAME" password "PASSWORD"

# test
ping -c 3 google.com

# autoconnect on login
nmcli connection modify "WIFI_NETWORK_NAME" connection.autoconnect yes
```

After some trial and error, the workflow started to click. I configured all tools and applications that I used in previous setup, one change at a time.

One tool that helped a lot is `gnu stow` to manage all the configs with git. It made experimentation to the setup easy. I could easily make changes and if anything broke, all I had to do was to switch back to the last working state.

Now, after using hyprland for few months, setting up each tool as per need, this setup feels natural to me.

[microsoft_unexpected_error]: <https://support.microsoft.com/images/en-us/bcfbb8c5-a979-49bb-bf10-b21aebc09394?format=avif&w=800#>
