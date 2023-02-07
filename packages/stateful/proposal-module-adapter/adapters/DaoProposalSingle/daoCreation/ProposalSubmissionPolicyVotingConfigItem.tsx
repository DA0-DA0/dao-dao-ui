import { useTranslation } from 'react-i18next'

import { LockWithPenEmoji, SegmentedControls } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
} from '@dao-dao/types'

import { DaoCreationConfig } from '../types'

export const ProposalSubmissionPolicyVotingConfigItemInput = ({
  data: { anyoneCanPropose },
  setValue,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfig>) => {
  const { t } = useTranslation()

  return (
    <SegmentedControls
      onSelect={(value) => setValue('anyoneCanPropose', value)}
      selected={anyoneCanPropose}
      tabs={[
        {
          label: t('info.onlyMembers'),
          value: false,
        },
        {
          label: t('info.anyone'),
          value: true,
        },
      ]}
    />
  )
}

export const ProposalSubmissionPolicyVotingConfigItemReview = ({
  data: { anyoneCanPropose },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfig>) => {
  const { t } = useTranslation()
  return <>{anyoneCanPropose ? t('info.anyone') : t('info.onlyMembers')}</>
}

export const ProposalSubmissionPolicyVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfig> =
  {
    Icon: LockWithPenEmoji,
    nameI18nKey: 'form.proposalSubmissionPolicyTitle',
    descriptionI18nKey: 'form.proposalSubmissionPolicyDescription',
    Input: ProposalSubmissionPolicyVotingConfigItemInput,
    getInputError: ({ anyoneCanPropose } = {}) => anyoneCanPropose,
    Review: ProposalSubmissionPolicyVotingConfigItemReview,
  }
