import Fuse from 'fuse.js'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CommandModalProps,
  CommandStateType,
  Hit,
  HitSectionData,
  HitType,
} from '@dao-dao/tstypes/ui/CommandModal'

import { Modal } from '../Modal'
import { SearchBar } from '../SearchBar'
import { CommandHits } from './CommandHits'
import { ContextPill } from './ContextPill'

export const CommandModal = ({
  onClose,
  filter,
  setFilter,
  baseHits,
  onChoice,
  navigatingFromHit,
  commandState,
  setCommandState,
}: CommandModalProps) => {
  const { t } = useTranslation()

  const { hits, sectionData }: { hits: Hit[]; sectionData: HitSectionData } =
    useMemo(() => {
      let hits = baseHits ?? []
      // Filter hits if possible.
      if (filter && hits.length) {
        const fuse = new Fuse(hits, { keys: ['id', 'name'] })
        hits = fuse.search(filter).map((o) => o.item)
      }

      // Sort sections by order of first appearance of hits
      // ordered list of hit types
      const hitTypes = hits.reduce(
        (arr, hit) => (arr.includes(hit.hitType) ? arr : [...arr, hit.hitType]),
        [] as HitType[]
      )
      // Sorted hits based on hitTypes
      // Note that `sort` has a STABLE SORT invariant, so the order of elements are preserved
      const sortedHits = hits.sort(
        (a, b) => hitTypes.indexOf(a.hitType) - hitTypes.indexOf(b.hitType)
      )
      // Section index array based on contiguous elements, end exclusive
      const sectionEndIndexes = [
        ...sortedHits.reduce((arr, hit, i) => {
          return i !== 0 && hit.hitType !== sortedHits[i - 1].hitType
            ? [...arr, i]
            : arr
        }, [] as number[]),
        sortedHits.length,
      ]
      // Map section names
      const sectionNames = hitTypes.map((type) =>
        t(`commandModal.sectionName.${type}`)
      )

      return {
        hits,
        sectionData: {
          sectionEndIndexes,
          sectionNames,
        },
      }
    }, [baseHits, filter, t])

  // Go back to home when input is empty and backspace is pressed, unless
  // currently navigating as a result of choosing a hit, in which case we don't
  // want the user to get confused since the loader will disappear.
  const onEmptyBack = useCallback(() => {
    if (navigatingFromHit) {
      return
    }

    setCommandState({ type: CommandStateType.Home })
  }, [navigatingFromHit, setCommandState])

  return (
    <Modal
      containerClassName="p-0 w-full max-w-[550px] h-[450px] max-h-[90vh] border animate-fadein"
      headerContainerClassName="!m-0 px-4 py-6"
      headerContent={
        <div className="flex flex-row gap-4 items-stretch h-8">
          {commandState.type === CommandStateType.NavigateDao ? (
            <ContextPill
              name={t('commandModal.navigateDao')}
              onClose={onEmptyBack}
            />
          ) : commandState.type === CommandStateType.DaoChosen ? (
            <ContextPill
              imageUrl={commandState.imageUrl}
              name={commandState.name}
              onClose={onEmptyBack}
            />
          ) : undefined}

          <SearchBar
            className="leading-8 text-text-body !primary-text"
            containerClassName="grow"
            ghost
            hideIcon
            onBlur={(ev) => ev.target.focus()}
            onChange={(event) => setFilter(event.currentTarget.value)}
            onKeyDown={(ev) => {
              if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
                return ev.preventDefault()
              } else if (ev.key === 'Backspace' && !filter.length) {
                return onEmptyBack()
              }
            }}
            placeholder={t('commandModal.prompt')}
            value={filter}
          />
        </div>
      }
      hideCloseButton
      onClose={onClose}
    >
      <CommandHits
        hits={hits}
        navigatingFromHit={navigatingFromHit}
        onChoice={onChoice}
        sectionData={sectionData}
      />
    </Modal>
  )
}
