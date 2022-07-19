import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { CwProposalSingleSelectors } from '@dao-dao/state'
import { ProposalIdDisplay } from '@dao-dao/ui'

import { useProposalModuleAdapterOptions } from '../../../../react'
import { BaseProposalLineProps } from '../../../../types'
import { useProposalExpirationString } from '../../hooks'
import { ProposalStatus } from '../ProposalStatus'

export const ProposalLineMobile = ({ className }: BaseProposalLineProps) => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress, prefix: proposalPrefix },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

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

  const expirationString = useProposalExpirationString()

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 justify-between p-4 min-h-[9.5rem] text-sm rounded-lg bg-primary',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <ProposalStatus status={proposal.status} />
        <p className="col-span-3 break-words body-text">{proposal.title}</p>
      </div>
      <div className="flex flex-row gap-6">
        <p className="font-mono caption-text">
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalPrefix}
          />
        </p>
        <p className="truncate caption-text">{expirationString}</p>
      </div>
    </div>
  )
}
