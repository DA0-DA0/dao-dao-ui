import { CheckCircleIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

import { ConfigResponse } from '@dao-dao/state/clients/cw-core'
import { ProposalResponse } from '@dao-dao/state/clients/cw-proposal-single'
import { getProposalEnd, zeroPad } from '@dao-dao/utils'

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
}) => (
  <div
    className={clsx(
      'grid grid-cols-[10ch_3fr_5fr_2fr] gap-4 items-center p-4 text-sm bg-primary rounded-lg',
      className
    )}
  >
    <p className="font-mono caption-text"># {zeroPad(id, 6)}</p>
    <div className="flex flex-row gap-2 items-center">
      {daoConfig.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt="DAO Logo"
          className="w-auto h-6 rounded-full"
          src={daoConfig.image_url}
        />
      ) : (
        <Logo alt="DAO DAO logo" height="1.5rem" width="1.5rem" />
      )}
      <p className="primary-text">{daoConfig.name}</p>
    </div>
    <p className="truncate link-text">{proposal.title}</p>
    <p className="text-right truncate body-text">
      {getProposalEnd(proposal.expiration, proposal.status)}
    </p>
  </div>
)

const SmallOpenPinnedProposalLine: FC<OpenPinnedProposalLineProps> = ({
  daoConfig,
  proposalResponse: { id, proposal },
  className,
}) => (
  <div
    className={clsx(
      'flex flex-col gap-4 p-4 text-sm bg-primary rounded-lg',
      className
    )}
  >
    <div className="flex flex-row gap-4 justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        {daoConfig.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="DAO Logo"
            className="w-auto h-6 rounded-full"
            src={daoConfig.image_url}
          />
        ) : (
          <Logo alt="DAO DAO logo" height="1.5rem" width="1.5rem" />
        )}
        <p className="primary-text">{daoConfig.name}</p>
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

export const OpenPinnedProposalLine: FC<OpenPinnedProposalLineProps> = (
  props
) => (
  <div className="flex flex-row gap-1 items-cener">
    <Link href={props.proposalViewUrl}>
      <a className="grow">
        <LargeOpenPinnedProposalLine {...props} className="hidden md:grid" />
        <SmallOpenPinnedProposalLine {...props} className="block md:hidden" />
      </a>
    </Link>

    <Button className="!px-2" onClick={props.markDone} variant="secondary">
      <CheckCircleIcon className="w-4 h-4" />
    </Button>
  </div>
)
