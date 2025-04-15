import { useTranslation } from 'react-i18next'

import { Loader } from '@dao-dao/stateless'
import {
  ApprovalProposalWithMetadata,
  BaseApprovalProposalInnerContentDisplayProps,
  ProposalVoteOption,
} from '@dao-dao/types'
import {
  MultipleChoiceApprovalProposal,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/DaoPreProposeApprovalMultiple'

import { SuspenseLoader } from '../../../../components'
import {
  useLoadingApprovalProposal,
  useLoadingPreProposeApprovalVoteOptions,
} from '../hooks'
import { MultipleChoiceOptionData } from '../types'
import { ProposalMessagesDisplay } from './ProposalMessagesDisplay'

export const ApprovalProposalInnerContentDisplay = (
  props: BaseApprovalProposalInnerContentDisplayProps
) => {
  const { t } = useTranslation()
  const loadingProposal = useLoadingApprovalProposal()
  const loadingVoteOptions = useLoadingPreProposeApprovalVoteOptions()

  return (
    <SuspenseLoader
      fallback={
        <div className="flex flex-row items-center gap-4">
          <p className="title-text">{t('title.voteOptions')}</p>
          <Loader fill={false} size={22} />
        </div>
      }
      forceFallback={loadingProposal.loading || loadingVoteOptions.loading}
    >
      {!loadingProposal.loading && !loadingVoteOptions.loading && (
        <InnerApprovalProposalInnerContentDisplay
          {...props}
          proposal={loadingProposal.data}
          voteOptions={loadingVoteOptions.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerApprovalProposalInnerContentDisplay = ({
  proposal,
  voteOptions,
}: BaseApprovalProposalInnerContentDisplayProps & {
  proposal: ApprovalProposalWithMetadata<MultipleChoiceApprovalProposal>
  voteOptions: ProposalVoteOption<MultipleChoiceVote>[]
}) => {
  // Map action data to each proposal choice.
  const optionsData = proposal.msg.choices.options.map(
    (choice, index): MultipleChoiceOptionData => {
      const voteOption = voteOptions[index]

      return {
        choice: {
          ...choice,
          index,
          option_type: 'standard',
          vote_count: '0',
        },
        voteOption,
      }
    }
  )

  return <ProposalMessagesDisplay optionsData={optionsData} />
}
