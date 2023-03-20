import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  MegaphoneEmoji,
  NumberInput,
  SelectInput,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
} from '@dao-dao/types'
import {
  formatPercentOf100,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { DaoCreationConfigWithQuorum } from './types'

export const makeQuorumVotingConfigItem = ({
  canBeDisabled,
}: {
  canBeDisabled: boolean
}) => {
  const QuorumInput = ({
    data: {
      quorumEnabled,
      quorum: { majority },
    },
    register,
    setValue,
    watch,
    errors,
  }: DaoCreationVotingConfigItemInputProps<DaoCreationConfigWithQuorum>) => {
    const { t } = useTranslation()

    return (
      <div className="flex flex-col gap-5">
        {(!canBeDisabled || quorumEnabled) && (
          <div className="flex flex-row gap-2">
            {!majority && (
              <NumberInput
                containerClassName="grow"
                error={errors?.quorum?.value}
                fieldName="quorum.value"
                min={1}
                register={register}
                setValue={setValue}
                sizing="sm"
                step={0.001}
                validation={[validatePositive, validateRequired]}
                watch={watch}
              />
            )}

            <SelectInput
              containerClassName={majority ? 'grow' : undefined}
              onChange={(value) => setValue('quorum.majority', value === '1')}
              validation={[validateRequired]}
              value={majority ? '1' : '0'}
            >
              <option value="1">{t('info.majority')}</option>
              <option value="0">%</option>
            </SelectInput>
          </div>
        )}

        {canBeDisabled && (
          <FormSwitchCard
            fieldName="quorumEnabled"
            setValue={setValue}
            sizing="sm"
            value={quorumEnabled}
          />
        )}
      </div>
    )
  }

  const QuorumReview = ({
    data: {
      quorumEnabled,
      quorum: { majority, value },
    },
  }: DaoCreationVotingConfigItemReviewProps<DaoCreationConfigWithQuorum>) => {
    const { t } = useTranslation()
    return (
      <>
        {!canBeDisabled || quorumEnabled
          ? majority
            ? t('info.majority')
            : formatPercentOf100(value)
          : t('info.disabled')}
      </>
    )
  }

  const QuorumVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfigWithQuorum> =
    {
      Icon: MegaphoneEmoji,
      nameI18nKey: 'form.quorumTitle',
      descriptionI18nKey: 'form.quorumDescription',
      Input: QuorumInput,
      getInputError: ({ quorumEnabled, quorum } = {}) =>
        (canBeDisabled ? quorumEnabled : undefined) ||
        quorum?.majority ||
        quorum?.value,
      Review: QuorumReview,
    }

  return QuorumVotingConfigItem
}
