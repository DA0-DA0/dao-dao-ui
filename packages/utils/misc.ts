export const getScrollParent = (node: HTMLElement): HTMLElement | null => {
  if (node.scrollHeight > node.clientHeight) {
    return node
  }
  return node.parentElement ? getScrollParent(node.parentElement) : null
}
