import { Add } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import cloneDeep from 'lodash.clonedeep'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  CreateDaoCustomValidator,
  DaoCreationGovernanceConfigInputProps,
} from '@dao-dao/tstypes'
import {
  Button,
  ChartDataEntry,
  DaoCreateVotingPowerDistributionBarChart,
  InputErrorMessage,
  VOTING_POWER_DISTRIBUTION_COLORS,
} from '@dao-dao/ui'

import { CwdVotingCw4Adapter } from '../index'
import { DaoCreationConfig } from '../types'
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
    },
    setCustomValidator,
  },
}: DaoCreationGovernanceConfigInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
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
      cloneDeep(CwdVotingCw4Adapter.daoCreation!.defaultConfig.tiers[0])
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
            message: t('errors.noVotingPower'),
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
              message: t('errors.noMembers'),
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

  //! Bar chart data

  const barData: ChartDataEntry[] =
    tierFields.length === 1
      ? data.tiers[0].members.map(({ address }, memberIndex) => ({
          name: address.trim() || t('form.membersAddress'),
          // Membership-based DAO tier weights are for each member.
          value: data.tiers[0].weight,
          color:
            VOTING_POWER_DISTRIBUTION_COLORS[
              memberIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
            ],
        }))
      : data.tiers.map(({ name, weight, members }, tierIndex) => ({
          name: name.trim() || t('title.tierNum', { tier: tierIndex + 1 }),
          // Membership-based DAO tier weights are for each member.
          value: weight * members.length,
          color:
            VOTING_POWER_DISTRIBUTION_COLORS[
              tierIndex % VOTING_POWER_DISTRIBUTION_COLORS.length
            ],
        }))

  return (
    <>
      <div style={{ height: (tierFields.length + 2) * 50 }}>
        <DaoCreateVotingPowerDistributionBarChart data={barData} />
      </div>

      <div className="mt-16 flex flex-col items-stretch gap-4">
        {tierFields.map(({ id }, idx) => (
          <TierCard
            key={id}
            control={control}
            data={data}
            errors={errors}
            register={register}
            remove={tierFields.length === 1 ? undefined : () => removeTier(idx)}
            setValue={setValue}
            showColorDotOnMember={tierFields.length === 1}
            tierIndex={idx}
          />
        ))}

        <div className="flex flex-col">
          <Button
            className="self-start"
            onClick={addTier}
            ref={addTierRef}
            variant="secondary"
          >
            <Add className="text-icon-primary !h-6 !w-6" />
            <p>{t('button.addTier')}</p>
          </Button>

          <InputErrorMessage
            error={errors.votingModuleAdapter?.data?._tiersError}
          />
        </div>
      </div>
    </>
  )
}
