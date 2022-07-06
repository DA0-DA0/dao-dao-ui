import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Logo } from '@dao-dao/ui'

import { DaoHit, Hit } from './SearchModal'

const HitView = ({
  hit,
  selected,
  onClick,
}: {
  hit: Hit
  selected: boolean
  onClick: () => void
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={clsx(
        'flex gap-2 items-center py-2 px-1 font-medium text-tertiary hover:text-primary align-middle hover:bg-primary rounded-md cursor-pointer',
        selected && 'text-primary bg-primary'
      )}
      onClick={onClick}
    >
      {hit.hit_type == 'dao' ? (
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
          <Logo alt={hit.name} height={24} width={24} />
        )
      ) : (
        <div className="flex justify-center items-center w-[24px] h-[24px] text-lg">
          {hit.icon}
        </div>
      )}
      <div>{hit.name}</div>
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
export const SearchHits = ({
  sectionData,
  hits,
  onChoice,
}: {
  sectionData: HitSectionData
  hits: Hit[]
  onChoice: (hit: Hit) => void
}) => {
  const router = useRouter()
  const { sections, sectionNames } = sectionData
  const [selection, setSelection] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => setSelection(0), [hits, sectionData])

  const handleKeyPress = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setSelection((selection) => Math.max(selection - 1, 0))
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'ArrowDown':
          setSelection((selection) => Math.min(selection + 1, hits.length - 1))
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'Enter':
          onChoice(hits[selection])
          break
      }
    },
    [hits, selection, router, onChoice]
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
      {sections.map((sectionIndex, i) => (
        <>
          <div className="py-1 font-medium text-gray-400">
            {sectionNames[i]}
          </div>
          {(i == 0
            ? hits.slice(0, sectionIndex)
            : hits.slice(sections[i - 1], sectionIndex)
          ).map((hit: DaoHit, index: number) => (
            <HitView
              key={hit.id}
              hit={hit}
              onClick={() => onChoice(hit)}
              selected={(i == 0 ? index : sections[i - 1] + index) == selection}
            />
          ))}
        </>
      ))}
    </div>
  )
}
