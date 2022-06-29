import { Logo } from '@/../../packages/ui'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connectHits } from 'react-instantsearch-dom'

interface DaoHit {
  id: string
  name: string
  description: string
  image_url: string | undefined
  proposal_count: number
  treasury_balance: string
  hit_type: 'dao'
}

interface ActionHit {
  id: string 
  name: string 
  hit_type: 'dapp_action' 
}

interface DaoActionHit {
  id: string  
  name: string 
  hit_type: 'dao_action'  
}

const DAPP_ACTIONS: ActionHit[] = [
  { id: 'create_dao',  name: 'Create a DAO', hit_type: 'dapp_action' },
  { id: 'navigate_dao', name: 'Go to DAO', hit_type: 'dapp_action' }
] 

const DAO_ACTIONS: DaoActionHit[] = [
  { id: 'new_proposal', name: 'Start a new proposal', hit_type: 'dao_action' },
  { id: 'add_token', name: 'Add token', hit_type: 'dao_action' },
  { id: 'copy_dao_address', name: 'Copy DAO address', hit_type: 'dao_action' },
  { id: 'goto_dao', name: 'Go to DAO page', hit_type: 'dao_action' } 
]

const HitView = ({ hit, selected }: { hit: DaoHit; selected: boolean }) => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <div
      className={clsx(
        'flex font-medium align-middle px-1 py-2 gap-2 cursor-pointer rounded-md hover:bg-primary text-tertiary hover:text-primary',
        selected && 'bg-primary text-primary'
      )}
      onClick={() => router.push(`/dao/${hit.id}`)}
    >
      {hit.image_url ? (
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
      )}
      {hit.name}
    </div>
  )
}

// Need to use `any` here as instantsearch does't export the required
// types.
const HitsInternal: FC<any> = ({ hits }) => {
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
      <div className="flex flex-col overflow-hidden overflow-y-auto grow px-4 py-2 justify-start">
        <div className="font-medium py-1 text-gray-400">DAOs</div>
        {hits.map((hit: DaoHit, index: number) => (
          <HitView key={hit.id} hit={hit} selected={index === selection} />
        ))}
      </div>
    </>
  )
}

export const SearchHits = connectHits(HitsInternal)
