import clsx from 'clsx'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Loader, Logo } from '@dao-dao/ui'

import { DaoHit, Hit, HitType } from '.'

const HitView = ({
  hit,
  selected,
  onClick,
  loading,
}: {
  hit: Hit
  selected: boolean
  onClick: () => void
  loading: boolean
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={clsx(
        'flex flex-row gap-2 items-center py-2 px-1 font-medium text-tertiary hover:text-primary align-middle hover:bg-primary rounded-md cursor-pointer',
        selected && 'text-primary bg-primary'
      )}
      onClick={onClick}
    >
      {hit.hitType === HitType.Dao ? (
        hit.image_url ? (
          <div
            aria-label={t('info.daosLogo')}
            className="w-[24px] h-[24px] bg-center bg-cover rounded-full"
            role="img"
            style={{
              backgroundImage: `url(${hit.image_url})`,
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
}

type HitSectionData = {
  // end index of each section, exclusive
  sections: number[]
  sectionNames: string[]
}

// Need to use `any` here as instantsearch does't export the required
// types.
export const CommandHits = ({
  sectionData,
  hits,
  onChoice,
  navigatingFromHit,
}: {
  sectionData: HitSectionData
  hits: Hit[]
  onChoice: (hit: Hit) => void
  navigatingFromHit: Hit | undefined
}) => {
  const { sections, sectionNames } = sectionData
  const [selection, setSelection] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => setSelection(0), [hits, sectionData])

  const handleKeyPress = useCallback(
    (event) => {
      // Do nothing if no hits.
      if (hits.length === 0) {
        return
      }

      switch (event.key) {
        case 'ArrowUp':
          setSelection((selection) => Math.max(selection - 1, 0))
          break
        case 'ArrowDown':
          setSelection((selection) => Math.min(selection + 1, hits.length - 1))
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
  useEffect(() => {
    const item = listRef.current?.children[selection]
    if (!item) {
      return
    }

    // Only scroll if not already visible.
    const { left, right, top, bottom } = item.getBoundingClientRect()
    const containerRect = listRef.current.getBoundingClientRect()
    if (
      left >= containerRect.left &&
      right <= containerRect.right &&
      top >= containerRect.top &&
      bottom <= containerRect.bottom
    ) {
      return
    }

    item.scrollIntoView({
      behavior: 'smooth',
    })
  }, [selection])

  return (
    <div
      className="flex overflow-hidden overflow-y-auto flex-col grow justify-start py-2 px-4"
      ref={listRef}
    >
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
          ).map((hit: DaoHit, index: number) => (
            <HitView
              key={hit.id}
              hit={hit}
              loading={navigatingFromHit === hit}
              onClick={() => onChoice(hit)}
              selected={
                (i === 0 ? index : sections[i - 1] + index) === selection
              }
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
