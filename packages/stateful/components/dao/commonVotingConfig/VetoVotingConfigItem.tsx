import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  SelectInput,
  ThumbDownEmoji,
  useChain,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithVeto,
  DurationUnitsValues,
} from '@dao-dao/types'
import {
  makeValidateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { AddressInput } from '../../AddressInput'
import { EntityDisplay } from '../../EntityDisplay'

const VetoInput = ({
  data: {
    veto: { enabled, timelockDuration, earlyExecute, vetoBeforePassed },
  },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()
  const { bech32_prefix: bech32Prefix } = useChain()

  return (
    <div className="flex flex-col gap-3">
      <FormSwitchCard
        containerClassName="self-start"
        fieldName="veto.enabled"
        setValue={setValue}
        sizing="sm"
        value={enabled}
      />

      {enabled && (
        <>
          <div className="space-y-1">
            <InputLabel name={t('form.whoCanVetoProposals')} />

            <AddressInput
              error={errors?.veto?.address}
              fieldName="veto.address"
              register={register}
              setValue={setValue}
              type="contract"
              validation={[makeValidateAddress(bech32Prefix)]}
              watch={watch as any}
            />

            <InputErrorMessage error={errors?.veto?.address} />
          </div>

          <div className="space-y-1">
            <InputLabel
              name={t('form.timelockDuration')}
              tooltip={t('form.timelockDurationTooltip')}
            />

            <div className="flex flex-row gap-2">
              <NumberInput
                containerClassName="grow"
                error={errors?.veto?.timelockDuration?.value}
                fieldName="veto.timelockDuration.value"
                min={0}
                register={register}
                setValue={setValue}
                sizing="sm"
                step={1}
                validation={[validateNonNegative, validateRequired]}
                watch={watch}
              />

              <SelectInput
                error={errors?.veto?.timelockDuration?.units}
                fieldName="veto.timelockDuration.units"
                register={register}
                validation={[validateRequired]}
              >
                {DurationUnitsValues.map((type, idx) => (
                  <option key={idx} value={type}>
                    {t(`unit.${type}`, {
                      count: timelockDuration?.value,
                    }).toLocaleLowerCase()}
                  </option>
                ))}
              </SelectInput>
            </div>
          </div>

          <FormSwitchCard
            containerClassName="self-start"
            fieldName="veto.earlyExecute"
            label={t('form.earlyExecute')}
            setValue={setValue}
            sizing="sm"
            tooltip={t('form.earlyExecuteTooltip')}
            value={earlyExecute}
          />

          <FormSwitchCard
            containerClassName="self-start"
            fieldName="veto.vetoBeforePassed"
            label={t('form.vetoBeforePassed')}
            setValue={setValue}
            sizing="sm"
            tooltip={t('form.vetoBeforePassedTooltip')}
            value={vetoBeforePassed}
          />
        </>
      )}
    </div>
  )
}

const VetoReview = ({
  data: {
    veto: { enabled, address },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithVeto>) => {
  const { t } = useTranslation()
  return enabled ? <EntityDisplay address={address} /> : <>{t('info.none')}</>
}

export const makeVetoVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithVeto> => ({
    Icon: ThumbDownEmoji,
    nameI18nKey: 'title.veto',
    descriptionI18nKey: 'info.vetoDescription',
    Input: VetoInput,
    getInputError: ({
      veto: { address, timelockDuration } = {
        address: undefined,
        timelockDuration: undefined,
      },
    } = {}) => address || timelockDuration?.value || timelockDuration?.units,
    Review: VetoReview,
  })
