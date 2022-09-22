import {
  AttachMoney,
  CancelOutlined,
  FlagOutlined,
  MultilineChart,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { Cw20BaseSelectors, CwProposalSingleSelectors } from '@dao-dao/state'
import { ProposalModule } from '@dao-dao/tstypes'
import { ProfileNewProposalCardInfoLine } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { useProcessTQ } from './useProcessTQ'

export const makeUseProfileNewProposalCardInfoLines =
  ({ address }: ProposalModule) =>
  (): ProfileNewProposalCardInfoLine[] => {
    const { t } = useTranslation()

    const config = useRecoilValue(
      CwProposalSingleSelectors.configSelector({
        contractAddress: address,
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

    const proposalDeposit =
      config.deposit_info?.deposit && proposalDepositTokenInfo
        ? convertMicroDenomToDenomWithDecimals(
            config.deposit_info.deposit,
            proposalDepositTokenInfo.decimals
          )
        : 0

    return [
      {
        Icon: MultilineChart,
        label: t('title.passingThreshold'),
        value: threshold.display,
      },
      ...(quorum
        ? [
            {
              Icon: FlagOutlined,
              label: t('title.quorum'),
              value: quorum.display,
            },
          ]
        : []),
      {
        Icon: AttachMoney,
        label: t('title.proposalDeposit'),
        value:
          proposalDeposit > 0
            ? proposalDeposit.toLocaleString(undefined, {
                maximumFractionDigits: proposalDepositTokenInfo?.decimals ?? 6,
              }) +
              ' ' +
              proposalDepositTokenInfo?.symbol
            : t('info.none'),
      },
      ...(proposalDeposit > 0
        ? [
            {
              Icon: CancelOutlined,
              label: 'Failed proposals',
              value: config.deposit_info?.refund_failed_proposals
                ? t('info.refund')
                : t('info.noRefund'),
              valueClassName: '!border-component-badge-error',
            },
          ]
        : []),
    ]
  }
