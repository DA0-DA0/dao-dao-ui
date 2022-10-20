import { CheckCircleOutline, CopyAll } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProfileNewProposalCardProps } from '@dao-dao/tstypes/ui/ProfileNewProposalCard'

import { concatAddressStartEnd } from '../CopyToClipboard'
import { IconButton } from '../icon_buttons'
import { Loader } from '../Loader'
import { MembershipPill } from './MembershipPill'
import { ProfileCardWrapper } from './ProfileCardWrapper'

export * from '@dao-dao/tstypes/ui/ProfileNewProposalCard'

export const ProfileNewProposalCard = ({
  daoName,
  info,
  ...wrapperProps
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
      underHeaderComponent={<MembershipPill daoName={daoName} ghost isMember />}
      {...wrapperProps}
    >
      <div className="space-y-4 p-6">
        <p className="secondary-text">{t('title.proposalCreationInfo')}</p>

        {info.loading ? (
          <Loader fill={false} />
        ) : (
          info.data.lines.map(
            ({ Icon, label, value, valueClassName }, index) => (
              <div
                key={index}
                className="ml-1 flex flex-row items-center justify-between gap-2"
              >
                <div className="flex flex-row items-center gap-2">
                  <Icon className="h-5 w-5 text-icon-primary" />
                  <p className="primary-text text-text-body">{label}</p>
                </div>

                <p
                  className={clsx(
                    'caption-text break-words rounded-full border-2 border-component-badge-primary py-1 px-2 text-center font-mono text-text-primary',
                    valueClassName
                  )}
                >
                  {value}
                </p>
              </div>
            )
          )
        )}
      </div>

      {!info.loading && info.data.addresses.length > 0 && (
        <div className="flex flex-col gap-5 border-t border-border-primary p-6">
          {info.data.addresses.map(({ label, address }, index) => (
            <div key={index} className="space-y-2">
              <div className="flex flex-row items-center justify-between gap-6">
                <p className="secondary-text">{label}</p>

                <IconButton
                  Icon={copiedIndex === index ? CheckCircleOutline : CopyAll}
                  className="!text-icon-tertiary"
                  onClick={() => {
                    navigator.clipboard.writeText(address)
                    setCopiedIndex(index)
                  }}
                  variant="ghost"
                />
              </div>

              <p className="legend-text truncate pr-8 font-mono text-text-primary">
                {concatAddressStartEnd(address, 16, 16)}
              </p>
            </div>
          ))}
        </div>
      )}
    </ProfileCardWrapper>
  )
}
