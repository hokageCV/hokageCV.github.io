---
title: Progressive Web App Basics
date: 2023-05-06
description: basics of making progressive web apps
draft: false
tags: ["javascript", "pwa"]
---

### What is a PWA?

Progressive Web Apps (PWA) is a way by which we can run our websites outside of the browser like native apps. They can be accessed from a user's home screen or app drawer, just like native apps.

### Why PWA?

PWAs have fast load times, work offline, and can be accessed from anywhere without the need for a specific app store

### Some examples of PWA

- [Squoosh](https://squoosh.app)
- [Pinterest](https://www.pinterest.com)
- [Spotify](https://open.spotify.com)

### Main parts of a PWA

There are 3 main parts of a PWA:

1. Web App
2. Manifest File
3. Service Worker

### Web App

It is the regular website part that we usually write.

In the HTML file, add following tags in the head section

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<!-- we can change this theme color using JS, but not the one in manifest file  -->
<meta name="theme-color" content="#ed6606" />

<link rel="manifest" href="./app.webmanifest" />
<link rel="apple-touch-icon" href="./assets/icons/icon_512.png" />

<script src="./sw-registerer.js"></script>
```

### Manifest File

It is a JSON file which acts as the metadata of our app. By convention it is named as manifest.json or app.webmanifest. It is used to provide the browser with information about how the PWA should be installed and displayed to the user.
Some of the important fields are:

- `name`: this is the full name of our PWA
- `short_name`: this is the name that will be displayed as the app name on the home screen
- `icons`: it is an array which contains all the icons that will be used for our app. Each icon should have these 3 fields `src`, `sizes`, `type`
  - One icon should have the purpose as `any` which will be used as the icon for the splash screen
  - One icon should have the purpose as `maskable` which will be used as the icon for the splash screen
- `start_url`: the url from where our app will start
- `display`: it is the display mode of our app. Usually kept as `standalone`
- `theme_color`: it is the color of the status bar when the app runs outside of the browser
- `background_color`: it is the color of the splash screen
- `scope`: scope determines where the service worker will be active
- `orientation`: it is the orientation of the app. Usually kept as `portrait`
- `description`: description will be desplayd when the user installs the app
- `screenshots`: screenshots will be desplayd when the user installs the app. Structure is similar to the icons array

### Service Worker

Service Worker is just a javascript file running in its own thread that will act as a middleware offering a local installed web server or web proxy for your PWA.
Basically it is is like a web server installed in client side.

In native app, we download all resources together as a package, and it works offline. In web apps, we download HTML, then browser downloads resources on demand, and it doesn’t work offline since it doesn’t have all the required resources.

In PWA, we download HTML. HTML then registers a service worker. service worker installs some resources & browser installs other resources on demand. Now this works offline since service worker has installed the required resources to run app.

Service worker caches the required resources which can be used to serve even when there is no internet connection.

It is installed by the web page and doesn't require user permission to be installed.

#### Registering a service worker

In the head section of the HTML file, add `<script src="./sw-registerer.js"></script>`

We are using a serviceworker registerer file because if we directly add the serviceworker to the HTML file then it wil be in the same thread and not a separate thread.

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./serviceworker.js");
}
```

### Useful resources for making PWA

- [Maskable Icon Maker](https://maskable.app): it helps to check if our icon is maskable or not, and also helps to make the icon maskable
- [PWA tutorial](https://web.dev/learn/pwa/)
