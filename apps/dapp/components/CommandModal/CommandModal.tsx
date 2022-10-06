// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { Close } from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useSearchDaos } from '@dao-dao/state'
import { IconButton, Modal, ModalProps, SearchBar } from '@dao-dao/ui'
import { getFallbackImage } from '@dao-dao/utils'

import { CommandHits } from './CommandHits'

export type CommandModalProps = Pick<ModalProps, 'onClose'>

export enum CommandStateType {
  Home,
  NavigateDao,
  DaoChosen,
}

type CommandState =
  | { type: CommandStateType.Home }
  | { type: CommandStateType.NavigateDao }
  | {
      type: CommandStateType.DaoChosen
      id: string
      imageUrl?: string
      name: string
    }

const SearchNavElem = ({
  imageUrl,
  name,
  onClose,
}: {
  imageUrl?: string
  name: string
  onClose?: () => void
}) => (
  <div
    className={clsx(
      'flex flex-row gap-1.5 items-center p-1 bg-component-badge-primary rounded-full animate-fadein',
      !imageUrl && 'pl-2',
      !onClose && 'pr-2'
    )}
  >
    {imageUrl && (
      <div
        className="overflow-hidden shrink-0 w-6 h-6 bg-center bg-cover rounded-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    )}

    <p className="shrink-0 text-text-primary link-text">{name}</p>

    {onClose && (
      <IconButton Icon={Close} onClick={onClose} size="sm" variant="none" />
    )}
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
  imageUrl: string
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

export interface HitSectionData {
  // End index of each section, exclusive. For example, if the first section has
  // 3 items in it, sectionEndIndexes[0] === 3.
  sectionEndIndexes: number[]
  sectionNames: string[]
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

  const queryResults = useSearchDaos({
    query: input,
  })

  useEffect(() => {
    ;(async () => {
      const data = queryResults.data?.daos || queryResults.previousData?.daos
      if (!data) {
        return
      }

      console.log(data)

      const daoHits = data.nodes
        .slice(0, MAX_DAOS_DISPLAYED)
        .map(({ id, name, imageUrl }) => ({
          id,
          name,
          imageUrl: imageUrl || getFallbackImage(id),
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
  }, [
    input,
    commandState,
    queryResults.data?.daos,
    queryResults.previousData?.daos,
  ])

  const sectionData: HitSectionData = useMemo(() => {
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
    const sectionEndIndexes = [
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
      sectionEndIndexes,
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
          imageUrl: hit.imageUrl,
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
      headerContainerClassName="!m-0 px-4 py-6"
      headerContent={
        <div className="flex flex-row gap-4 items-stretch h-8">
          {commandState.type === CommandStateType.NavigateDao ? (
            <SearchNavElem
              name={t('commandBar.navigateDao')}
              onClose={onEmptyBack}
            />
          ) : commandState.type === CommandStateType.DaoChosen ? (
            <SearchNavElem
              imageUrl={commandState.imageUrl}
              name={commandState.name}
              onClose={onEmptyBack}
            />
          ) : undefined}

          <SearchBar
            className="leading-8 text-text-body !primary-text"
            containerClassName="grow"
            ghost
            hideIcon
            onBlur={(ev) => ev.target.focus()}
            onChange={(event) => setInput(event.currentTarget.value)}
            onKeyDown={(ev) => {
              if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
                return ev.preventDefault()
              } else if (ev.key === 'Backspace' && !input.length) {
                return onEmptyBack()
              }
            }}
            placeholder={t('commandBar.prompt')}
            value={input}
          />
        </div>
      }
      hideCloseButton
      onClose={onClose}
    >
      <CommandHits
        hits={hits}
        navigatingFromHit={navigatingFromHit}
        onChoice={onChoice}
        sectionData={sectionData}
      />
    </Modal>
  )
}
