import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  ProposalVetoConfigurer,
  ThumbDownEmoji,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithVeto,
} from '@dao-dao/types'

import { useCreateCw1Whitelist } from '../../../hooks'
import { AddressInput } from '../../AddressInput'

const VetoInput = ({
  data: { veto },
  fieldNamePrefix,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()

  const { setValue, setError, clearErrors, trigger } =
    useFormContext<DaoCreationVotingConfigWithVeto>()

  const {
    creatingCw1Whitelist: creatingCw1WhitelistVetoers,
    createCw1Whitelist: createCw1WhitelistVetoers,
  } = useCreateCw1Whitelist({
    // Trigger veto address field validations.
    validation: async () => {
      await trigger((fieldNamePrefix + 'veto.addresses') as 'veto.addresses', {
        shouldFocus: true,
      })
    },
    contractLabel: 'Multi-Vetoer cw1-whitelist',
  })

  const { enabled, addresses, cw1WhitelistAddress } = veto

  // Prevent submission if the cw1-whitelist contract has not yet been created
  // and it needs to be.
  const vetoAddressesLength = addresses.length
  useEffect(() => {
    if (vetoAddressesLength > 1 && !cw1WhitelistAddress) {
      setError(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress',
        {
          type: 'manual',
          message: t('error.accountListNeedsSaving'),
        }
      )
    } else {
      clearErrors(
        (fieldNamePrefix +
          'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress'
      )
    }
  }, [
    setError,
    clearErrors,
    t,
    vetoAddressesLength,
    cw1WhitelistAddress,
    fieldNamePrefix,
  ])

  return (
    <div className="flex flex-col gap-3">
      <FormSwitchCard
        containerClassName="self-start"
        fieldName={(fieldNamePrefix + 'veto.enabled') as 'veto.enabled'}
        setValue={setValue}
        sizing="sm"
        value={enabled}
      />

      {enabled && (
        <ProposalVetoConfigurer
          AddressInput={AddressInput}
          className="flex flex-col gap-3"
          createCw1WhitelistVetoers={createCw1WhitelistVetoers}
          creatingCw1WhitelistVetoers={creatingCw1WhitelistVetoers}
          errors={errors?.veto}
          fieldNamePrefix="veto."
          veto={veto}
        />
      )}
    </div>
  )
}

const VetoReview = ({
  data: {
    veto: { enabled },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()
  return <>{enabled ? t('info.enabled') : t('info.disabled')}</>
}

export const makeVetoVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithVeto> => ({
    Icon: ThumbDownEmoji,
    nameI18nKey: 'title.veto',
    descriptionI18nKey: 'info.vetoDescription',
    tooltipI18nKey: 'info.daoVetoerExplanation',
    Input: VetoInput,
    getInputError: ({
      veto: { timelockDuration } = {
        timelockDuration: undefined,
      },
    } = {}) => timelockDuration?.value || timelockDuration?.units,
    Review: VetoReview,
  })
