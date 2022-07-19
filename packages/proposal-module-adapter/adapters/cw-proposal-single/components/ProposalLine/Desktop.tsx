import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { ProposalIdDisplay } from '@dao-dao/ui'
import { getProposalEnd } from '@dao-dao/utils'

import { useProposalModuleAdapterOptions } from '../../../../react'
import { BaseProposalLineProps } from '../../../../types'
import { ProposalStatus } from '../ProposalStatus'

export const ProposalLineDesktop = ({ className }: BaseProposalLineProps) => {
  const { t } = useTranslation()
  const { proposalModuleAddress, proposalNumber, proposalPrefix } =
    useProposalModuleAdapterOptions()

  const proposal = useRecoilValue(
    CwProposalSingleSelectors.proposalSelector({
      contractAddress: proposalModuleAddress,
      params: [
        {
          proposalId: proposalNumber,
        },
      ],
    })
  )?.proposal

  if (!proposal) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-6 items-center p-4 text-sm rounded-lg bg-primary',
        className
      )}
    >
      <div className="flex flex-row flex-wrap col-span-2 gap-4 items-center">
        <p className="font-mono caption-text">
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalPrefix}
          />
        </p>
        <ProposalStatus status={proposal.status} />
      </div>
      <p className="col-span-3 truncate link-text">{proposal.title}</p>
      <p className="truncate body-text">
        {getProposalEnd(proposal.expiration, proposal.status)}
      </p>
    </div>
  )
}
