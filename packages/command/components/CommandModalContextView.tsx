import Fuse from 'fuse.js'
import { useMemo } from 'react'

import { SuspenseLoader } from '@dao-dao/common'
import {
  CommandModalContextSection,
  CommandModalProps,
} from '@dao-dao/tstypes/command'
import {
  CommandModalContextViewLoader,
  CommandModalContextView as StatelessCommandModalContextView,
} from '@dao-dao/ui'

export type CommandModalContextViewProps = Pick<
  CommandModalProps,
  'filter' | 'contexts'
>

export const CommandModalContextView = (
  props: CommandModalContextViewProps
) => (
  <SuspenseLoader fallback={<CommandModalContextViewLoader />}>
    <InnerCommandModalContextView {...props} />
  </SuspenseLoader>
)

export const InnerCommandModalContextView = ({
  filter,
  contexts,
}: CommandModalContextViewProps) => {
  const currentContext = contexts[contexts.length - 1]
  const sections = currentContext?.useSections?.({ filter })
  const sortedSections: CommandModalContextSection[] = useMemo(() => {
    if (!sections) {
      return []
    }

    // Flatten sections so we can access both section and item at the same
    // level.
    let itemsWithSection = sections.flatMap((section) =>
      section.items.map((item) => ({
        item,
        section,
      }))
    )

    // Filter if possible.
    if (filter) {
      const fuse = new Fuse(itemsWithSection, {
        // Allow filtering by DAO coreAddress if present.
        keys: ['item.name', 'item.coreAddress'],
      })
      itemsWithSection = fuse.search(filter).map((o) => o.item)
    }

    // Sections ordered in the order one of their items first appears in list of
    // all filtered items.
    const orderedSections = itemsWithSection.reduce(
      (acc, { section }) => (acc.includes(section) ? acc : [...acc, section]),
      [] as CommandModalContextSection[]
    )

    // For each section, override the items with the sorted and filtered
    // items.
    const sectionsWithSortedItems: CommandModalContextSection[] =
      orderedSections.map((section) => ({
        ...section,
        items: itemsWithSection
          .filter((optionWithSection) => optionWithSection.section === section)
          .map(({ item: option }) => option),
      }))

    return sectionsWithSortedItems
  }, [filter, sections])

  return (
    <StatelessCommandModalContextView
      loading={false}
      sections={sortedSections}
    />
  )
}
