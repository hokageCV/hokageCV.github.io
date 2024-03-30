---
title: Using alias in command line to increase productivity
date: 2024-01-14
description: What are command line alias and why to use them?
draft: false
tags: ["command-line"]
---

In our daily workflow, there are few commands that we have to run multiple times. Like `npm run start`, `git commit -m "fixed the printer"`.

Typing the same command again and again is inefficient and also increases the chances of typo. I used to mistype (or still mistype 🤷‍♂️) git as gti a lot.


And yes, using up arrow we could go back to that command, but why to keep searching for that one command that you executed 10-15 commands back, when there is a better solution available.

## Enter alias

Aliases are text substitutions that we could configure for common commands, so that we don't have to type them fully.

## How to add alias

To add aliases, we need to modify the configuration file of the shell.
Linux: file is usually present in the root folder
Windows: file is present at `C:\Users\<your user name>`

File name will depend on your shell. eg .bashrc for bash, .zshrc for zsh

General syntax is `alias shortcut='full command'`

Now whenever the shortcut is typed, shell will execute as if the full command was typed.

## Useful Aliases

Here are some of the aliases that I use

```bash
alias c='clear'

# navigate directories
alias zshopen='vim ~/.zshrc && source ~/.zshrc'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# git
alias g='git '
alias gcm='git commit -m '
alias gc='git checkout '
alias gcb='git checkout -b '
alias ga='git add '
alias gpo='git push origin '
alias gpu='git push origin HEAD '
alias gpl='git pull '
alias gs='git stash '
alias gsa='git stash apply '
alias gsl='git stash list '
alias gss='git stash save '

# docker
WEB_CONTAINER="web_container_name"
DB="database_container_name"

alias d='docker '
alias du='docker compose up'
alias ds='docker compose stop'
alias dr="docker compose restart $WEB_CONTAINER"
alias dcd='docker compose down'
alias dps='docker ps'
alias da="docker attach $WEB_CONTAINER"
alias de="docker exec -it $WEB_CONTAINER /bin/bash"
alias dep='docker exec -it $DB /bin/bash -c "psql -U <database-name> -d <database-password> -x"'

# npm
alias nr='npm run '
alias nd='npm run dev'

# hugo
alias hs='hugo server'
```
## Usage

Now we could just press `c` instead of `clear` to clear the terminal.

Or type `gc "hack internet"` and it will be executed as `git commit -m "hack internet"`.

## Conclusion

I have been using aliases from past 6 months and finding them very useful.

PS: Add aliases which are personalized to you. With this, you won't have to think which alias does what.

