// import Circle from '@uiw/react-color-circle'
import { PanToolOutlined } from '@mui/icons-material'
import CircleIcon from '@mui/icons-material/Circle'

import { ProposalVoteOption } from '@dao-dao/types'
import {
  MultipleChoiceProposal,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/DaoProposalMultiple'

import { MULTIPLE_CHOICE_OPTION_COLORS } from '../components/ui/MultipleChoiceOption'

export const useVoteOptions = (
  proposal: MultipleChoiceProposal
): ProposalVoteOption<MultipleChoiceVote>[] =>
  proposal.choices?.map((option, index) => {
    // The last choice will always be "None of the Above",
    const isNoneOption = index === proposal.choices.length - 1
    return {
      // For 'None of the Above' we use a different icon.
      Icon: isNoneOption ? PanToolOutlined : CircleIcon,
      label: option.title,
      value: { option_id: index },
      color: isNoneOption
        ? undefined
        : MULTIPLE_CHOICE_OPTION_COLORS[
            index % MULTIPLE_CHOICE_OPTION_COLORS.length
          ],
    }
  })
