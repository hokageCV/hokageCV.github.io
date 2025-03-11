---
title: Benchmark
slug: benchmark-ruby-code
publishedDate: 2025-03-08
description: benchmark
draft: true
tags: ['rails']
---

Docs to read

- <https://ruby-doc.org/stdlib-2.5.0/libdoc/benchmark/rdoc/Benchmark.html>

Benchmarking Methods

## 1. Use Benchmark module (Basic Timing)

This will give you a rough idea of execution time.

```rb
require 'benchmark'

def update_feeds
  time = Benchmark.realtime do
    @user.feeds.each do |feed|
      feed_data = FetchFeedService.new(feed.url).call
      SaveArticlesService.new(feed, feed_data[:articles]).call
    end

    @articles = @user.articles.unread.recent_first.of_this_week
  end

  Rails.logger.info "update_feeds execution time: #{time.round(2)} seconds"

  redirect_to home_index_path
end
```

This will log the execution time to your Rails logs.

## 2. Use Benchmark.measure (More Detailed Output)

This provides more details, including user/system CPU time.

```rb
require 'benchmark'

def update_feeds
  report = Benchmark.measure do
    @user.feeds.each do |feed|
      feed_data = FetchFeedService.new(feed.url).call
      SaveArticlesService.new(feed, feed_data[:articles]).call
    end

    @articles = @user.articles.unread.recent_first.of_this_week
  end

  Rails.logger.info "Benchmarking update_feeds: #{report}"

  redirect_to home_index_path
end
```
