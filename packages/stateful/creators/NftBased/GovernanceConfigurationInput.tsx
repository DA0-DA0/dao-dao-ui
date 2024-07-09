import { useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  cw721BaseQueries,
  omniflixQueries,
  secretContractCodeHashSelector,
} from '@dao-dao/state'
import {
  InputErrorMessage,
  Loader,
  TextInput,
  useChain,
} from '@dao-dao/stateless'
import { ChainId, DaoCreationGovernanceConfigInputProps } from '@dao-dao/types'
import {
  isSecretNetwork,
  isValidBech32Address,
  makeValidateAddress,
  validateRequired,
} from '@dao-dao/utils'

import { CreatorData, GovernanceTokenType } from './types'

export const GovernanceConfigurationInput = ({
  data,
  context: {
    form: {
      formState: { errors },
      register,
      setValue,
      setError,
      clearErrors,
    },
  },
}: DaoCreationGovernanceConfigInputProps<CreatorData>) => {
  const { t } = useTranslation()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()
  const isOmniFlix =
    chainId === ChainId.OmniflixHubMainnet ||
    chainId === ChainId.OmniflixHubTestnet

  //! Validate existing governance token.
  const existingGovernanceNftCollectionAddress =
    data.tokenType === GovernanceTokenType.Existing
      ? data.existingGovernanceNftCollectionAddress
      : undefined
  const existingAddressValid =
    !!existingGovernanceNftCollectionAddress &&
    (isOmniFlix ||
      isValidBech32Address(
        existingGovernanceNftCollectionAddress,
        bech32Prefix
      ))

  const collectionInfoLoadable = useQueries({
    queries: [
      {
        ...omniflixQueries.onftCollectionInfo({
          chainId,
          id: existingGovernanceNftCollectionAddress || '',
        }),
        enabled: isOmniFlix && existingAddressValid,
      },
      {
        ...cw721BaseQueries.contractInfo({
          chainId,
          contractAddress: existingGovernanceNftCollectionAddress || '',
        }),
        enabled: !isOmniFlix && existingAddressValid,
      },
    ],
    combine: ([omniflixResult, cw721Result]) =>
      isOmniFlix ? omniflixResult : cw721Result,
  })

  const secretCodeHashLoadable = useRecoilValueLoadable(
    existingAddressValid && isSecretNetwork(chainId)
      ? secretContractCodeHashSelector({
          chainId,
          contractAddress: existingGovernanceNftCollectionAddress,
        })
      : constSelector(undefined)
  )

  useEffect(() => {
    if (isSecretNetwork(chainId)) {
      setValue(
        'creator.data.secretCodeHash',
        secretCodeHashLoadable.valueMaybe()
      )
    }

    setValue(
      'creator.data.existingCollectionInfo',
      !collectionInfoLoadable.isFetched || collectionInfoLoadable.isFetching
        ? undefined
        : collectionInfoLoadable.data
    )

    if (!collectionInfoLoadable.isError) {
      if (errors?.creator?.data?.existingCollectionInfo) {
        clearErrors('creator.data.existingCollectionInfo')
      }
      return
    }

    if (!errors?.creator?.data?.existingCollectionInfo) {
      setError('creator.data.existingCollectionInfo', {
        type: 'manual',
        message: t('error.failedToGetTokenInfo', {
          tokenType: isOmniFlix ? 'ONFT' : 'CW721',
        }),
      })
    }
  }, [
    chainId,
    clearErrors,
    collectionInfoLoadable,
    errors?.creator?.data?.existingCollectionInfo,
    isOmniFlix,
    secretCodeHashLoadable,
    setError,
    setValue,
    t,
  ])

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        <div className="flex h-14 flex-row border-b border-border-base p-4">
          <p className="primary-text text-text-body">
            {t('form.nftCollectionAddress')}
          </p>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <TextInput
              className="symbol-small-body-text font-mono text-text-secondary"
              error={
                errors.creator?.data?.existingGovernanceNftCollectionAddress
              }
              fieldName="creator.data.existingGovernanceNftCollectionAddress"
              ghost
              placeholder={
                (isOmniFlix
                  ? // eslint-disable-next-line i18next/no-literal-string
                    'onftdenom'
                  : bech32Prefix) + '...'
              }
              register={register}
              validation={[
                validateRequired,
                ...(!isOmniFlix ? [makeValidateAddress(bech32Prefix)] : []),
              ]}
            />
            <InputErrorMessage
              error={
                errors.creator?.data?.existingGovernanceNftCollectionAddress ||
                errors.creator?.data?.existingCollectionInfo
              }
            />
          </div>

          {!!existingAddressValid &&
            (collectionInfoLoadable.isPending ? (
              <Loader />
            ) : !collectionInfoLoadable.isError ? (
              <p className="primary-text text-text-interactive-valid">
                ${collectionInfoLoadable.data.symbol}
              </p>
            ) : (
              <InputErrorMessage error={collectionInfoLoadable.error} />
            ))}
        </div>
      </div>
    </>
  )
}
