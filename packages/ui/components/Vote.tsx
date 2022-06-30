import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { FC, useState } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Abstain, Airplane } from '@dao-dao/icons'
import { Vote as VoteChoice } from '@dao-dao/state/clients/cw-proposal-single'
import { Button } from '@dao-dao/ui'
import { formatPercentOf100 } from '@dao-dao/utils'

export { VoteChoice }

export interface VoteProps {
  onVote: (choice: VoteChoice) => unknown
  voterWeightPercent: number
  loading: boolean
  blur?: boolean
}

export const Vote: FC<VoteProps> = ({
  onVote,
  voterWeightPercent,
  loading,
  blur,
}) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<VoteChoice | undefined>()

  return (
    <div
      className={clsx(
        'flex max-w-3xl flex-col gap-3 rounded-lg border border-default bg-primary p-4',
        { 'backdrop-blur-lg': blur }
      )}
    >
      <div className="flex items-center gap-2">
        <p className="mr-1 text-2xl">
          <Emoji label={t('emoji.ballotBox')} symbol="🗳" />
        </p>
        <p className="primary-text">{t('title.casting')}</p>
        <p className="secondary-text">
          {t('info.percentVotingPower', {
            percent: formatPercentOf100(voterWeightPercent),
          })}
        </p>
      </div>
      <div className="flex grid-cols-3 flex-wrap gap-2 md:grid">
        <Button
          className={clsx('group transition', {
            'bg-valid hover:bg-valid': selected === VoteChoice.Yes,
          })}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.Yes ? undefined : VoteChoice.Yes
            )
          }
          variant="secondary"
        >
          <CheckIcon
            className={clsx('w-4', {
              'text-base': selected === VoteChoice.Yes,
              'text-valid group-hover:text-base': selected !== VoteChoice.Yes,
            })}
          />
          {t('info.yes')}
        </Button>
        <Button
          className={clsx('group transition', {
            'bg-error hover:bg-error': selected === VoteChoice.No,
          })}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.No ? undefined : VoteChoice.No
            )
          }
          variant="secondary"
        >
          <XIcon
            className={clsx('w-4', {
              'text-base': selected === VoteChoice.No,
              'text-error group-hover:text-base': selected !== VoteChoice.No,
            })}
          />
          {t('info.no')}
        </Button>
        <Button
          className={clsx('group transition', {
            'bg-tertiary hover:bg-tertiary': selected === VoteChoice.Abstain,
          })}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.Abstain ? undefined : VoteChoice.Abstain
            )
          }
          variant="secondary"
        >
          <Abstain fill="currentColor" />
          {t('info.abstain')}
        </Button>
      </div>
      <Button
        disabled={selected === undefined}
        loading={loading}
        onClick={async () => {
          try {
            await onVote(selected as VoteChoice)
          } finally {
            setSelected(undefined)
          }
        }}
      >
        <div className="flex w-full items-center justify-center gap-2">
          <p>{t('button.castYourVote')}</p> <Airplane stroke="currentColor" />
        </div>
      </Button>
    </div>
  )
}
