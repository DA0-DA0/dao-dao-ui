// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import clsx from 'clsx'
import { Fragment, forwardRef, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader, Logo } from '@dao-dao/ui'

import { DaoHit, Hit, HitType } from './CommandModal'

interface HitSectionData {
  // end index of each section, exclusive
  sections: number[]
  sectionNames: string[]
}

export interface CommandHitsProps {
  sectionData: HitSectionData
  hits: Hit[]
  onChoice: (hit: Hit) => void
  navigatingFromHit: Hit | undefined
}

// Need to use `any` here as instantsearch does't export the required
// types.
export const CommandHits = ({
  sectionData,
  hits,
  onChoice,
  navigatingFromHit,
}: CommandHitsProps) => {
  const { sections, sectionNames } = sectionData
  const [selection, setSelection] = useState(0)

  useEffect(() => setSelection(0), [hits, sectionData])

  const handleKeyPress = useCallback(
    (event) => {
      // Do nothing if no hits.
      if (hits.length === 0) {
        return
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          setSelection((selection) =>
            selection - 1 < 0 ? hits.length - 1 : Math.max(selection - 1, 0)
          )
          break
        case 'ArrowRight':
        case 'ArrowDown':
          setSelection((selection) => (selection + 1) % hits.length)
          break
        case 'Enter':
          onChoice(hits[selection])
          break
      }
    },
    [onChoice, hits, selection]
  )

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  // Ensure selected action is scrolled into view.
  const onSelectedHitRef = useCallback((ref: HTMLDivElement | null) => {
    if (!ref || !ref.parentElement) {
      return
    }

    // Only scroll if not already visible.
    const { top, bottom } = ref.getBoundingClientRect()
    const containerRect = ref.parentElement.getBoundingClientRect()
    if (top >= containerRect.top && bottom <= containerRect.bottom) {
      return
    }

    ref.parentElement.scrollTo({
      behavior: 'smooth',
      top: ref.offsetTop - ref.parentElement.offsetTop - 24,
    })
  }, [])

  return (
    <div className="flex overflow-y-auto flex-col grow p-3 pt-4 no-scrollbar">
      {/* If hit we're currently navigating to is no longer part of the hits to render, just display the top with the loader. */}
      {navigatingFromHit && !hits.includes(navigatingFromHit) && (
        <HitView
          hit={navigatingFromHit}
          loading
          onClick={() => null}
          selected={false}
        />
      )}

      {sections.map((sectionIndex, i) => (
        <Fragment key={`${sectionIndex}_${i}`}>
          <div className="py-1 font-medium text-gray-400">
            {sectionNames[i]}
          </div>
          {(i === 0
            ? hits.slice(0, sectionIndex)
            : hits.slice(sections[i - 1], sectionIndex)
          ).map((hit: DaoHit, index: number) => {
            const selected =
              (i === 0 ? index : sections[i - 1] + index) === selection
            return (
              <HitView
                key={hit.id}
                hit={hit}
                loading={navigatingFromHit === hit}
                onClick={() => onChoice(hit)}
                ref={selected ? onSelectedHitRef : undefined}
                // Scroll into view when selected.
                selected={selected}
              />
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}

interface HitViewProps {
  hit: Hit
  selected: boolean
  onClick: () => void
  loading: boolean
}

const HitView = forwardRef<HTMLDivElement, HitViewProps>(function HitView(
  { hit, selected, onClick, loading },
  ref
) {
  const { t } = useTranslation()
  return (
    <div
      className={clsx(
        'flex flex-row gap-2 items-center py-2 px-1 font-medium text-tertiary hover:text-primary align-middle hover:bg-primary rounded-md cursor-pointer',
        selected && 'text-primary bg-primary'
      )}
      onClick={onClick}
      ref={ref}
    >
      {hit.hitType === HitType.Dao ? (
        hit.imageUrl ? (
          <div
            aria-label={t('info.daosLogo')}
            className="w-[24px] h-[24px] bg-center bg-cover rounded-full"
            role="img"
            style={{
              backgroundImage: `url(${hit.imageUrl})`,
            }}
          ></div>
        ) : (
          <Logo size={24} />
        )
      ) : (
        <div className="flex justify-center items-center w-[24px] h-[24px] text-lg">
          {hit.icon}
        </div>
      )}
      <div>{hit.name}</div>

      {loading && (
        <div className="flex flex-row grow justify-end items-center pr-2">
          <Loader fill={false} size={20} />
        </div>
      )}
    </div>
  )
})
