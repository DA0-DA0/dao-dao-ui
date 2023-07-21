import { Add } from '@mui/icons-material'
import { useCallback, useEffect, useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state'
import {
  Button,
  FormattedJsonDisplay,
  InputErrorMessage,
  InputLabel,
  SegmentedControls,
  TextInput,
  VOTING_POWER_DISTRIBUTION_COLORS,
  VotingPowerDistribution,
  VotingPowerDistributionEntry,
  useChain,
} from '@dao-dao/stateless'
import { DaoCreationGovernanceConfigInputProps } from '@dao-dao/types'
import {
  getScrollParent,
  isValidContractAddress,
  makeValidateContractAddress,
  validateRequired,
  validateTokenSymbol,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../components/EntityDisplay'
import { NewInitialNftCard } from './NewInitialNftCard'
import { CreatorData, GovernanceTokenType } from './types'

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
  },
}: DaoCreationGovernanceConfigInputProps<CreatorData>) => {
  const { t } = useTranslation()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()

  //! Validate existing governance token.
  const existingGovernanceTokenDenomOrAddress =
    data.tokenType === GovernanceTokenType.Existing
      ? data.existingGovernanceTokenDenomOrAddress
      : undefined
  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    existingGovernanceTokenDenomOrAddress &&
      isValidContractAddress(
        existingGovernanceTokenDenomOrAddress,
        bech32Prefix
      )
      ? Cw721BaseSelectors.contractInfoSelector({
          chainId,
          contractAddress: existingGovernanceTokenDenomOrAddress,
          params: [],
        })
      : constSelector(undefined)
  )
  const numOfTokensLoadable = useRecoilValueLoadable(
    existingGovernanceTokenDenomOrAddress &&
      isValidContractAddress(
        existingGovernanceTokenDenomOrAddress,
        bech32Prefix
      )
      ? Cw721BaseSelectors.numTokensSelector({
          chainId,
          contractAddress: existingGovernanceTokenDenomOrAddress,
          params: [],
        })
      : constSelector(undefined)
  )

  useEffect(() => {
    setValue(
      'creator.data.existingGovernanceTokenInfo',
      existingGovernanceTokenInfoLoadable.state === 'hasValue'
        ? existingGovernanceTokenInfoLoadable.contents
        : undefined
    )

    if (existingGovernanceTokenInfoLoadable.state !== 'hasError') {
      if (errors?.creator?.data?.existingGovernanceTokenInfo) {
        clearErrors('creator.data.existingGovernanceTokenInfo._error')
      }
      return
    }

    if (!errors?.creator?.data?.existingGovernanceTokenInfo) {
      setError('creator.data.existingGovernanceTokenInfo._error', {
        type: 'manual',
        message: t('error.failedToGetTokenInfo', { tokenType: 'CW721' }),
      })
    }
  }, [
    clearErrors,
    errors?.creator?.data?.existingGovernanceTokenInfo,
    existingGovernanceTokenInfoLoadable,
    setError,
    setValue,
    t,
  ])

  const {
    fields: initialNftFields,
    append: appendInitialNft,
    remove: removeInitialNft,
  } = useFieldArray({
    control,
    name: 'creator.data.newInfo.initialNfts',
  })

  const addInitialNftRef = useRef<HTMLButtonElement>(null)
  const addInitialNft = useCallback(() => {
    appendInitialNft({
      owner: '',
      token_uri: '',
    })
    // Scroll button to bottom of screen.
    setTimeout(() => {
      if (!addInitialNftRef.current) {
        return
      }

      const parent = getScrollParent(addInitialNftRef.current)
      if (!parent) {
        return
      }

      parent.scrollTo({
        behavior: 'smooth',
        top: parent.scrollHeight,
      })
    }, 100)
  }, [appendInitialNft])

  const countPerMember = data.newInfo.initialNfts.reduce((acc, { owner }) => {
    const member = owner.trim()
    return {
      ...acc,
      [member]: (acc[member] || 0) + 1,
    }
  }, {} as Record<string, number>)
  const barData: VotingPowerDistributionEntry[] = Object.entries(
    countPerMember
  ).map(([member, count], memberIndex) => ({
    address: member,
    // Backup if address is empty.
    label: t('form.membersAddress'),
    votingPowerPercent: (count / data.newInfo.initialNfts.length) * 100,
    color:
      VOTING_POWER_DISTRIBUTION_COLORS[
        memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
      ],
  }))

  return (
    <>
      <SegmentedControls
        className="mt-8 mb-4 w-max"
        onSelect={(tokenType) => setValue('creator.data.tokenType', tokenType)}
        selected={data.tokenType}
        tabs={[
          {
            label: t('button.createACollection'),
            value: GovernanceTokenType.New,
          },
          {
            label: t('button.useExistingCollection'),
            value: GovernanceTokenType.Existing,
          },
        ]}
      />

      {data.tokenType === GovernanceTokenType.New ? (
        <>
          <div className="mb-10 rounded-lg bg-background-tertiary">
            <div className="flex h-14 flex-row border-b border-border-base p-4">
              <p className="primary-text text-text-body">
                {t('form.collectionDefinition')}
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:flex-row">
              <div className="flex flex-col gap-5 border-border-secondary py-6 px-8 sm:border-r">
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
          </div>

          <p className="title-text mb-8">{t('title.initialNftDistribution')}</p>

          <VotingPowerDistribution
            EntityDisplay={EntityDisplay}
            className="mb-6"
            data={barData}
          />

          <div className="flex flex-col items-stretch gap-4">
            {initialNftFields.map(({ id }, idx) => (
              <NewInitialNftCard
                key={id}
                index={idx}
                remove={() => removeInitialNft(idx)}
              />
            ))}

            <div className="flex flex-col">
              <Button
                className="self-start"
                onClick={addInitialNft}
                ref={addInitialNftRef}
                variant="secondary"
              >
                <Add className="!h-6 !w-6 text-icon-primary" />
                <p>{t('button.addNft')}</p>
              </Button>
            </div>
          </div>
        </>
      ) : data.tokenType === GovernanceTokenType.Existing ? (
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
                  errors.creator?.data?.existingGovernanceTokenDenomOrAddress
                }
                fieldName="creator.data.existingGovernanceTokenDenomOrAddress"
                ghost
                placeholder={bech32Prefix + '...'}
                register={register}
                validation={[
                  validateRequired,
                  makeValidateContractAddress(bech32Prefix),
                ]}
              />
              <InputErrorMessage
                error={
                  errors.creator?.data?.existingGovernanceTokenDenomOrAddress ||
                  errors.creator?.data?.existingGovernanceTokenInfo?._error
                }
              />
            </div>

            <FormattedJsonDisplay
              jsonLoadable={existingGovernanceTokenInfoLoadable}
              title={t('title.collectionInfo')}
            />
            <FormattedJsonDisplay
              jsonLoadable={numOfTokensLoadable}
              title={t('title.totalSupply')}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
