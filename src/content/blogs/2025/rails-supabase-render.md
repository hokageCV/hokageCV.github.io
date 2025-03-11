---
title: Building a Rails app with Supabase & Render
slug: rails-supabase-render
publishedDate: 2025-03-11
description: How to use supabase & render to build rails application
draft: false
tags: ['ruby-on-rails', 'deploy']
what is it that I want reader to take away from reading this?: |
  how to use supabase as DB in rails
  how to deploy rails app in render
---

When building side projects or a prototype, it's better to use managed services to build faster.

Supabase is a managed service that provides a Postgres database. With Render, we can host our applications.

 In this article, we'll walk through setting up Supabase as the database for a Rails app and deploying it on Render. I'll also highlight two mistakes I made along the way, so you can avoid them.

## Supabase

First, let's set up Supabase as the database for our Rails app.

- Create a project from Supabase dashboard
- After creating the project, click on connection button to get the connection URL
- Ensure `pg` gem is installed in the application
- Add `DATABASE_URL` in .env file
- In config/database.yml, configure the production database

```yml
production:
  adaptor: postgresql
  encoding: unicode
  url: <%= ENV["DATABASE_URL"] %>
```

Now, Active Record will use supabase as the postgres database.

## Render

Next, let's deploy our application on Render.

- From the dashboard, create new web service
- Select the repository you want to host
- Add build command

```bash
bundle install; bundle exec rake assets:precompile; bundle exec rake assets:clean;
```

- Add start command

```bash
bundle exec rails db:migrate && bundle exec rails server -b 0.0.0.0 -p ${PORT:-3000}
```

- Deploy!

## Common Mistakes

- Render
  - Ensure `db:migrate` is included in the start command; without it, the database won’t be created.
  - I forgot this and spent time figuring out why the database didn’t work.
- Supabase
  - For the connection string, use 'Session Pooler'.
  - I had selected 'Transaction Pooler' initially, which caused queries to fail.
