import { Dispatch, SetStateAction } from 'react'

import { ModalProps } from './Modal'

export interface CommandModalDaoInfo {
  coreAddress: string
  name: string
  imageUrl?: string | undefined | null
}

export interface CommandModalProps extends Pick<ModalProps, 'onClose'> {
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  onChoice: (hit: Hit) => void
  navigatingFromHit: Hit | undefined
  commandState: CommandState
  setCommandState: Dispatch<SetStateAction<CommandState>>
  baseHits?: Hit[]
}

export enum CommandStateType {
  Home,
  NavigateDao,
  DaoChosen,
}

export type CommandState =
  | { type: CommandStateType.Home }
  | { type: CommandStateType.NavigateDao }
  | {
      type: CommandStateType.DaoChosen
      id: string
      imageUrl?: string
      name: string
    }

export enum HitType {
  AppActions = 'appActions',
  Daos = 'daos',
  DaoActions = 'daoActions',
}

export enum ActionHitId {
  CreateDao,
  NavigateDao,
}

export enum DaoActionHitId {
  GotoDao,
  NewProposal,
  CopyDaoAddress,
}

export interface ActionHit {
  icon: string
  id: ActionHitId
  name: string
  hitType: HitType.AppActions
  navigatesOnSelect?: boolean
}

export interface DaoHit {
  id: string
  name: string
  imageUrl: string
  hitType: HitType.Daos
  navigatesOnSelect?: boolean
}

export interface DaoActionHit {
  icon: string
  id: DaoActionHitId
  name: string
  hitType: HitType.DaoActions
  navigatesOnSelect?: boolean
}

export type Hit = ActionHit | DaoHit | DaoActionHit

export interface HitSectionData {
  // End index of each section, exclusive. For example, if the first section has
  // 3 items in it, sectionEndIndexes[0] === 3.
  sectionEndIndexes: number[]
  sectionNames: string[]
}
