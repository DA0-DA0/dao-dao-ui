import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import { nativeBalancesSelector } from '@dao-dao/state'
import { TokenInfoResponse } from '@dao-dao/state/clients/cw20-base'
import {
  allCw20BalancesSelector,
  allCw20TokenListSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-core'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import {
  convertDenomToHumanReadableDenom,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeBankMessage,
  makeWasmMessage,
  nativeTokenDecimals,
  NATIVE_DENOM,
} from '@dao-dao/utils'

import {
  GetDefaultsProps,
  SpendComponent as StatelessSpendComponent,
  TemplateComponent,
  TemplateComponentLoader,
  UseDecodeCosmosMsg,
  UseTransformToCosmos,
} from '../components'

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

const InnerSpendComponent: TemplateComponent = (props) => {
  const nativeBalances =
    useRecoilValue(nativeBalancesSelector(props.coreAddress)) ?? []

  const cw20AddressesAndBalances =
    useRecoilValue(
      allCw20BalancesSelector({
        contractAddress: props.coreAddress,
      })
    ) ?? []
  const cw20Infos =
    useRecoilValue(
      waitForAll(
        cw20AddressesAndBalances.map(({ addr }) =>
          tokenInfoSelector({ contractAddress: addr, params: [] })
        )
      )
    ) ?? []
  const cw20Balances = cw20AddressesAndBalances
    .map(({ addr, balance }, idx) => ({
      address: addr,
      balance,
      info: cw20Infos[idx],
    }))
    // If undefined token info response, ignore the token.
    .filter(({ info }) => !!info) as {
    address: string
    balance: string
    info: TokenInfoResponse
  }[]

  return (
    <StatelessSpendComponent
      {...props}
      options={{
        nativeBalances,
        cw20Balances,
      }}
    />
  )
}

export const SpendComponent: TemplateComponent = (props) => (
  <props.SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerSpendComponent {...props} />
  </props.SuspenseLoader>
)

export const useTransformSpendToCosmos: UseTransformToCosmos<SpendData> = (
  coreAddress: string
) => {
  const cw20Addresses = useRecoilValue(
    allCw20TokenListSelector({
      contractAddress: coreAddress,
    })
  )
  const cw20Infos = useRecoilValue(
    waitForAll(
      (cw20Addresses ?? []).map((contractAddress) =>
        tokenInfoSelector({ contractAddress, params: [] })
      )
    )
  )
  const cw20Tokens = useMemo(
    () =>
      (cw20Addresses ?? []).map((address, idx) => ({
        address,
        info: cw20Infos?.[idx],
      })),
    [cw20Addresses, cw20Infos]
  )

  return useCallback(
    (data: SpendData) => {
      if (data.denom === NATIVE_DENOM || data.denom.startsWith('ibc/')) {
        const decimals = nativeTokenDecimals(data.denom)!
        const amount = convertDenomToMicroDenomWithDecimals(
          data.amount,
          decimals
        )
        const bank = makeBankMessage(amount, data.to, data.denom)
        return { bank }
      }

      // Get cw20 token decimals from cw20 treasury list.
      const cw20TokenInfo = cw20Tokens.find(
        ({ address }) => address === data.denom
      )?.info
      if (!cw20TokenInfo) {
        throw new Error(`Unknown token: ${data.denom}`)
      }

      const amount = convertDenomToMicroDenomWithDecimals(
        data.amount,
        cw20TokenInfo.decimals
      )

      return makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: data.denom,
            funds: [],
            msg: {
              transfer: {
                recipient: data.to,
                amount,
              },
            },
          },
        },
      })
    },
    [cw20Tokens]
  )
}

export const useDecodeSpendCosmosMsg: UseDecodeCosmosMsg<SpendData> = (
  msg: Record<string, any>
) => {
  const spentTokenAddress =
    'wasm' in msg &&
    'execute' in msg.wasm &&
    'contract_addr' in msg.wasm.execute
      ? msg.wasm.execute.contract_addr
      : undefined
  const spentTokenDecimals = useRecoilValue(
    spentTokenAddress
      ? tokenInfoSelector({ contractAddress: spentTokenAddress, params: [] })
      : constSelector(undefined)
  )?.decimals

  // Nothing yet to return about the match.
  if (spentTokenDecimals === undefined) {
    throw new Error('Failed to load data.')
  }

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
        match: true,
        data: {
          to: msg.bank.send.to_address,
          amount: convertMicroDenomToDenomWithDecimals(
            msg.bank.send.amount[0].amount,
            nativeTokenDecimals(denom)!
          ),
          denom,
        },
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
      match: true,
      data: {
        to: msg.wasm.execute.msg.transfer.recipient,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.wasm.execute.msg.transfer.amount,
          spentTokenDecimals
        ),
        denom: msg.wasm.execute.contract_addr,
      },
    }
  }

  return { match: false }
}
