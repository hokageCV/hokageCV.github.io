---
title: select2
slug:  select2
publishedDate: 2024-04-21
description: select2
draft: true
tags: ['javascript']
---

- Lately have to work with lot of select dropdown lists.
- using select2 a lot
- a cheat sheet /quick view for it

---
- add via cdn
---


## Normal dropdown with search

```html
<select name='students' id='jiraiya'>
  <option value='minato'>Minato</option>
  <option value='nagato'>Nagato</option>
  <option value='naruto'>Naruto</option>
</select>

<script>
  $('#jiraiya').select2()
</script>

```


## Load on scroll list

```html
<select
  id='tsunade'
  data-filter='contacts'
  placeholder='Select #{@plural_beneficiary_title}'
  data-url='<%= search_charity_beneficiaries_path(charity_id: @charity.id) %>'
  data-minimum-input-length='3'
</select>

<script>
  $('#tsunade').select2({
    placeholder: 'Search',
    minimumInputLength: 1,
    ajax: {
      url: $(element).attr('data-url'),
      dataType: 'json',
      delay: 300,
      cache: true,
      data: function (params) {
        return { query: params.term, page: params.page || 1 };
      },
      processResults: function (data, params) {
        return {
          results: data.resources.map(
            function(resource) {
              return { id: resource['id'], text: resource['name'] }
            }
          ),
          pagination: {
            more: data.next_page
          }
        };
      }
    }
  })
</script>
```

```ruby
def search
  query = params[:query].to_s.downcase

  records = Beneficiary
    .where('LOWER(name) LIKE ?', "%#{query}%")
    .order('LOWER(name) ASC')
    .paginate(page: params[:page], per_page: 10)

  b_next_page = !!records.next_page
  records     = records.pluck(:id, :name).map { |k, v|{ id: k, name: v } }

  render json: { results: records, b_next_page: b_next_page }
end

```

## Do Something after an option is selected

```js
$('#orochimaru').on('select2:select', functionToExecute )
```

## Pre select an option

```js
success: function(resp){
  let individualSelect = $('#individual_list')

  resp.user_data.forEach(user => {
    let option = new Option(user.name, user.id, true, true);
    individualSelect.append(option).trigger('change');
  });
}
```
