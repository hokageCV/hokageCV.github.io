---
title: Promise in Javascript
slug: promise-in-js
publishedDate: 2023-03-02
description: explanation of promise in javascript in simple easy to understand words
draft: false
tags: ["promise", "javascript"]
---

## What is promise?

Promise is a special object that represents a future value of an asynchronous operation, the value could be a success or failure.

Now to handle promise, 2 most common methods are either using callbacks or async/await

## **Callback**

We use `.then()` after the promise to tell javascript what needs to be done after the has resolved/rejected. It takes 2 callbacks `onResolve` and `onReject` (usually omitted)

eg

```js
fetch("https://dummyjson.com/carts?limit=5")
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err);
    })
console.log("hum first, hum first \n"); // this will appear first in console
```

## **Async/Await**

`Async`

It tells javascript that this is an asynchronous function. An async function always returns a promise.

`Await`

It tells javascript to wait for an asynchronous action to finish before continuing the function. With this we can write asynchronous code in a synchronous manner. It is used instead of `.then()`. It works only inside async function.

eg

```js
const getCurrentTabData = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const requiredData = { title: tabs[0].title, url: tabs[0].url };
    
    return requiredData;
};

async function someFunction(){
    const data1 = getCurrentTabData() //❌ we won't get the expected value
    const data2 = await getCurrentTabData(); //✔ as we wait for promise to resolve, we get expected value
}
```

## Summarizing this with an analogy. 
Suppose we go to a self-service restaurant and order Cheese Kulcha [*we invoked an asynchronous function*]. 
- Then the receptionist will give us a token [*we got a promise in return*]. 
- Now either we do some other work until our turn arrives [*callback*] or wait [*async/await*].
- When our turn comes and we go to take the order, these two possibilities may occur
  - We get our order [*promise is fulfilled / resolved, we get the value which we expected*] 
  - The receptionist may say that due to some reasons order could not be prepared (gas khatm ho gaya hoga) [*promise is rejected, and we got a reason of error*]