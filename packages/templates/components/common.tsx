import { ComponentType, FunctionComponent } from 'react'
import { FieldErrors } from 'react-hook-form'

import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { InputLabel, SuspenseLoaderProps } from '@dao-dao/ui'
import { Loader } from '@dao-dao/ui/components/Loader'
import { VotingModuleType } from '@dao-dao/utils'

export enum TemplateKey {
  Spend = 'spend',
  Mint = 'mint',
  Stake = 'stake',
  AddToken = 'addToken',
  RemoveToken = 'removeToken',
  Custom = 'custom',
}

// A component which will render a template's input form.
export type TemplateComponentProps<T = undefined> = {
  coreAddress: string
  getLabel: (field: string) => string
  onRemove?: () => void
  errors?: FieldErrors
  readOnly?: boolean
  SuspenseLoader: ComponentType<
    Omit<SuspenseLoaderProps, 'ErrorBoundaryComponent'>
  >
} & (T extends undefined ? {} : { options: T })

export type TemplateComponent<T = undefined> = FunctionComponent<
  TemplateComponentProps<T>
>

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
  // Get default for fields in form display.
  getDefaults: (props: GetDefaultsProps) => D
  // Hook to make function to convert template data to CosmosMsgFor_Empty.
  useTransformToCosmos: UseTransformToCosmos<D>
  // Hook to convert decoded msg data to fields in form display.
  // Should return undefined until a match can be confirmed or rejected.
  // If confirmed, data should be returned too.
  useDecodeCosmosMsg: UseDecodeCosmosMsg<D>
  // Voting module types that this template supports.
  votingModuleTypes: VotingModuleType[]
}

// The contextual information provided to templates when getting
// default values for the template data.
export interface GetDefaultsProps {
  walletAddress: string
}

// The props needed to render a template from a message.
export interface TemplateRendererComponentProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  message: { [key: string]: any }
  SuspenseLoader: ComponentType<
    Omit<SuspenseLoaderProps, 'ErrorBoundaryComponent'>
  >
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
        <pre className="overflow-auto p-2 rounded-lg border text-secondary border-secondary">
          {JSON.stringify(tokenInfo, null, 2)}
        </pre>
      </div>
    ) : null}
  </>
)

export const TemplateComponentLoader = () => (
  <div className="p-3 my-2 rounded-lg bg-primary">
    <Loader />
  </div>
)
