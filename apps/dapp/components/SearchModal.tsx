import Fuse from 'fuse.js'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Modal } from '@dao-dao/ui'
import { SEARCH_API_KEY, SEARCH_INDEX, SEARCH_URL } from '@dao-dao/utils'

import { SearchHits } from '@/components'
import { MeiliSearch } from 'meilisearch'
import { useTranslation } from 'react-i18next'

export interface SearchModalProps {
  onClose: () => void
}

type SearchState =
  | { type: 'home' }
  | { type: 'find_dao' }
  | { type: 'dao_chosen'; id: string; name: string }

const SearchNavElem: FC<{ name: string }> = ({ name }) => (
  <div className="p-2 w-fit font-medium bg-secondary rounded-md">{name}</div>
)

export interface ActionHit {
  icon: string
  id: string
  name: string
  hit_type: 'dapp_action'
}

export interface DaoActionHit {
  icon: string
  id: string
  name: string
  hit_type: 'dao_action'
}

const DAPP_ACTIONS: ActionHit[] = [
  {
    icon: '+',
    id: 'create_dao',
    name: 'Create a DAO',
    hit_type: 'dapp_action',
  },
  { icon: '🗺', id: 'navigate_dao', name: 'Go to DAO', hit_type: 'dapp_action' },
]

const DAO_ACTIONS: DaoActionHit[] = [
  {
    icon: '🗳',
    id: 'new_proposal',
    name: 'Start a new proposal',
    hit_type: 'dao_action',
  },
  {
    icon: '👥',
    id: 'add_token',
    name: 'Add token to Keplr',
    hit_type: 'dao_action',
  },
  { icon: '💵', id: 'stake', name: 'Open staking', hit_type: 'dao_action' },
  {
    icon: '🏛',
    id: 'copy_dao_address',
    name: 'Copy DAO address',
    hit_type: 'dao_action',
  },
  {
    icon: '☘️',
    id: 'goto_dao',
    name: 'Go to DAO page',
    hit_type: 'dao_action',
  },
]

const fuseOptions = {
  keys: ['id', 'name'],
}
const searchClient = new MeiliSearch({
  host: SEARCH_URL,
  apiKey: SEARCH_API_KEY,
})
const index = searchClient.index(SEARCH_INDEX)

export const SearchModal: FC<SearchModalProps> = ({ onClose }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [searchState, setSearchState] = useState<SearchState>({
    type: 'home',
  })
  const [currentRefinement, refine] = useState<string>('')

  const [hits, setHits] = useState<any[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await index.search(currentRefinement)
      const daoHits = res.hits
        .slice(0, 5)
        .map((hit) => ({ ...hit, hit_type: 'dao' }))
      const fuse = new Fuse(
        [...DAPP_ACTIONS, ...DAO_ACTIONS, ...daoHits],
        fuseOptions
      )
      setHits(fuse.search(currentRefinement))
    })()
  }, [currentRefinement])

  return (
    <Modal
      containerClassName="p-0 border w-full max-w-[750px] h-[450px] max-h-[90vh]"
      hideCloseButton
      onClose={onClose}
    >
      {/* Modify Meili-search options here based on `searchState` */}
      <div className="flex overflow-hidden flex-col w-full h-full bg-primary rounded-lg">
        <div className="flex gap-1 px-4 pt-4 text-tertiary">
          <SearchNavElem name="Home" />
          {searchState.type == 'find_dao' ? (
            <SearchNavElem name="Go to DAO" />
          ) : searchState.type == 'dao_chosen' ? (
            <SearchNavElem name={searchState.name} />
          ) : undefined}
        </div>

        {/* You need to modify the architecture of the box and hits here... */}
        <div className="flex items-center px-3 text-tertiary border-b border-default">
          <input
            autoFocus
            className="py-4 px-2 w-full bg-transparent focus:outline-none primary-text focus:ring-none"
            onChange={(event) => refine(event.currentTarget.value)}
            placeholder={t('What are you looking for?')}
            type="text"
            value={currentRefinement}
          />
        </div>

        <SearchHits
          hits={hits}
          onEnter={(hit) =>
            setSearchState({ type: 'dao_chosen', name: hit.name, id: hit.id })
          }
        />
      </div>
    </Modal>
  )
}
