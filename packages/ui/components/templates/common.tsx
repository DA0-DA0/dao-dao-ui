import { FunctionComponent } from 'react'

import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { FieldErrors } from 'react-hook-form'

import { InputLabel } from '../input'
import { Loader } from '../Loader'

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
  getLabel: (field: string) => string
  onRemove?: () => void
  errors?: FieldErrors
  readOnly?: boolean
} & (T extends undefined ? {} : { options: T })

export type TemplateComponent<T = undefined> = FunctionComponent<
  TemplateComponentProps<T>
>

// Defines a new template.
export interface Template<O extends {} = any, D extends {} = any> {
  key: TemplateKey
  label: string
  description: string
  Component: TemplateComponent<O>
  // Get default for fields in form display.
  getDefaults: (props: GetDefaultsProps) => D
  // Convert template data to CosmosMsgFor_Empty.
  toCosmosMsg: (data: D, props: ToCosmosMsgProps) => CosmosMsgFor_Empty
  // Convert decoded msg data to fields in form display.
  fromCosmosMsg: (msg: Record<string, any>, props: FromCosmosMsgProps) => D
}

// The contextual information provided to templates when getting
// default values for the template data.
export interface GetDefaultsProps {
  walletAddress: string
}

// The contextual information provided to templates when transforming
// from form inputs to cosmos messages.
export interface ToCosmosMsgProps {
  daoAddress: string
  govTokenAddress: string
  govTokenDecimals: number
}

// The contextual information provided to templates when transforming
// from cosmos messages to values.
export interface FromCosmosMsgProps {
  govTokenDecimals: number
}

// The props needed to render a template from a message.
export interface TemplateRendererComponentProps {
  message: { [key: string]: any }
}

export type TokenInfoDisplayProps = {
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
      <div>
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
