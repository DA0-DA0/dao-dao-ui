import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  CwCoreV0_1_0Selectors,
  nativeBalancesSelector,
} from '@dao-dao/state'
import {
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeBankMessage,
  makeWasmMessage,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import {
  SpendIcon,
  SpendComponent as StatelessSpendComponent,
} from '../components'
import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '../types'

// TODO: Convert this into a more generalizable 'context' abstraction.
type WithIsWallet<T> = (isWallet: boolean) => T

interface SpendData {
  to: string
  amount: number
  denom: string
}

const makeUseDefaults: WithIsWallet<UseDefaults<SpendData>> =
  (isWallet) => () => {
    const { address } = useWallet()

    return {
      to: (isWallet && address) || '',
      amount: 1,
      denom: NATIVE_DENOM,
    }
  }

const makeUseTransformToCosmos: WithIsWallet<UseTransformToCosmos<SpendData>> =
  (isWallet) => (coreAddress: string) => {
    const cw20Addresses = useRecoilValue(
      isWallet
        ? // Cannot yet query for wallet's cw20 addresses.
          constSelector([])
        : // Get DAO's cw20 addresses.
          CwCoreV0_1_0Selectors.allCw20TokenListSelector({
            contractAddress: coreAddress,
          })
    )
    const cw20Infos = useRecoilValue(
      waitForAll(
        cw20Addresses.map((contractAddress) =>
          Cw20BaseSelectors.tokenInfoSelector({ contractAddress, params: [] })
        )
      )
    )
    const cw20Tokens = useMemo(
      () =>
        cw20Addresses.map((address, idx) => ({
          address,
          info: cw20Infos[idx],
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<SpendData> = (
  msg: Record<string, any>
) => {
  const isTransfer =
    'wasm' in msg &&
    'execute' in msg.wasm &&
    'contract_addr' in msg.wasm.execute &&
    'transfer' in msg.wasm.execute.msg &&
    'recipient' in msg.wasm.execute.msg.transfer &&
    'amount' in msg.wasm.execute.msg.transfer

  const spentTokenAddress = isTransfer
    ? msg.wasm.execute.contract_addr
    : undefined
  const spentTokenDecimals = useRecoilValue(
    spentTokenAddress
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: spentTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )?.decimals

  return useMemo(() => {
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

    if (isTransfer && spentTokenDecimals !== undefined) {
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
  }, [msg, spentTokenDecimals, isTransfer])
}

const makeComponent: WithIsWallet<ActionComponent> = (isWallet) =>
  function Component(props) {
    const nativeBalances = useRecoilValue(
      nativeBalancesSelector(props.coreAddress)
    )
    const cw20AddressesAndBalances = useRecoilValue(
      isWallet
        ? // Cannot yet query for wallet's cw20 addresses.
          constSelector([])
        : // Get DAO's cw20 addresses and ballances.
          CwCoreV0_1_0Selectors.allCw20BalancesSelector({
            contractAddress: props.coreAddress,
          })
    )

    const cw20Infos = useRecoilValue(
      waitForAll(
        cw20AddressesAndBalances.map(({ addr }) =>
          Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: addr,
            params: [],
          })
        )
      )
    )
    const cw20Balances = useMemo(
      () =>
        cw20AddressesAndBalances.map(({ addr, balance }, idx) => ({
          address: addr,
          balance,
          info: cw20Infos[idx],
        })),
      [cw20AddressesAndBalances, cw20Infos]
    )

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

export const makeSpendAction: WithIsWallet<Action<SpendData>> = (isWallet) => ({
  key: ActionKey.Spend,
  Icon: SpendIcon,
  label: 'Spend',
  description: 'Spend native or cw20 tokens from the treasury.',
  Component: makeComponent(isWallet),
  useDefaults: makeUseDefaults(isWallet),
  useTransformToCosmos: makeUseTransformToCosmos(isWallet),
  useDecodedCosmosMsg,
})
