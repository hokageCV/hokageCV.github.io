---
title: How I Optimized newsfeed from 12s to 3s
slug: newsfeed-optimization
publishedDate: 2026-01-22
description: newsfeed optimization
draft: true
tags: ['rails']
---

<!-- =====================

 - start by understandsing 'where the time is actually spent?'
     - sql queries, loops, external apis, json building etc
```rb
def measure(label)
  t0 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  result = yield
  puts "#{label}: #{Process.clock_gettime(Process::CLOCK_MONOTONIC) - t0}s"
  result
end

# usage
measure("sql_load") { load_data_from_db }
```
 - scan for common slow patterns
     - N+1, expensive db operations, large objects built inside loops, reformatting data mulitple times (json -> ruby -> json)
 - break lengthy code into logical blocks without changing logic
     - this helps to isolate and measure each block
 - copy current output
     - this way, you can compare with updated method's output
 -

=====================
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

===================== -->
