import { Check, Close, Texture } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { ProposalVoteOption } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

export const useVoteOptions = (): ProposalVoteOption<Vote>[] => {
  const { t } = useTranslation()

  return [
    { Icon: Check, label: t('info.yesVote'), value: Vote.Yes },
    { Icon: Close, label: t('info.noVote'), value: Vote.No },
    { Icon: Texture, label: t('info.abstainVote'), value: Vote.Abstain },
  ]
}
