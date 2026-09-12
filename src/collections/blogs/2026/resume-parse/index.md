---
title: See Resume from the Eyes of an ATS
slug: resume-parse
published_date: 2026-09-12
description: 'How I checked what a PDF parser sees in my resume and fixed icon parsing.'
tags: ['linux']
---

I am looking for a new job these days. While working on the [resume][resume], the general advice is not to use icons in the resume, because icons might not be parsed correctly. But I do want to use icons in the resume.

![icons](./resume-icons.webp)

I thought, why not look at the resume the way a parser would? This way, I could understand why icons might be a problem.

With some googling, I found about `pdftotext` command, which can extract text from PDF documents.

After parsing the PDF, the icons came up as gibberish.

```txt
 www.chaitanyavaru.com
ï linkedin.com/in/chaitanya-varu
```

In LaTeX, I was using icons as below.

```latex
\faIcon{laptop}\href{https://www.chaitanyavaru.com}{www.chaitanyavaru.com}

\faIcon{linkedin}\href{https://linkedin.com}{linkedin.com/in/chaitanya-varu}
```

To resolve this, I used [accsupp][accsupp] package to add accessibility text for the icons.

```latex
\BeginAccSupp{ActualText={Website: }}\faIcon{laptop}\EndAccSupp{}
  \href{https://www.chaitanyavaru.com}{www.chaitanyavaru.com}

\BeginAccSupp{ActualText={LinkedIn: }}\faIcon{linkedin}\EndAccSupp{}
  \href{https://linkedin.com}{linkedin.com/in/chaitanya-varu}
```

Now when the parser comes across the icons, it knows what text to extract in place of icon. With this, icons were parsed correctly without any gibberish.

```txt
Website: www.chaitanyavaru.com
LinkedIn: linkedin.com/in/chaitanya-varu
```

## Conclusion

This may not be valid for every application tracking system (ATS), but it gives me a way to check what text is actually extracted from my resume.

The general advice is to avoid icons because they might not be parsed correctly. In my case, I could keep the icons by adding accessibility text for them.

This experiment helped me get to the underlying reason behind the general advice, instead of just following it.

[resume]: <https://resume.chaitanyavaru.com>
[accsupp]: <https://ctan.org/pkg/accsupp?lang=en>
