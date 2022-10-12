import { Check, Close, Texture } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { Vote } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import { ProfileVoteCardOption } from '@dao-dao/ui'

export const useProfileVoteCardOptions = (): ProfileVoteCardOption<Vote>[] => {
  const { t } = useTranslation()

  return [
    { Icon: Check, label: t('info.yesVote'), value: Vote.Yes },
    { Icon: Close, label: t('info.noVote'), value: Vote.No },
    { Icon: Texture, label: t('info.abstainVote'), value: Vote.Abstain },
  ]
}
