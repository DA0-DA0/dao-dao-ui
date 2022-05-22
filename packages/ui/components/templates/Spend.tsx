import { Coin } from '@cosmjs/stargate'
import { XIcon } from '@heroicons/react/outline'
import { useFormContext } from 'react-hook-form'

import { TokenInfoResponse } from '@dao-dao/types/contracts/cw20-gov'
import {
  AddressInput,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
import {
  validateAddress,
  validatePositive,
  validateRequired,
  makeBankMessage,
  makeWasmMessage,
} from '@dao-dao/utils'
import {
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import {
  FromCosmosMsgProps,
  GetDefaultsProps,
  TemplateComponent,
  ToCosmosMsgProps,
} from './common'

export interface SpendData {
  to: string
  amount: number
  denom: string
}

export const spendDefaults = ({
  walletAddress,
}: GetDefaultsProps): SpendData => ({
  to: walletAddress,
  amount: 1,
  denom: convertDenomToHumanReadableDenom(NATIVE_DENOM),
})

interface SpendOptions {
  nativeBalances: readonly Coin[]
  cw20Balances: {
    address: string
    balance: string
    info: TokenInfoResponse
  }[]
}

export const SpendComponent: TemplateComponent<SpendOptions> = ({
  getLabel,
  onRemove,
  errors,
  readOnly,
  options: { nativeBalances, cw20Balances },
}) => {
  const { register, watch, clearErrors, setValue } = useFormContext()

  const spendAmount = watch(getLabel('amount'))
  const spendDenom = watch(getLabel('denom'))

  const validatePossibleSpend = (
    id: string,
    amount: string
  ): string | boolean => {
    const native = nativeBalances.find((coin) => coin.denom === id)
    if (native) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        native.amount,
        NATIVE_DECIMALS
      )
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        NATIVE_DECIMALS
      )
      return (
        Number(microAmount) <= Number(native.amount) ||
        `Can't spend more tokens than are in the DAO treasury (${humanReadableAmount}).`
      )
    }
    const cw20 = cw20Balances.find(({ address }) => address === id)
    if (cw20) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        cw20.balance,
        cw20.info.decimals
      )
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        cw20.info.decimals
      )
      return (
        Number(microAmount) <= Number(cw20.balance) ||
        `Can't spend more tokens than are in the DAO treasury (${humanReadableAmount} $${cw20.info.symbol}).`
      )
    }
    // If there are no native tokens in the treasury the native balances
    // query will return an empty list.
    const nativeHumanReadable = convertDenomToHumanReadableDenom(NATIVE_DENOM)
    if (id === nativeHumanReadable) {
      return `Can't spend more tokens than are in the DAO treasury (0 ${nativeHumanReadable}).`
    }
    return 'Unrecognized denom.'
  }

  // The amount and denom fields are dependent on each other for validation. If
  // one has a valid validation result, the other one as well. This wrapper ensures
  // that react-hook-form is informed as such.
  const validatePossibleSpendWrapper = (denom: string, amount: string) => {
    const valid = validatePossibleSpend(denom, amount)
    if (typeof valid == 'boolean' && valid) {
      clearErrors([getLabel('denom'), getLabel('amount')])
    }
    return valid
  }

  return (
    <div className="flex justify-between items-center p-3 my-2 bg-primary rounded-lg">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex flex-wrap gap-2 items-center w-24">
          <h2 className="text-3xl">💵</h2>
          <h2>Spend</h2>
        </div>
        <NumberInput
          disabled={readOnly}
          error={errors?.amount}
          label={getLabel('amount')}
          onPlusMinus={[
            () =>
              setValue(
                getLabel('amount'),
                (Number(spendAmount) + 1).toString()
              ),
            () =>
              setValue(
                getLabel('amount'),
                (Number(spendAmount) - 1).toString()
              ),
          ]}
          register={register}
          sizing="md"
          step={0.000001}
          validation={[
            validateRequired,
            validatePositive,
            (amount: string) =>
              validatePossibleSpendWrapper(spendDenom, amount),
          ]}
        />
        <SelectInput
          defaultValue={process.env.NEXT_PUBLIC_FEE_DENOM}
          disabled={readOnly}
          error={errors?.denom}
          label={getLabel('denom')}
          register={register}
          validation={[
            (denom: string) => validatePossibleSpendWrapper(denom, spendAmount),
          ]}
        >
          {nativeBalances.map(({ denom }) => (
            <option key={denom} value={denom}>
              ${nativeTokenLabel(denom)}
            </option>
          ))}
          {cw20Balances.map(({ address, info: { symbol } }) => (
            <option key={address} value={address}>
              ${symbol}
            </option>
          ))}
        </SelectInput>
        <div className="flex gap-2 items-center">
          <p className="font-mono secondary-text">{'->'}</p>
          <div className="flex flex-col">
            <AddressInput
              disabled={readOnly}
              error={errors?.to}
              label={getLabel('to')}
              register={register}
              validation={[validateRequired, validateAddress]}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.denom} />
          <InputErrorMessage error={errors?.to} />
        </div>
      </div>
      {onRemove && (
        <button onClick={onRemove} type="button">
          <XIcon className="h-4" />
        </button>
      )}
    </div>
  )
}

export const transformSpendToCosmos = (
  data: SpendData,
  { govTokenDecimals }: ToCosmosMsgProps
) => {
  if (data.denom === NATIVE_DENOM || data.denom.startsWith('ibc/')) {
    const decimals = nativeTokenDecimals(data.denom)!
    const amount = convertDenomToMicroDenomWithDecimals(data.amount, decimals)
    const bank = makeBankMessage(amount, data.to, data.denom)
    return { bank }
  }

  const amount = convertDenomToMicroDenomWithDecimals(
    data.amount,
    govTokenDecimals
  )

  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: data.denom,
        funds: [],
        msg: {
          transfer: {
            recipient: data.to,
            amount: amount,
          },
        },
      },
    },
  })
}

export const transformCosmosToSpend = (
  msg: Record<string, any>,
  { govTokenDecimals }: FromCosmosMsgProps
): SpendData | null => {
  if (
    'bank' in msg &&
    'send' in msg.bank &&
    'amount' in msg.bank.send &&
    msg.bank.send.amount.length === 1 &&
    'amount' in msg.bank.send.amount[0] &&
    'denom' in msg.bank.send.amount[0] &&
    'to_address' in msg.bank.send
  ) {
    const denom = msg.bank.send.amount[0].denom
    if (denom === NATIVE_DENOM || denom.startsWith('ibc/')) {
      return {
        to: msg.bank.send.to_address,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.bank.send.amount[0].amount,
          nativeTokenDecimals(denom)!
        ),
        denom,
      }
    }
  }

  if (
    'wasm' in msg &&
    'execute' in msg.wasm &&
    'contract_addr' in msg.wasm.execute &&
    'transfer' in msg.wasm.execute.msg &&
    'recipient' in msg.wasm.execute.msg.transfer &&
    'amount' in msg.wasm.execute.msg.transfer
  ) {
    return {
      to: msg.wasm.execute.msg.transfer.recipient,
      amount: convertMicroDenomToDenomWithDecimals(
        msg.wasm.execute.msg.transfer.amount,
        govTokenDecimals
      ),
      denom: msg.wasm.execute.contract_addr,
    }
  }

  return null
}
