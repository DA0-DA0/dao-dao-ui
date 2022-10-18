import { Check, Close } from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Abstain } from '@dao-dao/icons'
import { Vote } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'

interface VoteDisplayProps {
  vote: Vote
  className?: string
}

export const VoteDisplay = ({ vote, className }: VoteDisplayProps) => {
  const { t } = useTranslation()
  const commonClassNames = clsx(
    'inline-flex items-center gap-1 font-mono text-sm',
    className
  )

  return vote === Vote.Yes ? (
    <p className={clsx(commonClassNames, 'text-valid')}>
      <Check className="!h-4 !w-4" /> {t('info.yesVote')}
    </p>
  ) : vote === Vote.No ? (
    <p className={clsx(commonClassNames, 'text-error')}>
      <Close className="!h-4 !w-4" /> {t('info.noVote')}
    </p>
  ) : vote === Vote.Abstain ? (
    <p className={clsx(commonClassNames, 'text-secondary')}>
      <Abstain /> {t('info.abstainVote')}
    </p>
  ) : (
    // Should never happen.
    <p className={clsx(commonClassNames, 'text-secondary inline break-words')}>
      {vote}
    </p>
  )
}
