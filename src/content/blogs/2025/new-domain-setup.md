---
title: 'New Domain Setup Manual: From DNS to Email Routing'
slug: new-domain-setup
publishedDate: 2025-10-05
description: Step-by-step guide to configure a new domain, including DNS, subdomains, and email routing
draft: false
tags: ['cloudflare']
---

After getting a new domain, I usually follow a few setup steps to make everything work smoothly. Here's a quick overview.

Before diving in, let's understand a few key elements first.

## What is Domain & DNS?

Websites are hosted on a server and servers are associated with IP addresses. You could visit a website by typing its IP address in the browser.
But remembering numbers for every site would be a hassle. That's why domains exist, they map names to IP addresses, so you can just type example.com instead of 192.0.2.1.

DNS (Domain Name System) is like the internet's phone directory. It keeps track of which domain belongs to which IP address.  Whenever you visit a website, your browser looks up that record to find the right server.

## Transfer DNS Authority to cloudflare

Before transferring the domain's DNS authority to Cloudflare, let's clarify a few related terms:

- Domain Registrar: The service from where the domain was purchased (eg, Hostinger)
- DNS Authority: The service that manages your DNS records (eg, Cloudflare)
- Nameservers: Determines who is responsible for managing DNS of your domain
- DNS Records: Instructions that tell the internet how to route traffic for your domain

In this case, Hostinger is the domain registrar.

To make Cloudflare the DNS authority, we will replace the existing Hostinger nameservers with the nameservers provided by Cloudflare from the Hostinger settings.

After that, Cloudflare will take over DNS management. Domain Registrar will still be Hostinger.

## Configure Apex domain and Subdomains

The apex domain (also called the root domain, like [chaitanyavaru.com][apex_domain]) is the main address of your site.
A subdomain (like [resume.chaitanyavaru.com][sub_domain]) is a branch off that main address.

### Apex Domain

Now we'll set up the apex domain for your GitHub repository

In Github, it is recommended to [verify][github_verify_domain] the domain for security reasons. For verification, we add the provided `TXT` records in Cloudflare.

Once ownership is verified, we can configure the apex domain. Go to the 'Pages' section in repository settings, add the domain in Github, and then create `A` records in Cloudflare.

Now, wait for the DNS configurations to propagate through the network.

### Subdomain

For subdomain, we will use `CNAME` record.

Example with Vercel:

1. Open project's Settings → Domains
2. Add required subdomain
3. Vercel will provide a CNAME record
4. Add that CNAME record in Cloudflare
5. Done

## Email Routing

Cloudflare also provides Email Routing, which lets you forward emails from your domain to another address. For this, we will use MX records.

To set this up:

1. Go to the Cloudflare dashboard
2. Navigate to Email → Email Routing
3. Add your custom email address and destination
    - Suppose custom email is `mail@domain.com` and value is `yourmail@gmail.com`
5. Cloudflare will automatically add the required MX records if it manages your DNS

That's it. Now emails sent to `mail@domain.com` are forwarded to your existing inbox at `yourmail@gmail.com`.

With these steps, your domain setup is complete.

[apex_domain]: <https://chaitanyavaru.com>
[sub_domain]: <https://resume.chaitanyavaru.com>

[github_verify_domain]: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages>
[github_apex_domain]: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain>

