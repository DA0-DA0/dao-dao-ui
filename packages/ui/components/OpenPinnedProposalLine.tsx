import { EyeOffIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { ConfigResponse } from '@dao-dao/state/clients/cw-core/0.1.0'
import { ProposalResponse } from '@dao-dao/state/clients/cw-proposal-single'
import { getProposalEnd, zeroPad } from '@dao-dao/utils'

import { Tooltip } from '.'
import { Button } from './Button'
import { Logo as DefaultLogo, LogoProps } from './Logo'

export interface OpenPinnedProposalLineProps {
  daoConfig: ConfigResponse
  proposalResponse: ProposalResponse
  proposalViewUrl: string
  className?: string
  markDone: () => void
  Logo?: ComponentType<LogoProps>
}

const LargeOpenPinnedProposalLine = ({
  daoConfig,
  proposalResponse: { id, proposal },
  className,
  Logo = DefaultLogo,
}: OpenPinnedProposalLineProps) => {
  const { t } = useTranslation()
  return (
    <div
      className={clsx(
        'grid grid-cols-[10ch_3fr_5fr_2fr] gap-4 items-center p-4 bg-primary rounded-lg',
        className
      )}
    >
      <p className="font-mono caption-text"># {zeroPad(id, 6)}</p>
      <div className="flex flex-row gap-2 items-center">
        {daoConfig.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={t('info.daosLogo')}
            className="w-5 h-5 rounded-full"
            src={daoConfig.image_url}
          />
        ) : (
          <Logo size="1.5rem" />
        )}
        <p className="link-text">{daoConfig.name}</p>
      </div>
      <p className="truncate link-text">{proposal.title}</p>
      <p className="text-right truncate body-text">
        {getProposalEnd(proposal.expiration, proposal.status)}
      </p>
    </div>
  )
}

const SmallOpenPinnedProposalLine = ({
  daoConfig,
  proposalResponse: { id, proposal },
  className,
  Logo = DefaultLogo,
}: OpenPinnedProposalLineProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 p-4 bg-primary rounded-lg',
        className
      )}
    >
      <div className="flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          {daoConfig.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={t('info.daosLogo')}
              className="w-5 h-5 rounded-full"
              src={daoConfig.image_url}
            />
          ) : (
            <Logo size="1.5rem" />
          )}
          <p className="link-text">{daoConfig.name}</p>
        </div>
        <p className="font-mono caption-text"># {zeroPad(id, 6)}</p>
      </div>
      <div className="flex flex-row gap-4 justify-between items-center">
        <p className="break-words body-text">{proposal.title}</p>
        <p className="truncate caption-text">
          {getProposalEnd(proposal.expiration, proposal.status)}
        </p>
      </div>
    </div>
  )
}

export const OpenPinnedProposalLine = (props: OpenPinnedProposalLineProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row gap-1 items-cener">
      <Link href={props.proposalViewUrl}>
        <a className="grow">
          <LargeOpenPinnedProposalLine {...props} className="hidden md:grid" />
          <SmallOpenPinnedProposalLine {...props} className="block md:hidden" />
        </a>
      </Link>

      <Tooltip label={t('info.hideFromPageTooltip')}>
        <Button className="!px-2" onClick={props.markDone} variant="secondary">
          <EyeOffIcon className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  )
}
