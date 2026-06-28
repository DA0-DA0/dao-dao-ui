/* eslint-disable i18next/no-literal-string */
import { Add, DeleteRounded } from '@mui/icons-material'
import { useQueries } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  contractQueries,
  cw721BaseQueries,
  omniflixQueries,
} from '@dao-dao/state'
import {
  Button,
  InputErrorMessage,
  InputLabel,
  Loader,
  NumericInput,
  SegmentedControls,
  TextInput,
  useChain,
} from '@dao-dao/stateless'
import {
  ChainId,
  CreateDaoCustomValidator,
  DaoCreationGovernanceConfigInputProps,
} from '@dao-dao/types'
import {
  isSecretNetwork,
  isValidBech32Address,
  makeValidateAddress,
  mustGetSupportedChainConfig,
  validatePositive,
  validateRequired,
  validateTokenSymbol,
} from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../hooks'
import { useWallet } from '../../hooks/useWallet'
import { CreatorData, GovernanceTokenType, NftVotingModuleType } from './types'

export const GovernanceConfigurationInput = ({
  data,
  context: {
    form: {
      control,
      formState: { errors },
      register,
      setValue,
      setError,
      clearErrors,
    },
    setCustomValidator,
  },
}: DaoCreationGovernanceConfigInputProps<CreatorData>) => {
  const { t } = useTranslation()
  const { address: walletAddress } = useWallet()
  const { chainId, bech32Prefix } = useChain()
  const isOmniFlix =
    chainId === ChainId.OmniflixHubMainnet ||
    chainId === ChainId.OmniflixHubTestnet
  const { codeIds } = mustGetSupportedChainConfig(chainId)
  const rolesCodeIdsConfigured =
    !!codeIds.DaoVotingCw721Roles && !!codeIds.Cw721Roles
  const isRolesUnsupported =
    isSecretNetwork(chainId) || isOmniFlix || !rolesCodeIdsConfigured
  const isRoles = data.votingModuleType === NftVotingModuleType.Roles

  const {
    fields: initialNfts,
    append: appendInitialNft,
    remove: removeInitialNft,
  } = useFieldArray({
    control,
    name: 'creator.data.initialNfts',
  })

  useEffect(() => {
    if (isRolesUnsupported && isRoles) {
      setValue('creator.data.votingModuleType', NftVotingModuleType.Staked)
      setValue('creator.data.tokenType', GovernanceTokenType.Existing)
    }
  }, [isRoles, isRolesUnsupported, setValue])

  useEffect(() => {
    if (
      isRoles &&
      data.tokenType === GovernanceTokenType.New &&
      data.initialNfts.length === 1 &&
      data.initialNfts[0].owner === '' &&
      walletAddress
    ) {
      setValue('creator.data.initialNfts.0.owner', walletAddress)
    }
  }, [data.initialNfts, data.tokenType, isRoles, setValue, walletAddress])

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

  const secretCodeHash = useQueryLoadingDataWithError(
    existingAddressValid && !isRoles && isSecretNetwork(chainId)
      ? contractQueries.secretCodeHash({
          chainId,
          address: existingGovernanceNftCollectionAddress,
        })
      : undefined
  )

  useEffect(() => {
    if (isSecretNetwork(chainId) && !isRoles) {
      setValue(
        'creator.data.secretCodeHash',
        secretCodeHash.loading ||
          secretCodeHash.updating ||
          secretCodeHash.errored
          ? undefined
          : secretCodeHash.data
      )
    }

    if (data.tokenType === GovernanceTokenType.Existing) {
      setValue(
        'creator.data.existingCollectionInfo',
        !collectionInfoLoadable.isFetched || collectionInfoLoadable.isFetching
          ? undefined
          : collectionInfoLoadable.data
      )
    } else {
      setValue('creator.data.existingCollectionInfo', undefined)
    }

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
    data.tokenType,
    errors?.creator?.data?.existingCollectionInfo,
    isOmniFlix,
    isRoles,
    secretCodeHash,
    setError,
    setValue,
    t,
  ])

  const customValidator: CreateDaoCustomValidator = useCallback(
    (setNewErrors) => {
      if (!isRoles || data.tokenType !== GovernanceTokenType.New) {
        if (errors?.creator?.data?.initialNfts) {
          clearErrors('creator.data.initialNfts')
        }

        return true
      }

      const totalWeight = data.initialNfts.reduce(
        (sum, { weight }) => sum + Number(weight || 0),
        0
      )
      const valid = data.initialNfts.length > 0 && totalWeight > 0

      if (!valid) {
        if (setNewErrors) {
          setError('creator.data.initialNfts', {
            message: t('error.noVotingPower'),
          })
        }
      } else if (errors?.creator?.data?.initialNfts) {
        clearErrors('creator.data.initialNfts')
      }

      return valid
    },
    [
      clearErrors,
      data.initialNfts,
      data.tokenType,
      errors?.creator?.data?.initialNfts,
      isRoles,
      setError,
      t,
    ]
  )
  useEffect(() => {
    setCustomValidator(customValidator)
  }, [customValidator, setCustomValidator])

  return (
    <>
      <SegmentedControls
        className="mt-8 mb-4 w-max"
        onSelect={(votingModuleType) => {
          setValue('creator.data.votingModuleType', votingModuleType)
          setValue(
            'creator.data.tokenType',
            votingModuleType === NftVotingModuleType.Roles
              ? GovernanceTokenType.New
              : GovernanceTokenType.Existing
          )
        }}
        selected={data.votingModuleType}
        tabs={[
          {
            // eslint-disable-next-line i18next/no-literal-string
            label: 'Staked NFT',
            value: NftVotingModuleType.Staked,
          },
          {
            // eslint-disable-next-line i18next/no-literal-string
            label: 'Role NFT',
            value: NftVotingModuleType.Roles,
            disabled: isRolesUnsupported,
            tooltip: isRolesUnsupported
              ? !rolesCodeIdsConfigured
                ? // eslint-disable-next-line i18next/no-literal-string
                  'Role NFT DAO creation requires configured cw721-roles and dao-voting-cw721-roles code IDs.'
                : // eslint-disable-next-line i18next/no-literal-string
                  'Role NFTs are only supported on CW721 chains.'
              : undefined,
          },
        ]}
      />

      {isRoles && (
        <SegmentedControls
          className="mb-4 w-max"
          onSelect={(tokenType) =>
            setValue('creator.data.tokenType', tokenType)
          }
          selected={data.tokenType}
          tabs={[
            {
              // eslint-disable-next-line i18next/no-literal-string
              label: 'Create a collection',
              value: GovernanceTokenType.New,
            },
            {
              // eslint-disable-next-line i18next/no-literal-string
              label: 'Use existing collection',
              value: GovernanceTokenType.Existing,
            },
          ]}
        />
      )}

      {isRoles && data.tokenType === GovernanceTokenType.New ? (
        <div className="rounded-lg bg-background-tertiary">
          <div className="flex h-14 flex-row border-b border-border-base p-4">
            <p className="primary-text text-text-body">
              {/* eslint-disable-next-line i18next/no-literal-string */}
              Role NFT collection
            </p>
          </div>

          <div className="flex flex-col items-stretch sm:flex-row">
            <div className="flex flex-col gap-5 border-b border-border-secondary py-6 px-8 sm:border-b-0 sm:border-r">
              <InputLabel name={t('form.symbol')} />
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <p className="flex items-center justify-center rounded-full text-base text-text-tertiary">
                    $
                  </p>
                  <TextInput
                    error={errors.creator?.data?.newInfo?.symbol}
                    fieldName="creator.data.newInfo.symbol"
                    placeholder={t('form.governanceTokenSymbolPlaceholder')}
                    register={register}
                    validation={[validateRequired, validateTokenSymbol]}
                  />
                </div>

                <InputErrorMessage
                  error={errors.creator?.data?.newInfo?.symbol}
                />
              </div>
            </div>

            <div className="flex grow flex-col gap-5 py-6 px-8">
              <InputLabel name={t('form.name')} />
              <div className="flex flex-col">
                <TextInput
                  error={errors.creator?.data?.newInfo?.name}
                  fieldName="creator.data.newInfo.name"
                  placeholder={t('form.governanceTokenNamePlaceholder')}
                  register={register}
                  validation={[validateRequired]}
                />
                <InputErrorMessage
                  error={errors.creator?.data?.newInfo?.name}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-border-secondary p-4">
            <div className="flex flex-row items-center justify-between gap-4">
              <p className="primary-text text-text-body">
                {/* eslint-disable-next-line i18next/no-literal-string */}
                Initial role NFTs
              </p>

              <Button
                onClick={() =>
                  appendInitialNft({
                    owner: walletAddress || '',
                    tokenId: '',
                    role: 'agent',
                    weight: 1,
                    tokenUri: '',
                  })
                }
                variant="secondary"
              >
                <Add className="!h-5 !w-5" />
                <p>{t('button.add')}</p>
              </Button>
            </div>

            {initialNfts.map(({ id }, index) => (
              <div
                key={id}
                className="grid grid-cols-1 gap-3 rounded-md border border-border-secondary p-4 md:grid-cols-2"
              >
                <div className="flex flex-col gap-2">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <InputLabel name="Owner" />
                  <TextInput
                    error={errors.creator?.data?.initialNfts?.[index]?.owner}
                    fieldName={`creator.data.initialNfts.${index}.owner`}
                    placeholder={bech32Prefix + '...'}
                    register={register}
                    validation={[
                      validateRequired,
                      makeValidateAddress(bech32Prefix),
                    ]}
                  />
                  <InputErrorMessage
                    error={errors.creator?.data?.initialNfts?.[index]?.owner}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <InputLabel name="Token ID" />
                  <TextInput
                    error={errors.creator?.data?.initialNfts?.[index]?.tokenId}
                    fieldName={`creator.data.initialNfts.${index}.tokenId`}
                    register={register}
                    validation={[validateRequired]}
                  />
                  <InputErrorMessage
                    error={errors.creator?.data?.initialNfts?.[index]?.tokenId}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <InputLabel name="Role" />
                  <TextInput
                    fieldName={`creator.data.initialNfts.${index}.role`}
                    placeholder="agent"
                    register={register}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <InputLabel name="Weight" />
                  <NumericInput
                    error={errors.creator?.data?.initialNfts?.[index]?.weight}
                    fieldName={`creator.data.initialNfts.${index}.weight`}
                    min={1}
                    register={register}
                    step={1}
                    validation={[
                      validateRequired,
                      validatePositive,
                      (weight) =>
                        Number.isInteger(Number(weight)) ||
                        // eslint-disable-next-line i18next/no-literal-string
                        'Must be a whole number',
                    ]}
                  />
                  <InputErrorMessage
                    error={errors.creator?.data?.initialNfts?.[index]?.weight}
                  />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  {/* eslint-disable-next-line i18next/no-literal-string */}
                  <InputLabel name="Token URI" />
                  <TextInput
                    fieldName={`creator.data.initialNfts.${index}.tokenUri`}
                    register={register}
                  />
                </div>

                {initialNfts.length > 1 && (
                  <Button
                    className="justify-self-start md:col-span-2"
                    onClick={() => removeInitialNft(index)}
                    variant="secondary"
                  >
                    <DeleteRounded className="!h-5 !w-5" />
                    <p>{t('button.remove')}</p>
                  </Button>
                )}
              </div>
            ))}

            <InputErrorMessage error={errors.creator?.data?.initialNfts} />
          </div>
        </div>
      ) : (
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
                  errors.creator?.data
                    ?.existingGovernanceNftCollectionAddress ||
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

            {isRoles && (
              <p className="secondary-text">
                {/* eslint-disable-next-line i18next/no-literal-string */}
                Existing collections must be cw721-roles compatible and
                DAO-controlled.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
