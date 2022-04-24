import { FunctionComponent } from 'react'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { FieldErrors } from 'react-hook-form'

import { InputLabel } from '../input'
import { LogoNoBorder } from '../Logo'

// A component which will render a template's input form.
export type TemplateComponentProps<T = undefined> = {
  contractAddress: string
  getLabel: (field: string) => string
  onRemove?: () => void
  errors?: FieldErrors
  readOnly?: boolean
} & (T extends undefined ? {} : { options: T })

export type TemplateComponent<T = undefined> = FunctionComponent<
  TemplateComponentProps<T>
>

// Defines a new template.
export interface Template<
  O extends {} = any,
  P extends {} = any,
  D extends {} = any
> {
  label: string
  description: string
  component: TemplateComponent<O>
  // Get default for fields in form display.
  getDefaults: (props: P) => D
  // Convert template data to CosmosMsgFor_Empty.
  toCosmosMsg: (data: D, props: ToCosmosMsgProps) => CosmosMsgFor_Empty
  // Convert decoded msg data to fields in form display.
  fromCosmosMsg: (msg: Record<string, any>, props: FromCosmosMsgProps) => D
}

// The contextual information provided to templates when transforming
// from form inputs to cosmos messages.
export interface ToCosmosMsgProps {
  sigAddress: string
  govAddress: string
  govDecimals: number
  multisig: boolean
}

// The contextual information provided to templates when transforming
// from cosmos messages to values.
export interface FromCosmosMsgProps {
  govDecimals: number
}

// When template data is being passed around in a form it must carry
// a label with it so that we can find it's component and
// transformation function later. This type just encodes that.
export interface TemplateMessage {
  label: string
}

export type TokenInfoDisplayProps =
  | {
      loadingTokenInfo: null | true
      tokenInfo: undefined
    }
  | {
      loadingTokenInfo: false
      tokenInfo: TokenInfoResponse
    }

export const TokenInfoDisplay: FunctionComponent<TokenInfoDisplayProps> = (
  props
) => (
  <>
    {props.loadingTokenInfo ? (
      <div className="inline-block p-2 mt-2 animate-spin-medium">
        <LogoNoBorder />
      </div>
    ) : props.loadingTokenInfo === false ? (
      <div>
        <InputLabel name="Token info" />
        <pre className="overflow-auto p-2 text-secondary rounded-lg border border-secondary">
          {JSON.stringify(props.tokenInfo, null, 2)}
        </pre>
      </div>
    ) : null}
  </>
)
