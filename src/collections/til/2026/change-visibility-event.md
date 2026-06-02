---
title: Change visibility event
published_date: 2026-05-17
tags: ['rails', 'browser']
---

[Simple RSS](/projects/simple-rss) (my rss reader) had one behaviour that bugged me for a while.

On the index page, there is a list of all available articles. I usually open a few articles in new tabs, read them, and then go back to the index page.

Once an article is read, it is marked as read. Now when I visit the index page again, those already-read articles are still present in the list.
It would be good to remove articles once they are read. Simple RSS is a server rendered app. So I didn't want any state management like zustand that could share state across browser tabs.

I found out about `visibilitychange` event which fits my use case. It is triggered when page visibility changes.

Now whenever the index page is visited after reading individual articles, a query is executed. The query compares current index page articles with their database status, and if any article has been marked as read, it is removed.

Now I don't need to remember which articles are already read.

## Further Reading

- [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)

