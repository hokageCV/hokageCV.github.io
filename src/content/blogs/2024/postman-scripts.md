---
title: Streamline API development with Postman Scripts
slug: postman-scripts
publishedDate: 2024-10-19
description: An introduction to postman variables and postman scripts
draft: false
tags: ['api']
---


Postman is a useful tool for API development that allows us to make requests to an API. However, when building APIs, we frequently update parameters & request body, which becomes repetitive and prone to errors.

With scripts, we can automate these repetitive tasks. In this article, we will explore postman variables and scripts to streamline your workflow.

## Variables

Before diving into scripts, it's essential to understand variables.

Scopes determine where the variable will be available.
- **Global**: Available throughout the application
- **Collection**: Available only within that postman collection (ie, group of requests)
- **Environment**: Changes depending on active environment (eg, development or production)

We can access these variables using following methods:
- pm.globals
- pm.collectionVariable
- pm.environment

Now that we understand how to use variables, let's explore how to automate tasks with scripts.

## Scripts

We can write pre-request & post-response scripts.

**Pre-request scripts** are executed before making the request.

For example, this pre-request script gets email from collection variable and sets name.

```js
 let email = pm.collectionVariables.get('user_email');
 let name = email.split('@')[0];
 pm.collectionVariables.set('user_name', name);
```

**Post-response scripts** are executed after the response is received.

For example, this post-response script sets auth headers and user_id from the response.

```js
// set auth headers for upcoming requests
let headersToFind = new Set(['uid', 'access-token']);
pm.response.headers.each(header => {
    let headerName = header.key.toLowerCase();
    if (headersToFind.has(headerName)) {
        pm.collectionVariables.set(headerName, header.value);
    }
});

// set current user id to previous user id
let previous_user_id = pm.collectionVariables.get('user_id')
pm.collectionVariables.set('previous_user_id', previous_user_id);

// set new current_user id
let response = pm.response.json();
let user_id = response.data.id;
pm.collectionVariables.set('user_id', user_id);
```

## Caution

In the variables tab, update current value not initial. Initially, didn't know how they worked so I had kept 'current value' column hidden. But all the updates take effect on this column. So I was thinking that scripts are not working. Spent quite some time due to this.

## Conclusion

Using Postman scripts can significantly save time and reduce errors in your API development workflow. By automating repetitive tasks, you can focus on enhancing your API's functionality and performance.

## Further reading
- Postman [variables](https://learning.postman.com/docs/sending-requests/variables/variables) and [scripts](https://learning.postman.com/docs/tests-and-scripts/write-scripts/intro-to-scripts) documentation

