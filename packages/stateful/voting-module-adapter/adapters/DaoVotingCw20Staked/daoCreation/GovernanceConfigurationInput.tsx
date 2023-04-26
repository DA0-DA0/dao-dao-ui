import { Add } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import {
  Button,
  ChartDataEntry,
  DaoCreateVotingPowerDistributionBarChart,
  FormattedJsonDisplay,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SegmentedControls,
  TextInput,
  VOTING_POWER_DISTRIBUTION_COLORS,
  useChain,
} from '@dao-dao/stateless'
import {
  CreateDaoCustomValidator,
  DaoCreationGovernanceConfigInputProps,
} from '@dao-dao/types'
import {
  NEW_DAO_CW20_DECIMALS,
  formatPercentOf100,
  isValidContractAddress,
  makeValidateContractAddress,
  validatePercent,
  validatePositive,
  validateRequired,
  validateTokenSymbol,
} from '@dao-dao/utils'

import { Trans } from '../../../../components/Trans'
import { DaoVotingCw20StakedAdapter } from '../index'
import { DaoCreationConfig, GovernanceTokenType } from '../types'
import { TierCard } from './TierCard'

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
      watch,
    },
    setCustomValidator,
  },
}: DaoCreationGovernanceConfigInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()
  const { address: walletAddress } = useWallet()

  const {
    fields: tierFields,
    append: appendTier,
    remove: removeTier,
  } = useFieldArray({
    control,
    name: 'votingModuleAdapter.data.tiers',
  })

  const addTierRef = useRef<HTMLButtonElement>(null)
  const addTier = useCallback(() => {
    appendTier(
      cloneDeep(DaoVotingCw20StakedAdapter.daoCreation!.defaultConfig.tiers[0])
    )
    // Scroll button to bottom of screen.
    addTierRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [appendTier])

  // Fill in default first tier info if tiers not yet edited.
  const [loadedPage, setLoadedPage] = useState(false)
  useEffect(() => {
    if (loadedPage) return
    setLoadedPage(true)

    if (
      !(
        data.tiers.length === 1 &&
        data.tiers[0].name === '' &&
        data.tiers[0].members.length === 1 &&
        data.tiers[0].members[0].address === ''
      )
    )
      return

    setValue('votingModuleAdapter.data.tiers.0.name', t('form.defaultTierName'))
    if (walletAddress) {
      setValue(
        'votingModuleAdapter.data.tiers.0.members.0.address',
        walletAddress
      )
    }
  }, [data.tiers, loadedPage, setValue, t, walletAddress])

  //! Validate tiers.
  // Custom validation function for this page. Called upon attempt to navigate
  // forward.
  const customValidator: CreateDaoCustomValidator = useCallback(
    (setNewErrors) => {
      let valid = true

      const totalWeight =
        data.tiers.reduce(
          (acc, { weight, members }) => acc + weight * members.length,
          0
        ) || 0
      // Ensure voting power has been given to at least one member.
      if (totalWeight === 0) {
        if (setNewErrors) {
          setError('votingModuleAdapter.data._tiersError', {
            message: t('error.noVotingPower'),
          })
        }
        valid = false
      } else if (errors?.votingModuleAdapter?.data?._tiersError) {
        clearErrors('votingModuleAdapter.data._tiersError')
      }

      // Ensure each tier has at least one member.
      data.tiers.forEach((tier, tierIndex) => {
        if (tier.members.length === 0) {
          if (setNewErrors) {
            setError(`votingModuleAdapter.data.tiers.${tierIndex}._error`, {
              message: t('error.noMembers'),
            })
          }
          valid = false
        } else if (
          errors?.votingModuleAdapter?.data?.tiers?.[tierIndex]?._error
        ) {
          clearErrors(`votingModuleAdapter.data.tiers.${tierIndex}._error`)
        }
      })

      return valid
    },
    [
      clearErrors,
      data.tiers,
      errors?.votingModuleAdapter?.data?._tiersError,
      errors?.votingModuleAdapter?.data?.tiers,
      setError,
      t,
    ]
  )
  // Update with function reference as needed.
  useEffect(() => {
    setCustomValidator(customValidator)
  }, [customValidator, setCustomValidator])

  //! Validate new governance token.
  const { initialTreasuryPercent, initialSupply } = data.newInfo
  const totalMemberPercent = data.tiers.reduce(
    (acc, { weight }) => acc + weight,
    0
  )
  const govTokenPercentsSumTo100 =
    initialTreasuryPercent + totalMemberPercent === 100

  //! Validate existing governance token.
  const existingGovernanceTokenAddress =
    data.tokenType === GovernanceTokenType.Existing
      ? data.existingGovernanceTokenAddress
      : undefined
  const existingGovernanceTokenInfoLoadable = useRecoilValueLoadable(
    existingGovernanceTokenAddress &&
      isValidContractAddress(existingGovernanceTokenAddress, bech32Prefix)
      ? Cw20BaseSelectors.tokenInfoSelector({
          chainId,
          contractAddress: existingGovernanceTokenAddress,
          params: [],
        })
      : constSelector(undefined)
  )
  const existingGovernanceTokenLogoUrlLoadable = useRecoilValueLoadable(
    existingGovernanceTokenAddress &&
      isValidContractAddress(existingGovernanceTokenAddress, bech32Prefix)
      ? Cw20BaseSelectors.logoUrlSelector({
          chainId,
          contractAddress: existingGovernanceTokenAddress,
        })
      : constSelector(undefined)
  )
  useEffect(() => {
    setValue(
      'votingModuleAdapter.data.existingGovernanceTokenInfo',
      existingGovernanceTokenInfoLoadable.state === 'hasValue'
        ? existingGovernanceTokenInfoLoadable.contents
        : undefined
    )
    setValue(
      'votingModuleAdapter.data.existingGovernanceTokenLogoUrl',
      existingGovernanceTokenLogoUrlLoadable.state === 'hasValue'
        ? existingGovernanceTokenLogoUrlLoadable.contents
        : undefined
    )

    if (existingGovernanceTokenInfoLoadable.state !== 'hasError') {
      if (errors?.votingModuleAdapter?.data?.existingGovernanceTokenInfo) {
        clearErrors(
          'votingModuleAdapter.data.existingGovernanceTokenInfo._error'
        )
      }
      return
    }

    if (!errors?.votingModuleAdapter?.data?.existingGovernanceTokenInfo) {
      setError('votingModuleAdapter.data.existingGovernanceTokenInfo._error', {
        type: 'manual',
        message: t('error.failedToGetTokenInfo', { tokenType: 'CW20' }),
      })
    }
  }, [
    clearErrors,
    errors?.votingModuleAdapter?.data?.existingGovernanceTokenInfo,
    existingGovernanceTokenInfoLoadable,
    existingGovernanceTokenLogoUrlLoadable,
    setError,
    setValue,
    t,
  ])

  //! Bar chart data

  const barData: ChartDataEntry[] =
    tierFields.length === 1
      ? // Displaying each member of the first tier as separate pie wedges.
        data.tiers[0].members.map(({ address }, memberIndex) => ({
          name: address.trim() || t('form.membersAddress'),
          // Governance token-based DAO tier weights are split amongst members.
          value: data.tiers[0].weight / data.tiers[0].members.length,
          color:
            VOTING_POWER_DISTRIBUTION_COLORS[
              memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
            ],
        }))
      : // Displaying entire tier as one pie wedge.
        data.tiers.map(({ name, weight }, tierIndex) => ({
          name: name.trim() || t('title.tierNum', { tier: tierIndex + 1 }),
          // Governance token-based DAO tier weights are split amongst members.
          value: weight,
          color:
            VOTING_POWER_DISTRIBUTION_COLORS[
              tierIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
            ],
        }))

  return (
    <>
      <SegmentedControls
        className="mt-8 mb-4 w-max"
        onSelect={(tokenType) =>
          setValue('votingModuleAdapter.data.tokenType', tokenType)
        }
        selected={data.tokenType}
        tabs={[
          {
            label: t('button.createAToken'),
            value: GovernanceTokenType.New,
          },
          {
            label: t('button.useExistingToken'),
            value: GovernanceTokenType.Existing,
          },
        ]}
      />

      {data.tokenType === GovernanceTokenType.New ? (
        <>
          <div className="mb-10 rounded-lg bg-background-tertiary">
            <div className="flex h-14 flex-row border-b border-border-base p-4">
              <p className="primary-text text-text-body">
                {t('form.tokenDefinition')}
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:flex-row">
              <div className="flex flex-col items-stretch sm:flex-row">
                <div className="flex flex-col items-center gap-5 py-6 px-10">
                  <InputLabel name={t('form.image')} />
                  <ImageSelector
                    Trans={Trans}
                    error={errors.votingModuleAdapter?.data?.newInfo?.imageUrl}
                    fieldName="votingModuleAdapter.data.newInfo.imageUrl"
                    register={register}
                    setValue={setValue}
                    size={40}
                    watch={watch}
                  />
                </div>
                <div className="flex flex-col gap-5 border-y border-border-secondary py-6 px-8 sm:border-y-0 sm:border-x">
                  <InputLabel name={t('form.symbol')} />
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      <p className="flex items-center justify-center rounded-full text-base text-text-tertiary">
                        $
                      </p>
                      <TextInput
                        error={
                          errors.votingModuleAdapter?.data?.newInfo?.symbol
                        }
                        fieldName="votingModuleAdapter.data.newInfo.symbol"
                        placeholder={t('form.governanceTokenSymbolPlaceholder')}
                        register={register}
                        validation={[validateRequired, validateTokenSymbol]}
                      />
                    </div>

                    <InputErrorMessage
                      error={errors.votingModuleAdapter?.data?.newInfo?.symbol}
                    />
                  </div>
                </div>
              </div>
              <div className="flex grow flex-col gap-5 py-6 px-8">
                <InputLabel name={t('form.name')} />
                <div className="flex flex-col">
                  <TextInput
                    error={errors.votingModuleAdapter?.data?.newInfo?.name}
                    fieldName="votingModuleAdapter.data.newInfo.name"
                    placeholder={t('form.governanceTokenNamePlaceholder')}
                    register={register}
                    validation={[validateRequired]}
                  />
                  <InputErrorMessage
                    error={errors.votingModuleAdapter?.data?.newInfo?.name}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center gap-6 border-y border-border-secondary py-7 px-6">
              <p className="primary-text text-text-body">
                {t('form.initialSupply')}
              </p>

              <div className="flex grow flex-col">
                <div className="flex grow flex-row items-center gap-2">
                  <NumberInput
                    className="symbol-small-body-text font-mono leading-5 text-text-secondary"
                    containerClassName="grow"
                    error={
                      errors.votingModuleAdapter?.data?.newInfo?.initialSupply
                    }
                    fieldName="votingModuleAdapter.data.newInfo.initialSupply"
                    ghost
                    register={register}
                    step={1 / 10 ** NEW_DAO_CW20_DECIMALS}
                    validation={[validatePositive, validateRequired]}
                  />
                  <p className="symbol-small-body-text font-mono leading-5 text-text-tertiary">
                    $
                    {data.newInfo.symbol.trim() ||
                      t('info.token').toLocaleUpperCase()}
                  </p>
                </div>

                <InputErrorMessage
                  className="self-end"
                  error={
                    errors.votingModuleAdapter?.data?.newInfo?.initialSupply
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 py-7 px-6">
              <div className="flex flex-row items-center gap-6">
                <p className="primary-text text-text-body">
                  {t('info.treasuryPercent')}
                </p>

                <div className="flex grow flex-col">
                  <div className="flex grow flex-row items-center gap-2">
                    <NumberInput
                      className="symbol-small-body-text font-mono leading-5 text-text-secondary"
                      containerClassName="grow"
                      error={
                        errors.votingModuleAdapter?.data?.newInfo
                          ?.initialTreasuryPercent
                      }
                      fieldName="votingModuleAdapter.data.newInfo.initialTreasuryPercent"
                      ghost
                      register={register}
                      step={0.0001}
                      validation={[
                        validatePercent,
                        validateRequired,
                        // Error displayed in place of description.
                        () => govTokenPercentsSumTo100,
                      ]}
                    />

                    <p className="symbol-small-body-text font-mono leading-5 text-text-tertiary">
                      %
                    </p>
                  </div>

                  <InputErrorMessage
                    className="self-end"
                    error={
                      errors.votingModuleAdapter?.data?.newInfo?.initialSupply
                    }
                  />
                </div>
              </div>

              <p
                className={clsx(
                  'secondary-text',
                  !govTokenPercentsSumTo100 && 'text-text-interactive-error'
                )}
              >
                {govTokenPercentsSumTo100
                  ? t('info.treasuryBalanceDescription', {
                      numberOfTokensMinted: initialSupply,
                      memberPercent: formatPercentOf100(totalMemberPercent),
                      treasuryPercent: formatPercentOf100(
                        initialTreasuryPercent
                      ),
                    })
                  : t('error.govTokenBalancesDoNotSumTo100', {
                      totalPercent: formatPercentOf100(
                        initialTreasuryPercent + totalMemberPercent
                      ),
                    })}
              </p>
            </div>
          </div>

          <div style={{ height: (tierFields.length + 2) * 50 }}>
            <DaoCreateVotingPowerDistributionBarChart data={barData} />
          </div>

          <div className="mt-4 flex flex-col items-stretch gap-4">
            {tierFields.map(({ id }, idx) => (
              <TierCard
                key={id}
                control={control}
                data={data}
                errors={errors}
                register={register}
                remove={
                  tierFields.length === 1 ? undefined : () => removeTier(idx)
                }
                setValue={setValue}
                showColorDotOnMember={tierFields.length === 1}
                tierIndex={idx}
                watch={watch}
              />
            ))}

            <div className="flex flex-col">
              <Button
                className="self-start"
                onClick={addTier}
                ref={addTierRef}
                variant="secondary"
              >
                <Add className="!h-6 !w-6 text-icon-primary" />
                <p>{t('button.addTier')}</p>
              </Button>

              <InputErrorMessage
                error={errors.votingModuleAdapter?.data?._tiersError}
              />
            </div>
          </div>
        </>
      ) : data.tokenType === GovernanceTokenType.Existing ? (
        <div className="rounded-lg bg-background-tertiary">
          <div className="flex h-14 flex-row border-b border-border-base p-4">
            <p className="primary-text text-text-body">
              {t('form.tokenContractAddressTitle')}
            </p>
          </div>

          <div className="space-y-4 p-4">
            <div>
              <TextInput
                className="symbol-small-body-text font-mono text-text-secondary"
                error={
                  errors.votingModuleAdapter?.data
                    ?.existingGovernanceTokenAddress
                }
                fieldName="votingModuleAdapter.data.existingGovernanceTokenAddress"
                ghost
                placeholder={bech32Prefix + '...'}
                register={register}
                validation={[
                  validateRequired,
                  makeValidateContractAddress(bech32Prefix),
                  () =>
                    existingGovernanceTokenInfoLoadable.state !== 'loading' ||
                    !!data.existingGovernanceTokenInfo ||
                    t('info.verifyingGovernanceToken'),
                ]}
              />
              <InputErrorMessage
                error={
                  errors.votingModuleAdapter?.data
                    ?.existingGovernanceTokenAddress ||
                  errors.votingModuleAdapter?.data?.existingGovernanceTokenInfo
                    ?._error
                }
              />
            </div>

            <FormattedJsonDisplay
              jsonLoadable={existingGovernanceTokenInfoLoadable}
              title={t('form.tokenInfo')}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
