/**
 * Get the scrollable ancestor of an element.
 */
export const getScrollableAncestor = (
  node: HTMLElement
): HTMLElement | null => {
  if (node.scrollHeight > node.clientHeight) {
    return node
  }
  return node.parentElement ? getScrollableAncestor(node.parentElement) : null
}
