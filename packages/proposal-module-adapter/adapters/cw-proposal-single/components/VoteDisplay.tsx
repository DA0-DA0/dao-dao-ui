import { CheckIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Abstain } from '@dao-dao/icons'
import { Vote } from '@dao-dao/state/clients/cw-proposal-single'

interface VoteDisplayProps {
  vote: Vote
  className?: string
}

export const VoteDisplay = ({ vote, className }: VoteDisplayProps) => {
  const { t } = useTranslation()
  const commonClassNames = clsx(
    'inline-flex gap-1 items-center font-mono text-sm',
    className
  )

  return vote === Vote.Yes ? (
    <p className={clsx(commonClassNames, 'text-valid')}>
      <CheckIcon className="inline w-4" /> {t('info.yesVote')}
    </p>
  ) : vote === Vote.No ? (
    <p className={clsx(commonClassNames, 'text-error')}>
      <XIcon className="inline w-4" /> {t('info.noVote')}
    </p>
  ) : vote === Vote.Abstain ? (
    <p className={clsx(commonClassNames, 'text-secondary')}>
      <Abstain fill="currentColor" /> {t('info.abstainVote')}
    </p>
  ) : (
    // Should never happen.
    <p className={clsx(commonClassNames, 'inline break-words text-secondary')}>
      {vote}
    </p>
  )
}
