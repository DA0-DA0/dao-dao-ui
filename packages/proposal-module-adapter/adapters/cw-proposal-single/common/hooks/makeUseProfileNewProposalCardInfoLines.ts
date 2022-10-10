import {
  AttachMoney,
  CancelOutlined,
  FlagOutlined,
  MultilineChart,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import {
  DepositRefundPolicy,
  IProposalModuleAdapterCommonOptions,
} from '@dao-dao/tstypes'
import { ProfileNewProposalCardInfoLine } from '@dao-dao/ui'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { configSelector } from '../../contracts/CwProposalSingle.common.recoil'
import { makeDepositInfo } from '../selectors'
import { useProcessTQ } from './useProcessTQ'

export const makeUseProfileNewProposalCardInfoLines = (
  options: IProposalModuleAdapterCommonOptions
) => {
  const {
    proposalModule: { address },
  } = options
  const depositInfoSelector = makeDepositInfo(options)

  return (): ProfileNewProposalCardInfoLine[] => {
    const { t } = useTranslation()

    const config = useRecoilValue(
      configSelector({
        contractAddress: address,
      })
    )
    const depositInfo = useRecoilValue(depositInfoSelector)

    const processTQ = useProcessTQ()
    const { threshold, quorum } = processTQ(config.threshold)

    const proposalDepositTokenInfo = useRecoilValue(
      depositInfo?.denom && 'cw20' in depositInfo.denom
        ? Cw20BaseSelectors.tokenInfoSelector({
            contractAddress: depositInfo.denom.cw20,
            params: [],
          })
        : constSelector(undefined)
    )

    const proposalDeposit =
      depositInfo?.amount && proposalDepositTokenInfo
        ? convertMicroDenomToDenomWithDecimals(
            depositInfo.amount,
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
              ' $' +
              proposalDepositTokenInfo?.symbol
            : t('info.none'),
      },
      ...(depositInfo && proposalDeposit > 0
        ? [
            {
              Icon: CancelOutlined,
              label: 'Failed proposals',
              value:
                depositInfo.refund_policy === DepositRefundPolicy.Always
                  ? t('info.refund')
                  : t('info.noRefund'),
              valueClassName:
                depositInfo.refund_policy === DepositRefundPolicy.Always
                  ? '!border-component-badge-valid'
                  : '!border-component-badge-error',
            },
          ]
        : []),
    ]
  }
}
