import { useTranslation } from 'react-i18next'
import { constSelector } from 'recoil'

import {
  Cw1WhitelistSelectors,
  DaoProposalMultipleSelectors,
  genericTokenSelector,
} from '@dao-dao/state'
import {
  TokenAmountDisplay,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  DaoInfoCard,
  Feature,
  PreProposeModuleType,
  TokenType,
} from '@dao-dao/types'
import {
  convertDurationToHumanReadableString,
  convertMicroDenomToDenomWithDecimals,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../../components'
import { useProposalModuleAdapterCommonContext } from '../../../react/context'
import { anyoneCanProposeSelector, useProcessQ } from '../common'

export const useProposalDaoInfoCards = (): DaoInfoCard[] => {
  const { t } = useTranslation()
  const {
    options: {
      chain: { chain_id: chainId },
      proposalModule,
    },
    common: { selectors },
  } = useProposalModuleAdapterCommonContext()

  const config = useCachedLoadingWithError(
    DaoProposalMultipleSelectors.configSelector({
      chainId,
      contractAddress: proposalModule.address,
    })
  )
  const depositInfo = useCachedLoadingWithError(selectors.depositInfo)
  const anyoneCanPropose = useCachedLoadingWithError(
    anyoneCanProposeSelector({
      chainId,
      preProposeAddress: proposalModule?.address ?? null,
    })
  )
  const depositTokenInfo = useCachedLoadingWithError(
    depositInfo.loading
      ? undefined
      : !depositInfo.errored && depositInfo.data
      ? genericTokenSelector({
          chainId,
          type:
            'native' in depositInfo.data.denom
              ? TokenType.Native
              : TokenType.Cw20,
          denomOrAddress:
            'native' in depositInfo.data.denom
              ? depositInfo.data.denom.native
              : depositInfo.data.denom.cw20,
        })
      : constSelector(undefined)
  )

  const processQ = useProcessQ()
  const processedQ =
    config.loading || config.errored
      ? undefined
      : processQ(config.data.voting_strategy)

  // Attempt to load cw1-whitelist admins if the vetoer is set. Will only
  // succeed if the vetoer is a cw1-whitelist contract. Otherwise it returns
  // undefined.
  const vetoerCw1WhitelistAdmins = useCachedLoadingWithError(
    config.loading
      ? undefined
      : config.errored || !('veto' in config.data) || !config.data.veto
      ? constSelector(undefined)
      : Cw1WhitelistSelectors.adminsIfCw1Whitelist({
          chainId,
          contractAddress: config.data.veto.vetoer,
        })
  )

  // If a vetoer is a cw1-whitelist contract, replace it with its admins and
  // show all of them.
  const vetoers =
    config.loading ||
    config.errored ||
    vetoerCw1WhitelistAdmins.loading ||
    vetoerCw1WhitelistAdmins.errored
      ? undefined
      : vetoerCw1WhitelistAdmins.data?.length
      ? vetoerCw1WhitelistAdmins.data
      : 'veto' in config.data && config.data.veto
      ? [config.data.veto.vetoer]
      : undefined

  return [
    {
      label: t('title.quorum'),
      tooltip: t('info.quorumTooltip', {
        context: 'multiple',
      }),
      loading: config.loading,
      value: config.loading
        ? undefined
        : !processedQ
        ? '<error>'
        : processedQ.quorum
        ? processedQ.quorum.display
        : t('info.disabled'),
    },
    {
      label: t('form.votingDurationTitle'),
      tooltip: config.loading
        ? t('info.loading')
        : t('info.votingDurationTooltip', {
            context: config.errored
              ? undefined
              : config.data.allow_revoting
              ? 'revoting'
              : 'noRevoting',
          }),
      loading: config.loading,
      value: config.loading
        ? undefined
        : config.errored
        ? '<error>'
        : convertDurationToHumanReadableString(
            t,
            config.data.max_voting_period
          ),
    },
    {
      label: t('title.revoting'),
      tooltip: t('info.revotingTooltip'),
      loading: config.loading,
      value: config.loading
        ? undefined
        : config.errored
        ? '<error>'
        : config.data.allow_revoting
        ? t('info.enabled')
        : t('info.disabled'),
    },
    {
      label: t('form.proposalDepositTitle'),
      tooltip: t('info.proposalDepositTooltip'),
      loading: depositInfo.loading || depositTokenInfo.loading,
      value:
        depositInfo.loading ||
        depositTokenInfo.loading ? undefined : depositInfo.errored ||
          depositTokenInfo.errored ? (
          '<error>'
        ) : depositInfo.data && depositTokenInfo.data ? (
          <TokenAmountDisplay
            amount={convertMicroDenomToDenomWithDecimals(
              depositInfo.data.amount,
              depositTokenInfo.data.decimals
            )}
            decimals={depositTokenInfo.data.decimals}
            iconUrl={depositTokenInfo.data.imageUrl}
            showFullAmount
            symbol={depositTokenInfo.data.symbol}
          />
        ) : (
          t('info.none')
        ),
    },
    {
      label: t('title.depositRefunds'),
      tooltip: t('info.depositRefundsTooltip'),
      loading: depositInfo.loading,
      value: depositInfo.loading
        ? undefined
        : depositInfo.errored
        ? '<error>'
        : depositInfo.data
        ? t(`depositRefundPolicy.${depositInfo.data.refund_policy}`)
        : t('info.na'),
    },
    {
      label: t('title.creationPolicy'),
      tooltip: t('info.creationPolicyTooltip'),
      loading: anyoneCanPropose.loading,
      value: anyoneCanPropose.loading
        ? undefined
        : anyoneCanPropose.errored
        ? '<error>'
        : anyoneCanPropose.data
        ? t('info.anyone')
        : t('info.onlyMembers'),
    },
    // If vetoer(s) found, show all of them. Otherwise, show loading and none
    // iff this proposal module version supports veto.
    ...(vetoers
      ? vetoers.map((vetoer) => ({
          label: t('title.vetoer'),
          tooltip: t('info.daoVetoerExplanation'),
          value: <EntityDisplay address={vetoer} />,
        }))
      : proposalModule.version &&
        isFeatureSupportedByVersion(Feature.Veto, proposalModule.version)
      ? [
          {
            label: t('title.vetoer'),
            tooltip: t('info.daoVetoerExplanation'),
            loading: config.loading || vetoerCw1WhitelistAdmins.loading,
            value:
              config.loading || vetoerCw1WhitelistAdmins.loading
                ? undefined
                : config.errored || vetoerCw1WhitelistAdmins.errored
                ? '<error>'
                : // We know here that if both loadables are done loading and
                  // did not error, there was no vetoer.
                  t('info.none'),
          },
        ]
      : []),
    ...(proposalModule.prePropose?.type === PreProposeModuleType.Approval
      ? [
          {
            label: t('title.approver'),
            tooltip: t('info.daoApproverExplanation'),
            value: (
              <EntityDisplay
                address={proposalModule.prePropose.config.approver}
              />
            ),
          },
        ]
      : []),
  ]
}
