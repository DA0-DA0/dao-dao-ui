import { useTranslation } from 'react-i18next'

import { LockWithKeyEmoji, SegmentedControls } from '@dao-dao/stateless'
import {
  DaoCreationVotingConfigItem,
  DaoCreationVotingConfigItemInputProps,
  DaoCreationVotingConfigItemReviewProps,
  DaoCreationVotingConfigWithProposalExecutionPolicy,
} from '@dao-dao/types'

const ProposalExecutionPolicyVotingConfigItemInput = ({
  data: { onlyMembersExecute },
  setValue,
}: DaoCreationVotingConfigItemInputProps<DaoCreationVotingConfigWithProposalExecutionPolicy>) => {
  const { t } = useTranslation()

  return (
    <SegmentedControls
      onSelect={(value) => setValue('onlyMembersExecute', value)}
      selected={onlyMembersExecute}
      tabs={[
        {
          label: t('info.onlyMembers'),
          value: true,
        },
        {
          label: t('info.anyone'),
          value: false,
        },
      ]}
    />
  )
}

const ProposalExecutionPolicyVotingConfigItemReview = ({
  data: { onlyMembersExecute },
}: DaoCreationVotingConfigItemReviewProps<DaoCreationVotingConfigWithProposalExecutionPolicy>) => {
  const { t } = useTranslation()
  return <>{onlyMembersExecute ? t('info.onlyMembers') : t('info.anyone')}</>
}

export const makeProposalExecutionPolicyVotingConfigItem =
  (): DaoCreationVotingConfigItem<DaoCreationVotingConfigWithProposalExecutionPolicy> => ({
    Icon: LockWithKeyEmoji,
    nameI18nKey: 'title.proposalExecutionPolicy',
    descriptionI18nKey: 'info.proposalExecutionPolicyDescription',
    tooltipI18nKey: 'info.proposalExecutionPolicyDescription',
    Input: ProposalExecutionPolicyVotingConfigItemInput,
    getInputError: ({ onlyMembersExecute } = {}) => onlyMembersExecute,
    Review: ProposalExecutionPolicyVotingConfigItemReview,
  })
