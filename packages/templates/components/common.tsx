import { XIcon } from '@heroicons/react/outline'
import { FC, FunctionComponent, ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'

import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { InputLabel } from '@dao-dao/ui'
import { Loader } from '@dao-dao/ui/components/Loader'
import { VotingModuleType } from '@dao-dao/utils'

export enum TemplateKey {
  Spend = 'spend',
  Mint = 'mint',
  Stake = 'stake',
  AddToken = 'addToken',
  RemoveToken = 'removeToken',
  UpdateInfo = 'updateInfo',
  UpdateProposalConfig = 'updateProposalConfig',
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
  getLabel: (field: string) => string
  onRemove?: () => void
  errors?: FieldErrors
  readOnly?: boolean
} & (T extends undefined ? {} : { options: T })

export type TemplateComponent<T = undefined> = FunctionComponent<
  TemplateComponentProps<T>
>

export type UseDefaults<D extends {} = any> = (coreAddress: string) => D

export type UseTransformToCosmos<D extends {} = any> = (
  coreAddress: string
) => (data: D) => CosmosMsgFor_Empty

export interface DecodeCosmosMsgNoMatch {
  match: false
  data?: never
}
export interface DecodeCosmosMsgMatch<D extends {} = any> {
  match: true
  data: D
}
export type UseDecodeCosmosMsg<D extends {} = any> = (
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
  // Hook to convert decoded msg data to fields in form display.
  // Should return undefined until a match can be confirmed or rejected.
  // If confirmed, data should be returned too.
  useDecodeCosmosMsg: UseDecodeCosmosMsg<D>
  // Voting module types that this template supports.
  votingModuleTypes: VotingModuleType[]
}

// The props needed to render a template from a message.
export interface TemplateRendererProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  message: { [key: string]: any }
}

export interface TokenInfoDisplayProps {
  loadingTokenInfo?: boolean
  tokenInfo?: TokenInfoResponse
}

export const TokenInfoDisplay: FunctionComponent<TokenInfoDisplayProps> = ({
  loadingTokenInfo,
  tokenInfo,
}) => (
  <>
    {loadingTokenInfo ? (
      <Loader />
    ) : tokenInfo ? (
      <div className="space-y-2">
        <InputLabel name="Token info" />
        <pre className="overflow-auto p-2 text-secondary rounded-lg border border-secondary">
          {JSON.stringify(tokenInfo, null, 2)}
        </pre>
      </div>
    ) : null}
  </>
)

export const TemplateComponentLoader = () => (
  <div className="p-3 my-2 bg-primary rounded-lg">
    <Loader />
  </div>
)

interface TemplateCardProps extends Pick<TemplateComponentProps, 'onRemove'> {
  emoji: ReactNode
  title: string
}

export const TemplateCard: FC<TemplateCardProps> = ({
  emoji,
  title,
  onRemove,
  children,
}) => (
  <div className="flex flex-col gap-2 p-3 my-2 bg-primary rounded-lg">
    <div className="flex flex-row gap-2 justify-between items-start">
      <div className="flex flex-row gap-2 items-center">
        <h2 className="text-3xl">{emoji}</h2>
        <h2>{title}</h2>
      </div>

      {onRemove && (
        <button onClick={onRemove} type="button">
          <XIcon className="h-4" />
        </button>
      )}
    </div>

    {children}
  </div>
)
