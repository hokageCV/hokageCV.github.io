---
title: Getting Started with Cloudflare Workers
slug: getting-started-with-cloudflare-workers
publishedDate: 2023-08-10
description: Getting started with Cloudflare Workers
draft: false
tags: ['serverless', 'cloudflare']
---

Serverless can be confusing if you're new to it. Despite the name "serverless," it does involve servers in the background. Basically in _serverless_ we write functions and deploy and the platform where functions are deployed takes care of rest of the things.

Cloudflare workers is a simple way to get started with the serverless architecture.
Its better to have hands-on learning than just theories. So we will build a serverless resume to understand cloudflare workers.

## Wrangler

Cloudflare workers can be managed through the web interface or by its command line tool `wrangler`.

### Installation

To install Wrangler, use the following command:

```bash
npm install wrangler --save-dev
```

### Generating project

```bash
wrangler generate project_name
```

This wil generate starter files for cloud flare workers.

## Code

1. Create a new file and add your resume contents in it.
2. Now in index.js we will import resume and send as response.

```js
import resumeData from './resume';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
    async fetch(request, env, ctx) {
        const formatedResume = JSON.stringify(resumeData, null, 2);

        return new Response(formatedResume, {
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
            },
        });
    },
};
```

To enable cross-origin resource sharing (CORS) ie add its headers.

To make the resume display in a more readable way, we are using JSON.stringify() function. It takes 3 arguments. Original data, a replacer callback function which is null here and space argument which is 2 which means that means that each level of nesting within the JSON structure will be indented by two spaces.

## Deploy

In wrangler.toml file, configure project details like name and entry point.

To deploy it use the command:

```bash
wrangler deploy
```

## Automating with Github Actions

To automate the deployment process we are using github actions. This workflow deploys updated code whenever changes are pushed to the repository.

1. Create '.github/workflows' directory
2. Inside it add a YAML file

Here's the content of the YAML file

```yaml
name: Deploy to Cloudflare Workers

on:
    push:
        branches:
            - master

jobs:
    deploy:
        runs-on: ubuntu-latest
        name: Deploy
        steps:
            - uses: actions/checkout@v2
            - name: Publish
              uses: cloudflare/wrangler-action@2.0.0
              with:
                  apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

To access our Cloudflare account, we are using API token. Generate the token from cloudflare dashboard. Then add it to github secrets of the repository.

## Conclusion

Thats it. We built a simple cloudflare workers project to server resume data.

Now when anyone enters the URL associated with the project, they would receive the resume data in response.
