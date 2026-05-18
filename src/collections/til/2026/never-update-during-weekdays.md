---
title: Never Update System in Weekdays
published_date: 2026-05-05
tags: ["linux"]
---

Fedora released an update, so I upgraded my system. In hindsight, shouldn't have done that.

System updated successfully still errors raised. Dependencies from hyprland started having errors as a result, hyprland stopped working.

I had to work without a tiling window manager & keybindings.

### Update

After two days, I switched the hyprland repository from [solopasha](https://copr.fedorainfracloud.org/coprs/solopasha/hyprland) to [lionheartp](https://copr.fedorainfracloud.org/coprs/lionheartp/Hyprland) and it worked.

Found that earlier repository had became inactive and COPR now recommened the new one.
