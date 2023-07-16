import {
  AttachMoney,
  ChangeCircleOutlined,
  FlagOutlined,
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

import { configSelector } from '../../contracts/DaoProposalMultiple.recoil'
import { anyoneCanProposeSelector } from '../selectors'
import { useProcessQ } from './useProcessQ'

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
        chainId: options.chain.chain_id,
        contractAddress: options.proposalModule.address,
      })
    )
    const depositInfo = useRecoilValue(depositInfoSelector)
    const anyoneCanPropose = useRecoilValue(
      anyoneCanProposeSelector({
        chainId: options.chain.chain_id,
        preProposeAddress: options.proposalModule.preProposeAddress,
      })
    )

    const processQ = useProcessQ()
    const { quorum } = processQ(config.voting_strategy)

    const depositTokenInfo = useRecoilValue(
      depositInfo
        ? genericTokenSelector({
            type:
              'native' in depositInfo.denom ? TokenType.Native : TokenType.Cw20,
            denomOrAddress:
              'native' in depositInfo.denom
                ? depositInfo.denom.native
                : depositInfo.denom.cw20,
            chainId: options.chain.chain_id,
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
        chainId: options.chain.chain_id,
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
        Icon: FlagOutlined,
        label: t('title.quorum'),
        value: quorum.display,
      },
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
