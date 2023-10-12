import Fuse from 'fuse.js'
import { Fragment, useMemo } from 'react'

import {
  CommandModalContextViewLoader,
  CommandModalContextView as StatelessCommandModalContextView,
} from '@dao-dao/stateless'
import {
  CommandModalContext,
  CommandModalContextSection,
} from '@dao-dao/types/command'

import { SuspenseLoader } from '../../components/SuspenseLoader'

export interface CommandModalContextViewProps {
  filter: string
  contexts: CommandModalContext[]
  visible: boolean
}

export const CommandModalContextView = (
  props: CommandModalContextViewProps
) => {
  const Wrapper = props.contexts[props.contexts.length - 1]?.Wrapper ?? Fragment

  return (
    <SuspenseLoader fallback={<CommandModalContextViewLoader />}>
      <Wrapper>
        <InnerCommandModalContextView {...props} />
      </Wrapper>
    </SuspenseLoader>
  )
}

export const InnerCommandModalContextView = ({
  filter,
  contexts,
  visible,
}: CommandModalContextViewProps) => {
  const currentContext = contexts[contexts.length - 1]
  const sections = currentContext?.useSections?.({ filter })
  const { sections: sortedSections, loading } = useMemo(() => {
    if (!sections) {
      return {
        sections: [],
        loading: false,
      }
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
        // Allow filtering by DAO's name, coreAddress, and polytone proxies.
        keys: ['item.name', 'item.coreAddress', 'item.polytoneProxies'],
      })
      itemsWithSection = fuse.search(filter).map((o) => o.item)
    }

    // Sections ordered by their `order` field if present, and then in the order
    // one of their items first appears in list of all filtered items.
    const orderedSections = itemsWithSection.reduce(
      (acc, { section }) => (acc.includes(section) ? acc : [...acc, section]),
      // Start with the sections that have an order field, if a searched item
      // exists for them.
      filter
        ? sections
            .filter(
              (section) =>
                section.searchOrder !== undefined &&
                itemsWithSection.some((o) => o.section === section)
            )
            .sort(
              (a, b) =>
                (a.searchOrder ?? Infinity) - (b.searchOrder ?? Infinity)
            )
        : []
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

    return {
      sections: sectionsWithSortedItems,
      loading: sections.some((section) => section.loading),
    }
  }, [filter, sections])

  return (
    <StatelessCommandModalContextView
      itemsLoading={loading}
      loading={false}
      sections={sortedSections}
      visible={visible}
    />
  )
}
