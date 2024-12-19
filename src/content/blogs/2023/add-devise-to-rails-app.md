---
title: Add devise to rails app
slug: add-devise-to-rails-app
publishedDate: 2023-08-25
description: Add devise to rails app
draft: false
tags: ['ruby-on-rails']
---

Devise is a very useful gem in the rails ecosystem. It provides powerful out-of-the-box solutions for authentication functionalities to add to your rails application.

In this guide, we will look at the basic steps one needs to integrate devise.

## Install devise

```bash
bundle add devise
```

This will add install the gem and add it to the gemfile

## Generate initial configuration files

```bash
rails generate devise:install
```

-   In config/environment/dev add `config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }`
    -   This ensures that Devise-generated emails contain the correct URL.
-   Set a root path in routes.rb, if not already.

## Generate the view files

```bash
rails generate devise:views
```

Use it to modify the default view of signup, login and other authentication-related pages.

## Generate user model

```bash
rails generate devise User
```

after generating the model, perform a database migration to add the User model to your database.

```bash
rails db:migrate
```

Now you could explore other features like confirming while signup, forgot password, lock attempts etc.
