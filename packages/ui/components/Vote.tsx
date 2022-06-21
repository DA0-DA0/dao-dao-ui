import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { FC, useState } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Abstain, Airplane } from '@dao-dao/icons'
import { Vote as VoteChoice } from '@dao-dao/state/clients/cw-proposal-single'
import { Button } from '@dao-dao/ui'

export { VoteChoice }

export interface VoteProps {
  onVote: (choice: VoteChoice) => void
  voterWeight: number
  loading: boolean
  blur?: boolean
}

export const Vote: FC<VoteProps> = ({ onVote, voterWeight, loading, blur }) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<VoteChoice | undefined>()

  return (
    <div
      className={clsx(
        'flex flex-col gap-3 p-4 max-w-3xl bg-primary rounded-lg border border-default',
        { 'backdrop-blur-lg': blur }
      )}
    >
      <div className="flex gap-2 items-center">
        <p className="mr-1 text-2xl">
          <Emoji label={t('ballotBox')} symbol="🗳" />
        </p>
        <p className="primary-text">{t('casting')}</p>
        <p className="secondary-text">
          {t('percentVotingPower', {
            percent: voterWeight.toLocaleString(undefined, {
              maximumSignificantDigits: 4,
            }),
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
          {t('yes')}
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
          {t('no')}
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
          {t('abstain')}
        </Button>
      </div>
      <Button
        disabled={selected === undefined}
        loading={loading}
        onClick={() => onVote(selected as VoteChoice)}
      >
        <div className="flex gap-2 justify-center items-center w-full">
          <p>{t('castYourVote')}</p> <Airplane stroke="currentColor" />
        </div>
      </Button>
    </div>
  )
}
