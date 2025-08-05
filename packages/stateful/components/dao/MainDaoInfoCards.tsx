import { DataObject, Send, WarningRounded } from '@mui/icons-material'
import { useQueries } from '@tanstack/react-query'
import uniq from 'lodash.uniq'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  contractQueries,
  cw1WhitelistExtraQueries,
  initialActionsVerifiedAtom,
} from '@dao-dao/state'
import {
  ActionsMatchAndRender,
  Button,
  Modal,
  RawActionsRenderer,
  DaoInfoCards as StatelessDaoInfoCards,
  TokenAmountDisplay,
  TxCrossChainRelayStatus,
  useDao,
} from '@dao-dao/stateless'
import {
  DaoInfoCard,
  PreProposeModuleType,
  SelfRelayExecuteModalProps,
} from '@dao-dao/types'
import {
  formatDate,
  formatPercentOf100,
  makeCombineQueryResultsIntoLoadingDataWithError,
} from '@dao-dao/utils'

import {
  useDaoGovernanceToken,
  useQueryLoadingData,
  useQueryLoadingDataWithError,
  useTxRelayState,
} from '../../hooks'
import { useVotingModuleAdapter } from '../../voting-module-adapter'
import { EntityDisplay } from '../EntityDisplay'
import { SelfRelayExecuteModal } from '../SelfRelayExecuteModal'
import { SuspenseLoader } from '../SuspenseLoader'

export const MainDaoInfoCards = () => {
  const {
    components: { MainDaoInfoCardsLoader },
  } = useVotingModuleAdapter()

  return (
    <SuspenseLoader fallback={<MainDaoInfoCardsLoader />}>
      <InnerMainDaoInfoCards />
    </SuspenseLoader>
  )
}

const InnerMainDaoInfoCards = () => {
  const { t } = useTranslation()
  const {
    hooks: { useMainDaoInfoCards },
  } = useVotingModuleAdapter()
  const votingModuleCards = useMainDaoInfoCards()
  const tokenInfo = useDaoGovernanceToken()
  const dao = useDao()

  const [initialActionsModalOpen, setInitialActionsModalOpen] = useState(false)
  const [showRawInitialActions, setShowRawInitialActions] = useState(false)

  const [initialActionsVerified, setInitialActionsVerified] = useRecoilState(
    initialActionsVerifiedAtom({
      chainId: dao.chainId,
      coreAddress: dao.coreAddress,
    })
  )

  const [selfRelayExecuteProps, setSelfRelayExecuteProps] =
    useState<Pick<SelfRelayExecuteModalProps, 'chainIds' | 'transaction'>>()

  const { chainId, coreAddress, activeThreshold, created, initialActions } =
    dao.info

  const instantiationEvent = useQueryLoadingDataWithError(
    contractQueries.instantiationEvent({
      chainId,
      address: coreAddress,
    })
  )
  const initialActionsRelayState = useTxRelayState({
    msgs: initialActions,
    context: {
      type: 'dao_initial_actions',
      coreAddress,
      executedAt:
        instantiationEvent.loading ||
        instantiationEvent.errored ||
        !instantiationEvent.data.blockHeader
          ? undefined
          : new Date(instantiationEvent.data.blockHeader.time),
    },
    loadingTxHash:
      instantiationEvent.loading || instantiationEvent.errored
        ? instantiationEvent
        : {
            loading: false,
            errored: false,
            updating: instantiationEvent.updating,
            data: instantiationEvent.errored
              ? null
              : instantiationEvent.data.hash,
          },
    openSelfRelayExecute: setSelfRelayExecuteProps,
  })

  const tvlLoading = useQueryLoadingData(dao.tvlQuery, {
    amount: -1,
    timestamp: Date.now(),
  })

  // Get unique approvers from all proposal modules.
  const allApprovers = uniq(
    dao.proposalModules.flatMap(({ prePropose }) =>
      prePropose?.type === PreProposeModuleType.Approval
        ? prePropose.config.approver
        : []
    )
  )

  // Get unique vetoers from all proposal modules.
  const allVetoers = uniq(
    dao.proposalModules.flatMap(({ veto }) => (veto ? [veto.vetoer] : []))
  )

  // Attempt to load cw1-whitelist admins if the vetoer is set. Will only
  // succeed if the vetoer is a cw1-whitelist contract. Otherwise it returns
  // undefined.
  const cw1WhitelistAdminsLoading = useQueries({
    queries: allVetoers.map((address) =>
      cw1WhitelistExtraQueries.adminsIfCw1Whitelist({
        chainId,
        address,
      })
    ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError(),
  })

  // If a vetoer is a cw1-whitelist contract, replace it with its admins.
  const flattenedVetoers = uniq(
    allVetoers.flatMap((vetoer, index) =>
      !cw1WhitelistAdminsLoading.loading &&
      !cw1WhitelistAdminsLoading.errored &&
      cw1WhitelistAdminsLoading.data[index]?.length
        ? (cw1WhitelistAdminsLoading.data[index] as string[])
        : [vetoer]
    )
  )

  // Show warning if DAO was created within the last 30 days and initial actions
  // have not been verified.
  const initialActionsNeedVerification =
    !!dao.info.created &&
    dao.info.created >= Date.now() - 30 * 24 * 60 * 60 * 1_000 &&
    !initialActionsVerified

  return (
    <>
      <StatelessDaoInfoCards
        cards={[
          // Common items.
          ...(created
            ? [
                {
                  label: t('title.established'),
                  tooltip: t('info.establishedTooltip'),
                  value: formatDate(new Date(created)),
                } satisfies DaoInfoCard,
              ]
            : []),
          {
            label: t('title.treasury'),
            tooltip: t('info.estimatedTreasuryUsdValueTooltip'),
            value: (
              <TokenAmountDisplay
                amount={
                  tvlLoading.loading
                    ? { loading: true }
                    : tvlLoading.data.amount
                }
                dateFetched={
                  tvlLoading.loading
                    ? undefined
                    : new Date(tvlLoading.data.timestamp)
                }
                estimatedUsdValue
              />
            ),
          },
          // Voting module-specific cards.
          ...votingModuleCards,
          // Put active threshold last so it's closer to voting module cards
          // which may contain staking information.
          ...(activeThreshold
            ? [
                {
                  label: t('title.activeThreshold'),
                  tooltip: t('info.activeThresholdDescription'),
                  value:
                    'percentage' in activeThreshold
                      ? formatPercentOf100(
                          Number(activeThreshold.percentage.percent) * 100
                        )
                      : tokenInfo && (
                          <TokenAmountDisplay
                            amount={HugeDecimal.from(
                              activeThreshold.absolute_count.count
                            )}
                            decimals={tokenInfo.decimals}
                            symbol={tokenInfo.symbol}
                          />
                        ),
                } satisfies DaoInfoCard,
              ]
            : []),
          ...(initialActions.length
            ? [
                {
                  label: t('title.initialActions'),
                  tooltip: t('info.initialActionsDescription'),
                  warning: initialActionsNeedVerification,
                  Icon: initialActionsNeedVerification
                    ? WarningRounded
                    : undefined,
                  value: (
                    <Button
                      className={
                        initialActionsNeedVerification
                          ? 'text-text-interactive-warning-body decoration-text-interactive-warning-body'
                          : undefined
                      }
                      onClick={() => {
                        setInitialActionsModalOpen(true)
                        setInitialActionsVerified(true)
                      }}
                      variant="underline"
                    >
                      {t('info.actions', {
                        count: initialActions.length,
                      })}
                    </Button>
                  ),
                } satisfies DaoInfoCard,
              ]
            : []),
          // Show approvers and vetoers from proposal modules here in the main
          // info section because it is very relevant and should be surfaced.
          ...allApprovers.map((approver) => ({
            label: t('title.approver'),
            tooltip: t('info.daoApproverExplanation'),
            value: <EntityDisplay address={approver} />,
          })),
          ...flattenedVetoers.map((vetoer) => ({
            label: t('title.vetoer'),
            tooltip: t('info.daoVetoerExplanation'),
            value: <EntityDisplay address={vetoer} />,
          })),
        ]}
      />

      <Modal
        containerClassName="w-full !max-w-2xl"
        contentContainerClassName="gap-4"
        footerContent={
          !initialActionsRelayState.loading &&
          initialActionsRelayState.data.hasCrossChainMessages && (
            <div className="flex flex-col gap-4">
              <TxCrossChainRelayStatus
                canSelfRelay={
                  !instantiationEvent.loading && !instantiationEvent.errored
                }
                selfRelayLoadError={
                  instantiationEvent.errored
                    ? instantiationEvent.error
                    : undefined
                }
                state={initialActionsRelayState.data}
              />

              {initialActionsRelayState.data.needsSelfRelay && (
                <Button
                  center
                  onClick={initialActionsRelayState.data.openSelfRelay}
                  size="lg"
                  variant="primary"
                >
                  <Send className="!h-5 !w-5" />
                  {t('button.relay')}
                </Button>
              )}
            </div>
          )
        }
        header={{
          title: t('title.initialActions'),
          subtitle: t('info.initialActionsDescription'),
        }}
        onClose={() => setInitialActionsModalOpen(false)}
        visible={initialActionsModalOpen}
      >
        <ActionsMatchAndRender
          SuspenseLoader={SuspenseLoader}
          hideCopyLink
          messages={initialActions}
        />

        <Button
          className="self-start"
          onClick={() => setShowRawInitialActions((s) => !s)}
          variant="ghost"
        >
          <DataObject className="text-icon-secondary" />
          <p className="secondary-text">
            {showRawInitialActions
              ? t('button.hideRawData')
              : t('button.showRawData')}
          </p>
        </Button>

        {showRawInitialActions && (
          <RawActionsRenderer messages={initialActions} />
        )}
      </Modal>

      {/* For relaying initial actions */}
      <SelfRelayExecuteModal
        // Placeholders that get overridden when the modal is opened.
        chainIds={[]}
        crossChainPackets={[]}
        transaction={{
          type: 'execute',
          msgs: [],
        }}
        uniqueId=""
        {...selfRelayExecuteProps}
        onClose={() => setSelfRelayExecuteProps(undefined)}
        onSuccess={() => toast.success(t('success.initialActionsRelayed'))}
        visible={!!selfRelayExecuteProps}
      />
    </>
  )
}
