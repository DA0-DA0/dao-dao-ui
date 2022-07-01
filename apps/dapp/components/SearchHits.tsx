import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
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
            aria-label={t('daosLogo')}
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

// Need to use `any` here as instantsearch does't export the required
// types.
export const SearchHits: FC<any> = ({ hits, onChoice }) => {
  const router = useRouter()
  const [selection, setSelection] = useState(0)

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
    [hits, selection, router]
  )

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <>
      <div className="flex overflow-hidden overflow-y-auto flex-col grow justify-start py-2 px-4">
        <div className="py-1 font-medium text-gray-400">DAOs</div>
        {hits.map((hit: DaoHit, index: number) => (
          <HitView
            key={hit.id}
            hit={hit}
            onClick={() => onChoice(hit)}
            selected={index === selection}
          />
        ))}
      </div>
    </>
  )
}
