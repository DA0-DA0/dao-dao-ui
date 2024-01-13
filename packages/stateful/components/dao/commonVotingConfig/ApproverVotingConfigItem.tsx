import { useTranslation } from 'react-i18next'

import {
  FormSwitchCard,
  InputErrorMessage,
  PersonRaisingHandEmoji,
  useChain,
} from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithApprover,
  DaoCreationVotingConfigWithEnableMultipleChoice,
} from '@dao-dao/types'
import { makeValidateAddress } from '@dao-dao/utils'

import { AddressInput } from '../../AddressInput'
import { EntityDisplay } from '../../EntityDisplay'

const ApproverInput = ({
  data: {
    approver: { enabled },
  },
  register,
  setValue,
  watch,
  errors,
}: DaoCreationVotingConfigItemInputProps<
  DaoCreationVotingConfigWithApprover &
    DaoCreationVotingConfigWithEnableMultipleChoice
>) => {
  const { bech32_prefix: bech32Prefix } = useChain()

  return (
    <div className="flex flex-col gap-2">
      <FormSwitchCard
        containerClassName="self-start"
        fieldName="approver.enabled"
        onToggle={(enabled) =>
          // Multiple choice does not work with an approver right now.
          enabled && setValue('enableMultipleChoice', false)
        }
        setValue={setValue}
        sizing="sm"
        value={enabled}
      />

      {enabled && (
        <div className="space-y-1">
          <AddressInput
            error={errors?.approver?.address}
            fieldName="approver.address"
            register={register}
            setValue={setValue}
            validation={[makeValidateAddress(bech32Prefix)]}
            watch={watch as any}
          />

          <InputErrorMessage error={errors?.approver?.address} />
        </div>
      )}
    </div>
  )
}

const ApproverReview = ({
  data: {
    approver: { enabled, address },
  },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithApprover>) => {
  const { t } = useTranslation()
  return enabled ? <EntityDisplay address={address} /> : <>{t('info.none')}</>
}

export const makeApproverVotingConfigItem = (): DaoCreationVotingConfigItem<
  DaoCreationVotingConfigWithApprover &
    DaoCreationVotingConfigWithEnableMultipleChoice
> => ({
  Icon: PersonRaisingHandEmoji,
  nameI18nKey: 'form.approverTitle',
  descriptionI18nKey: 'form.approverDescription',
  Input: ApproverInput,
  getInputError: () => undefined,
  Review: ApproverReview,
})
