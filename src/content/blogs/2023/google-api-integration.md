---
title: How to integrate google APIs to your application
slug: google-api-integration
publishedDate: 2023-06-07
description: How to integrate Google API with your application
draft: false
tags: ['api', 'google']
---

API is a way to use features of other applications in our application. Google has several APIs that could be used in our applications.

In this article, we will see how to integrate Google API with our application.

## Prerequisites

-   Account in Google Cloud Platform

## Steps

### 1. Create Google Cloud Project

![Create Project][img-create-project]

-   From the sidebar, go to APIs & Services > Library.
-   Search for the API to enable, here we are enabling google sheets API.
-   Click on Enable.

### 2. Create Credentials

![Create Credentials][img-create-credentials]

-   Now create credentials for the API. For this, there are 3 ways
    -   OAuth 2.0: to access user data on their behalf.
    -   API Key: to access public data.
    -   Service Account: to access our data on behalf of our application.
-   here we are using a service account.
-   Add a service account name and click on create.
-   Fill the required details
-   Click on Done and download the JSON file which contains the credentials.

### 3. Integrate API using the credentials

-   Create an `.env` file and add `GOOGLE_SHEET_CLIENT_EMAIL`, `GOOGLE_SHEET_PRIVATE_KEY` and `GOOGLE_SHEET_ID` from the downloaded JSON file.
-   For the private key, include everything from "-----BEGIN PRIVATE KEY-----" to "-----END PRIVATE KEY-----"
-   Install `googleapis` package using your package manager.

```js
import { google } from 'googleapis';

export default async function getSheetData() {
    // create auth client
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_SHEET_PRIVATE_KEY,
        },
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets', // to read and write spreadsheets
            'https://www.googleapis.com/auth/drive', // to create a new spreadsheet
        ],
    });

    // create client instance
    const client = await auth.getClient();

    // create google sheet instance
    const sheetInstance = google.sheets({ version: 'v4', auth: client });

    // get all data in range
    const { data } = await sheetInstance.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'sheet1', // this is sheet name
    });

    return data.values;
}
```

[img-create-project]: https://res.cloudinary.com/dmtacem5p/image/upload/v1691494960/blog/gcp_create_project.png
[img-create-credentials]: https://res.cloudinary.com/dmtacem5p/image/upload/v1691494960/blog/gcp_create_credentials.png
