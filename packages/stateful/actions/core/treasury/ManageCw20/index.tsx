import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { TokenEmoji } from '@dao-dao/stateless'
import { Feature } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { TokenInfoResponse } from '@dao-dao/types/contracts/Cw20Base'
import {
  POLYTONE_CW20_ITEM_KEY_PREFIX,
  getChainForChainId,
  isValidBech32Address,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import {
  ManageCw20Data,
  ManageCw20Component as StatelessManageCw20Component,
} from './Component'

const useDefaults: UseDefaults<ManageCw20Data> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  return {
    chainId,
    adding: true,
    address: '',
  }
}

const Component: ActionComponent = (props) => {
  const {
    address,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const { t } = useTranslation()
  const { fieldNamePrefix } = props

  const { watch } = useFormContext()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)

  const adding = watch(fieldNamePrefix + 'adding')
  const tokenAddress = watch(fieldNamePrefix + 'address')

  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress && isValidBech32Address(tokenAddress, bech32Prefix)
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: tokenAddress,
          chainId,
          params: [],
        })
      : constSelector(undefined)
  )

  const existingTokenAddresses = useRecoilValue(
    DaoCoreV2Selectors.allCw20TokensSelector({
      contractAddress: address,
      chainId: currentChainId,
    })
  )[chainId]?.tokens
  const existingTokenInfos = useRecoilValue(
    waitForAll(
      existingTokenAddresses?.map((token) =>
        Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: token,
          chainId,
          params: [],
        })
      ) ?? []
    )
  )
  const existingTokens = useMemo(
    () =>
      (existingTokenAddresses
        ?.map((address, idx) => ({
          address,
          info: existingTokenInfos[idx],
        }))
        // If undefined token info response, ignore the token.
        .filter(({ info }) => !!info) ?? []) as {
        address: string
        info: TokenInfoResponse
      }[],
    [existingTokenAddresses, existingTokenInfos]
  )

  const [additionalAddressError, setAdditionalAddressError] = useState<string>()
  useEffect(() => {
    const tokenInfoErrored = tokenInfoLoadable.state === 'hasError'
    const noTokensWhenRemoving = !adding && existingTokens.length === 0

    if (!tokenInfoErrored && !noTokensWhenRemoving) {
      if (additionalAddressError) {
        setAdditionalAddressError(undefined)
      }
      return
    }

    if (!additionalAddressError) {
      setAdditionalAddressError(
        tokenInfoErrored
          ? t('error.notCw20Address')
          : noTokensWhenRemoving
          ? t('error.noCw20Tokens')
          : // Should never happen.
            t('error.unexpectedError')
      )
    }
  }, [
    tokenInfoLoadable.state,
    existingTokens.length,
    t,
    additionalAddressError,
    adding,
  ])

  return (
    <StatelessManageCw20Component
      {...props}
      options={{
        additionalAddressError,
        existingTokens,
        formattedJsonDisplayProps: {
          title: t('form.tokenInfo'),
          jsonLoadable: tokenInfoLoadable,
        },
      }}
    />
  )
}

export const makeManageCw20Action: ActionMaker<ManageCw20Data> = ({
  t,
  address,
  context,
  chain: { chain_id: chainId },
}) => {
  // Only DAOs.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const storageItemValueKey = context.info.supportedFeatures[
    Feature.StorageItemValueKey
  ]
    ? 'value'
    : 'addr'

  const useTransformToCosmos: UseTransformToCosmos<ManageCw20Data> = () =>
    useCallback(
      (data: ManageCw20Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              // If adding for polytone proxy (on other chain), use items
              // instead of the core contract message.
              msg:
                data.chainId !== chainId
                  ? data.adding
                    ? {
                        set_item: {
                          key:
                            POLYTONE_CW20_ITEM_KEY_PREFIX +
                            data.chainId +
                            ':' +
                            data.address,
                          [storageItemValueKey]: '1',
                        },
                      }
                    : {
                        remove_item: {
                          key:
                            POLYTONE_CW20_ITEM_KEY_PREFIX +
                            data.chainId +
                            ':' +
                            data.address,
                        },
                      }
                  : {
                      update_cw20_list: {
                        to_add: data.adding ? [data.address] : [],
                        to_remove: !data.adding ? [data.address] : [],
                      },
                    },
            },
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageCw20Data> = (
    msg: Record<string, any>
  ) => {
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              update_cw20_list: {
                to_add: {},
                to_remove: {},
              },
            },
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === address &&
      // Ensure only one token is being added or removed, but not both, and not
      // more than one token. Ideally this component lets you add or remove
      // multiple tokens at once, but that's not supported yet.
      ((msg.wasm.execute.msg.update_cw20_list.to_add.length === 1 &&
        msg.wasm.execute.msg.update_cw20_list.to_remove.length === 0) ||
        (msg.wasm.execute.msg.update_cw20_list.to_add.length === 0 &&
          msg.wasm.execute.msg.update_cw20_list.to_remove.length === 1))
    ) {
      return {
        match: true,
        data: {
          chainId,
          adding: msg.wasm.execute.msg.update_cw20_list.to_add.length === 1,
          address:
            msg.wasm.execute.msg.update_cw20_list.to_add.length === 1
              ? msg.wasm.execute.msg.update_cw20_list.to_add[0]
              : msg.wasm.execute.msg.update_cw20_list.to_remove[0],
        },
      }
    }

    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {},
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === address &&
      ('set_item' in msg.wasm.execute.msg ||
        'remove_item' in msg.wasm.execute.msg)
    ) {
      const adding = 'set_item' in msg.wasm.execute.msg
      const key =
        (adding
          ? msg.wasm.execute.msg.set_item.key
          : msg.wasm.execute.msg.remove_item.key) ?? ''

      if (key.startsWith(POLYTONE_CW20_ITEM_KEY_PREFIX)) {
        // format is `prefix:[chainId]:[address]`
        return {
          match: true,
          data: {
            chainId: key.split(':')[1],
            adding,
            address: key.split(':')[2],
          },
        }
      }
    }

    return { match: false }
  }

  return {
    key: ActionKey.ManageCw20,
    Icon: TokenEmoji,
    label: t('title.manageTreasuryTokens'),
    description: t('info.manageTreasuryTokensDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
