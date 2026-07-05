---
title: See Resume from an ATS's perspective
published_date: '2026-07-03'
tags: ['linux']
---

I was checking how my resume would look like when parsed by ATS.
For parsing, I used the `pdftotext` command in linux.

There were some errors with parsing icons. I was using font awesome icons in LaTex as shown below.

```latex
\faIcon{laptop}\href{https://www.chaitanyavaru.com}{www.chaitanyavaru.com}

\faIcon{linkedin}\href{https://linkedin.com}{linkedin.com/in/chaitanya-varu}
```

When pdf file was parsed, icons were coming up as gibberish.

```txt
 www.chaitanyavaru.com
ï linkedin.com/in/chaitanya-varu
```

To resovle this, I used [accsupp][accsupp] package to add accessiblity text for the icons.

```latex
\BeginAccSupp{ActualText={Website: }}\faIcon{laptop}\EndAccSupp{} \href{https://www.chaitanyavaru.com}{www.chaitanyavaru.com}

\BeginAccSupp{ActualText={LinkedIn: }}\faIcon{linkedin}\EndAccSupp{} \href{https://linkedin.com}{linkedin.com/in/chaitanya-varu}
```

With that, icons were parsed correctly without any gibberish.

```txt
Website: www.chaitanyavaru.com
LinkedIn: linkedin.com/in/chaitanya-varu
```

[accsupp]: <https://ctan.org/pkg/accsupp?lang=en>
