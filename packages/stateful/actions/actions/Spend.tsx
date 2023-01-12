import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Cw20BaseSelectors,
  DaoCoreV2Selectors,
  nativeBalancesSelector,
} from '@dao-dao/state'
import {
  ActionCardLoader,
  MoneyEmoji,
  useCachedLoadable,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  NATIVE_DENOM,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  loadableToLoadingData,
  makeBankMessage,
  makeWasmMessage,
  nativeTokenDecimals,
} from '@dao-dao/utils'

import { AddressInput, SuspenseLoader } from '../../components'
import { useCw20GovernanceTokenInfoResponseIfExists } from '../../voting-module-adapter'
import {
  SpendData,
  SpendComponent as StatelessSpendComponent,
} from '../components/Spend'
import { useActionOptions } from '../react'

// Reused selectors in Component and useTransformToCosmos. Undefined when
// loading.
const useCw20BalancesAndInfos = () => {
  const { context, address } = useActionOptions()

  // Get CW20 governance token address from voting module adapter if exists,
  // so we can make sure to load it with all cw20 balances, even if it has not
  // been explicitly added to the DAO.
  const { governanceTokenAddress } =
    useCw20GovernanceTokenInfoResponseIfExists() ?? {}

  const cw20BalancesAndInfosLoadable = useCachedLoadable(
    context.type === ActionOptionsContextType.Dao
      ? // Get DAO's cw20 balances and infos.
        DaoCoreV2Selectors.allCw20BalancesAndInfosSelector({
          contractAddress: address,
          governanceTokenAddress,
        })
      : undefined
  )

  const cw20BalancesAndInfos = useMemo(
    () =>
      context.type === ActionOptionsContextType.Dao
        ? cw20BalancesAndInfosLoadable.state === 'hasValue'
          ? cw20BalancesAndInfosLoadable.contents.map(({ addr, ...rest }) => ({
              address: addr,
              ...rest,
            }))
          : undefined
        : // If not a DAO, just return empty array.
          [],
    [
      context.type,
      cw20BalancesAndInfosLoadable.contents,
      cw20BalancesAndInfosLoadable.state,
    ]
  )

  return cw20BalancesAndInfos
}

const Component: ActionComponent<undefined, SpendData> = (props) => {
  const { address } = useActionOptions()

  // This needs to be loaded via a cached loadable to avoid displaying a
  // loader when this data updates on a schedule. Manually trigger a suspense
  // loader the first time when the initial data is still loading.
  const nativeBalancesLoadable = loadableToLoadingData(
    useCachedLoadable(
      address ? nativeBalancesSelector({ address }) : undefined
    ),
    []
  )

  // Undefined when loading.
  const cw20LoadingBalances = useCw20BalancesAndInfos()

  return (
    <SuspenseLoader
      fallback={<ActionCardLoader />}
      forceFallback={
        // Manually trigger loader.
        nativeBalancesLoadable.loading || cw20LoadingBalances === undefined
      }
    >
      <StatelessSpendComponent
        {...props}
        options={{
          nativeBalances: nativeBalancesLoadable.loading
            ? []
            : nativeBalancesLoadable.data,
          cw20Balances: cw20LoadingBalances ?? [],
          AddressInput,
        }}
      />
    </SuspenseLoader>
  )
}
export const makeSpendAction: ActionMaker<SpendData> = ({ t, context }) => {
  const useDefaults: UseDefaults<SpendData> = () => {
    const { address: walletAddress = '' } = useWallet()

    return {
      to: walletAddress,
      amount: 1,
      denom: NATIVE_DENOM,
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<SpendData> = () => {
    const cw20Tokens = useCw20BalancesAndInfos()

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
        const cw20TokenInfo = cw20Tokens?.find(
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
    key: CoreActionKey.Spend,
    Icon: MoneyEmoji,
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
