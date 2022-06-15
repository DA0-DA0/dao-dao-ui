import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { connectHits } from 'react-instantsearch-dom'

import { ContractCard } from './ContractCard'

interface Hit {
  id: string
  name: string
  description: string
  image_url: string | undefined
  proposal_count: number
  treasury_balance: string
}

const Hit = ({ hit, selected }: { hit: Hit; selected: boolean }) => (
  <ContractCard
    balance={hit.treasury_balance}
    description={hit.description}
    href={`/dao/${hit.id}`}
    imgUrl={hit.image_url}
    name={hit.name}
    proposals={hit.proposal_count}
    selected={selected}
  />
)

// Need to use `any` here as instantsearch does't export the required
// types.
const HitsInternal: FC<any> = ({ hits }) => {
  const router = useRouter()
  const [selection, setSelection] = useState(0)

  const handleKeyPress = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          setSelection((selection) => selection - 1)
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'ArrowRight':
          setSelection((selection) => selection + 1)
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'ArrowUp':
          setSelection((selection) => selection - 3)
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'ArrowDown':
          setSelection((selection) => selection + 3)
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'Enter':
          if (selection >= 0) {
            router.push(`/dao/${hits[selection].id}`)
          }
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
      <div
        className={clsx(
          'flex flex-wrap gap-4 justify-center md:justify-start',
          hits.length && 'mt-4'
        )}
      >
        {hits.map((hit: Hit, index: number) => (
          <Hit key={hit.id} hit={hit} selected={index === selection} />
        ))}
      </div>
    </>
  )
}
export const SearchHits = connectHits(HitsInternal)
