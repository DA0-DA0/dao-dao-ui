import { CheckCircleOutline, CopyAllRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton } from '../IconButton'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export interface ProfileNewProposalCardInfoLine {
  Icon: ComponentType<{ className: string }>
  label: string
  value: string
  valueClassName?: string
}

export interface ProfileNewProposalCardAddress {
  label: string
  address: string
}

export interface ProfileNewProposalCardProps {
  daoName: string
  walletName: string
  profileImgUrl: string
  lines: ProfileNewProposalCardInfoLine[]
  addresses: ProfileNewProposalCardAddress[]
}

export const ProfileNewProposalCard = ({
  daoName,
  walletName,
  profileImgUrl,
  lines,
  addresses,
}: ProfileNewProposalCardProps) => {
  const { t } = useTranslation()

  const [copiedIndex, setCopiedIndex] = useState<number>()
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopiedIndex(undefined), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copiedIndex])

  return (
    <ProfileCardWrapper
      childContainerClassName="p-0"
      compact
      imgUrl={profileImgUrl}
      underHeaderComponent={<MembershipPill daoName={daoName} ghost isMember />}
      walletName={walletName}
    >
      <div className="p-6 space-y-4">
        <p className="secondary-text">{t('title.proposalCreationInfo')}</p>

        {lines.map(({ Icon, label, value, valueClassName }, index) => (
          <div
            key={index}
            className="flex flex-row gap-2 justify-between items-center ml-1"
          >
            <div className="flex flex-row gap-2 items-center">
              <Icon className="w-5 h-5 text-icon-primary" />
              <p className="text-text-body primary-text">{label}</p>
            </div>

            <p
              className={clsx(
                'py-1 px-2 font-mono text-right text-text-primary bg-component-badge-primary rounded-full capton-text',
                valueClassName
              )}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 p-6 border-t border-border-primary">
        {addresses.map(({ label, address }, index) => (
          <div key={index} className="space-y-2">
            <div className="flex flex-row gap-6 justify-between items-center">
              <p className="secondary-text">{label}</p>

              <IconButton
                Icon={
                  copiedIndex === index ? CheckCircleOutline : CopyAllRounded
                }
                className="!text-icon-tertiary"
                onClick={() => {
                  navigator.clipboard.writeText(address)
                  setCopiedIndex(index)
                }}
                variant="ghost"
              />
            </div>

            <p className="pr-8 font-mono text-text-primary truncate legend-text">
              {address}
            </p>
          </div>
        ))}
      </div>
    </ProfileCardWrapper>
  )
}
