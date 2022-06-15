import { FC } from 'react'

import { useProposalModule } from '@dao-dao/state'
import {
  ProposalsInfoLoader,
  ProposalsInfoProps,
  ProposalsInfo as StatelessProposalsInfo,
} from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  processThresholdData,
} from '@dao-dao/utils'

import { useDAOInfoContext } from '../DAOPageWrapper'

export const ProposalsInfo: FC<Omit<ProposalsInfoProps, 'data'>> = (props) => {
  const { coreAddress } = useDAOInfoContext()
  const { proposalModuleConfig, proposalDepositTokenInfo } = useProposalModule(
    coreAddress,
    {
      fetchProposalDepositTokenInfo: true,
    }
  )

  const dontHaveData =
    !proposalModuleConfig ||
    (proposalModuleConfig.deposit_info && !proposalDepositTokenInfo)

  const data = !dontHaveData
    ? {
        denom: proposalDepositTokenInfo?.symbol || '',
        macroDeposit:
          proposalModuleConfig.deposit_info?.deposit && proposalDepositTokenInfo
            ? convertMicroDenomToDenomWithDecimals(
                proposalModuleConfig.deposit_info.deposit,
                proposalDepositTokenInfo.decimals
              ).toLocaleString(undefined, { maximumFractionDigits: 6 }) +
              ' ' +
              proposalDepositTokenInfo?.symbol
            : 'None',
        depositRefunds:
          proposalModuleConfig.deposit_info?.refund_failed_proposals || true,
        passingThresholdString: processThresholdData(
          proposalModuleConfig.threshold
        ).threshold.display,
        quorumString: processThresholdData(proposalModuleConfig.threshold)
          .quorum?.display,
      }
    : undefined

  return <StatelessProposalsInfo {...props} data={data} />
}

export { ProposalsInfoLoader }
