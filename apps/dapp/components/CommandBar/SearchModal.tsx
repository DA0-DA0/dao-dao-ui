import Fuse from 'fuse.js'
import { MeiliSearch } from 'meilisearch'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Modal } from '@dao-dao/ui'
import { SEARCH_API_KEY, SEARCH_INDEX, SEARCH_URL } from '@dao-dao/utils'

import { SearchBar } from './SearchBar'
import { SearchHits } from './SearchHits'

export interface SearchModalProps {
  onClose: () => void
}

export enum SearchStateType {
  Home,
  NavigateDao,
  DaoChosen,
}

type SearchState =
  | { type: SearchStateType.Home }
  | { type: SearchStateType.NavigateDao }
  | { type: SearchStateType.DaoChosen; id: string; name: string }

const SearchNavElem: FC<{ name: string }> = ({ name }) => (
  <div
    className={'p-2 w-fit font-medium bg-secondary rounded-md animate-fadein'}
  >
    {name}
  </div>
)

export type Hit = DaoHit | ActionHit | DaoActionHit

export enum HitType {
  AppAction,
  Dao,
  DaoAction,
}

enum ActionHitId {
  CreateDao,
  NavigateDao,
}

export interface ActionHit {
  icon: string
  id: ActionHitId
  name: string
  hitType: HitType.AppAction
}

export interface DaoHit {
  id: string
  name: string
  description: string
  image_url: string | undefined
  proposal_count: number
  treasury_balance: string
  hitType: HitType.Dao
}

enum DaoActionHitId {
  GotoDao,
  NewProposal,
  CopyDaoAddress,
}

export interface DaoActionHit {
  icon: string
  id: DaoActionHitId
  name: string
  hitType: HitType.DaoAction
}

const APP_ACTIONS: ActionHit[] = [
  {
    icon: '➕',
    id: ActionHitId.CreateDao,
    name: 'Create a DAO',
  },
  {
    icon: '🗺',
    id: ActionHitId.NavigateDao,
    name: 'Navigate to DAO',
  },
].map((data) => ({
  ...data,
  hitType: HitType.AppAction,
}))

const DAO_ACTIONS: DaoActionHit[] = [
  {
    icon: '☘️',
    id: DaoActionHitId.GotoDao,
    name: 'Go to DAO page',
  },
  {
    icon: '🗳',
    id: DaoActionHitId.NewProposal,
    name: 'Start a new proposal',
  },
  {
    icon: '🏛',
    id: DaoActionHitId.CopyDaoAddress,
    name: 'Copy DAO address',
  },
  // MARK: Add more DAO actions here
  // {
  //   icon: '👥',
  //   id: DaoActionHitId.AddToken,
  //   name: 'Add token to Keplr',
  // },
  // { icon: '💵', id: DaoActionHitId.Stake, name: 'Manage staking' },
].map((data) => ({
  ...data,
  hitType: HitType.DaoAction,
}))

const MAX_DAOS_DISPLAYED = 7

const FUSE_OPTIONS = {
  keys: ['id', 'name'],
}

const searchClient = new MeiliSearch({
  host: SEARCH_URL,
  apiKey: SEARCH_API_KEY,
})

const index = searchClient.index(SEARCH_INDEX)

// See design at https://unique-linseed-f29.notion.site/Command-Bar-Implementation-016afb79411f47d1b46c318409cc1547
export const SearchModal: FC<SearchModalProps> = ({ onClose }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [searchState, setSearchState] = useState<SearchState>({
    type: SearchStateType.Home,
  })
  const [currentRefinement, refine] = useState<string>('')
  const [hits, setHits] = useState<Hit[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await index.search(currentRefinement)
      const daoHits = res.hits
        .slice(0, MAX_DAOS_DISPLAYED)
        .map((hit) => ({ ...hit, hitType: HitType.Dao })) as DaoHit[]

      // Display default options
      if (!currentRefinement) {
        if (searchState.type === SearchStateType.Home) {
          setHits([...daoHits, ...APP_ACTIONS])
        } else if (searchState.type === SearchStateType.DaoChosen) {
          setHits([...DAO_ACTIONS])
        } else if (searchState.type === SearchStateType.NavigateDao) {
          setHits([...daoHits])
        }
        return
      }
      // Else search
      const fuse = new Fuse(
        searchState.type === SearchStateType.DaoChosen
          ? [...APP_ACTIONS, ...daoHits, ...DAO_ACTIONS]
          : [...APP_ACTIONS, ...daoHits],
        FUSE_OPTIONS
      )
      setHits(fuse.search(currentRefinement).map((o) => o.item))
    })()
  }, [currentRefinement, searchState])

  const [sections, sectionNames] = useMemo(() => {
    // Sort sections by order of first appearance of hits
    // ordered list of hit types
    const hitTypes = hits.reduce(
      (arr, hit) => (arr.includes(hit.hitType) ? arr : [...arr, hit.hitType]),
      [] as HitType[]
    )
    // Sorted hits based on hitTypes
    // Note that `sort` has a STABLE SORT invariant, so the order of elements are preserved
    const sortedHits = hits.sort(
      (a, b) => hitTypes.indexOf(a.hitType) - hitTypes.indexOf(b.hitType)
    )
    // Section index array based on contiguous elements, end exclusive
    const sections = [
      ...sortedHits.reduce((arr, hit, i) => {
        return i != 0 && hit.hitType != sortedHits[i - 1].hitType
          ? [...arr, i]
          : arr
      }, [] as number[]),
      sortedHits.length,
    ]
    // Map section names
    const sectionNames = hitTypes.map((t) =>
      t === HitType.Dao
        ? 'DAOs'
        : t === HitType.AppAction
        ? 'App Actions'
        : t === HitType.DaoAction
        ? 'DAO Actions'
        : ''
    )

    return [sections, sectionNames]
  }, [hits])

  const onChoice = useCallback(
    (hit: Hit) => {
      // Global app actions do not depend on command context
      if (hit.hitType === HitType.AppAction) {
        if (hit.id === ActionHitId.CreateDao) return router.push(`/dao/create`)
        else if (hit.id === ActionHitId.NavigateDao) {
          refine('')
          return setSearchState({ type: SearchStateType.NavigateDao })
        }
      }
      // DAO choice on Home and Chosen contexts are the same
      if (
        hit.hitType === HitType.Dao &&
        (searchState.type === SearchStateType.Home ||
          searchState.type === SearchStateType.DaoChosen)
      ) {
        refine('') // Reset text
        return setSearchState({
          type: SearchStateType.DaoChosen,
          name: hit.name,
          id: hit.id,
        })
      }

      // Navigation to DAO
      if (searchState.type === SearchStateType.NavigateDao) {
        return router.push(`/dao/${hit.id}`)
      }

      // MARK: Take DAO specific actions here
      if (
        hit.hitType === HitType.DaoAction &&
        searchState.type === SearchStateType.DaoChosen
      ) {
        if (hit.id === DaoActionHitId.NewProposal)
          return router.push(`/dao/${searchState.id}/proposals/create`)
        else if (hit.id === DaoActionHitId.CopyDaoAddress) {
          navigator.clipboard.writeText(searchState.id)
          return toast.success('Copied DAO address to clipboard!')
        } else if (hit.id === DaoActionHitId.GotoDao) {
          return router.push(`/dao/${searchState.id}`)
        }
      }
    },
    [refine, searchState, setSearchState, router]
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
          {searchState.type === SearchStateType.NavigateDao ? (
            <SearchNavElem name={t('commandBar.navigateDao')} />
          ) : searchState.type === SearchStateType.DaoChosen ? (
            <SearchNavElem name={searchState.name} />
          ) : undefined}
        </div>

        <SearchBar
          currentRefinement={currentRefinement}
          onEmptyBack={() => setSearchState({ type: SearchStateType.Home })}
          refine={refine}
        />

        {/* Because the search items take different actions in different contexts, they
            have to be handled here */}
        <SearchHits
          hits={hits}
          onChoice={onChoice}
          sectionData={{ sections, sectionNames }}
        />
      </div>
    </Modal>
  )
}
