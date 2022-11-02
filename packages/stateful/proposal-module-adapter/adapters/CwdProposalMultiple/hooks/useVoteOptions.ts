// import Circle from '@uiw/react-color-circle'
import CircleIcon from '@mui/icons-material/Circle'
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined'

import { MULTIPLE_CHOICE_OPTION_COLORS } from '@dao-dao/stateless'
import { ProposalVoteOption } from '@dao-dao/types'
import {
  MultipleChoiceProposal,
  MultipleChoiceVote,
} from '@dao-dao/types/contracts/CwdProposalMultiple'

export const useVoteOptions = (
  proposal: MultipleChoiceProposal
): ProposalVoteOption<MultipleChoiceVote>[] => {
  return proposal.choices.map((option, index) => {
    // The last choice will always be "None of the Above",
    const isNoneOption = index === proposal.choices.length - 1
    return {
      // For 'None of the Above' we use a different icon.
      Icon: isNoneOption ? PanToolOutlinedIcon : CircleIcon,
      label: option.title,
      value: { option_id: index },
      style: isNoneOption
        ? undefined
        : {
            color:
              MULTIPLE_CHOICE_OPTION_COLORS[
                index % MULTIPLE_CHOICE_OPTION_COLORS.length
              ],
          },
    }
  })
}
