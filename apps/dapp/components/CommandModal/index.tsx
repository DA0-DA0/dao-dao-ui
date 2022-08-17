// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import Fuse from 'fuse.js'
import { MeiliSearch } from 'meilisearch'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Modal } from '@dao-dao/ui'
import { SEARCH_API_KEY, SEARCH_INDEX, SEARCH_URL } from '@dao-dao/utils'

import { CommandBar } from './CommandBar'
import { CommandHits } from './CommandHits'

export interface CommandModalProps {
  onClose: () => void
}

export enum CommandStateType {
  Home,
  NavigateDao,
  DaoChosen,
}

type CommandState =
  | { type: CommandStateType.Home }
  | { type: CommandStateType.NavigateDao }
  | { type: CommandStateType.DaoChosen; id: string; name: string }

const SearchNavElem = ({ name }: { name: string }) => (
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
  navigatesOnSelect?: boolean
}

export interface DaoHit {
  id: string
  name: string
  description: string
  image_url: string | undefined
  proposal_count: number
  treasury_balance: string
  hitType: HitType.Dao
  navigatesOnSelect?: boolean
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
  navigatesOnSelect?: boolean
}

const APP_ACTIONS: ActionHit[] = [
  {
    icon: '➕',
    id: ActionHitId.CreateDao,
    name: 'Create a DAO',
    navigatesOnSelect: true,
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
    navigatesOnSelect: true,
  },
  {
    icon: '🗳',
    id: DaoActionHitId.NewProposal,
    name: 'Start a new proposal',
    navigatesOnSelect: true,
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
  // {
  //   icon: '💵',
  //   id: DaoActionHitId.Stake,
  //   name: 'Manage staking',
  //   navigatesOnSelect: true,
  // },
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
export const CommandModal = ({ onClose }: CommandModalProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [commandState, setCommandState] = useState<CommandState>({
    type: CommandStateType.Home,
  })
  const [input, setInput] = useState('')
  const [hits, setHits] = useState<Hit[]>([])
  const [navigatingFromHit, setNavigatingFromHit] = useState<Hit>()

  useEffect(() => {
    ;(async () => {
      const res = await index.search(input)
      const daoHits = res.hits.slice(0, MAX_DAOS_DISPLAYED).map((hit) => ({
        ...hit,
        hitType: HitType.Dao,
        navigatesOnSelect: commandState.type === CommandStateType.NavigateDao,
      })) as DaoHit[]

      const baseHits: Hit[] =
        commandState.type === CommandStateType.Home
          ? [...APP_ACTIONS, ...daoHits]
          : commandState.type === CommandStateType.DaoChosen
          ? DAO_ACTIONS
          : commandState.type === CommandStateType.NavigateDao
          ? daoHits
          : []

      // Display default options
      if (!input) {
        return setHits(baseHits)
      }

      // Else search
      const fuse = new Fuse(baseHits, FUSE_OPTIONS)
      setHits(fuse.search(input).map((o) => o.item))
    })()
  }, [input, commandState])

  const sectionData = useMemo(() => {
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
        return i !== 0 && hit.hitType !== sortedHits[i - 1].hitType
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

    return {
      sections,
      sectionNames,
    }
  }, [hits])

  const onChoice = useCallback(
    (hit: Hit) => {
      if (hit.navigatesOnSelect) {
        setNavigatingFromHit(hit)
      }

      // Global app actions do not depend on command context
      if (hit.hitType === HitType.AppAction) {
        if (hit.id === ActionHitId.CreateDao) {
          return router.push(`/dao/create`)
        } else if (hit.id === ActionHitId.NavigateDao) {
          setInput('')
          return setCommandState({ type: CommandStateType.NavigateDao })
        }
      }
      // DAO choice on Home and Chosen contexts are the same
      if (
        hit.hitType === HitType.Dao &&
        (commandState.type === CommandStateType.Home ||
          commandState.type === CommandStateType.DaoChosen)
      ) {
        setInput('') // Reset text
        return setCommandState({
          type: CommandStateType.DaoChosen,
          name: hit.name,
          id: hit.id,
        })
      }

      // Navigation to DAO
      if (commandState.type === CommandStateType.NavigateDao) {
        return router.push(`/dao/${hit.id}`)
      }

      // MARK: Take DAO specific actions here
      if (
        hit.hitType === HitType.DaoAction &&
        commandState.type === CommandStateType.DaoChosen
      ) {
        if (hit.id === DaoActionHitId.NewProposal)
          return router.push(`/dao/${commandState.id}/proposals/create`)
        else if (hit.id === DaoActionHitId.CopyDaoAddress) {
          navigator.clipboard.writeText(commandState.id)
          return toast.success('Copied DAO address to clipboard!')
        } else if (hit.id === DaoActionHitId.GotoDao) {
          return router.push(`/dao/${commandState.id}`)
        }
      }
    },
    [setInput, commandState, setCommandState, router]
  )

  // Go back to home when input is empty and backspace is pressed, unless
  // currently navigating as a result of choosing a hit, in which case we don't
  // want the user to get confused since the loader will disappear.
  const onEmptyBack = useCallback(() => {
    if (navigatingFromHit) {
      return
    }

    setCommandState({ type: CommandStateType.Home })
  }, [navigatingFromHit])

  return (
    <Modal
      containerClassName="p-0 w-full max-w-[550px] h-[450px] max-h-[90vh] border animate-fadein"
      hideCloseButton
      onClose={onClose}
    >
      {/* Modify Meili-search options here based on `commandState` */}
      <div className="flex overflow-hidden flex-col w-full h-full bg-primary rounded-lg">
        <div className="flex gap-1 px-4 pt-4 text-tertiary">
          <SearchNavElem name={t('commandBar.home')} />
          {commandState.type === CommandStateType.NavigateDao ? (
            <SearchNavElem name={t('commandBar.navigateDao')} />
          ) : commandState.type === CommandStateType.DaoChosen ? (
            <SearchNavElem name={commandState.name} />
          ) : undefined}
        </div>

        <CommandBar
          input={input}
          onEmptyBack={onEmptyBack}
          setInput={setInput}
        />

        {/* Because the command items take different actions in different contexts, they
            have to be handled here */}
        <CommandHits
          hits={hits}
          navigatingFromHit={navigatingFromHit}
          onChoice={onChoice}
          sectionData={sectionData}
        />
      </div>
    </Modal>
  )
}
