import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
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

interface HitCardProps {
  hit: Hit
  selected: boolean
  loading: boolean
}

const HitCard = ({ hit, selected, loading }: HitCardProps) => (
  <ContractCard
    balance={hit.treasury_balance}
    description={hit.description}
    href={`/dao/${hit.id}`}
    imgUrl={hit.image_url}
    loading={loading}
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
  const [loadingId, setLoadingId] = useState<string>()
  const listRef = useRef<HTMLDivElement>(null)

  const handleKeyPress = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault()
          setSelection((selection) =>
            selection - 1 < 0 ? hits.length - 1 : selection - 1
          )
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault()
          setSelection((selection) => (selection + 1) % hits.length)
          router.prefetch(`/dao/${hits[selection].id}`)
          break
        case 'Enter':
          event.preventDefault()
          if (selection >= 0) {
            router.push(`/dao/${hits[selection].id}`)
            setLoadingId(hits[selection].id)
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
      className="flex overflow-y-auto flex-col grow gap-4 p-4 md:overflow-x-auto md:flex-row md:justify-start styled-scrollbar md:overflow-y-none"
      ref={listRef}
    >
      {hits.map((hit: Hit, index: number) => (
        <HitCard
          key={hit.id}
          hit={hit}
          loading={hit.id === loadingId}
          selected={index === selection}
        />
      ))}
    </div>
  )
}

export const SearchHits = connectHits(HitsInternal)
