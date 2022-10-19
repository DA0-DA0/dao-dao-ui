import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValue, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  CwdCoreV2Selectors,
  nativeBalancesSelector,
} from '@dao-dao/state'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes/actions'
import { SpendEmoji } from '@dao-dao/ui'
import {
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeBankMessage,
  makeWasmMessage,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import { SpendComponent as StatelessSpendComponent } from '../components/Spend'

interface SpendData {
  to: string
  amount: number
  denom: string
}

export const makeSpendAction: ActionMaker<SpendData> = ({
  t,
  address,
  context,
}) => {
  // Reused selectors in Component and useTransformToCosmos.
  const useCw20AddressesBalancesAndInfos = () => {
    const cw20AddressesAndBalances = useRecoilValue(
      context.type === ActionContextType.Wallet
        ? // Cannot query for wallet's cw20 addresses.
          constSelector([])
        : // Get DAO's cw20 addresses and balances.
          CwdCoreV2Selectors.allCw20BalancesSelector({
            contractAddress: address,
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

    return { cw20AddressesAndBalances, cw20Infos }
  }

  const Component: ActionComponent = (props) => {
    const nativeBalances = useRecoilValue(nativeBalancesSelector({ address }))

    const { cw20AddressesAndBalances, cw20Infos } =
      useCw20AddressesBalancesAndInfos()
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

  const useDefaults: UseDefaults<SpendData> = () => ({
    to: address,
    amount: 1,
    denom: NATIVE_DENOM,
  })

  const useTransformToCosmos: UseTransformToCosmos<SpendData> = () => {
    const { cw20AddressesAndBalances, cw20Infos } =
      useCw20AddressesBalancesAndInfos()
    const cw20Tokens = useMemo(
      () =>
        cw20AddressesAndBalances.map(({ addr }, idx) => ({
          address: addr,
          info: cw20Infos[idx],
        })),
      [cw20AddressesAndBalances, cw20Infos]
    )

    return useCallback(
      (data: SpendData) => {
        if (data.denom === NATIVE_DENOM || data.denom.startsWith('ibc/')) {
          const decimals = nativeTokenDecimals(data.denom)!
          const amount = convertDenomToMicroDenomWithDecimals(
            data.amount,
            decimals
          )
          const bank = makeBankMessage(amount.toString(), data.to, data.denom)
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
        ).toString()

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
  }

  return {
    key: ActionKey.Spend,
    Icon: SpendEmoji,
    label: t('title.spend'),
    description: t('info.spendActionDescription', {
      context: context.type,
    }),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
