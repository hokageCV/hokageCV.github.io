---
title: VS Code configurations
date: 2023-12-24
description: VS Code configurations that I am using in 2023
draft: false
tags: ["vscode"]
---

> The better we know our tools, the better we can use them. - By Someone

For programmers, text editor is one of their most important tool. Its useful to know your editor's functionalities. It helps to customize it based on your preferences, which can enhance our workflow and productivity.

In this post, I will go through the configurations I use in VS Code.

## Theme

- [Noctis] - It is a collection of themes, out of which I use Noctis Obscuro. I find noctis themes very easy for the eyes.
- [Material Icon Theme]
- [JetBrains Mono] - JetBrains Mono focuses on readability a lot. It's increased letter height and easily distinguishable characters reduces eye strain.

## Extensions

Most of these extensions are language agnostic and there are few others which I add/remove depending on the language I am working on.

- [Advanced-new-file] - This extension helps to create new files in specific directories right from the command pallete, without using the file tree.
- [amVim] - Provides vim features inside VS Code.
- [File Utils] - This extension gives features like rename, copy etc right from the command palette. I use this for renaming a lot.
- [Indent Rainbow] - Highlights the indentation.
- [Live Server] - To view simple html files.
- [Remote SSH] - This extension lets us open any folder on remote machine inside VS Code.

## Settings
I tend to use the built-in settings whereever possible and use less extensions, and keep the screen minimal.

```json
{

    "editor.suggestSelection": "first",
    "editor.fontSize": 19,
    "editor.fontFamily": "'JetBrains Mono'",
    "editor.fontLigatures": true,
    "breadcrumbs.enabled": false,

    // Scroll
    "editor.fastScrollSensitivity": 1,
    "workbench.list.fastScrollSensitivity": 1,
    "terminal.integrated.fastScrollSensitivity": 1,
    "editor.mouseWheelScrollSensitivity": 1,
    "editor.accessibilitySupport": "off",
    "editor.cursorBlinking": "smooth",
    "editor.cursorSmoothCaretAnimation": "on",

    // Terminal
    "terminal.integrated.profiles.windows": {
        "Git Bash": { "path": "C:\\Program Files\\Git\\bin\\bash.exe" }
    },
    "terminal.integrated.defaultProfile.windows": "Git Bash",
    "terminal.integrated.fontSize": 16,
    "terminal.integrated.scrollback": 10000, // lenght of how much we can scroll back
    "terminal.integrated.defaultLocation": "editor",

    "explorer.confirmDelete": false,
    "explorer.confirmDragAndDrop": false,
    "explorer.compactFolders": false,
    "explorer.openEditors.visible": 1,

    "editor.wordWrap": "on",
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.tabSize": 2,
    "editor.indentSize": 4,
    "editor.wrappingIndent": "indent",
    "editor.inlineSuggest.enabled": true,
    "editor.bracketPairColorization.enabled": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": "explicit"
    },

    // indent guide (the vertical lines)
    "editor.guides.bracketPairs": true,
    "editor.guides.highlightActiveIndentation": true,
    "editor.guides.bracketPairsHorizontal": "active",

    // minimap
    "editor.minimap.enabled": true,
    "editor.minimap.autohide": true,
    "editor.minimap.renderCharacters": false,
    "editor.minimap.maxColumn": 100,

    "editor.cursorSurroundingLines": 10,
    "editor.glyphMargin": false, //  the breakpoint column
    "editor.linkedEditing": true, // auto rename tags

    "editor.stickyScroll.enabled": true,
    "workbench.tree.enableStickyScroll": true,
    "workbench.tree.stickyScrollMaxItemCount": 6,

    "workbench.sideBar.location": "right",
    "workbench.activityBar.location": "hidden",
    "workbench.layoutControl.enabled": false,
    "workbench.editor.pinnedTabSizing": "shrink",
    "workbench.editor.enablePreview": false,
    "workbench.startupEditor": "none",
    "workbench.colorTheme": "Noctis Obscuro",
    "workbench.iconTheme": "material-icon-theme",
    "workbench.tree.indent": 18,
    "workbench.tree.renderIndentGuides": "always",

    "workbench.colorCustomizations": {
        "tab.activeBorderTop": "#d5971a",
        "[Noctis Obscuro]": {
            "tab.activeBorderTop": "#d5971a"
        },

        // editor indent guide colors
        "editorBracketPairGuide.background1": "#2a2a2a",
        "editorBracketPairGuide.background2": "#2a2a2a",
        "editorBracketPairGuide.background3": "#2a2a2a",
        "editorBracketPairGuide.background4": "#2a2a2a",
        "editorBracketPairGuide.background5": "#2a2a2a",
        "editorBracketPairGuide.background6": "#2a2a2a",

        "editorBracketPairGuide.activeBackground1": "#e4e4e4",
        "editorBracketPairGuide.activeBackground2": "#e4e4e4",
        "editorBracketPairGuide.activeBackground3": "#e4e4e4",
        "editorBracketPairGuide.activeBackground4": "#e4e4e4",
        "editorBracketPairGuide.activeBackground5": "#e4e4e4",
        "editorBracketPairGuide.activeBackground6": "#e4e4e4",

        "tree.indentGuidesStroke": "#0f707e" // file explorer indent guides
    },

    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 100,
    "files.insertFinalNewline": true,
    "files.trimTrailingWhitespace": true,

    "window.commandCenter": false, // the mdiddle box in title bar
    "window.title": " ",
    "window.menuBarVisibility": "compact",

    "diffEditor.renderSideBySide": false,
    "diffEditor.hideUnchangedRegions.enabled": true,

    "gitlens.menus": {
        "editorGroup": false,
        "scmItemInline": {
            "stash": false
        }
    },
    "gitlens.statusBar.enabled": false,
    "gitlens.codeLens.enabled": false,

    "remote.SSH.connectTimeout": 100,

    // aVim
    "amVim.useSystemClipboard": true,
    "amVim.smartRelativeLineNumbers": true,

    //auto close tags
    "html.autoClosingTags": true,
    "javascript.autoClosingTags": true,
    "typescript.autoClosingTags": true,

    // auto imports
    "javascript.suggest.autoImports": true,
    "typescript.suggest.autoImports": true,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "typescript.updateImportsOnFileMove.enabled": "always",

    "javascript.preferences.quoteStyle": "single",
    "typescript.preferences.quoteStyle": "single",
    "html.completion.attributeDefaultValue": "singlequotes",

    "css.lint.unknownAtRules": "ignore",
    "liveServer.settings.donotShowInfoMsg": true,
}

```
[Noctis]: https://marketplace.visualstudio.com/items?itemName=liviuschera.noctis
[Material Icon Theme]: https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme
[JetBrains Mono]: https://www.jetbrains.com/lp/mono

[advanced-new-file]: https://marketplace.visualstudio.com/items?itemName=dkundel.vscode-new-file
[amVim]: https://marketplace.visualstudio.com/items?itemName=auiworks.amvim
[docker]: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker
[File Utils]: https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils
[gitlens]: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
[indent rainbow]: https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow
[live server]: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
[remote ssh]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh
