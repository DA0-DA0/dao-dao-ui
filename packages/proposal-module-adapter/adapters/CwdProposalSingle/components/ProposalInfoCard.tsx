import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import {
  CwdCoreV2Selectors,
  blockHeightTimestampSafeSelector,
} from '@dao-dao/state'
// eslint-disable-next-line regex/invalid
import { contractVersionSelector } from '@dao-dao/state/recoil/selectors/contract'
import { ContractVersion } from '@dao-dao/tstypes'
import { Status } from '@dao-dao/tstypes/contracts/CwdProposalSingle.common'
import { CopyToClipboard, ProposalIdDisplay, Tooltip } from '@dao-dao/ui'
import { CHAIN_TXN_URL_PREFIX } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../react/context'
import { BaseProposalInfoCardProps } from '../../../types'
import { getVoteSelector } from '../contracts/CwdProposalSingle.common.recoil'
import { useProposal, useProposalExecutionTxHash } from '../hooks'
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

  const proposal = useProposal()

  const proposalModuleVersion = useRecoilValue(
    contractVersionSelector(proposalModuleAddress)
  )

  const executionTxHash = useProposalExecutionTxHash()

  const walletVotingPowerWhenProposalCreated = useRecoilValue(
    walletAddress
      ? CwdCoreV2Selectors.votingPowerAtHeightSelector({
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
      ? getVoteSelector({
          contractAddress: proposalModuleAddress,
          params: [{ proposalId: proposalNumber, voter: walletAddress }],
        })
      : constSelector(undefined)
  )?.vote?.vote

  const createdHeight = useRecoilValue(
    blockHeightTimestampSafeSelector(proposal.start_height)
  )?.toLocaleString()

  return (
    <div className="border-light rounded-md border">
      <div className="flex flex-row items-stretch justify-evenly py-4 md:py-5">
        <div className="flex flex-col items-center gap-2">
          <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
            {t('title.proposal')}
          </p>

          <p className="font-mono text-sm">
            <ProposalIdDisplay
              proposalNumber={proposalNumber}
              proposalPrefix={proposalPrefix}
            />
          </p>
        </div>

        <div className="bg-light w-[1px]"></div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
            {t('title.status')}
          </p>

          <div className="font-mono text-sm">
            <ProposalStatus status={proposal.status} />
          </div>
        </div>

        <div className="bg-light w-[1px]"></div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
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
      <div className="border-light flex flex-col gap-3 border-t p-5 md:p-7">
        <div className="flex flex-col items-start gap-2">
          <p className="text-tertiary font-mono text-sm">
            {t('title.proposer')}
          </p>
          <CopyToClipboard takeN={9} value={proposal.proposer} />
        </div>

        {proposal.status === Status.Executed && !executionTxHash ? (
          <div className="grid grid-cols-10 items-center gap-2 md:flex md:flex-col md:items-start">
            <p className="text-tertiary col-span-3 font-mono text-sm">
              {t('info.txAbbr')}
            </p>
            <p className="col-span-7">{t('info.loading')}</p>
          </div>
        ) : !!executionTxHash ? (
          <div className="grid grid-cols-10 items-center gap-2 md:flex md:flex-col md:items-start">
            {CHAIN_TXN_URL_PREFIX ? (
              <a
                className="text-tertiary col-span-3 flex flex-row items-center gap-1 font-mono text-sm"
                href={CHAIN_TXN_URL_PREFIX + executionTxHash}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t('info.txAbbr')}
                <ExternalLinkIcon width={16} />
              </a>
            ) : (
              <p className="text-tertiary col-span-3 font-mono text-sm">
                {t('info.txAbbr')}
              </p>
            )}
            <div className="col-span-7">
              <CopyToClipboard takeN={9} value={executionTxHash} />
            </div>
          </div>
        ) : null}
      </div>
      {proposalModuleVersion !== ContractVersion.V0_1_0 && (
        <div className="border-light flex flex-row items-stretch justify-evenly border-t py-4 md:py-5">
          <div className="flex flex-col items-center gap-2">
            <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
              {t('title.created')}
            </p>

            <p className="flex flex-row items-center gap-4 text-right font-mono text-xs leading-6">
              {proposal.created === '0' ? createdHeight : proposal.created}
            </p>
          </div>

          <div className="bg-light w-[1px]"></div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-tertiary overflow-hidden text-ellipsis font-mono text-sm">
              {t('title.lastUpdated')}
            </p>
            <p className="flex flex-row items-center gap-4 text-right font-mono text-xs leading-6">
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
    <p className="text-tertiary border-tertiary flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border p-1 font-mono text-xs">
      ?
    </p>
  </Tooltip>
)
