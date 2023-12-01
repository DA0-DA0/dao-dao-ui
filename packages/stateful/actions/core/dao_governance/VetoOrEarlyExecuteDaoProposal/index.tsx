import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValueLoadable } from 'recoil'

import {
  govProposalsSelector,
} from '@dao-dao/state'
import {
  ControlKnobsEmoji,
  Loader,
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
  SuspenseLoader,
} from '../../../../components'
import { useActionOptions } from '../../../react'
import {
  VetoOrEarlyExecuteDaoProposalComponent as StatelessVetoOrEarlyExecuteDaoProposalComponent,
  VetoOrEarlyExecuteDaoProposalData,
} from './Component'

const useDefaults: UseDefaults<VetoOrEarlyExecuteDaoProposalData> = () => ({
  chainId: '',
  coreAddress: '',
  proposalModuleAddress: '',
  proposalNumber: -1,
  action: 'veto',
})

const Component: ActionComponent<
  undefined,
  VetoOrEarlyExecuteDaoProposalData
> = (props) => {
  const { isCreating, fieldNamePrefix } = props
  const options = useActionOptions()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<VetoOrEarlyExecuteDaoProposalData>()

  // const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  // const proposalId = watch(
  //   (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  // )

  // const openProposalsLoadable = useRecoilValueLoadable(
  //   isCreating
  //     ? govProposalsSelector({
  //         status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
  //         chainId,
  //       })
  //     : constSelector(undefined)
  // )

  // // Prevent action from being submitted if there are no open proposals.
  // useEffect(() => {
  //   if (
  //     openProposalsLoadable.state === 'hasValue' &&
  //     openProposalsLoadable.contents?.proposals.length === 0
  //   ) {
  //     setError((fieldNamePrefix + 'proposalId') as 'proposalId', {
  //       type: 'manual',
  //     })
  //   } else {
  //     clearErrors((fieldNamePrefix + 'proposalId') as 'proposalId')
  //   }
  // }, [openProposalsLoadable, setError, clearErrors, fieldNamePrefix])

  // // If viewing an action where we already selected and voted on a proposal,
  // // load just the one we voted on and add it to the list so we can display it.
  // const selectedProposal = useRecoilValue(
  //   !isCreating && proposalId
  //     ? govProposalSelector({
  //         proposalId: Number(proposalId),
  //         chainId,
  //       })
  //     : constSelector(undefined)
  // )

  // const address = getChainAddressForActionOptions(options, chainId)
  // const existingVotesLoading = loadableToLoadingData(
  //   useRecoilValueLoadable(
  //     proposalId && address
  //       ? govProposalVoteSelector({
  //           proposalId: Number(proposalId),
  //           voter: address,
  //           chainId,
  //         })
  //       : constSelector(undefined)
  //   ),
  //   undefined
  // )

  // // Select first proposal once loaded if nothing selected.
  // useEffect(() => {
  //   if (
  //     isCreating &&
  //     openProposalsLoadable.state === 'hasValue' &&
  //     openProposalsLoadable.contents?.proposals.length &&
  //     !proposalId
  //   ) {
  //     setValue(
  //       (fieldNamePrefix + 'proposalId') as 'proposalId',
  //       openProposalsLoadable.contents.proposals[0].id.toString()
  //     )
  //   }
  // }, [isCreating, openProposalsLoadable, proposalId, setValue, fieldNamePrefix])

  return (
    <>
      <SuspenseLoader
        fallback={<Loader />}
        forceFallback={openProposalsLoadable.state !== 'hasValue'}
      >
        <StatelessVetoOrEarlyExecuteDaoProposalComponent
          {...props}
          options={{}}
        />
      </SuspenseLoader>
    </>
  )
}

export const makeVetoOrEarlyExecuteDaoProposalAction: ActionMaker<
  VetoOrEarlyExecuteDaoProposalData
> = ({ t, chain: { chain_id: currentChainId } }) => {
  const useTransformToCosmos: UseTransformToCosmos<
    VetoOrEarlyExecuteDaoProposalData
  > = () =>
    useCallback(
      ({ chainId, proposalModuleAddress, proposalNumber, action }) =>
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
                    proposal_id: proposalNumber,
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
    const isEarlyExecute =
      isWasmExecuteMessage &&
      objectMatchesStructure(msg.wasm.execute.msg, {
        execute: {
          proposal_id: {},
        },
      })

    // Get DAO that this proposal module is attached to.
    const daoLoading = useCachedLoadingWithError(daoSelector)
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
