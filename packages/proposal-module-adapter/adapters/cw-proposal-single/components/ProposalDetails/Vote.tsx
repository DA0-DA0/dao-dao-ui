import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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

export const Vote = ({
  onVote,
  voterWeightPercent,
  loading,
  blur,
}: VoteProps) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<VoteChoice>()

  return (
    <div
      className={clsx(
        'flex flex-col gap-3 p-4 max-w-3xl rounded-lg border bg-primary border-default',
        { 'backdrop-blur-lg': blur }
      )}
    >
      <div className="flex gap-2 items-center">
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
      <div className="flex flex-wrap grid-cols-3 gap-2 md:grid">
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
              'group-hover:text-base text-valid': selected !== VoteChoice.Yes,
            })}
          />
          {t('info.yesVote')}
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
              'group-hover:text-base text-error': selected !== VoteChoice.No,
            })}
          />
          {t('info.noVote')}
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
          <Abstain />
          {t('info.abstainVote')}
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
        <div className="flex gap-2 justify-center items-center w-full">
          <p>{t('button.castYourVote')}</p> <Airplane />
        </div>
      </Button>
    </div>
  )
}
