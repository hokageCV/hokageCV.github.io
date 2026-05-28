---
title: How I Optimized newsfeed from 12s to 3s
slug: newsfeed-optimization
published_date: 2026-05-28
description: Newsfeed optimization with instrumentation
draft: false
tags: ['rails', 'optimization']
---

Our newsfeed had become very slow for clients, sometimes even resulting in a browser timeout. So I started working on newsfeed optimization.

But what to optimize? Before optimizing anything, we need to find out where and what to optimize. I used instrumentation in the newsfeed code flow.

## Instrumentation. What is that?

> Instrumentation is the practice of adding code to an application to monitor, measure, and analyze its runtime behavior.

At its simplest, instrumentation can be as basic as adding print statements to observe code execution. But it goes far beyond that. With tools like OpenTelemetry, we can track the full lifecycle of a request.

For instrumentation I used a helper method.

```rb
def measure(label)
  start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
  result = yield

  elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - start

  puts "#{label}: #{elapsed.round(2)}s"
  result
end
```

The helper accepts a label and executes the given code block. It returns the result and prints the execution time.

## Back to Newsfeed

At a high level, the flow looked something like this:

```rb
def generate_newsfeed
  public_stories = Story.get_public_stories
  event_updates = Event.get_event_updates
  task_completions = Task.get_task_completions

  generate_newsfeed(public_stories, event_updates, task_completions)
end
```
The flow collected records from multiple classes and returned a single object to render in the view.

<small>Method names and flow are abstracted for simplicity. Same for log values below.</small>

I wrapped queries with the helper.

```rb
def generate_newsfeed
  public_stories = measure("public_stories") { Story.get_public_stories }
  event_updates = measure("event_updates") { Event.get_event_updates }
  task_completions = measure("task_completions") { Task.get_task_completions }

  measure("generate_newsfeed") do
    generate_newsfeed(public_stories, event_updates, task_completions)
  end
end
```
Example logs look like this:

```sh
public_stories: 7.12s
event_updates: 2.08s
task_completions: 1.03s
generate_newsfeed: 1.05s
```

With the logs, it was clear that fetching stories was taking most time.
After instrumenting `get_public_stories`, I found some N+1 queries which helped a little.

Most of the time was spent initializing ActiveRecord objects. Full database rows were being fetched even though only a few attributes were needed. So instead of initializing full objects, I used `.pluck`[^pluck_in_rails] to fetch only the required attributes.


With the above optimizations, the `generate_newsfeed` method went from 12s to 3s.

[^pluck_in_rails]: In ActiveRecord, `.pluck` fetches only the required attributes from the database instead of initializing full objects.
