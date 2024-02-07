import { DockItem, DockItemProps, IDockItem } from './DockItem'

export type DappDockProps = {
  /**
   * The items to display in the dock.
   */
  items: IDockItem[]
} & Pick<DockItemProps, 'ButtonLink'>

/**
 * A mobile navigation dock for the dApp.
 */
export const DappDock = ({ items, ...itemProps }: DappDockProps) => (
  <div className="z-10 flex h-[4.5rem] shrink-0 items-stretch justify-around gap-3 border-t border-border-primary bg-background-base py-3 px-2 md:hidden">
    {items.map((item) => (
      <DockItem key={item.key} item={item} {...itemProps} />
    ))}
  </div>
)
