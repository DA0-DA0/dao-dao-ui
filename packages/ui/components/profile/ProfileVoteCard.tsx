import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { formatPercentOf100 } from '@dao-dao/utils'

import { Button } from '../Button'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'
import { ProfileVoteButton } from './ProfileVoteButton'

export interface ProfileVoteCardOption<T> {
  Icon: ComponentType<{ className: string }>
  label: string
  value: T
}

export interface ProfileVoteCardProps<T> {
  options: ProfileVoteCardOption<T>[]
  selected?: T
  loading?: boolean
  votingPower: number
  daoName: string
  walletName: string
  profileImgUrl: string
}

export const ProfileVoteCard = <T extends unknown>({
  options,
  selected,
  loading,
  votingPower,
  daoName,
  walletName,
  profileImgUrl,
}: ProfileVoteCardProps<T>) => {
  const { t } = useTranslation()

  return (
    <ProfileCardWrapper
      compact
      imgUrl={profileImgUrl}
      underHeaderComponent={<MembershipPill daoName={daoName} ghost isMember />}
      walletName={walletName}
    >
      <div className="flex flex-row justify-between items-center secondary-text">
        <p>{t('title.votingPower')}</p>
        <p className="font-mono text-text-primary">
          {formatPercentOf100(votingPower)}
        </p>
      </div>

      <div className="flex flex-row justify-between items-center mt-3 mb-4 secondary-text">
        <p>{t('title.vote')}</p>
        <p className="font-mono text-text-primary">{t('info.pending')}</p>
      </div>

      {options.map((option, index) => (
        <ProfileVoteButton
          key={index}
          option={option}
          pressed={option.value === selected}
        />
      ))}

      <Button
        className="mt-4"
        contentContainerClassName={clsx('justify-center', {
          'primary-text': !selected,
        })}
        disabled={!selected}
        loading={loading}
        size="lg"
        variant={!selected || loading ? 'secondary' : 'primary'}
      >
        {t('button.castYourVote')}
      </Button>
    </ProfileCardWrapper>
  )
}
