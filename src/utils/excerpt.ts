export function getExcerpt(body: string, maxLength = 120): string {
  const lines = body.split('\n').map(l => l.trim()).filter(l => l.length > 0)

  const first_paragraph = lines.find(line => !line.startsWith('#') && !line.startsWith('---'))
  if (!first_paragraph) return ''

  return first_paragraph.length > maxLength
    ? first_paragraph.substring(0, maxLength).trimEnd() + '...'
    : first_paragraph
}
