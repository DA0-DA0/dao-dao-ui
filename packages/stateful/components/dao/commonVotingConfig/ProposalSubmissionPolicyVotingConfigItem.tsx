import { useTranslation } from 'react-i18next'

import { LockWithPenEmoji, SegmentedControls } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithProposalSubmissionPolicy,
} from '@dao-dao/types'

const ProposalSubmissionPolicyVotingConfigItemInput = ({
  data: { anyoneCanPropose },
  setValue,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithProposalSubmissionPolicy>) => {
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
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithProposalSubmissionPolicy>) => {
  const { t } = useTranslation()
  return <>{anyoneCanPropose ? t('info.anyone') : t('info.onlyMembers')}</>
}

export const makeProposalSubmissionPolicyVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithProposalSubmissionPolicy> => ({
    Icon: LockWithPenEmoji,
    nameI18nKey: 'form.proposalSubmissionPolicyTitle',
    descriptionI18nKey: 'form.proposalSubmissionPolicyDescription',
    Input: ProposalSubmissionPolicyVotingConfigItemInput,
    getInputError: ({ anyoneCanPropose } = {}) => anyoneCanPropose,
    Review: ProposalSubmissionPolicyVotingConfigItemReview,
  })
