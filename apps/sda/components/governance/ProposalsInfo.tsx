import { FC } from 'react'

import { useRouter } from 'next/router'

import { PlusIcon } from '@heroicons/react/outline'

import { HeroStat } from './Hero/Stat'
import { Dollar, Pie } from '@/../../packages/icons'
import { Button } from '@/../../packages/ui'
import { convertMicroDenomToDenomWithDecimals } from '@/../../packages/utils'
import { processThresholdData } from '@/../../packages/utils/v1'
import { useGovernanceModule } from '@/hooks'

export interface ProposalsInfoProps {
  data?: {
    denom: string
    macroDeposit: string
    depositRefunds: boolean
    passingThresholdString: string
    quorumString?: string
  }
}

const ProposalsInfoInternal: FC<ProposalsInfoProps> = ({ data }) => {
  const router = useRouter()
  return (
    <div className="flex justify-between items-center py-5 px-4 rounded border border-inactive">
      <HeroStat
        Icon={Dollar}
        title="Proposal deposit:"
        value={data ? data.macroDeposit : ''}
      />
      <HeroStat
        Icon={Dollar}
        title="Deposit refund:"
        value={data ? (data.depositRefunds ? 'True' : 'False') : ''}
      />
      <HeroStat
        Icon={Pie}
        title="Passing threshold:"
        value={data ? data.passingThresholdString : ''}
      />
      {data && data.quorumString && (
        <HeroStat Icon={Pie} title="Quorum:" value={data.quorumString} />
      )}
      <Button onClick={() => router.push('/propose')} size="sm" type="button">
        New proposal <PlusIcon className="w-[10px]" />
      </Button>
    </div>
  )
}

export const ProposalsInfo: FC<{}> = () => {
  const { governanceModuleConfig, proposalDepositTokenInfo } =
    useGovernanceModule({
      fetchProposalDepositTokenInfo: true,
    })

  const dontHaveData =
    !governanceModuleConfig ||
    (governanceModuleConfig.deposit_info && proposalDepositTokenInfo)

  const data = !dontHaveData
    ? {
        denom: 'hmm',
        macroDeposit:
          governanceModuleConfig.deposit_info?.deposit &&
          proposalDepositTokenInfo
            ? convertMicroDenomToDenomWithDecimals(
                governanceModuleConfig.deposit_info.deposit,
                proposalDepositTokenInfo.decimals
              ).toLocaleString()
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
  return <ProposalsInfoInternal data={data} />
}
