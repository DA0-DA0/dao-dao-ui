import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForNone,
} from 'recoil'

import { CommonNftSelectors, DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { ImageEmoji } from '@dao-dao/stateless'
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
import { ContractInfoResponse } from '@dao-dao/types/contracts/Cw721Base'
import {
  CW721_WORKAROUND_ITEM_KEY_PREFIX,
  POLYTONE_CW721_ITEM_KEY_PREFIX,
  getChainForChainId,
  isValidBech32Address,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import {
  ManageCw721Data,
  ManageCw721Component as StatelessManageCw721Component,
} from './Component'

export const useDefaults: UseDefaults<ManageCw721Data> = () => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()

  return {
    chainId,
    adding: true,
    address: '',
    workaround: false,
  }
}

const Component: ActionComponent = (props) => {
  const {
    address,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  const { t } = useTranslation()
  const { fieldNamePrefix } = props

  const { watch, setValue } = useFormContext()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)

  const adding = watch(fieldNamePrefix + 'adding')
  const tokenAddress = watch(fieldNamePrefix + 'address')
  const workaround = watch(fieldNamePrefix + 'workaround')

  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress && isValidBech32Address(tokenAddress, bech32Prefix)
      ? CommonNftSelectors.contractInfoSelector({
          contractAddress: tokenAddress,
          chainId,
          params: [],
        })
      : constSelector(undefined)
  )

  // If token info is improperly formatted, use workaround.
  useEffect(() => {
    if (tokenInfoLoadable.state !== 'hasValue' || !tokenInfoLoadable.contents) {
      return
    }

    // We expect keys to contain exactly `name` and `symbol`. If it contains
    // anything else, use the workaround.
    const keys = Object.keys(tokenInfoLoadable.contents)
    if (
      keys.length !== 2 ||
      !keys.includes('name') ||
      !keys.includes('symbol')
    ) {
      if (!workaround) {
        setValue(fieldNamePrefix + 'workaround', true)
      }
    } else {
      if (workaround) {
        setValue(fieldNamePrefix + 'workaround', false)
      }
    }
  }, [fieldNamePrefix, setValue, tokenInfoLoadable, workaround])

  const existingTokenAddresses = useRecoilValue(
    DaoCoreV2Selectors.allCw721CollectionsSelector({
      contractAddress: address,
      chainId: currentChainId,
    })
  )[chainId]?.collectionAddresses
  const existingTokenInfos = useRecoilValue(
    waitForNone(
      existingTokenAddresses?.map((token) =>
        CommonNftSelectors.contractInfoSelector({
          contractAddress: token,
          chainId,
          params: [],
        })
      ) ?? []
    )
  )
  const existingTokens = useMemo(
    () =>
      (existingTokenAddresses || []).flatMap((address, idx) =>
        existingTokenInfos[idx].state === 'hasValue' &&
        existingTokenInfos[idx].contents
          ? {
              address,
              info: existingTokenInfos[idx].contents as ContractInfoResponse,
            }
          : []
      ),
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
          ? t('error.notCw721Address')
          : noTokensWhenRemoving
          ? t('error.noNftCollections')
          : // Should never happen.
            t('error.unexpectedError')
      )
    }
  }, [
    tokenInfoLoadable.state,
    t,
    additionalAddressError,
    existingTokens,
    adding,
  ])

  return (
    <StatelessManageCw721Component
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

export const makeManageCw721Action: ActionMaker<ManageCw721Data> = ({
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

  const useTransformToCosmos: UseTransformToCosmos<ManageCw721Data> = () =>
    useCallback(
      (data: ManageCw721Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg:
                // If adding for polytone proxy (on other chain), use items
                // instead of the core contract message, like the workaround
                // below.
                data.chainId !== chainId
                  ? data.adding
                    ? {
                        set_item: {
                          key:
                            POLYTONE_CW721_ITEM_KEY_PREFIX +
                            data.chainId +
                            ':' +
                            data.address,
                          [storageItemValueKey]: '1',
                        },
                      }
                    : {
                        remove_item: {
                          key:
                            POLYTONE_CW721_ITEM_KEY_PREFIX +
                            data.chainId +
                            ':' +
                            data.address,
                        },
                      }
                  : // If workaround, set item instead of using core contract message. This is necessary if the contract does not perfectly fit the expected NFT format. See the comment in `./Component.tsx` for more information.
                  data.workaround
                  ? data.adding
                    ? {
                        set_item: {
                          key: CW721_WORKAROUND_ITEM_KEY_PREFIX + data.address,
                          [storageItemValueKey]: '1',
                        },
                      }
                    : {
                        remove_item: {
                          key: CW721_WORKAROUND_ITEM_KEY_PREFIX + data.address,
                        },
                      }
                  : {
                      update_cw721_list: {
                        to_add: data.adding ? [data.address] : [],
                        to_remove: !data.adding ? [data.address] : [],
                      },
                    },
            },
          },
        }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<ManageCw721Data> = (
    msg: Record<string, any>
  ) => {
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              update_cw721_list: {
                to_add: {},
                to_remove: {},
              },
            },
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === address &&
      // Ensure only one collection is being added or removed, but not both, and
      // not more than one collection. Ideally this component lets you add or
      // remove multiple collections at once, but that's not supported yet.
      ((msg.wasm.execute.msg.update_cw721_list.to_add.length === 1 &&
        msg.wasm.execute.msg.update_cw721_list.to_remove.length === 0) ||
        (msg.wasm.execute.msg.update_cw721_list.to_add.length === 0 &&
          msg.wasm.execute.msg.update_cw721_list.to_remove.length === 1))
    ) {
      return {
        match: true,
        data: {
          chainId,
          adding: msg.wasm.execute.msg.update_cw721_list.to_add.length === 1,
          address:
            msg.wasm.execute.msg.update_cw721_list.to_add.length === 1
              ? msg.wasm.execute.msg.update_cw721_list.to_add[0]
              : msg.wasm.execute.msg.update_cw721_list.to_remove[0],
          workaround: false,
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

      if (key.startsWith(CW721_WORKAROUND_ITEM_KEY_PREFIX)) {
        return {
          match: true,
          data: {
            chainId,
            adding,
            address: key.substring(CW721_WORKAROUND_ITEM_KEY_PREFIX.length),
            workaround: true,
          },
        }
      } else if (key.startsWith(POLYTONE_CW721_ITEM_KEY_PREFIX)) {
        // format is `prefix:[chainId]:[address]`
        return {
          match: true,
          data: {
            chainId: key.split(':')[1],
            adding,
            address: key.split(':')[2],
            workaround: false,
          },
        }
      }
    }

    return { match: false }
  }

  return {
    key: ActionKey.ManageCw721,
    Icon: ImageEmoji,
    label: t('title.manageTreasuryNfts'),
    description: t('info.manageTreasuryNftsDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
