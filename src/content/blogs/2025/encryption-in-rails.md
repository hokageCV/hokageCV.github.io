---
title: Secure Your Users' API Keys using Rails Encryption
slug: encryption-in-rails
publishedDate: 2025-03-17
description: How to store user's API keys using active record's encrypt
draft: false
tags: ['rails']
what is it that I want reader to take away from reading this?: |
  Why to encrypt user's api keys? how does it protect?
  how to encrypt with rails' features?
---

I have an [RSS aggregator app][simple-rss-repo] that helps me read newsletters and blogs from multiple sources without context switching. One of its features is to summarize articles using the Gemini API. I initially used my own API key for this, but I later decided to let users (if any, other than me) add their own key. Since we can't store these keys directly in the database, encryption is necessary.

## Why encrypt API keys?

Before we look at how to encrypt, let's first understand why directly storing keys in the database is a bad idea.

Suppose keys are stored directly in the database. If the database ever gets compromised, then all the keys would be immediately accessible to attackers. Encryption ensures that even in the worst-case scenario, the keys remain protected.

## How to encrypt?

Active record provides a built-in way to encrypt any model's attributes. We will use that.

1. First, generate a random key set

Run the command `rails db:encryption:init` to generate keys

This will generate three keys.

```bash
active_record_encryption:
  primary_key: EGY8WhulUOXixybod7ZWwMIL68R9o5kC
  deterministic_key: aPA5XyALhf75NNnMzaspW7akTfZp0lPY
  key_derivation_salt: xEY0dt6TZcAMg52K7O84wYzkjvbA62Hz
```

Add them to .env (or credentials storage if preferred).

2. Now add the generated keys to config in application.rb

```rb
config.active_record.encryption.primary_key = ENV["ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY"]
config.active_record.encryption.deterministic_key = ENV["ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY"]
config.active_record.encryption.key_derivation_salt = ENV["ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT"]
```

3. Add api_key column

If the `api_key` is missing in `user` model, add it with migration.

```rb
class AddApiKeyToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :api_key, :text
  end
end
```

4. Then declare encrypted attributes in model

Use `deterministic: true` to ensure the key decrypts consistently. Without it, the result will differ on each decryption, making the application unable to use the correct API key for requests

```rb
class User < ApplicationRecord
  encrypts :api_key, deterministic: true
end
```

5. That's it! Use encrypted key in your application

```rb
@api_key = Current.user.api_key
```

Rails will automatically encrypt the key when saving and decrypt it when accessed. This ensures the key is stored securely yet remains easily accessible.

## Conclusion

Encrypting API keys is a simple yet powerful way to protect user data. With Rails' built-in encryption, implementing this safeguard is straightforward and effective.

## Further Reading

- <https://guides.rubyonrails.org/active_record_encryption.html>

[simple-rss-repo]:<https://github.com/hokageCV/simple-rss>
