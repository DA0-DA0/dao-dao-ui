import { CashIcon, ChartPieIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Votes } from '@dao-dao/icons'
import {
  CopyToClipboardAccent,
  GovInfoListItem,
  SuspenseLoader,
} from '@dao-dao/ui'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter/react'

import { useDAOInfoContext } from './DAOPageWrapper'
import { DaoTreasury } from './DaoTreasury'
import { Loader } from './Loader'

interface DaoContractInfoProps {
  hideTreasury?: boolean
}

const DaoContractInfoInternal = ({ hideTreasury }: DaoContractInfoProps) => {
  const {
    ui: { DaoContractInfoContent },
  } = useVotingModuleAdapter()
  const { coreAddress } = useDAOInfoContext()

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
      <DaoContractInfoContent coreAddress={coreAddress} />

      {!hideTreasury && (
        <SuspenseLoader fallback={<Loader />}>
          <DaoTreasury />
        </SuspenseLoader>
      )}
    </div>
  )
}

const DaoContractInfoLoading: FC<DaoContractInfoProps> = ({ hideTreasury }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-row flex-wrap gap-3 md:grid md:grid-cols-3">
      <div className="mb-4 md:mb-0">
        <h2 className="mb-4 md:mb-6 primary-text">
          {t('title.votingConfiguration')}
        </h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2">
          <GovInfoListItem
            icon={<ChartPieIcon className="inline w-4" />}
            loading
            text={t('title.unstakingPeriod')}
          />
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            loading
            text={t('title.passingThreshold')}
          />
          <GovInfoListItem
            icon={<Votes fill="currentColor" width="16px" />}
            loading
            text={t('title.proposalDeposit')}
          />
          <GovInfoListItem
            icon={<CashIcon className="inline w-4" />}
            loading
            text={t('title.refundFailedProposals')}
          />
        </ul>
      </div>
      <div>
        <h2 className="mb-4 md:mb-6 primary-text">{t('title.addresses')}</h2>
        <ul className="flex flex-col gap-2 mt-3 list-none md:ml-2 caption-text">
          <li>
            {t('title.treasury')}{' '}
            <CopyToClipboardAccent loading value="juno..." />
          </li>
          <li>
            {t('title.governanceToken')}{' '}
            <CopyToClipboardAccent loading value="juno..." />
          </li>
          <li>
            {t('title.staking')}{' '}
            <CopyToClipboardAccent loading value="juno..." />
          </li>
        </ul>
      </div>
      {!hideTreasury && (
        <div>
          <div className="flex gap-1 justify-between">
            <h2 className="primary-text">{t('title.treasury')}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export const DaoContractInfo: FC<DaoContractInfoProps> = (props) => (
  <SuspenseLoader fallback={<DaoContractInfoLoading {...props} />}>
    <DaoContractInfoInternal {...props} />
  </SuspenseLoader>
)
