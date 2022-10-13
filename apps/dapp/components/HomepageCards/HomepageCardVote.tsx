// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { CheckIcon, XIcon } from '@heroicons/react/outline'
import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Abstain, Airplane } from '@dao-dao/icons'
import { Vote as VoteChoice } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import { Button } from '@dao-dao/ui'
import { formatPercentOf100 } from '@dao-dao/utils'

const VOTER_WEIGHT_PERCENT = formatPercentOf100(7)

export const HomepageCardVote = () => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<VoteChoice | undefined>()

  return (
    <div className="flex max-w-3xl flex-col gap-3 rounded-lg border border-default bg-primary p-4 backdrop-blur-lg">
      <div className="flex items-center gap-2">
        <p className="mr-1 text-2xl">
          <Emoji label={t('emoji.ballotBox')} symbol="🗳" />
        </p>
        <p className="primary-text">{t('title.casting')}</p>
        <p className="secondary-text">
          {t('info.percentVotingPower', {
            percent: VOTER_WEIGHT_PERCENT,
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
              'text-error group-hover:text-base': selected !== VoteChoice.No,
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
        onClick={() => {
          toast.success('Think this is neat? You should try the real thing! :)')
          setSelected(undefined)
        }}
      >
        <div className="flex w-full items-center justify-center gap-2">
          <p>{t('button.castYourVote')}</p> <Airplane />
        </div>
      </Button>
    </div>
  )
}
