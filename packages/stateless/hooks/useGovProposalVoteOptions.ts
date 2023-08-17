import { Block, Check, Close, Texture } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { VoteOption } from '@dao-dao/protobuf/codegen/cosmos/gov/v1/gov'
import { ProposalVoteOption } from '@dao-dao/types'

export const useGovProposalVoteOptions =
  (): ProposalVoteOption<VoteOption>[] => {
    const { t } = useTranslation()

    return [
      {
        Icon: Check,
        label: t('info.yesVote'),
        value: VoteOption.VOTE_OPTION_YES,
      },
      {
        Icon: Close,
        label: t('info.noVote'),
        value: VoteOption.VOTE_OPTION_NO,
      },
      {
        Icon: Block,
        label: t('info.noWithVeto'),
        value: VoteOption.VOTE_OPTION_NO_WITH_VETO,
      },
      {
        Icon: Texture,
        label: t('info.abstainVote'),
        value: VoteOption.VOTE_OPTION_ABSTAIN,
      },
    ]
  }
