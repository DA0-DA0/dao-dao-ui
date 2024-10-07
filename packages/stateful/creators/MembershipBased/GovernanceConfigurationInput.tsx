import { Add } from '@mui/icons-material'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputErrorMessage,
  VotingPowerDistribution,
  VotingPowerDistributionEntry,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  CreateDaoCustomValidator,
  DaoCreationGovernanceConfigInputProps,
} from '@dao-dao/types'
import { DISTRIBUTION_COLORS } from '@dao-dao/utils'

import { MembershipBasedCreator } from '.'
import { EntityDisplay } from '../../components/EntityDisplay'
import { useWallet } from '../../hooks/useWallet'
import { TierCard } from './TierCard'
import { CreatorData } from './types'

export const GovernanceConfigurationInput = ({
  data,
  context: {
    form: {
      control,
      formState: { errors },
      register,
      watch,
      setValue,
      getValues,
      setError,
      clearErrors,
    },
    setCustomValidator,
  },
}: DaoCreationGovernanceConfigInputProps<CreatorData>) => {
  const { t } = useTranslation()
  const { address: walletAddress, isWalletConnected } = useWallet()
  const { config: chainConfig } = useSupportedChainContext()

  const {
    fields: tierFields,
    append: appendTier,
    remove: removeTier,
  } = useFieldArray({
    control,
    name: 'creator.data.tiers',
  })

  const addTierRef = useRef<HTMLButtonElement>(null)
  const addTier = useCallback(() => {
    appendTier(
      cloneDeep(MembershipBasedCreator.makeDefaultConfig(chainConfig).tiers[0])
    )
    // Scroll button to bottom of screen.
    addTierRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [appendTier, chainConfig])

  // Fill in default first tier info if tiers not yet edited.
  const [loadedPage, setLoadedPage] = useState(false)
  useEffect(() => {
    if (loadedPage || !isWalletConnected) {
      return
    }
    setLoadedPage(true)

    if (data.tiers.length !== 1 || data.tiers[0].members.length !== 1) {
      return
    }

    setValue('creator.data.tiers.0.name', t('form.defaultTierName'))
    if (walletAddress) {
      setValue('creator.data.tiers.0.members.0.address', walletAddress)
    }
  }, [isWalletConnected, data.tiers, loadedPage, setValue, t, walletAddress])

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
          setError('creator.data._tiersError', {
            message: t('error.noVotingPower'),
          })
        }
        valid = false
      } else if (errors?.creator?.data?._tiersError) {
        clearErrors('creator.data._tiersError')
      }

      // Ensure each tier has at least one member.
      data.tiers.forEach((tier, tierIndex) => {
        if (tier.members.length === 0) {
          if (setNewErrors) {
            setError(`creator.data.tiers.${tierIndex}._error`, {
              message: t('error.noMembers'),
            })
          }
          valid = false
        } else if (errors?.creator?.data?.tiers?.[tierIndex]?._error) {
          clearErrors(`creator.data.tiers.${tierIndex}._error`)
        }
      })

      return valid
    },
    [
      clearErrors,
      data.tiers,
      errors?.creator?.data?._tiersError,
      errors?.creator?.data?.tiers,
      setError,
      t,
    ]
  )
  // Update with function reference as needed.
  useEffect(() => {
    setCustomValidator(customValidator)
  }, [customValidator, setCustomValidator])

  //! Bar chart data

  const totalVotingPower = data.tiers.reduce(
    (acc, { weight, members }) => acc + weight * members.length,
    0
  )
  const barData: VotingPowerDistributionEntry[] =
    tierFields.length === 1
      ? data.tiers[0].members.map(({ address }, memberIndex) => ({
          address: address.trim(),
          // Backup if address is empty.
          label: t('form.membersAddress'),
          // Membership-based DAO tier weights are for each member.
          votingPowerPercent: (data.tiers[0].weight / totalVotingPower) * 100,
          color: DISTRIBUTION_COLORS[memberIndex % DISTRIBUTION_COLORS.length],
        }))
      : data.tiers.map(({ name, weight, members }, tierIndex) => ({
          label: name.trim() || t('title.tierNum', { tier: tierIndex + 1 }),
          // Membership-based DAO tier weights are for each member.
          votingPowerPercent:
            ((weight * members.length) / totalVotingPower) * 100,
          color: DISTRIBUTION_COLORS[tierIndex % DISTRIBUTION_COLORS.length],
        }))

  return (
    <>
      <VotingPowerDistribution
        // Force re-render when switching between tier-view and member-view.
        key={tierFields.length === 1 ? 'member' : 'tier'}
        EntityDisplay={EntityDisplay}
        data={barData}
      />

      <div className="mt-16 flex flex-col items-stretch gap-4">
        {tierFields.map(({ id }, idx) => (
          <TierCard
            key={id}
            control={control}
            data={data}
            errors={errors}
            getValues={getValues}
            register={register}
            remove={tierFields.length === 1 ? undefined : () => removeTier(idx)}
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

          <InputErrorMessage error={errors.creator?.data?._tiersError} />
        </div>
      </div>
    </>
  )
}
