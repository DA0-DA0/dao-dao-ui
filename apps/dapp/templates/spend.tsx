import { XIcon } from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  AddressInput,
  InputErrorMessage,
  NumberInput,
  SelectInput,
} from '@dao-dao/ui'
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
  cw20TokensList,
  cw20TokenInfo,
  nativeBalance as nativeBalanceSelector,
  cw20Balances as cw20BalancesSelector,
} from 'selectors/treasury'
import { Config } from 'util/contractConfigWrapper'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeBankMessage, makeWasmMessage } from 'util/messagehelpers'

import {
  FromCosmosMsgProps,
  TemplateComponent,
  ToCosmosMsgProps,
} from './templateList'

export interface SpendData {
  to: string
  amount: number

  // This is either a native denom or a JSON encoded object in the form {
  // address: string, decimals: number }. Its a bit of a hack to do it this way,
  // but we need to do it because we can only fetch data while we're rendering the
  // component.
  denom: string
  isFromCSV?: boolean
}

export const spendDefaults = (
  walletAddress: string,
  _contractConfig: Config
): SpendData => ({
  to: walletAddress,
  amount: 1,
  denom: convertDenomToHumanReadableDenom(NATIVE_DENOM),
  isFromCSV: false,
})

export const SpendComponent: TemplateComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  readOnly,
  getValues,
}) => {
  const { register, watch, clearErrors, setValue } = useFormContext()

  const tokenList = useRecoilValue(cw20TokensList(contractAddress))
  const cw20Info = useRecoilValue(
    waitForAll(tokenList.map((address) => cw20TokenInfo(address)))
  )

  const nativeBalances = useRecoilValue(nativeBalanceSelector(contractAddress))
  const cw20Balances = useRecoilValue(cw20BalancesSelector(contractAddress))
  const cw20BalanceInfo = cw20Balances.map((balance, index) => ({
    balance,
    info: cw20Info[index],
  }))
  const spendAmount = watch(getLabel('amount'))
  const spendDenom = watch(getLabel('denom'))
  const isFromCSV = watch(getLabel('isFromCSV'))

  const [defaultSymbol, setDefaultSymbol] = useState('')

  useEffect(() => {
    isFromCSV &&
      cw20Info.map(({ symbol }, idx) => {
        symbol === getValues?.(getLabel('denom')) &&
          setDefaultSymbol(
            JSON.stringify({
              address: tokenList[idx],
              decimals: cw20Info[idx].decimals,
            })
          )
      }) &&
      setValue(getLabel('denom'), defaultSymbol)
  }, [isFromCSV, cw20Info, tokenList, getValues, getLabel, defaultSymbol])

  const validatePossibleSpend = (
    denom: string,
    amount: string
  ): string | boolean => {
    const native = nativeBalances.find((coin) => coin.denom == denom)
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
    const cw20 = cw20BalanceInfo.find(
      ({ balance, info: _info }) => balance.address == denom
    )
    if (cw20) {
      const humanReadableAmount = convertMicroDenomToDenomWithDecimals(
        cw20.balance.amount,
        cw20.info.decimals
      )
      const microAmount = convertDenomToMicroDenomWithDecimals(
        amount,
        cw20.info.decimals
      )
      return (
        Number(microAmount) <= Number(cw20.balance.amount) ||
        `Can't spend more tokens than are in the DAO treasury (${humanReadableAmount} $${cw20.info.symbol}).`
      )
    }
    // If there are no native tokens in the treasury the native balances query
    // will return an empty list.
    const nativeHumanReadable = convertDenomToHumanReadableDenom(NATIVE_DENOM)
    if (denom === nativeHumanReadable) {
      return `Can't spend more tokens than are in the DAO treasury (0 ${nativeHumanReadable})`
    }
    return 'Unrecognized denom.'
  }

  // The amount and denom fields are dependent on eachother for validation. If
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
    <div className="flex justify-between p-3 my-2 bg-primary rounded-lg">
      <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2 items-center">
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
          small
          step={0.000001}
          validation={[
            validateRequired,
            validatePositive,
            (amount: string) => {
              if (spendDenom.startsWith('{')) {
                const { address } = JSON.parse(spendDenom)
                return validatePossibleSpendWrapper(address, amount)
              }
              return validatePossibleSpend(spendDenom, amount)
            },
          ]}
        />
        <SelectInput
          defaultValue={
            defaultSymbol ? defaultSymbol : process.env.NEXT_PUBLIC_FEE_DENOM
          }
          disabled={readOnly}
          error={errors?.denom}
          label={getLabel('denom')}
          register={register}
          validation={[
            (denom: string) => {
              if (denom.startsWith('{')) {
                const { address } = JSON.parse(denom)
                return validatePossibleSpendWrapper(address, spendAmount)
              }
              return validatePossibleSpendWrapper(denom, spendAmount)
            },
          ]}
        >
          {nativeBalances.map(({ denom }, idx) => {
            return (
              <option key={idx} value={denom}>
                {convertDenomToHumanReadableDenom(
                  nativeTokenLabel(denom)
                ).toUpperCase()}
              </option>
            )
          })}
          {cw20Info.map(({ symbol }, idx) => (
            <option
              key={tokenList[idx]}
              value={JSON.stringify({
                address: tokenList[idx],
                decimals: cw20Info[idx].decimals,
              })}
            >
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
  self: SpendData,
  props: ToCosmosMsgProps
) => {
  if (self.denom === NATIVE_DENOM || self.denom.startsWith('ibc/')) {
    const decimals = nativeTokenDecimals(self.denom)!
    const amount = convertDenomToMicroDenomWithDecimals(self.amount, decimals)
    const bank = makeBankMessage(amount, self.to, props.sigAddress, self.denom)
    return { bank }
  }

  // We are dealing with a cw20. Because we can't fetch data in this function we
  // store a JSON encoded object with address and decimals in this case.

  const { address, decimals } = JSON.parse(self.denom)
  const amount = convertDenomToMicroDenomWithDecimals(self.amount, decimals)
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: address,
        funds: [],
        msg: {
          transfer: {
            recipient: self.to,
            amount: amount,
          },
        },
      },
    },
  })
}

export const transformCosmosToSpend = (
  msg: Record<string, any>,
  _: FromCosmosMsgProps
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
        NATIVE_DECIMALS
      ),
      denom: JSON.stringify({
        address: msg.wasm.execute.contract_addr,
        decimals: NATIVE_DECIMALS,
      }),
    }
  }

  return null
}
