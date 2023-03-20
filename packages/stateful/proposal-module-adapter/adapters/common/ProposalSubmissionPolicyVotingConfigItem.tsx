import { useTranslation } from 'react-i18next'

import { LockWithPenEmoji, SegmentedControls } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
} from '@dao-dao/types'

import { DaoCreationConfigWithProposalSubmissionPolicy } from './types'

const ProposalSubmissionPolicyVotingConfigItemInput = ({
  data: { anyoneCanPropose },
  setValue,
}: DaoCreationVotingConfigItemInputProps<DaoCreationConfigWithProposalSubmissionPolicy>) => {
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

const ProposalSubmissionPolicyVotingConfigItemReview = ({
  data: { anyoneCanPropose },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationConfigWithProposalSubmissionPolicy>) => {
  const { t } = useTranslation()
  return <>{anyoneCanPropose ? t('info.anyone') : t('info.onlyMembers')}</>
}

export const ProposalSubmissionPolicyVotingConfigItem: DaoCreationVotingConfigItem<DaoCreationConfigWithProposalSubmissionPolicy> =
  {
    Icon: LockWithPenEmoji,
    nameI18nKey: 'form.proposalSubmissionPolicyTitle',
    descriptionI18nKey: 'form.proposalSubmissionPolicyDescription',
    Input: ProposalSubmissionPolicyVotingConfigItemInput,
    getInputError: ({ anyoneCanPropose } = {}) => anyoneCanPropose,
    Review: ProposalSubmissionPolicyVotingConfigItemReview,
  }
