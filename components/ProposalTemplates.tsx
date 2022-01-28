import JSON5 from 'json5'
import { ArrowRightIcon, CheckIcon, XIcon } from '@heroicons/react/outline'
import { FieldErrors, useFormContext } from 'react-hook-form'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import {
  makeBankMessage,
  makeExecutableMintMessage,
  makeMintMessage,
  makeWasmMessage,
} from 'util/messagehelpers'
import { validateCosmosMsg } from 'util/validateWasmMsg'
import {
  AddressInput,
  CodeMirrorInput,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from './InputField'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'

export const messageTemplates = [
  { label: '💵 Spend', template: spendTemplate },
  { label: '🌟 Mint', template: mintTemplate },
  { label: '🤖 Custom', template: customTemplate },
]

interface TemplateRenderProps {
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
}

export interface SpendData {
  to: string
  amount: number
  denom: string
}

export interface MintData {
  to: string
  amount: number
}

export interface CustomData {
  message: string
}

export interface TemplateMessage {
  Render: React.FunctionComponent<TemplateRenderProps>
  toCosmosMsg: (
    self: any,
    daoAddress: string,
    govAddress: string
  ) => CosmosMsgFor_Empty
}

export type Message = (SpendData | MintData | CustomData) & TemplateMessage

export function spendTemplate(walletAddress: string, govTokenDenom: string) {
  return {
    to: walletAddress,
    amount: 1,
    denom: process.env.NEXT_PUBLIC_FEE_DENOM,
    Render: ({ getLabel, onRemove, errors }: TemplateRenderProps) => {
      const { register } = useFormContext()

      return (
        <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
              <h2 className="text-4xl">💵</h2>
              <h2>Spend</h2>
            </div>
            <div className="flex flex-col">
              <NumberInput
                label={getLabel('amount') as never}
                register={register}
                error={errors.amount}
                validation={[validateRequired, validatePositive]}
                noBorder
              />
              <InputErrorMessage error={errors.amount} />
            </div>
            <SelectInput
              label={getLabel('denom') as never}
              register={register}
              error={errors.denom}
              defaultValue={process.env.NEXT_PUBLIC_FEE_DENOM}
              noBorder
            >
              <option>{process.env.NEXT_PUBLIC_FEE_DENOM}</option>
              <option>${govTokenDenom}</option>
            </SelectInput>
            <div className="flex gap-2 items-center">
              <ArrowRightIcon className="h-4" />
              <div className="flex flex-col">
                <AddressInput
                  label={getLabel('to') as never}
                  register={register}
                  error={errors.to}
                  validation={[validateRequired, validateAddress]}
                  noBorder
                />
                <InputErrorMessage error={errors.to} />
              </div>
            </div>
          </div>
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        </div>
      )
    },
    toCosmosMsg: (
      self: SpendData,
      daoAddress: string,
      govAddress: string
    ): CosmosMsgFor_Empty => {
      if (self.denom === process.env.NEXT_PUBLIC_FEE_DENOM) {
        const bank = makeBankMessage(
          self.amount.toString(),
          self.to,
          daoAddress,
          self.denom
        )
        return { bank }
      }
      return makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: govAddress,
            funds: [],
            msg: {
              transfer: {
                recipient: self.to,
                amount: self.amount.toString(),
              },
            },
          },
        },
      })
    },
  }
}

export function mintTemplate(walletAddress: string, govTokenDenom: string) {
  return {
    to: walletAddress,
    amount: 1,
    Render: ({ getLabel, onRemove, errors }: TemplateRenderProps) => {
      const { register } = useFormContext()

      return (
        <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
              <h2 className="text-3xl">🌟</h2>
              <h2>Mint</h2>
            </div>
            <div className="flex flex-col">
              <NumberInput
                label={getLabel('amount') as never}
                register={register}
                error={errors.amount}
                validation={[validateRequired, validatePositive]}
                noBorder
              />
              <InputErrorMessage error={errors.amount} />
            </div>
            <p className="font-mono text-secondary text-sm uppercase">
              ${govTokenDenom}
            </p>
            <div className="flex gap-2 items-center">
              <ArrowRightIcon className="h-4" />
              <div className="flex flex-col">
                <AddressInput
                  label={getLabel('to') as never}
                  register={register}
                  error={errors.to}
                  validation={[validateRequired, validateAddress]}
                  noBorder
                />
                <InputErrorMessage error={errors.to} />
              </div>
            </div>
          </div>
          <button onClick={onRemove} type="button">
            <XIcon className="h-4" />
          </button>
        </div>
      )
    },
    toCosmosMsg: (
      self: MintData,
      _daoAddress: string,
      govAddress: string
    ): CosmosMsgFor_Empty => {
      return makeExecutableMintMessage(
        makeMintMessage(self.amount.toString(), self.to),
        govAddress
      )
    },
  }
}

export function customTemplate() {
  return {
    message: '{}',
    Render: ({ getLabel, onRemove, errors }: TemplateRenderProps) => {
      const { control } = useFormContext()

      // We need to use the real label for this component as the
      // control structure we pass along can't me made to understand
      // that we are in a nested object nor wrapped nicely like we do
      // with register.
      return (
        <div className="flex flex-col py-2 px-3 my-2 bg-base-300 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl">🤖</h2>
              <h2>Custom</h2>
            </div>
            <button onClick={onRemove} type="button">
              <XIcon className="h-4" />
            </button>
          </div>
          <CodeMirrorInput
            label={getLabel('message') as never}
            control={control}
            error={errors.message}
            validation={[
              (v: string) => {
                let msg
                try {
                  msg = JSON5.parse(v)
                } catch (e: any) {
                  return e.message as string
                }
                if (msg.wasm) msg = makeWasmMessage(msg)
                const validCosmos = validateCosmosMsg(msg)
                if (!validCosmos.valid) {
                  return 'Invalid cosmos message'
                } else {
                  return true
                }
              },
            ]}
          />
          <div className="mt-2">
            {errors.message ? (
              <p className="text-error text-sm">
                <XIcon className="w-5 inline" />{' '}
                {errors.message.message === 'Invalid cosmos message' ? (
                  <>
                    Invalid{' '}
                    <a
                      className="link inline"
                      rel="noreferrer"
                      target="_blank"
                      href="https://github.com/CosmWasm/cosmwasm/blob/d4505011e35a8877fb95e7d14357f2b8693c57bb/packages/std/schema/cosmos_msg.json"
                    >
                      cosmos message
                    </a>
                  </>
                ) : null}
              </p>
            ) : (
              <p className="text-success text-sm">
                <CheckIcon className="w-5 inline" /> json is valid
              </p>
            )}
          </div>
        </div>
      )
    },
    toCosmosMsg: (
      self: CustomData,
      _daoAddress: string,
      _govAddress: string
    ): CosmosMsgFor_Empty => {
      let msg
      try {
        msg = JSON5.parse(self.message)
      } catch (e: any) {
        console.log(`internal error. unparsable message: (${self.message})`)
      }
      // Convert the wasm message component to base64
      if (msg.wasm) msg = makeWasmMessage(msg)
      return msg
    },
  }
}
