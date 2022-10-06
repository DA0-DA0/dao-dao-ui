// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { useSearchDaos } from '@dao-dao/state'
import {
  ActionHit,
  ActionHitId,
  CommandModalDaoInfo,
  CommandModalProps,
  CommandState,
  CommandStateType,
  DaoActionHit,
  DaoActionHitId,
  DaoHit,
  Hit,
  HitType,
} from '@dao-dao/tstypes/ui/CommandModal'
import { CommandModal as StatelessCommandModal } from '@dao-dao/ui'
import { getFallbackImage } from '@dao-dao/utils'

const MAX_DAOS_DISPLAYED = 7

export const CommandModal = ({
  onClose,
}: Pick<CommandModalProps, 'onClose'>) => {
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const [navigatingFromHit, setNavigatingFromHit] = useState<Hit>()
  const [commandState, setCommandState] = useState<CommandState>({
    type: CommandStateType.Home,
  })

  const queryResults = useSearchDaos({
    query: filter,
  })
  const queriedDaos =
    queryResults.data?.daos.nodes ?? queryResults.previousData?.daos.nodes

  const baseHits = useMemo(() => {
    if (!queriedDaos) {
      return undefined
    }

    const filteredDaos = queriedDaos.map(
      ({ coreAddress, name, imageUrl }): CommandModalDaoInfo => ({
        coreAddress,
        name,
        imageUrl: imageUrl || getFallbackImage(coreAddress),
      })
    )

    const daoHits = filteredDaos
      ?.slice(0, MAX_DAOS_DISPLAYED)
      .map(({ coreAddress, name, imageUrl }) => ({
        id: coreAddress,
        name,
        imageUrl,
        hitType: HitType.Daos,
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

    return baseHits
  }, [commandState.type, queriedDaos])

  const onChoice = useCallback(
    (hit: Hit) => {
      if (hit.navigatesOnSelect) {
        setNavigatingFromHit(hit)
      }

      // Global app actions do not depend on command context
      if (hit.hitType === HitType.AppActions) {
        if (hit.id === ActionHitId.CreateDao) {
          return router.push(`/dao/create`)
        } else if (hit.id === ActionHitId.NavigateDao) {
          setFilter('')
          return setCommandState({ type: CommandStateType.NavigateDao })
        }
      }
      // DAO choice on Home and Chosen contexts are the same
      if (
        hit.hitType === HitType.Daos &&
        (commandState.type === CommandStateType.Home ||
          commandState.type === CommandStateType.DaoChosen)
      ) {
        setFilter('') // Reset text
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
        hit.hitType === HitType.DaoActions &&
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
    [setFilter, commandState, setCommandState, router]
  )

  return (
    <StatelessCommandModal
      baseHits={baseHits}
      commandState={commandState}
      filter={filter}
      navigatingFromHit={navigatingFromHit}
      onChoice={onChoice}
      onClose={onClose}
      setCommandState={setCommandState}
      setFilter={setFilter}
    />
  )
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
  hitType: HitType.AppActions,
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
  hitType: HitType.DaoActions,
}))
