import clsx from 'clsx'
import { FC } from 'react'

import { Dollar, Pie } from '@dao-dao/icons'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'
import { processThresholdData } from '@dao-dao/utils/v1'

import { HeroStat } from './Hero/Stat'
import { useGovernanceModule } from '@/hooks'

export interface ProposalsInfoProps {
  data?: {
    denom: string
    macroDeposit: string
    depositRefunds: boolean
    passingThresholdString: string
    quorumString?: string
  }
  className?: string
}

const ProposalsInfoInternal: FC<ProposalsInfoProps> = ({ data, className }) => (
  <div
    className={clsx(
      'flex flex-wrap gap-x-8 gap-y-4 justify-around items-center p-5 rounded border border-inactive',
      className
    )}
  >
    <HeroStat
      Icon={Dollar}
      title="Proposal deposit:"
      value={data?.macroDeposit ?? ''}
    />
    <HeroStat
      Icon={Dollar}
      title="Deposit refund:"
      value={data ? (data.depositRefunds ? 'Yes' : 'No') : ''}
    />
    <HeroStat
      Icon={Pie}
      title="Passing threshold:"
      value={data?.passingThresholdString ?? ''}
    />
    <HeroStat Icon={Pie} title="Quorum:" value={data?.quorumString ?? ''} />
  </div>
)

export const ProposalsInfo: FC<Omit<ProposalsInfoProps, 'data'>> = (props) => {
  const { governanceModuleConfig, proposalDepositTokenInfo } =
    useGovernanceModule({
      fetchProposalDepositTokenInfo: true,
    })

  const dontHaveData =
    !governanceModuleConfig ||
    (governanceModuleConfig.deposit_info && proposalDepositTokenInfo)

  const data = !dontHaveData
    ? {
        denom: proposalDepositTokenInfo?.symbol || '',
        macroDeposit:
          governanceModuleConfig.deposit_info?.deposit &&
          proposalDepositTokenInfo
            ? convertMicroDenomToDenomWithDecimals(
                governanceModuleConfig.deposit_info.deposit,
                proposalDepositTokenInfo.decimals
              ).toLocaleString() +
              ' ' +
              proposalDepositTokenInfo?.symbol
            : 'None',
        depositRefunds:
          governanceModuleConfig.deposit_info?.refund_failed_proposals || true,
        passingThresholdString: processThresholdData(
          governanceModuleConfig.threshold
        ).threshold.display,
        quorumString: processThresholdData(governanceModuleConfig.threshold)
          .quorum?.display,
      }
    : undefined

  return <ProposalsInfoInternal {...props} data={data} />
}

export const ProposalsInfoLoader: FC = () => <ProposalsInfoInternal />
