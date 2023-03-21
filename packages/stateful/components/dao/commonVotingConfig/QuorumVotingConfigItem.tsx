import { useTranslation } from 'react-i18next'

import { MegaphoneEmoji, NumberInput, SelectInput } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithQuorum,
} from '@dao-dao/types'
import {
  formatPercentOf100,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

const QuorumInput = ({
  data: {
    quorum: { majority },
  },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithQuorum>) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-2">
      {!majority && (
        <NumberInput
          containerClassName="grow min-w-[8rem]"
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
  )
}

const QuorumReview = ({
  data: {
    quorum: { majority, value },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithQuorum>) => {
  const { t } = useTranslation()
  return <>{majority ? t('info.majority') : formatPercentOf100(value)}</>
}

export const makeQuorumVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithQuorum> => ({
    Icon: MegaphoneEmoji,
    nameI18nKey: 'form.quorumTitle',
    descriptionI18nKey: 'form.quorumDescription',
    Input: QuorumInput,
    getInputError: ({ quorum } = {}) => quorum?.majority || quorum?.value,
    Review: QuorumReview,
  })
