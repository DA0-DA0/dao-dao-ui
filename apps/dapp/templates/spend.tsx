import { AddressInput } from '@components/input/AddressInput'
import { InputErrorMessage } from '@components/input/InputErrorMessage'
import { NumberInput } from '@components/input/NumberInput'
import { SelectInput } from '@components/input/SelectInput'
import { ArrowRightIcon, XIcon } from '@heroicons/react/outline'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { useRecoilValue, waitForAll } from 'recoil'
import { NATIVE_DECIMALS, NATIVE_DENOM } from 'util/constants'
import { Config } from 'util/contractConfigWrapper'
import {
  cw20TokensList,
  cw20TokenInfo,
  nativeBalance as nativeBalanceSelector,
  cw20Balances as cw20BalancesSelector,
} from 'selectors/treasury'
import {
  convertDenomToContractReadableDenom,
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenDecimals,
  nativeTokenLabel,
  nativeTokenLogoURI,
} from 'util/conversion'
import {
  validateAddress,
  validatePositive,
  validateRequired,
} from 'util/formValidation'
import { makeBankMessage, makeWasmMessage } from 'util/messagehelpers'
import { ToCosmosMsgProps } from './templateList'

export interface SpendData {
  to: string
  amount: number
  denom: string
}

export const spendDefaults = (
  walletAddress: string,
  _contractConfig: Config
) => {
  return {
    to: walletAddress,
    amount: 1,
    denom: convertDenomToHumanReadableDenom(
      process.env.NEXT_PUBLIC_FEE_DENOM as string
    ),
  }
}

export const SpendComponent = ({
  contractAddress,
  getLabel,
  onRemove,
  errors,
  multisig,
}: {
  contractAddress: string
  getLabel: (field: string) => string
  onRemove: () => void
  errors: FieldErrors
  multisig?: boolean
}) => {
  const { register, watch, clearErrors } = useFormContext()

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
        `Can't spend more tokens than are in the DAO tresury (${humanReadableAmount}).`
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
        `Can't spend more tokens than are in the DAO tresury (${humanReadableAmount} $${cw20.info.symbol}).`
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
    <div className="flex justify-between items-center bg-base-300 py-2 px-3 rounded-lg my-2">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-2 w-24">
          <h2 className="text-4xl">💵</h2>
          <h2>Spend</h2>
        </div>
        <NumberInput
          label={getLabel('amount') as never}
          register={register}
          error={errors.amount}
          validation={[
            validateRequired,
            validatePositive,
            (amount: string) =>
              validatePossibleSpendWrapper(spendDenom, amount),
          ]}
          step={0.000001}
          border={false}
        />
        <SelectInput
          label={getLabel('denom') as never}
          register={register}
          error={errors.denom}
          defaultValue={process.env.NEXT_PUBLIC_FEE_DENOM}
          validation={[
            (denom: string) => validatePossibleSpendWrapper(denom, spendAmount),
          ]}
          border={false}
        >
          {nativeBalances.map(({ denom }, idx) => {
            return (
              <option value={denom} key={idx}>
                ${nativeTokenLabel(denom)}
              </option>
            )
          })}
          {cw20Info.map(({ symbol }, idx) => (
            <option value={tokenList[idx]} key={tokenList[idx]}>
              ${symbol}
            </option>
          ))}
        </SelectInput>
        <div className="flex gap-2 items-center">
          <ArrowRightIcon className="h-4" />
          <div className="flex flex-col">
            <AddressInput
              label={getLabel('to') as never}
              register={register}
              error={errors.to}
              validation={[validateRequired, validateAddress]}
              border={false}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InputErrorMessage error={errors.amount} />
          <InputErrorMessage error={errors.denom} />
          <InputErrorMessage error={errors.to} />
        </div>
      </div>
      <button onClick={onRemove} type="button">
        <XIcon className="h-4" />
      </button>
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
  const amount = convertDenomToMicroDenomWithDecimals(
    self.amount,
    props.govDecimals
  )
  return makeWasmMessage({
    wasm: {
      execute: {
        contract_addr: self.denom,
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
