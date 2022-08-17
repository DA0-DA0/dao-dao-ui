import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { SuspenseLoader } from '@dao-dao/common'
import { Dollar, Pie } from '@dao-dao/icons'
import { Cw20BaseSelectors, CwProposalSingleSelectors } from '@dao-dao/state'
import { ProposalInfoStat } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { BaseProposalModuleInfo } from '../../../../types'
import { useProcessTQ } from '../hooks'

interface ProposalModuleInfo extends BaseProposalModuleInfo {
  proposalModuleAddress: string
}

export const ProposalModuleInfo = (props: ProposalModuleInfo) => (
  <SuspenseLoader fallback={<StatelessProposalModuleInfo />}>
    <InnerProposalModuleInfo {...props} />
  </SuspenseLoader>
)

const InnerProposalModuleInfo = ({
  proposalModuleAddress,
  ...props
}: ProposalModuleInfo) => {
  const config = useRecoilValue(
    CwProposalSingleSelectors.configSelector({
      contractAddress: proposalModuleAddress,
    })
  )

  const processTQ = useProcessTQ()
  const { threshold, quorum } = processTQ(config.threshold)

  const proposalDepositTokenInfo = useRecoilValue(
    config.deposit_info?.token
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: config.deposit_info.token,
          params: [],
        })
      : constSelector(undefined)
  )

  return (
    <StatelessProposalModuleInfo
      data={{
        denom: proposalDepositTokenInfo?.symbol || '',
        macroDeposit:
          config.deposit_info?.deposit && proposalDepositTokenInfo
            ? convertMicroDenomToDenomWithDecimals(
                config.deposit_info.deposit,
                proposalDepositTokenInfo.decimals
              ).toLocaleString(undefined, { maximumFractionDigits: 6 }) +
              ' ' +
              proposalDepositTokenInfo?.symbol
            : 'None',
        depositRefunds: config.deposit_info?.refund_failed_proposals ?? false,
        passingThresholdString: threshold.display,
        quorumString: quorum?.display,
      }}
      {...props}
    />
  )
}

interface StatelessProposalModuleInfoProps extends BaseProposalModuleInfo {
  data?: {
    denom: string
    macroDeposit: string
    depositRefunds: boolean
    passingThresholdString: string
    quorumString?: string
  }
}

const StatelessProposalModuleInfo = ({
  data,
  className,
}: StatelessProposalModuleInfoProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex flex-wrap gap-x-8 gap-y-4 justify-around items-center p-5 rounded border border-inactive',
        className
      )}
    >
      <ProposalInfoStat
        Icon={Dollar}
        title={t('title.proposalDeposit')}
        value={data?.macroDeposit}
      />
      <ProposalInfoStat
        Icon={Dollar}
        title={t('title.refundFailedProposals')}
        value={
          data
            ? data.depositRefunds
              ? t('info.yes')
              : t('info.no')
            : undefined
        }
      />
      <ProposalInfoStat
        Icon={Pie}
        title={t('title.passingThreshold')}
        value={data?.passingThresholdString}
      />
      <ProposalInfoStat
        Icon={Pie}
        title={t('title.quorum')}
        value={data?.quorumString}
      />
    </div>
  )
}
