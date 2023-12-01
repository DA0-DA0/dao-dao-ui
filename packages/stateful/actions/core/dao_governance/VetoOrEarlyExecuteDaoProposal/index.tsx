import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { DaoProposalCommonSelectors } from '@dao-dao/state'
import {
  ControlKnobsEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodePolytoneExecuteMsg,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  AddressInput,
  EntityDisplay,
  ProposalLine,
} from '../../../../components'
import {
  daoInfoSelector,
  daoVetoableProposalsSelector,
} from '../../../../recoil'
import { useActionOptions } from '../../../react'
import {
  VetoOrEarlyExecuteDaoProposalComponent as StatelessVetoOrEarlyExecuteDaoProposalComponent,
  VetoOrEarlyExecuteDaoProposalData,
} from './Component'

const Component: ActionComponent<
  undefined,
  VetoOrEarlyExecuteDaoProposalData
> = (props) => {
  const { isCreating, fieldNamePrefix } = props
  const {
    chain: { chain_id: daoChainId },
    address,
  } = useActionOptions()
  const { watch, setValue } =
    useFormContext<VetoOrEarlyExecuteDaoProposalData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const coreAddress = watch(
    (props.fieldNamePrefix + 'coreAddress') as 'coreAddress'
  )
  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )

  const daoVetoableProposals = useCachedLoadingWithError(
    daoVetoableProposalsSelector({
      chainId: daoChainId,
      coreAddress: address,
    })
  )

  const selectedDaoInfo = useCachedLoadingWithError(
    chainId && coreAddress
      ? daoInfoSelector({
          chainId,
          coreAddress,
        })
      : undefined
  )

  // Select first proposal once loaded if nothing selected.
  useEffect(() => {
    if (
      isCreating &&
      !daoVetoableProposals.loading &&
      !daoVetoableProposals.errored &&
      !proposalId &&
      daoVetoableProposals.data.length > 0
    ) {
      setValue(
        (fieldNamePrefix + 'chainId') as 'chainId',
        daoVetoableProposals.data[0].chainId
      )
      setValue(
        (fieldNamePrefix + 'coreAddress') as 'coreAddress',
        daoVetoableProposals.data[0].dao
      )
      setValue(
        (fieldNamePrefix + 'proposalModuleAddress') as 'proposalModuleAddress',
        daoVetoableProposals.data[0].proposalsWithModule[0].proposalModule
          .address
      )
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        daoVetoableProposals.data[0].proposalsWithModule[0].proposals[0].id
      )
    }
  }, [isCreating, proposalId, setValue, fieldNamePrefix, daoVetoableProposals])

  return (
    <StatelessVetoOrEarlyExecuteDaoProposalComponent
      {...props}
      options={{
        selectedDaoInfo,
        daoVetoableProposals,
        AddressInput,
        EntityDisplay,
        ProposalLine,
      }}
    />
  )
}

export const makeVetoOrEarlyExecuteDaoProposalAction: ActionMaker<
  VetoOrEarlyExecuteDaoProposalData
> = ({ t, chain: { chain_id: currentChainId }, address }) => {
  const useDefaults: UseDefaults<VetoOrEarlyExecuteDaoProposalData> = () => ({
    chainId: currentChainId,
    coreAddress: '',
    proposalModuleAddress: '',
    proposalId: -1,
    action: 'veto',
  })

  const useTransformToCosmos: UseTransformToCosmos<
    VetoOrEarlyExecuteDaoProposalData
  > = () =>
    useCallback(
      ({ chainId, proposalModuleAddress, proposalId, action }) =>
        maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: proposalModuleAddress,
                funds: [],
                msg: {
                  [action === 'veto' ? 'veto' : 'execute']: {
                    proposal_id: proposalId,
                  },
                },
              },
            },
          })
        ),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<
    VetoOrEarlyExecuteDaoProposalData
  > = (msg: Record<string, any>) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    const isWasmExecuteMessage = objectMatchesStructure(msg, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {},
        },
      },
    })

    const isVeto =
      isWasmExecuteMessage &&
      objectMatchesStructure(msg.wasm.execute.msg, {
        veto: {
          proposal_id: {},
        },
      })
    const isExecute =
      isWasmExecuteMessage &&
      objectMatchesStructure(msg.wasm.execute.msg, {
        execute: {
          proposal_id: {},
        },
      })

    const proposalId = isVeto
      ? msg.wasm.execute.msg.veto.proposal_id
      : isExecute
      ? msg.wasm.execute.msg.execute.proposal_id
      : -1

    // Get DAO that this proposal module is attached to.
    const daoLoading = useCachedLoadingWithError(
      DaoProposalCommonSelectors.daoSelector({
        chainId,
        contractAddress: msg.wasm.execute.contract_addr,
      })
    )

    const proposalLoading = useCachedLoadingWithError(
      DaoProposalCommonSelectors.proposalSelector({
        chainId,
        contractAddress: msg.wasm.execute.contract_addr,
        params: [
          {
            proposalId,
          },
        ],
      })
    )

    if (
      daoLoading.loading ||
      daoLoading.errored ||
      proposalLoading.loading ||
      proposalLoading.errored ||
      (!isVeto &&
        (!isExecute ||
          // If executing, it's not an early-execute if we are not the vetoer.
          proposalLoading.data.proposal.veto?.vetoer !== address))
    ) {
      return {
        match: false,
      }
    }

    return {
      match: true,
      data: {
        chainId,
        coreAddress: daoLoading.data,
        proposalModuleAddress: msg.wasm.execute.contract_addr,
        proposalId,
        action: isVeto ? 'veto' : 'earlyExecute',
      },
    }
  }

  return {
    key: ActionKey.VetoOrEarlyExecuteDaoProposal,
    Icon: ControlKnobsEmoji,
    label: t('title.vetoOrEarlyExecute'),
    description: t('info.vetoOrEarlyExecuteDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
