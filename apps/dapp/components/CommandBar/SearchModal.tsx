import Fuse from 'fuse.js'
import { MeiliSearch } from 'meilisearch'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Modal } from '@dao-dao/ui'
import { SEARCH_API_KEY, SEARCH_INDEX, SEARCH_URL } from '@dao-dao/utils'

import { SearchHits } from './SearchHits'

export interface SearchModalProps {
  onClose: () => void
}

type SearchState =
  | { type: 'home' }
  | { type: 'navigate_dao' }
  | { type: 'dao_chosen'; id: string; name: string }

const SearchNavElem: FC<{ name: string }> = ({ name }) => (
  <div
    className={'p-2 w-fit font-medium bg-secondary rounded-md animate-fadein'}
  >
    {name}
  </div>
)

export type Hit = DaoHit | ActionHit | DaoActionHit

export interface DaoHit {
  id: string
  name: string
  description: string
  image_url: string | undefined
  proposal_count: number
  treasury_balance: string
  hit_type: 'dao'
}

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
    icon: '➕',
    id: 'create_dao',
    name: 'Create a DAO',
    hit_type: 'dapp_action',
  },
  {
    icon: '🗺',
    id: 'navigate_dao',
    name: 'Navigate to DAO',
    hit_type: 'dapp_action',
  },
]

const DAO_ACTIONS: DaoActionHit[] = [
  {
    icon: '☘️',
    id: 'goto_dao',
    name: 'Go to DAO page',
    hit_type: 'dao_action',
  },
  {
    icon: '🗳',
    id: 'new_proposal',
    name: 'Start a new proposal',
    hit_type: 'dao_action',
  },
  {
    icon: '🏛',
    id: 'copy_dao_address',
    name: 'Copy DAO address',
    hit_type: 'dao_action',
  },
  // {
  //   icon: '👥',
  //   id: 'add_token',
  //   name: 'Add token to Keplr',
  //   hit_type: 'dao_action',
  // },
  // { icon: '💵', id: 'stake', name: 'Manage staking', hit_type: 'dao_action' },
]

const MAX_DAOS_DISPLAYED = 7
const FUSE_OPTIONS = {
  keys: ['id', 'name'],
}

const searchClient = new MeiliSearch({
  host: SEARCH_URL,
  apiKey: SEARCH_API_KEY,
})
const index = searchClient.index(SEARCH_INDEX)

type SearchBarProps = {
  currentRefinement: string
  refine: (s: string) => void
  onEmptyBack: () => void
}

const SearchBar: FC<SearchBarProps> = ({
  currentRefinement,
  refine,
  onEmptyBack,
}) => (
  <div className="flex items-center px-3 text-tertiary border-b border-default">
    <input
      autoFocus
      className="py-4 px-2 w-full bg-transparent focus:outline-none primary-text focus:ring-none" // Keep focus when clicking on hit
      onBlur={(ev) => ev.target.focus()}
      onChange={(event) => refine(event.currentTarget.value)}
      onKeyDown={(ev) => {
        if (ev.key == 'ArrowUp' || ev.key == 'ArrowDown')
          return ev.preventDefault()
        else if (currentRefinement == '' && ev.key == 'Backspace')
          return onEmptyBack()
      }}
      placeholder={useTranslation().t('commandBar.prompt')}
      type="text"
      value={currentRefinement}
    />
  </div>
)

// See design at https://unique-linseed-f29.notion.site/Command-Bar-Implementation-016afb79411f47d1b46c318409cc1547
export const SearchModal: FC<SearchModalProps> = ({ onClose }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [searchState, setSearchState] = useState<SearchState>({
    type: 'home',
  })
  const [currentRefinement, refine] = useState<string>('')
  const [hits, setHits] = useState<Hit[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await index.search(currentRefinement)
      const daoHits = res.hits
        .slice(0, MAX_DAOS_DISPLAYED)
        .map((hit) => ({ ...hit, hit_type: 'dao' })) as DaoHit[]

      // Display default options
      if (currentRefinement == '') {
        if (searchState.type == 'home') {
          setHits([...daoHits, ...DAPP_ACTIONS])
        } else if (searchState.type == 'dao_chosen') {
          setHits([...DAO_ACTIONS])
        } else if (searchState.type == 'navigate_dao') {
          setHits([...daoHits])
        }
        return
      }
      // Else search
      const fuse = new Fuse(
        searchState.type == 'dao_chosen'
          ? [...DAPP_ACTIONS, ...daoHits, ...DAO_ACTIONS]
          : [...DAPP_ACTIONS, ...daoHits],
        FUSE_OPTIONS
      )
      setHits(fuse.search(currentRefinement).map((o) => o.item))
    })()
  }, [currentRefinement, searchState])

  // Sort sections by order of first appearance of hits
  // ordered list of hit types
  const hitTypes = hits.reduce(
    (arr, hit) => (arr.includes(hit.hit_type) ? arr : [...arr, hit.hit_type]),
    [] as string[]
  )
  // Sorted hits based on hitTypes
  // Note that `sort` has a STABLE SORT invariant, so the order of elements are preserved
  const sortedHits = hits.sort(
    (a, b) => hitTypes.indexOf(a.hit_type) - hitTypes.indexOf(b.hit_type)
  )
  // Section index array based on contiguous elements, end exclusive
  const sections = [
    ...sortedHits.reduce((arr, hit, i) => {
      return i != 0 && hit.hit_type != sortedHits[i - 1].hit_type
        ? [...arr, i]
        : arr
    }, [] as number[]),
    sortedHits.length,
  ]
  // Map section names
  const sectionNames = hitTypes.map((t) =>
    t == 'dao'
      ? 'DAOs'
      : t == 'dapp_action'
      ? 'App Actions'
      : t == 'dao_action'
      ? 'DAO Actions'
      : ''
  )

  return (
    <Modal
      containerClassName={
        'p-0 w-full max-w-[550px] h-[450px] max-h-[90vh] border animate-fadein'
      }
      hideCloseButton
      onClose={onClose}
    >
      {/* Modify Meili-search options here based on `searchState` */}
      <div className="flex overflow-hidden flex-col w-full h-full bg-primary rounded-lg">
        <div className="flex gap-1 px-4 pt-4 text-tertiary">
          <SearchNavElem name={t('commandBar.home')} />
          {searchState.type == 'navigate_dao' ? (
            <SearchNavElem name={t('commandBar.navigateDao')} />
          ) : searchState.type == 'dao_chosen' ? (
            <SearchNavElem name={searchState.name} />
          ) : undefined}
        </div>

        <SearchBar
          currentRefinement={currentRefinement}
          onEmptyBack={() => setSearchState({ type: 'home' })}
          refine={refine}
        />

        {/* Because the search items take different actions in different contexts, they
            have to be handled here */}
        <SearchHits
          hits={hits}
          onChoice={(hit: Hit) => {
            // Global app actions do not depend on command context
            if (hit.hit_type == 'dapp_action') {
              if (hit.id == 'create_dao') return router.push(`/dao/create`)
              else if (hit.id == 'navigate_dao') {
                refine('')
                return setSearchState({ type: 'navigate_dao' })
              }
            }
            // DAO choice on Home and Chosen contexts are the same
            if (
              hit.hit_type == 'dao' &&
              (searchState.type == 'home' || searchState.type == 'dao_chosen')
            ) {
              refine('') // Reset text
              return setSearchState({
                type: 'dao_chosen',
                name: hit.name,
                id: hit.id,
              })
            }

            // Navigation to DAO
            if (searchState.type == 'navigate_dao') {
              return router.push(`/dao/${hit.id}`)
            }

            // MARK: Take DAO specific actions here
            if (
              hit.hit_type == 'dao_action' &&
              searchState.type == 'dao_chosen'
            ) {
              if (hit.id == 'new_proposal')
                return router.push(`/dao/${searchState.id}/proposals/create`)
              else if (hit.id == 'copy_dao_address') {
                navigator.clipboard.writeText(searchState.id)
                return toast.success('Copied DAO address to clipboard!')
              } else if (hit.id == 'goto_dao') {
                return router.push(`/dao/${searchState.id}`)
              }
            }
          }}
          sectionData={{ sections, sectionNames }}
        />
      </div>
    </Modal>
  )
}
