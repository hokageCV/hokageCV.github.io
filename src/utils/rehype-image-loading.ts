export default function rehypeImageLoading() {
  return (tree: any) => {
    let firstImageFound = false

    function walk(node: any) {
      if (firstImageFound) return
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties ??= {}
        node.properties.loading = 'eager'
        firstImageFound = true
        return
      }
      if (node.children) {
        for (const child of node.children) {
          walk(child)
        }
      }
    }

    walk(tree)
  }
}
