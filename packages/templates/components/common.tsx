import { FunctionComponent } from 'react'
import { FieldErrors } from 'react-hook-form'

import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { VotingModuleType } from '@dao-dao/utils'

export enum TemplateKey {
  Spend = 'spend',
  Mint = 'mint',
  Stake = 'stake',
  AddToken = 'addToken',
  RemoveToken = 'removeToken',
  UpdateInfo = 'updateInfo',
  UpdateProposalConfig = 'updateProposalConfig',
  Instantiate = 'instantiate',
  Execute = 'execute',
  Custom = 'custom',
}

export interface TemplateKeyAndData {
  key: TemplateKey
  data: any
}

export interface FormProposalData {
  title: string
  description: string
  templateData: TemplateKeyAndData[]
}

// A component which will render a template's input form.
export type TemplateComponentProps<T = undefined> = {
  coreAddress: string
  proposalId?: number
  getLabel: (field: string) => string
  onRemove?: () => void
  errors?: FieldErrors
  readOnly?: boolean
  allTemplatesWithData: TemplateKeyAndData[]
  index: number
} & (T extends undefined ? {} : { options: T })

export type TemplateComponent<T = undefined> = FunctionComponent<
  TemplateComponentProps<T>
>

export type UseDefaults<D extends {} = any> = (coreAddress: string) => D

export type UseTransformToCosmos<D extends {} = any> = (
  coreAddress: string
) => (data: D) => CosmosMsgFor_Empty | undefined

export interface DecodeCosmosMsgNoMatch {
  match: false
  data?: never
}
export interface DecodeCosmosMsgMatch<D extends {} = any> {
  match: true
  data: D
}
export type UseDecodedCosmosMsg<D extends {} = any> = (
  msg: Record<string, any>,
  coreAddress: string
) => DecodeCosmosMsgNoMatch | DecodeCosmosMsgMatch<D>

// Defines a new template.
export interface Template<O extends {} = any, D extends {} = any> {
  key: TemplateKey
  label: string
  description: string
  Component: TemplateComponent<O>
  // Hook to get default fields for form display.
  useDefaults: UseDefaults<D>
  // Hook to make function to convert template data to CosmosMsgFor_Empty.
  useTransformToCosmos: UseTransformToCosmos<D>
  // Hook to make function to convert decoded msg to form display fields.
  useDecodedCosmosMsg: UseDecodedCosmosMsg<D>
  // Voting module types that this template supports.
  votingModuleTypes: VotingModuleType[]
}
