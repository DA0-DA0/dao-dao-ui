import { EyeOffIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import { ProposalResponse } from '@dao-dao/state/clients/cw-proposal-single'
import { getProposalEnd, zeroPad } from '@dao-dao/utils'

import { Tooltip } from '.'
import { Button } from './Button'
import { Logo } from './Logo'

export interface OpenPinnedProposalLineProps {
  daoConfig: ConfigResponse
  proposalResponse: ProposalResponse
  proposalViewUrl: string
  className?: string
  markDone: () => void
}

const LargeOpenPinnedProposalLine: FC<OpenPinnedProposalLineProps> = ({
  daoConfig,
  proposalResponse: { id, proposal },
  className,
}) => {
  const { t } = useTranslation()
  return (
    <div
      className={clsx(
        'grid grid-cols-[10ch_3fr_5fr_2fr] items-center gap-4 rounded-lg bg-primary p-4 text-sm',
        className
      )}
    >
      <p className="caption-text font-mono"># {zeroPad(id, 6)}</p>
      <div className="flex flex-row items-center gap-2">
        {daoConfig.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={t('info.daosLogo')}
            className="h-6 w-auto rounded-full"
            src={daoConfig.image_url}
          />
        ) : (
          <Logo alt={t('info.daodaoLogo')} height="1.5rem" width="1.5rem" />
        )}
        <p className="primary-text">{daoConfig.name}</p>
      </div>
      <p className="link-text truncate">{proposal.title}</p>
      <p className="body-text truncate text-right">
        {getProposalEnd(proposal.expiration, proposal.status)}
      </p>
    </div>
  )
}

const SmallOpenPinnedProposalLine: FC<OpenPinnedProposalLineProps> = ({
  daoConfig,
  proposalResponse: { id, proposal },
  className,
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 rounded-lg bg-primary p-4 text-sm',
        className
      )}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-2">
          {daoConfig.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={t('info.daosLogo')}
              className="h-6 w-auto rounded-full"
              src={daoConfig.image_url}
            />
          ) : (
            <Logo alt={t('info.daodaoLogo')} height="1.5rem" width="1.5rem" />
          )}
          <p className="primary-text">{daoConfig.name}</p>
        </div>
        <p className="caption-text font-mono"># {zeroPad(id, 6)}</p>
      </div>
      <div className="flex flex-row items-center justify-between gap-4">
        <p className="body-text break-words">{proposal.title}</p>
        <p className="caption-text truncate">
          {getProposalEnd(proposal.expiration, proposal.status)}
        </p>
      </div>
    </div>
  )
}

export const OpenPinnedProposalLine: FC<OpenPinnedProposalLineProps> = (
  props
) => {
  const { t } = useTranslation()

  return (
    <div className="items-cener flex flex-row gap-1">
      <Link href={props.proposalViewUrl}>
        <a className="grow">
          <LargeOpenPinnedProposalLine {...props} className="hidden md:grid" />
          <SmallOpenPinnedProposalLine {...props} className="block md:hidden" />
        </a>
      </Link>

      <Tooltip label={t('info.hideFromPageTooltip')}>
        <Button className="!px-2" onClick={props.markDone} variant="secondary">
          <EyeOffIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  )
}
