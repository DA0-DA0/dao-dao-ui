import clsx from 'clsx'
import { ComponentType, FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Dollar, Pie } from '@dao-dao/icons'

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

export const ProposalsInfo: FC<ProposalsInfoProps> = ({ data, className }) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center justify-around gap-x-8 gap-y-4 rounded border border-inactive p-5',
        className
      )}
    >
      <ProposalInfoStat
        Icon={Dollar}
        title={t('title.proposalDeposit')}
        value={data?.macroDeposit ?? ''}
      />
      <ProposalInfoStat
        Icon={Dollar}
        title={t('title.refundFailedProposals')}
        value={data ? (data.depositRefunds ? 'Yes' : 'No') : ''}
      />
      <ProposalInfoStat
        Icon={Pie}
        title={t('title.passingThreshold')}
        value={data?.passingThresholdString ?? ''}
      />
      <ProposalInfoStat
        Icon={Pie}
        title={t('title.quorum')}
        value={data?.quorumString ?? ''}
      />
    </div>
  )
}

export const ProposalsInfoLoader: FC = () => <ProposalsInfo />

interface ProposalInfoStatProps {
  Icon: ComponentType<{ className: string }>
  title: string
  value: string
}

const ProposalInfoStat: FC<ProposalInfoStatProps> = ({
  Icon,
  value,
  title,
}) => (
  <div className="flex items-center gap-3">
    <Icon className="secondary-text h-3 fill-current" />
    <div className="flex items-center gap-2">
      <span className="secondary-text">{title}</span>
      <span className="link-text">{value ? value : '..'}</span>
    </div>
  </div>
)
