import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { ImageEmoji } from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
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
  isValidContractAddress,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { ManageCw721Component as StatelessManageCw721Component } from './Component'

interface ManageCw721Data {
  adding: boolean
  address: string
  // The core contract validates that the submitted contract is a CW721
  // (https://github.com/DA0-DA0/dao-contracts/blob/main/contracts/dao-core/src/contract.rs#L442-L447),
  // but unfortunately it is too restrictive. It only succeeds if the contract
  // has the cw721-base ContractInfo response. To allow other NFT contracts to
  // be added, we can manually use storage items.
  workaround: boolean
}

export const useDefaults: UseDefaults<ManageCw721Data> = () => ({
  adding: true,
  address: '',
  workaround: false,
})

const Component: ActionComponent = (props) => {
  const { address, chainId, bech32Prefix } = useActionOptions()

  const { t } = useTranslation()
  const { fieldNamePrefix } = props

  const { watch, setValue } = useFormContext()
  const adding = watch(fieldNamePrefix + 'adding')
  const tokenAddress = watch(fieldNamePrefix + 'address')
  const workaround = watch(fieldNamePrefix + 'workaround')

  const tokenInfoLoadable = useRecoilValueLoadable(
    tokenAddress && isValidContractAddress(tokenAddress, bech32Prefix)
      ? Cw721BaseSelectors.contractInfoSelector({
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
    DaoCoreV2Selectors.allCw721TokenListSelector({
      contractAddress: address,
      chainId,
    })
  )
  const existingTokenInfos = useRecoilValue(
    waitForAll(
      existingTokenAddresses?.map((token) =>
        Cw721BaseSelectors.contractInfoSelector({
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
        .map((address, idx) => ({
          address,
          info: existingTokenInfos[idx],
        }))
        // If undefined token info response, ignore the token.
        .filter(({ info }) => !!info) ?? []) as {
        address: string
        info: ContractInfoResponse
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
}) => {
  // Only DAOs.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  // V1 DAOs and V2-alpha DAOs use a value key of `addr`, V2-beta uses `value`.
  const storageItemValueKey =
    context.info.coreVersion === ContractVersion.V1 ||
    context.info.coreVersion === ContractVersion.V2Alpha
      ? 'addr'
      : 'value'

  const useTransformToCosmos: UseTransformToCosmos<ManageCw721Data> = () =>
    useCallback(
      (data: ManageCw721Data) =>
        makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: address,
              funds: [],
              msg: data.workaround
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
      msg.wasm.execute.contract_addr === address &&
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
      ('set_item' in msg.wasm.execute.msg ||
        'remove_item' in msg.wasm.execute.msg)
    ) {
      const adding = 'set_item' in msg.wasm.execute.msg
      const key =
        (adding
          ? msg.wasm.execute.msg.set_item.key
          : msg.wasm.execute.msg.remove_item.key) ?? ''
      if (!key.startsWith(CW721_WORKAROUND_ITEM_KEY_PREFIX)) {
        return { match: false }
      }

      return {
        match: true,
        data: {
          adding,
          address: key.substring(CW721_WORKAROUND_ITEM_KEY_PREFIX.length),
          workaround: true,
        },
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
