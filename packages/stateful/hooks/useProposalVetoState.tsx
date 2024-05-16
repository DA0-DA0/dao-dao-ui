import { ThumbDownOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import {
  ProposalStatusAndInfoProps,
  Tooltip,
  useCachedLoading,
  useConfiguredChainContext,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionKey,
  EntityType,
  NeutronTimelockOverrule,
  ProposalStatusEnum,
  ProposalStatusKey,
  cwMsgToEncodeObject,
} from '@dao-dao/types'
import { VetoConfig } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  executeSmartContract,
  getDaoProposalSinglePrefill,
  makeCw1WhitelistExecuteMessage,
  makeWasmMessage,
  processError,
} from '@dao-dao/utils'

import { ButtonLink, EntityDisplay } from '../components'
import { useProposalModuleAdapterOptions } from '../proposal-module-adapter'
import { useEntity } from './useEntity'
import { useWalletWithSecretNetworkPermit } from './useWalletWithSecretNetworkPermit'

export type UseProposalVetoStateOptions = {
  statusKey: ProposalStatusKey
  vetoConfig: VetoConfig | null | undefined
  neutronTimelockOverrule?: NeutronTimelockOverrule
  onVetoSuccess: () => void | Promise<void>
  onExecuteSuccess: () => void | Promise<void>
}

export type UseProposalVetoStateReturn = {
  vetoEnabled: boolean
  canBeVetoed: boolean
  vetoOrEarlyExecute: ProposalStatusAndInfoProps['vetoOrEarlyExecute']
  vetoInfoItems: ProposalStatusAndInfoProps<any>['info']
}

/**
 * This hook is used in the proposal module adapters' ProposalStatusAndInfo
 * components to load the veto configuration and handle when the current wallet
 * has the power to veto/early-execute.
 */
export const useProposalVetoState = ({
  statusKey,
  vetoConfig,
  neutronTimelockOverrule,
  onVetoSuccess,
  onExecuteSuccess,
}: UseProposalVetoStateOptions): UseProposalVetoStateReturn => {
  const { t } = useTranslation()
  const router = useRouter()
  const {
    chain: { chain_id: chainId },
  } = useConfiguredChainContext()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { proposalModule, proposalNumber } = useProposalModuleAdapterOptions()
  const {
    isSecretNetwork,
    address: walletAddress = '',
    permit,
    getSigningClient,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
  })

  const vetoEnabled = !!vetoConfig || !!neutronTimelockOverrule
  const [vetoLoading, setVetoLoading] = useState<
    'veto' | 'earlyExecute' | false
  >(false)
  const { entity: vetoerEntity } = useEntity(
    vetoConfig?.vetoer || neutronTimelockOverrule?.dao || ''
  )
  // Flatten vetoer entities in case a cw1-whitelist is the vetoer.
  const vetoerEntities = !vetoerEntity.loading
    ? vetoerEntity.data.type === EntityType.Cw1Whitelist
      ? vetoerEntity.data.entities
      : [vetoerEntity.data]
    : []
  const vetoerDaoEntities = vetoerEntities.filter(
    (entity) => entity.type === EntityType.Dao
  )
  // This is the voting power the current wallet has in each of the DAO vetoers.
  const walletDaoVetoerMemberships = useCachedLoading(
    !vetoerEntity.loading && (isSecretNetwork ? permit : walletAddress)
      ? waitForAll(
          vetoerDaoEntities.map((entity) =>
            DaoCoreV2Selectors.votingPowerAtHeightSelector({
              contractAddress: entity.address,
              chainId,
              params: [
                isSecretNetwork
                  ? { auth: { permit } }
                  : { address: walletAddress },
              ],
            })
          )
        )
      : undefined,
    undefined
  )
  const canBeVetoed =
    vetoEnabled &&
    (statusKey === 'veto_timelock' ||
      (statusKey === ProposalStatusEnum.Open &&
        !!vetoConfig?.veto_before_passed) ||
      statusKey === ProposalStatusEnum.NeutronTimelocked)
  // Find matching vetoer for this wallet, which is either the wallet itself or
  // a DAO this wallet is a member of. If a matching vetoer is found, this
  // wallet can veto.
  const matchingWalletVetoer =
    canBeVetoed && !vetoerEntity.loading
      ? vetoerEntities.find(
          (entity) =>
            entity.type === EntityType.Wallet &&
            entity.address === walletAddress
        ) ||
        (!walletDaoVetoerMemberships.loading && walletDaoVetoerMemberships.data
          ? vetoerDaoEntities.find(
              (_, index) =>
                walletDaoVetoerMemberships.data![index].power !== '0'
            )
          : undefined)
      : undefined
  const walletCanEarlyExecute =
    !!matchingWalletVetoer &&
    statusKey === 'veto_timelock' &&
    !!vetoConfig?.early_execute
  const onVeto = useCallback(async () => {
    if (vetoerEntity.loading || !matchingWalletVetoer) {
      return
    }

    setVetoLoading('veto')
    try {
      // For Neutron timelocked proposals, just navigate to the overrule
      // proposal.
      if (neutronTimelockOverrule) {
        router.push(
          getDaoProposalPath(
            neutronTimelockOverrule.dao,
            neutronTimelockOverrule.proposalModulePrefix +
              neutronTimelockOverrule.proposal.id.toString()
          )
        )
      } else if (
        vetoerEntity.data.type === EntityType.Wallet ||
        (vetoerEntity.data.type === EntityType.Cw1Whitelist &&
          matchingWalletVetoer.type === EntityType.Wallet)
      ) {
        const msg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: proposalModule.address,
              funds: [],
              msg: {
                veto: {
                  proposal_id: proposalNumber,
                },
              },
            },
          },
        })

        await executeSmartContract(
          getSigningClient,
          walletAddress,
          proposalModule.address,
          cwMsgToEncodeObject(
            chainId,
            vetoerEntity.data.type === EntityType.Wallet
              ? msg
              : makeCw1WhitelistExecuteMessage(vetoerEntity.data.address, msg),
            walletAddress
          )
        )

        await onVetoSuccess()
      } else if (matchingWalletVetoer.type === EntityType.Dao) {
        router.push(
          getDaoProposalPath(matchingWalletVetoer.address, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: [
                {
                  actionKey: ActionKey.VetoOrEarlyExecuteDaoProposal,
                  data: {
                    chainId,
                    coreAddress,
                    proposalModuleAddress: proposalModule.address,
                    proposalId: proposalNumber,
                    action: 'veto',
                  },
                },
              ],
            }),
          })
        )
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setVetoLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [
    vetoerEntity,
    matchingWalletVetoer,
    neutronTimelockOverrule,
    router,
    getDaoProposalPath,
    getSigningClient,
    proposalModule.address,
    proposalNumber,
    onVetoSuccess,
    walletAddress,
    chainId,
    coreAddress,
  ])
  const onVetoEarlyExecute = useCallback(async () => {
    if (vetoerEntity.loading || !matchingWalletVetoer) {
      return
    }

    setVetoLoading('earlyExecute')
    try {
      if (
        vetoerEntity.data.type === EntityType.Wallet ||
        (vetoerEntity.data.type === EntityType.Cw1Whitelist &&
          matchingWalletVetoer.type === EntityType.Wallet)
      ) {
        const msg = makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: proposalModule.address,
              funds: [],
              msg: {
                execute: {
                  proposal_id: proposalNumber,
                },
              },
            },
          },
        })

        await executeSmartContract(
          getSigningClient,
          walletAddress,
          proposalModule.address,
          cwMsgToEncodeObject(
            chainId,
            vetoerEntity.data.type === EntityType.Wallet
              ? msg
              : makeCw1WhitelistExecuteMessage(vetoerEntity.data.address, msg),
            walletAddress
          )
        )

        await onExecuteSuccess()
      } else if (matchingWalletVetoer.type === EntityType.Dao) {
        router.push(
          getDaoProposalPath(matchingWalletVetoer.address, 'create', {
            prefill: getDaoProposalSinglePrefill({
              actions: [
                {
                  actionKey: ActionKey.VetoOrEarlyExecuteDaoProposal,
                  data: {
                    chainId,
                    coreAddress,
                    proposalModuleAddress: proposalModule.address,
                    proposalId: proposalNumber,
                    action: 'earlyExecute',
                  },
                },
              ],
            }),
          })
        )
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))

      // Stop loading if errored.
      setVetoLoading(false)
    }

    // Loading will stop on success when status refreshes.
  }, [
    vetoerEntity,
    matchingWalletVetoer,
    getSigningClient,
    proposalModule.address,
    proposalNumber,
    onExecuteSuccess,
    walletAddress,
    router,
    getDaoProposalPath,
    chainId,
    coreAddress,
  ])

  return {
    vetoEnabled,
    canBeVetoed,
    vetoOrEarlyExecute: matchingWalletVetoer
      ? {
          loading: vetoLoading,
          onVeto,
          onEarlyExecute: walletCanEarlyExecute
            ? onVetoEarlyExecute
            : undefined,
          isVetoerDaoMember: matchingWalletVetoer.type === EntityType.Dao,
          isNeutronOverrule: !!neutronTimelockOverrule,
        }
      : undefined,
    vetoInfoItems:
      canBeVetoed ||
      statusKey === ProposalStatusEnum.Vetoed ||
      statusKey === ProposalStatusEnum.NeutronOverruled
        ? neutronTimelockOverrule
          ? ([
              {
                Icon: ThumbDownOutlined,
                label: t('title.overrule'),
                Value: (props) => (
                  <Tooltip
                    morePadding
                    title={
                      <EntityDisplay
                        address={neutronTimelockOverrule.dao}
                        noCopy
                      />
                    }
                  >
                    <ButtonLink
                      href={getDaoProposalPath(
                        neutronTimelockOverrule.dao,
                        neutronTimelockOverrule.proposalModulePrefix +
                          neutronTimelockOverrule.proposal.id.toString()
                      )}
                      variant="underline"
                      {...props}
                    >
                      {t('title.proposalId', {
                        id: neutronTimelockOverrule.proposal.id,
                      })}
                    </ButtonLink>
                  </Tooltip>
                ),
              },
            ] as ProposalStatusAndInfoProps<any>['info'])
          : (vetoerEntities.map((entity) => ({
              Icon: ThumbDownOutlined,
              label: t('title.vetoer'),
              Value: (props) => (
                <EntityDisplay {...props} address={entity.address} noCopy />
              ),
            })) as ProposalStatusAndInfoProps<any>['info'])
        : [],
  }
}
