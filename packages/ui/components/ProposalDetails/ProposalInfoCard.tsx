import { ExternalLinkIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ProposalResponse,
  Status,
  Vote,
} from '@dao-dao/state/clients/cw-proposal-single'
import { CHAIN_TXN_URL_PREFIX } from '@dao-dao/utils'

import { CopyToClipboard } from '../CopyToClipboard'
import { ProposalStatus } from '../ProposalStatus'
import { Tooltip } from '../Tooltip'
import { VoteDisplay } from './VoteDisplay'

export interface ProposalInfoCardProps {
  proposalResponse: ProposalResponse
  memberWhenProposalCreated: boolean
  walletVote?: Vote
  proposalExecutionTXHash: string | undefined
  connected: boolean
}

export const ProposalInfoCard: FC<ProposalInfoCardProps> = ({
  proposalResponse: { id, proposal },
  memberWhenProposalCreated,
  walletVote,
  proposalExecutionTXHash,
  connected,
}) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-md border border-light">
      <div className="flex flex-row justify-evenly items-stretch py-4 md:py-5">
        <div className="flex flex-col gap-2 items-center">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.proposal')}
          </p>

          <p className="font-mono text-sm">
            # {id.toString().padStart(6, '0')}
          </p>
        </div>

        <div className="w-[1px] bg-light"></div>

        <div className="flex flex-col gap-2 items-center">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.status')}
          </p>

          <div className="font-mono text-sm">
            <ProposalStatus status={proposal.status} />
          </div>
        </div>

        <div className="w-[1px] bg-light"></div>

        <div className="flex flex-col gap-2 items-center">
          <p className="overflow-hidden font-mono text-sm text-tertiary text-ellipsis">
            {t('title.you')}
          </p>

          {connected ? (
            !memberWhenProposalCreated ? (
              <YouTooltip
                label={t('info.mustHaveVotingPowerAtCreationTooltip', {
                  context: proposal.status === Status.Open ? 'open' : 'closed',
                })}
              />
            ) : walletVote ? (
              <VoteDisplay vote={walletVote} />
            ) : proposal.status === Status.Open ? (
              <YouTooltip label={t('info.haveNotCastVote')} />
            ) : (
              <YouTooltip label={t('info.didNotCastVote')} />
            )
          ) : (
            <YouTooltip label={t('info.connectWalletToViewVote')} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5 border-t border-light md:p-7">
        <div className="flex flex-col gap-2 items-start">
          <p className="font-mono text-sm text-tertiary">
            {t('title.proposer')}
          </p>
          <CopyToClipboard takeN={9} value={proposal.proposer} />
        </div>

        {proposal.status === Status.Executed && !proposalExecutionTXHash ? (
          <div className="grid grid-cols-10 gap-2 items-center md:flex md:flex-col md:items-start">
            <p className="col-span-3 font-mono text-sm text-tertiary">
              {t('info.txAbbr')}
            </p>
            <p className="col-span-7">{t('info.loading')}</p>
          </div>
        ) : !!proposalExecutionTXHash ? (
          <div className="grid grid-cols-10 gap-2 items-center md:flex md:flex-col md:items-start">
            {CHAIN_TXN_URL_PREFIX ? (
              <a
                className="flex flex-row col-span-3 gap-1 items-center font-mono text-sm text-tertiary"
                href={CHAIN_TXN_URL_PREFIX + proposalExecutionTXHash}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t('info.txAbbr')}
                <ExternalLinkIcon width={16} />
              </a>
            ) : (
              <p className="col-span-3 font-mono text-sm text-tertiary">
                {t('info.txAbbr')}
              </p>
            )}
            <div className="col-span-7">
              <CopyToClipboard takeN={9} value={proposalExecutionTXHash} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

interface YouTooltipProps {
  label: string
}

const YouTooltip: FC<YouTooltipProps> = ({ label }) => (
  <Tooltip label={label}>
    <p className="flex justify-center items-center p-1 w-4 h-4 font-mono text-xs text-tertiary rounded-full border cursor-pointer border-tertiary">
      ?
    </p>
  </Tooltip>
)
