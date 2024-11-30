---
title: Data structure before code
slug: data-structure-before-code
publishedDate: 2024-07-13
description: Focus on the structure before code
draft: false
tags: ['learnings']
---

Last evening, I was reading [this article][blog-link] from [Engineer's Codex][newsletter-page] newsletter. In it, I read this quote by Linus Torvalds.

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships. 

Article was about focusing on how we store the data first and then writing the code, to make it more maintainable.

Initially, I didn't understand the article much, but then I remembered a meeting I had with a senior developer that morning. After which, article was a lot clearer.

## Meeting with senior developer

We were discussing about some issue, and then at one point, he was refactored some code that I had written. It was a service which would access different buckets based on the environment.

Here’s what I had originally written:

<small>Note: Excluded some code for brevity.</small>

```ruby
class SomeClass < ApplicationRecord
  def self.get_bucket_name(environment)
    if environment == 'staging'
      ENV['STAGING_BUCKET_NAME']
    elsif environment == 'pre-production'
      ENV['PRE_PRODUCTION_BUCKET_NAME']
    elsif environment == 'production'
      ENV['PRODUCTION_BUCKET_NAME']
    end
  end

  def self.get_public_url(environment)
    if environment == 'staging'
      ENV['STAGING_PUBLIC_URL']
    elsif environment == 'pre-production'
      ENV['PRE_PRODUCTION_PUBLIC_URL']
    elsif environment == 'production'
      ENV['PRODUCTION_PUBLIC_URL']
    end
  end
end

# Usage
SomeClass.get_bucket_name(environment)
SomeClass.get_public_url(environment)
```
Since the values were constant, he moved them into a hash.

```ruby
class SomeClass < ApplicationRecord
  CONFIGURATION = {
    'staging' => {
      bucket_name: ENV['STAGING_BUCKET_NAME'],
      public_url: ENV['STAGING_PUBLIC_URL']
    },
    'pre-production' => {
      bucket_name: ENV['PRE_PRODUCTION_BUCKET_NAME'],
      public_url: ENV['PRE_PRODUCTION_PUBLIC_URL']
    },
    'production' => {
      bucket_name: ENV['PRODUCTION_BUCKET_NAME'],
      public_url: ENV['PRODUCTION_PUBLIC_URL']
    }
  }
end

# Usage
SomeClass::CONFIGURATION.dig(environment, :bucket_name)
SomeClass::CONFIGURATION.dig(environment, :public_url)
```
Now instead of two functions, everything was in a single hash. This definitely made the code more readable and maintable.


## Conclusion

Now onwards, I will now try to refactor to be more clear.

[blog-link]: https://read.engineerscodex.com/p/good-programmers-worry-about-data
[newsletter-page]: https://read.engineerscodex.com
