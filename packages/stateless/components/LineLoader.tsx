import clsx from 'clsx'

/**
 * A line loader to show when various data is loading. Useful generally for many
 * types of pages.
 */
export const LineLoader = () => (
  <div className="h-12 animate-pulse rounded-md bg-background-primary"></div>
)

export type LineLoadersProps = {
  /**
   * How many lines to show.
   */
  lines: number
  /**
   * Optional class name for the container.
   */
  className?: string
}

/**
 * Show many line loaders
 */
export const LineLoaders = ({ lines, className }: LineLoadersProps) => (
  <div className={clsx('space-y-1', className)}>
    {[...Array(lines)].map((_, i) => (
      <LineLoader key={i} />
    ))}
  </div>
)
