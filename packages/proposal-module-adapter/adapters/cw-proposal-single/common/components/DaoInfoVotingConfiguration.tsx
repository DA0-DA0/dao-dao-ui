import { CashIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { Votes } from '@dao-dao/icons'
import { Cw20BaseSelectors, CwProposalSingleSelectors } from '@dao-dao/state'
import { ProposalModule } from '@dao-dao/tstypes'
import { GovInfoListItem } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useProcessTQ } from '../hooks'

interface DaoInfoVotingConfigurationProps {
  proposalModule: ProposalModule
}

export const DaoInfoVotingConfiguration = ({
  proposalModule,
}: DaoInfoVotingConfigurationProps) => {
  const { t } = useTranslation()

  const config = useRecoilValue(
    CwProposalSingleSelectors.configSelector({
      contractAddress: proposalModule.address,
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
    <>
      <GovInfoListItem
        icon={<Votes width="1rem" />}
        text={t('title.passingThreshold')}
        value={threshold.display}
      />
      {quorum && (
        <GovInfoListItem
          icon={<Votes width="1rem" />}
          text={t('title.quorum')}
          value={quorum.display}
        />
      )}
      {config.deposit_info && proposalDepositTokenInfo && (
        <>
          <GovInfoListItem
            icon={<Votes width="1rem" />}
            text={t('title.proposalDeposit')}
            value={`${convertMicroDenomToDenomWithDecimals(
              config.deposit_info.deposit,
              proposalDepositTokenInfo.decimals
            )} $${proposalDepositTokenInfo.symbol}`}
          />
          <GovInfoListItem
            icon={<CashIcon className="inline w-4" />}
            text={t('title.refundFailedProposals')}
            value={
              config.deposit_info.refund_failed_proposals
                ? t('info.yes')
                : t('info.no')
            }
          />
        </>
      )}
    </>
  )
}
