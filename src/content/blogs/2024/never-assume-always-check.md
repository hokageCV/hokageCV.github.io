---
title: Never Assume, Always Check
slug:  never-assume-always-check
publishedDate: 2024-06-14
description: My learnings while working with external data
draft: false
tags: ['learnings']
---

Last week, I worked on a ticket where I was requesting data from frontend to backend. There was also an nginx server between them. Backend was a Rails API, and frontend was Rails application with javascript for interactivity.

After deploying the backend on server, I got CORS error when making requests.

Before deploying, I had tested it locally and the service worked. Since nginx was not involved locally, my first thought was that the problem must be with nginx server. It must not be passing the cors headers, since in the API's cors policy the frontend was allowed.

I spent lot of time checking for that, but found nothing.

Then I moved to javascript part, which was an ajax request. In its `error` section, if status was '404' then another function had to be called else just print the statusText.

```js
error: function(error) {
  if (error.status === 404 ) {
    // do something
  }
  else {
    console.log(error.statusText)
  }
}
```
Somehow, the browser console showed a status of 404, so I continued working, assuming it was actually a 404 error. After sometime, I checked the status with console.log and found it was 0 🤯.

Later, the bug was fixed.

## Learning
With this issue, I realised that to always check and validate the values that you are getting. Especially when you receive them from  outside of your server.
