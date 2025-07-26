---
title: Simplifying popups using the Popover API
slug: popover-api
publishedDate: 2025-08-05
description: Introduction to Popover API and dialog element
draft: false
tags: ['html', 'browser']
---

I've always found adding popups to be a bit of a pain. So I decided to learn just enough of the Popover API to handle common use cases.

Here's what I figured out.

The Popover API is a native HTML feature that lets us create lightweight, interactive popups without relying much on javascript libraries.

In this post, we will explore how to use it for some common use cases.

## Simple popup

When we add the attribute `popover` to a div, it behaves like a popover element.

```html
<div id='popup' popover='auto'>
  <p>Popup content</p>
</div>

<button id='popup-trigger' popovertarget='popup'>Button</button>
```

For the div, we added `popover` attribute with value as `auto`, which is also the default value.
With this, we get the _light dismiss_ property, which means that on clicking outside of the popup, it will be closed.

On the button, we add a `popovertarget` attribute with id of popover element. This makes the button an _invoker_ of the popover.

For a simple popup, this is it. Clicking the button now shows the popup.

## Position the popup

By default, popover element opens in the center of the screen. Let's see how to position the popup relative to the element that triggered them (its invoker).

```html
<div id='popup' popover='auto'>
  <p>Popup content</p>
</div>

<button id='popup-trigger' popovertarget='popup'>Button</button>

<style>
  #popup {
    margin: 0;
    position-area: bottom right;
  }
</style>
```

We clear the margin around the popup. And then [anchor it][anchor_position] relative to its invoker using `position-area` css property.

Now, the popup appears at bottom right of the button.

## Invoke via hover

Sometimes, we want the popup to show when the user hovers, like a tooltip or preview. For that, we will have to trigger popup via javascript.

```html
<div id='popup' popover='auto'>
  <p>Popup content</p>
</div>

<button id='popup-trigger' popovertarget='popup'>Button</button>

<style>
  #popup {
    margin: 0;
    position-area: bottom right;
  }
</style>

<script>
  let btn = document.getElementById('popup-trigger');
  let popover = document.getElementById('popup');

  btn.addEventListener('mouseenter', () => {
    popover.showPopover({ source: btn })
  });

  btn.addEventListener('mouseleave', () => {
    popover.hidePopover()
  });
</script>
```

When the mouse hovers over the button, we call `showPopover` method and pass the button as the source. On mouse leave, we hide the popup.

## Dialog

The Popover API is non-modal, meaning it doesn't block interaction with the rest of the page

To have a popup which makes the page inert (make rest of elements non-interactive), we can use `dialog` element.

Dialog elements don't provide light-dismiss by default, so we will also create a close button for it.

```html
<button id='open-dialog'>Open modal</button>

<dialog id='dialog-modal'>
  <p>Modal content</p>
  <button id='close-dialog'>Close</button>
</dialog>

<script>
  let dialog = document.getElementById('dialog-modal');
  let openBtn = document.getElementById('open-dialog')
  let closeBtn = document.getElementById('close-dialog')

  openBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
  });
</script>
```

`dialog.showModal` makes page inert. To open the dialog while keeping rest of the elements interactive, we can use `dialog.show`.

Use dialog for events that must be performed by the user.

## Backdrop

Popups can feel disconnected from the rest of the page if they don't stand out. That's where the backdrop helps.

Both popover api and dialog element renders the popup in top layer, which is a layer outside of the usual document flow.
To highlight the popup, we could [style][backdrop_styling] using the `backdrop` pseudo element.

```css
::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
```

This darkens the area behind the popup, making it feel more prominent.

## Conclusion

Try the Popover API in your next project. It's a great way to simplify your UI using native HTML, with no extra libraries, less code, and cleaner logic.

## Further Readings

- [Frontend masters blog][frontend_masters_popover_api]
- [Una Kravets blog on popover=hint][una_kravets_blog]

[anchor_position]: <https://developer.chrome.com/blog/anchor-positioning-api#position_elements_relative_to_anchors>
[backdrop_styling]: <https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#styling_the_popover_backdrop>
[frontend_masters_popover_api]: <https://frontendmasters.com/blog/menus-toasts-and-more>
[una_kravets_blog]: <https://una.im/popover-hint>
