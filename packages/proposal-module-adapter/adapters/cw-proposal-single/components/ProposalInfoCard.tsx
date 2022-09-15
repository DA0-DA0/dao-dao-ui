import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import {
  CwCoreV0_1_0Selectors,
  CwProposalSingleSelectors,
  blockHeightTimestampSafeSelector,
} from '@dao-dao/state'
import { Status } from '@dao-dao/state/clients/cw-proposal-single'
// eslint-disable-next-line regex/invalid
import { contractVersionSelector } from '@dao-dao/state/recoil/selectors/contract'
import { ContractVersion } from '@dao-dao/tstypes'
import { CopyToClipboard, ProposalIdDisplay, Tooltip } from '@dao-dao/ui'
import { CHAIN_TXN_URL_PREFIX } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { BaseProposalInfoCardProps } from '../../../types'
import { useProposalExecutionTxHash } from '../hooks'
import { ProposalStatus } from './ProposalStatus'
import { VoteDisplay } from './VoteDisplay'

export const ProposalInfoCard = ({
  connected,
  walletAddress,
}: BaseProposalInfoCardProps) => {
  const { t } = useTranslation()
  const {
    coreAddress,
    proposalModule: { address: proposalModuleAddress, prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  const { proposal } = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )

  const proposalModuleVersion = useRecoilValue(
    contractVersionSelector(proposalModuleAddress)
  )
  const voteSelector =
    proposalModuleVersion === ContractVersion.V0_1_0
      ? CwProposalSingleSelectors.getVoteV1Selector
      : CwProposalSingleSelectors.getVoteV2Selector

  const executionTxHash = useProposalExecutionTxHash()

  const walletVotingPowerWhenProposalCreated = useRecoilValue(
    walletAddress
      ? CwCoreV0_1_0Selectors.votingPowerAtHeightSelector({
          contractAddress: coreAddress,
          params: [
            {
              address: walletAddress,
              height: proposal.start_height,
            },
          ],
        })
      : constSelector(undefined)
  )?.power
  const memberWhenProposalCreated = connected
    ? Number(walletVotingPowerWhenProposalCreated ?? '0') > 0
    : undefined

  const walletVote = useRecoilValue(
    walletAddress
      ? voteSelector({
          contractAddress: proposalModuleAddress,
          params: [{ proposalId: proposalNumber, voter: walletAddress }],
        })
      : constSelector(undefined)
  )?.vote?.vote

  const createdHeight = useRecoilValue(
    blockHeightTimestampSafeSelector(proposal.start_height)
  )?.toLocaleString()

  return (
    <div className="rounded-md border border-light">
      <div className="flex flex-row justify-evenly items-stretch py-4 md:py-5">
        <div className="flex flex-col gap-2 items-center">
          <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
            {t('title.proposal')}
          </p>

          <p className="font-mono text-sm">
            <ProposalIdDisplay
              proposalNumber={proposalNumber}
              proposalPrefix={proposalPrefix}
            />
          </p>
        </div>

        <div className="w-[1px] bg-light"></div>

        <div className="flex flex-col gap-2 items-center">
          <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
            {t('title.status')}
          </p>

          <div className="font-mono text-sm">
            <ProposalStatus status={proposal.status} />
          </div>
        </div>

        <div className="w-[1px] bg-light"></div>

        <div className="flex flex-col gap-2 items-center">
          <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
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
      <div className="flex flex-col gap-3 p-5 border-t md:p-7 border-light">
        <div className="flex flex-col gap-2 items-start">
          <p className="font-mono text-sm text-tertiary">
            {t('title.proposer')}
          </p>
          <CopyToClipboard takeN={9} value={proposal.proposer} />
        </div>

        {proposal.status === Status.Executed && !executionTxHash ? (
          <div className="grid grid-cols-10 gap-2 items-center md:flex md:flex-col md:items-start">
            <p className="col-span-3 font-mono text-sm text-tertiary">
              {t('info.txAbbr')}
            </p>
            <p className="col-span-7">{t('info.loading')}</p>
          </div>
        ) : !!executionTxHash ? (
          <div className="grid grid-cols-10 gap-2 items-center md:flex md:flex-col md:items-start">
            {CHAIN_TXN_URL_PREFIX ? (
              <a
                className="flex flex-row col-span-3 gap-1 items-center font-mono text-sm text-tertiary"
                href={CHAIN_TXN_URL_PREFIX + executionTxHash}
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
              <CopyToClipboard takeN={9} value={executionTxHash} />
            </div>
          </div>
        ) : null}
      </div>
      {proposalModuleVersion === ContractVersion.V0_2_0 && (
        <div className="flex flex-row justify-evenly items-stretch py-4 border-t md:py-5 border-light">
          <div className="flex flex-col gap-2 items-center">
            <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
              {t('title.created')}
            </p>

            <p className="flex flex-row gap-4 items-center font-mono text-xs leading-6 text-right">
              {proposal.created === '0' ? createdHeight : proposal.created}
            </p>
          </div>

          <div className="w-[1px] bg-light"></div>

          <div className="flex flex-col gap-2 items-center">
            <p className="overflow-hidden font-mono text-sm text-ellipsis text-tertiary">
              {t('title.lastUpdated')}
            </p>
            <p className="flex flex-row gap-4 items-center font-mono text-xs leading-6 text-right">
              {new Date(
                Number(proposal.last_updated) / 1000000
              ).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface YouTooltipProps {
  label: string
}

const YouTooltip = ({ label }: YouTooltipProps) => (
  <Tooltip title={label}>
    <p className="flex justify-center items-center p-1 w-4 h-4 font-mono text-xs rounded-full border cursor-pointer text-tertiary border-tertiary">
      ?
    </p>
  </Tooltip>
)
