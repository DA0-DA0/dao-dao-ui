import { Check, Close, HowToVote, Texture } from '@mui/icons-material'
import Emoji from 'a11y-react-emoji'
import clsx from 'clsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Vote as VoteChoice } from '@dao-dao/types/contracts/CwdProposalSingle.common'
import { formatPercentOf100 } from '@dao-dao/utils'

import { Button } from '../buttons/Button'

const VOTER_WEIGHT_PERCENT = formatPercentOf100(7)

export const SplashVoteCard = () => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<VoteChoice | undefined>()

  return (
    <div className="flex max-w-3xl flex-col gap-3 rounded-lg border border-border-primary bg-background-primary p-4 backdrop-blur-lg">
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
      <div className="grid grid-cols-3 gap-2">
        <Button
          className={clsx(selected === VoteChoice.Yes && '!bg-color-valid')}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.Yes ? undefined : VoteChoice.Yes
            )
          }
          variant="secondary"
        >
          <Check
            className={clsx(
              '!h-4 !w-4',
              selected === VoteChoice.Yes
                ? 'text-icon-primary'
                : 'text-icon-interactive-valid'
            )}
          />
          {t('info.yesVote')}
        </Button>
        <Button
          className={clsx(selected === VoteChoice.No && '!bg-color-error')}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.No ? undefined : VoteChoice.No
            )
          }
          variant="secondary"
        >
          <Close
            className={clsx(
              '!h-4 !w-4',
              selected === VoteChoice.No
                ? 'text-icon-primary'
                : 'text-icon-interactive-error'
            )}
          />
          {t('info.noVote')}
        </Button>
        <Button
          className={clsx(
            selected === VoteChoice.Abstain &&
              '!bg-background-interactive-active'
          )}
          onClick={() =>
            setSelected((s) =>
              s === VoteChoice.Abstain ? undefined : VoteChoice.Abstain
            )
          }
          variant="secondary"
        >
          <Texture className="!h-4 !w-4 text-icon-primary" />
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
          <p>{t('button.castYourVote')}</p> <HowToVote className="!h-4 !w-4" />
        </div>
      </Button>
    </div>
  )
}
