import {
  AttachMoney,
  ChangeCircleOutlined,
  FlagOutlined,
  MultilineChart,
  PersonOutlineRounded,
  Timelapse,
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { blocksPerYearSelector, genericTokenSelector } from '@dao-dao/state'
import {
  DepositInfoSelector,
  DepositRefundPolicy,
  IProposalModuleAdapterCommonOptions,
  ProfileNewProposalCardInfoLine,
  TokenType,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  durationToSeconds,
  secondsToWdhms,
} from '@dao-dao/utils'

import { configSelector } from '../../contracts/DaoProposalSingle.common.recoil'
import { anyoneCanProposeSelector } from '../selectors'
import { useProcessTQ } from './useProcessTQ'

export const makeUseProfileNewProposalCardInfoLines =
  ({
    options,
    depositInfoSelector,
  }: {
    options: IProposalModuleAdapterCommonOptions
    depositInfoSelector: DepositInfoSelector
  }) =>
  (): ProfileNewProposalCardInfoLine[] => {
    const { t } = useTranslation()

    const config = useRecoilValue(
      configSelector({
        contractAddress: options.proposalModule.address,
        chainId: options.chainId,
      })
    )
    const depositInfo = useRecoilValue(depositInfoSelector)
    const anyoneCanPropose = useRecoilValue(
      anyoneCanProposeSelector({
        chainId: options.chainId,
        preProposeAddress: options.proposalModule.preProposeAddress,
      })
    )

    const processTQ = useProcessTQ()
    const { threshold, quorum } = processTQ(config.threshold)

    const depositTokenInfo = useRecoilValue(
      depositInfo
        ? genericTokenSelector({
            type:
              'native' in depositInfo.denom ? TokenType.Native : TokenType.Cw20,
            denomOrAddress:
              'native' in depositInfo.denom
                ? depositInfo.denom.native
                : depositInfo.denom.cw20,
            chainId: options.chainId,
          })
        : constSelector(undefined)
    )

    const proposalDeposit =
      depositInfo && depositTokenInfo
        ? convertMicroDenomToDenomWithDecimals(
            depositInfo.amount,
            depositTokenInfo.decimals
          )
        : 0

    const blocksPerYear = useRecoilValue(
      blocksPerYearSelector({
        chainId: options.chainId,
      })
    )

    return [
      {
        Icon: Timelapse,
        label: t('form.votingDurationTitle'),
        value: secondsToWdhms(
          durationToSeconds(blocksPerYear, config.max_voting_period)
        ),
      },
      {
        Icon: MultilineChart,
        label: t('title.passingThreshold'),
        value: threshold!.display,
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
        label: t('title.deposit'),
        value:
          proposalDeposit > 0 && depositTokenInfo
            ? t('format.token', {
                amount: proposalDeposit.toLocaleString(undefined, {
                  maximumFractionDigits: depositTokenInfo.decimals,
                }),
                symbol: depositTokenInfo.symbol,
              })
            : t('info.none'),
      },
      ...(depositInfo && proposalDeposit > 0
        ? [
            {
              Icon: ChangeCircleOutlined,
              label: t('title.depositRefunds'),
              value: t(`depositRefundPolicy.${depositInfo.refund_policy}`),
              valueClassName:
                depositInfo.refund_policy !== DepositRefundPolicy.Always
                  ? '!border-component-badge-error'
                  : undefined,
            },
          ]
        : []),
      {
        Icon: PersonOutlineRounded,
        label: t('title.proposer'),
        value: anyoneCanPropose ? t('info.anyone') : t('info.onlyMembers'),
      },
    ]
  }
