---
title: Cloud Resume Challenge
date: 2023-08-02
description: journey of cloud resume challenge, azure path
draft: false
tags: ['blog', 'cloud']
---

I wanted to explore cloud so I took the [Cloud Resume Challenge][crc]. It is a great way to get hands on learning experience on cloud. Here's my journey through it.

One can take it using any cloud platform like AWS, Azure or GPC. I selected the Azure path.

## Adding the basic structure

First, I setup the basic HTML, CSS, JS structure. The page had few social links and a counter. I kept it very minimal since focus is on learning cloud not HTML, CSS.

## Hosting Static website

I created `Static Web App` from the azure portal and hosted the app. This took no time.

![creating a static web app][staticwebapp]

## Configuring a Custom Domain

From the hosted static app, I went to `custom domain on other DNS`. Created CNAME record from DNS management from my DNS provider with value as azure hosted url.

## Working with Azure Cosmos DB

Created an `Azure Cosmos DB` account. Make sure to select (consumption) serverless option.
![creating a cosmos db][cosmosdb]

Then created a new container from data explorer and added an item to it.
![cosmos db container][cosmosdbcontainer]

## Implementing Azure Functions

This was the most challenging part. I created an `Function app` from the portal.
![creating a function app][azurefunctionapp]
Once function app is created, create the function with http Trigger.

Now select `Integrate` and add input & output bindings. Set binding type as cosmos DB since we have stored the count there and select the database we created earlier. Database name will be database-id and collection name will be container-id.

![testing azure function][testingfunction]

This is the required function. The `data` parameter receives data from the `Input binding`. Then we assign the required value from it to `Output binding` so that it could be used after function execution. The data is returned in the body. The count value is incremented in output binding and after function execution, it is stored in the database.

```js
module.exports = async function (context, req, data) {
    context.bindings.outputDocument = data[0];
    context.bindings.outputDocument.visitorCount += 1;
    context.res = {
        body: {
            visitorCount: data[0].visitorCount,
        },
    };
};
```

🚨 Mistake I did was that I kept partition key and the key storing count value same. It was creating a new record instead of updating it. This took up a lot of time.

For this step, articles by [Akande Bolaji][akande], [Craig Wall][craig] and [Jeff Brown][jeff] helped a lot.

Also enable CORS after function is ready.

## Using CDN

For CDN I used `Front Door and CDN profile` from azure portal. Added the static web app's url as endpoint.
![adding cdn][addingcdn]

## Conclusion

The resume is deployed in azure static web app and is live at [chaitanyavaru.tech][hokage]. It is storing the visitor count value in azure cosmos DB whose value is updated by azure function whenever the page is visited. And its using custom domain.

I learned a lot from this challenge. It was a great experience. I will be exploring more of azure in future.


[crc]: https://cloudresumechallenge.dev/docs/the-challenge
[staticwebapp]: https://res.cloudinary.com/dmtacem5p/image/upload/v1690988090/blog/azure_static.png
[cosmosdb]: https://res.cloudinary.com/dmtacem5p/image/upload/v1690988090/blog/azure_cosmos_db.png
[cosmosdbcontainer]: https://res.cloudinary.com/dmtacem5p/image/upload/v1690987171/blog/cosmos_db_container.png
[azurefunctionapp]: https://res.cloudinary.com/dmtacem5p/image/upload/v1690988090/blog/azure_function.png
[testingfunction]: https://res.cloudinary.com/dmtacem5p/image/upload/v1690988090/blog/azure_function_testing.png
[addingcdn]: https://res.cloudinary.com/dmtacem5p/image/upload/v1690987170/blog/azure_cdn.png
[akande]: https://dev.to/therealbolaji/creating-a-serverless-resume-with-visitor-counter-in-azure-3f78
[craig]: https://craigtwall.com/azure-cloud-resume-challenge
[jeff]: https://jeffbrown.tech/azure-cloud-resume-challenge-part-1
[hokage]: https://www.chaitanyavaru.tech
