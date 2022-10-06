// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import clsx from 'clsx'
import { Fragment, forwardRef, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader } from '@dao-dao/ui'

import { DaoHit, Hit, HitType } from './CommandModal'

interface HitSectionData {
  // End index of each section, exclusive. For example, if the first section has
  // 3 items in it, sectionEndIndexes[0] === 3.
  sectionEndIndexes: number[]
  sectionNames: string[]
}

export interface CommandHitsProps {
  sectionData: HitSectionData
  hits: Hit[]
  onChoice: (hit: Hit) => void
  navigatingFromHit: Hit | undefined
}

export const CommandHits = ({
  sectionData,
  hits,
  onChoice,
  navigatingFromHit,
}: CommandHitsProps) => {
  const { sectionEndIndexes, sectionNames } = sectionData
  const [selection, setSelection] = useState(0)

  // Reset selection to first row if data changes.
  useEffect(() => setSelection(0), [hits, sectionData])

  // Navigate on keypress.
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
  // Add keypress listener.
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    // Clean up
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
    <div className="flex overflow-y-auto flex-col grow gap-1 p-3 pt-4 no-scrollbar">
      {/* If hit we're currently navigating to is no longer part of the hits to render, just display at the top with a loader. */}
      {navigatingFromHit && !hits.includes(navigatingFromHit) && (
        <HitView
          hit={navigatingFromHit}
          loading
          onClick={() => null}
          selected={false}
        />
      )}

      {sectionEndIndexes.map((sectionEndIndex, sectionIndex) => {
        // Section starts at end index of last section, or 0 if this is first.
        const sectionStartIndex =
          sectionIndex === 0 ? 0 : sectionEndIndexes[sectionIndex - 1]

        return (
          <Fragment key={sectionIndex}>
            <div className="py-1 pl-3 text-text-tertiary link-text">
              {sectionNames[sectionIndex]}
            </div>

            {hits
              .slice(sectionStartIndex, sectionEndIndex)
              .map((hit: DaoHit, hitIndex: number) => {
                const selected = sectionStartIndex + hitIndex === selection
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
        )
      })}
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
        'group flex flex-row gap-2 items-center p-3 bg-transparent hover:bg-background-interactive-hover rounded-md transition cursor-pointer',
        selected && 'bg-background-interactive-hover'
      )}
      onClick={onClick}
      ref={ref}
    >
      {hit.hitType === HitType.Dao ? (
        <div
          aria-label={t('info.daosLogo')}
          className="w-[24px] h-[24px] bg-center bg-cover rounded-full"
          role="img"
          style={{
            backgroundImage: `url(${hit.imageUrl})`,
          }}
        ></div>
      ) : (
        <div className="flex justify-center items-center w-[24px] h-[24px] text-lg">
          {hit.icon}
        </div>
      )}

      <p className="font-medium body-text">{hit.name}</p>

      {loading && (
        <div className="flex flex-row grow justify-end items-center">
          <Loader fill={false} size={20} />
        </div>
      )}
    </div>
  )
})
