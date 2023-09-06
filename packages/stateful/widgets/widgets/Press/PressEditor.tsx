import { instantiate2Address } from '@cosmjs/cosmwasm-stargate'
import { fromHex, toUtf8 } from '@cosmjs/encoding'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { codeDetailsSelector } from '@dao-dao/state/recoil'
import {
  Loader,
  useCachedLoading,
  useDaoInfoContext,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { ActionKey, WidgetEditorProps } from '@dao-dao/types'
import { InstantiateMsg as Cw721InstantiateMsg } from '@dao-dao/types/contracts/Cw721Base'
import { InstantiateMsg as Sg721InstantiateMsg } from '@dao-dao/types/contracts/Sg721Base'

import { useActionOptions } from '../../../actions'
import { PressData } from './types'

export const PressEditor = ({
  fieldNamePrefix,
  allActionsWithData,
  index,
  addAction,
  isCreating,
}: WidgetEditorProps<PressData>) => {
  const { t } = useTranslation()

  const {
    config: { codeIds },
  } = useSupportedChainContext()
  const { name: daoName, coreAddress } = useDaoInfoContext()
  const {
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const { setValue, setError, clearErrors, watch } = useFormContext<PressData>()

  const contract = watch((fieldNamePrefix + 'contract') as 'contract')

  // Ensure instantiate2 action exists with the right fields when editing.
  const codeId = codeIds.Cw721Base || codeIds.Sg721Base || -1
  const codeDetailsLoading = useCachedLoading(
    codeId > -1
      ? codeDetailsSelector({
          chainId,
          codeId,
        })
      : undefined,
    undefined
  )
  const salt = 'DAO DAO Press'
  const instantiate2ActionExists =
    isCreating &&
    allActionsWithData.some(
      ({ actionKey, data }) =>
        actionKey === ActionKey.Instantiate2 &&
        data.chainId === chainId &&
        data.codeId === codeId &&
        data.salt === salt
    )
  // Matches the address of the instantiate2 action.
  const generatedContractAddress =
    codeDetailsLoading.loading || !codeDetailsLoading.data
      ? undefined
      : instantiate2Address(
          fromHex(codeDetailsLoading.data.checksum),
          coreAddress,
          toUtf8(salt),
          bech32Prefix
        )

  useEffect(() => {
    // If not creating, data not loaded yet, or action exists and contract
    // already set, do nothing.
    if (
      !isCreating ||
      !addAction ||
      codeDetailsLoading.loading ||
      !codeDetailsLoading.data ||
      !generatedContractAddress ||
      (instantiate2ActionExists && contract === generatedContractAddress)
    ) {
      return
    }

    const name = `${daoName}'s Press`
    // Otherwise add the instantiate2 action.
    setValue(
      (fieldNamePrefix + 'contract') as 'contract',
      generatedContractAddress
    )
    addAction(
      {
        actionKey: ActionKey.Instantiate2,
        data: {
          chainId,
          admin: coreAddress,
          codeId,
          label: name,
          message: JSON.stringify(
            codeIds.Cw721Base
              ? ({
                  minter: coreAddress,
                  name,
                  symbol: 'PRESS',
                } as Cw721InstantiateMsg)
              : codeIds.Sg721Base
              ? ({
                  collection_info: {
                    creator: coreAddress,
                    description: `${name} on DAO DAO`,
                    // Yin Yang
                    image:
                      'ipfs://bafkreiefe4icv32rsn5l43p776d5rd4yk6expmiita5jt5tqqugc65mbua',
                  },
                  minter: coreAddress,
                  name,
                  symbol: 'PRESS',
                } as Sg721InstantiateMsg)
              : {},
            null,
            2
          ),
          salt,
          funds: [],
        },
      },
      index
    )
  }, [
    addAction,
    bech32Prefix,
    chainId,
    codeDetailsLoading,
    codeId,
    codeIds.Cw721Base,
    codeIds.Sg721Base,
    contract,
    coreAddress,
    daoName,
    isCreating,
    fieldNamePrefix,
    index,
    instantiate2ActionExists,
    salt,
    setValue,
    generatedContractAddress,
  ])

  // Prevent action from being submitted if the contract has not yet been
  // created.
  useEffect(() => {
    if (!contract) {
      setError((fieldNamePrefix + 'contract') as 'contract', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'contract') as 'contract')
    }
  }, [setError, clearErrors, t, contract, fieldNamePrefix])

  return <>{!contract && <Loader fill={false} size={24} />}</>
}
