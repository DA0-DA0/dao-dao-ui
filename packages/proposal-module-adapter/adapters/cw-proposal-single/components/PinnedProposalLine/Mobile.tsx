import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  CwCoreV0_1_0Selectors,
  CwProposalSingleSelectors,
} from '@dao-dao/state'
import { ProposalIdDisplay } from '@dao-dao/ui'

import { useProposalModuleAdapterOptions } from '../../../../react'
import { BasePinnedProposalLineProps } from '../../../../types'
import { useProposalExpirationString } from '../../hooks'

export const PinnedProposalLineMobile = ({
  className,
}: BasePinnedProposalLineProps) => {
  const { t } = useTranslation()
  const {
    proposalModule: { address: proposalModuleAddress, prefix: proposalPrefix },
    proposalNumber,
    Logo,
    coreAddress,
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

  const daoConfig = useRecoilValue(
    CwCoreV0_1_0Selectors.configSelector({
      contractAddress: coreAddress,
    })
  )

  const expirationString = useProposalExpirationString()

  return (
    <div
      className={clsx(
        'flex flex-col gap-4 p-4 rounded-lg bg-primary',
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
        <p className="font-mono caption-text">
          <ProposalIdDisplay
            proposalNumber={proposalNumber}
            proposalPrefix={proposalPrefix}
          />
        </p>
      </div>
      <div className="flex flex-row gap-4 justify-between items-center">
        <p className="break-words body-text">{proposal.title}</p>
        <p className="truncate caption-text">{expirationString}</p>
      </div>
    </div>
  )
}
