import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { NeutronCwdSubdaoTimelockSingleSelectors } from '@dao-dao/state'
import {
  ThumbDownEmoji,
  useCachedLoading,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { ChainId, ContractVersion, PreProposeModuleType } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { ContractName } from '@dao-dao/utils'

import { EntityDisplay, ProposalLine } from '../../../../components'
import { daoCoreProposalModulesSelector } from '../../../../recoil'
import { useMsgExecutesContract } from '../../../hooks'
import { useActionOptions } from '../../../react'
import {
  NeutronOverruleSubDaoProposalData,
  NeutronOverruleSubDaoProposalComponent as StatelessNeutronOverruleSubDaoProposalComponent,
} from './Component'

const useDefaults: UseDefaults<NeutronOverruleSubDaoProposalData> = () => ({
  coreAddress: '',
  proposalId: '',
})

const useTransformToCosmos: UseTransformToCosmos<
  NeutronOverruleSubDaoProposalData
> = () => useCallback(() => undefined, [])

const Component: ActionComponent<
  undefined,
  NeutronOverruleSubDaoProposalData
> = (props) => {
  const {
    chain: { chain_id: chainId },
  } = useActionOptions()
  const { watch } = useFormContext<NeutronOverruleSubDaoProposalData>()

  const coreAddress = watch(
    (props.fieldNamePrefix + 'coreAddress') as 'coreAddress'
  )

  // Get DAO proposal modules.
  const daoProposalModules = useCachedLoading(
    daoCoreProposalModulesSelector({
      chainId,
      coreAddress: coreAddress,
    }),
    []
  )

  return (
    <StatelessNeutronOverruleSubDaoProposalComponent
      {...props}
      options={{
        daoProposalModules,
        EntityDisplay,
        ProposalLine,
      }}
    />
  )
}

export const makeNeutronOverruleSubDaoProposalAction: ActionMaker<
  NeutronOverruleSubDaoProposalData
> = ({ t, chain: { chain_id: chainId }, context }) => {
  // Only usable in Neutron DAOs.
  if (
    chainId !== ChainId.NeutronMainnet ||
    context.type !== ActionContextType.Dao ||
    context.info.coreVersion !== ContractVersion.V2AlphaNeutron
  ) {
    return null
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<
    NeutronOverruleSubDaoProposalData
  > = (msg: Record<string, any>) => {
    const isNeutronOverrule = useMsgExecutesContract(
      msg,
      ContractName.NeutronCwdSubdaoTimelockSingle,
      {
        overrule_proposal: {
          proposal_id: {},
        },
      }
    )

    const config = useCachedLoadingWithError(
      isNeutronOverrule
        ? NeutronCwdSubdaoTimelockSingleSelectors.configSelector({
            chainId,
            contractAddress: msg.wasm.execute.contract_addr,
            params: [],
          })
        : undefined
    )

    // Get DAO proposal modules.
    const proposalModules = useCachedLoadingWithError(
      config.loading || config.errored
        ? undefined
        : daoCoreProposalModulesSelector({
            chainId,
            coreAddress: config.data.subdao,
          })
    )

    // Get proposal module that uses the specified timelock address.
    const proposalModule =
      proposalModules.loading || proposalModules.errored
        ? undefined
        : proposalModules.data.find(
            ({ prePropose }) =>
              prePropose?.type === PreProposeModuleType.NeutronSubdaoSingle &&
              prePropose.config.timelockAddress ===
                msg.wasm.execute.contract_addr
          )

    if (config.loading || config.errored || !proposalModule) {
      return {
        match: false,
      }
    }

    return {
      match: true,
      data: {
        chainId,
        coreAddress: config.data.subdao,
        proposalId:
          proposalModule.prefix +
          msg.wasm.execute.msg.overrule_proposal.proposal_id,
      },
    }
  }

  return {
    key: ActionKey.NeutronOverruleSubDaoProposal,
    Icon: ThumbDownEmoji,
    label: t('title.overruleSubDaoProposal'),
    description: t('info.overruleSubDaoProposalDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Don't allow selecting in picker since Neutron fork DAO overrule proposals
    // are automatically created. This is just an action to render them.
    hideFromPicker: true,
  }
}
