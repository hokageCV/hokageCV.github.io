---
title: How I Debugged Unexpected Attribute Changes in Rails
slug: active-model-dirty
publishedDate: 2025-09-09
description: Tracking attribute changes in Rails with ActiveModel::Dirty
draft: false
tags: ['ruby-on-rails']
---

I was debugging an issue where a database record's attribute was getting updated incorrectly.
There were lots of callbacks involved, so it was taking time to figure out from where the value was being updated.

I needed a way to see exactly when the attribute was being changed. That's when I came across [`ActiveModel::Dirty`][active_model_documentation] module. With that, I found the error in no time.

## What is ActiveModel::Dirty?

ActiveModel::Dirty lets you track when an object's attributes change. It provides methods like `*_changed?`, `*_will_change!` that track when the value has been modified.

However, this module only tracks in-memory changes, resetting after the object is saved.

In most applications, we often need to know about attributes _after_ they're saved to the database.

ActiveRecord addresses this by building on the module through [ActiveRecord::AttributeMethods::Dirty][active_record_documentation], providing methods like `saved_change_to_*` and `saved_changes?` to track changes across the database lifecycle.

## Back to debugging

With this info, I went back to debugging.

The problem was that in a model, the attribute `field_id` was being assigned an incorrect value. So I used `saved_change_to_*` method inside an `after_save` callback. This way, whenever the record was saved, the callback would run.

Here's the code I used:

```rb
after_save -> {
  if saved_change_to_field_id?
    puts "field_id changed from #{saved_change_to_field_id.first} to #{saved_change_to_field_id.last}"
    binding.pry
  end
}
```

With this in place, I could instantly see whenever field_id changed and pause execution to inspect the call stack. That helped me identify the callback responsible and fix the issue.

## Conclusion

It was a delight to learn about this module. It's super useful for catching data changes. Try it out. It might save you a lot of time the next time your model behaves unexpectedly.

[active_model_documentation]: <https://api.rubyonrails.org/classes/ActiveModel/Dirty.html>
[active_record_documentation]: <https://api.rubyonrails.org/classes/ActiveRecord/AttributeMethods/Dirty.html>
