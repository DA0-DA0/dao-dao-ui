import { selectorFamily, waitForAll } from 'recoil'

import {
  DaoProposalSingleV2Selectors,
  NeutronCwdPreProposeSingleOverruleSelectors,
} from '@dao-dao/state'
import { NeutronTimelockOverrule, WithChainId } from '@dao-dao/types'

import { daoCoreProposalModulesSelector } from './misc'

/**
 * For the Neutron fork, retrieve the associated overrule proposal created in
 * the DAO given a SubDAO's timelock address and the timelocked proposal ID.
 */
export const neutronOverruleProposalForTimelockedProposalSelector =
  selectorFamily<
    NeutronTimelockOverrule,
    WithChainId<{
      preProposeOverruleAddress: string
      timelockAddress: string
      subdaoProposalId: number
    }>
  >({
    key: 'neutronOverruleProposalForTimelockedProposal',
    get:
      ({
        chainId,
        preProposeOverruleAddress,
        timelockAddress,
        subdaoProposalId,
      }) =>
      ({ get }) => {
        const [dao, proposalModuleAddress, overruleProposalId] = get(
          waitForAll([
            NeutronCwdPreProposeSingleOverruleSelectors.daoSelector({
              chainId,
              contractAddress: preProposeOverruleAddress,
              params: [],
            }),
            NeutronCwdPreProposeSingleOverruleSelectors.proposalModuleSelector({
              chainId,
              contractAddress: preProposeOverruleAddress,
              params: [],
            }),
            NeutronCwdPreProposeSingleOverruleSelectors.queryExtensionSelector({
              chainId,
              contractAddress: preProposeOverruleAddress,
              params: [
                {
                  msg: {
                    overrule_proposal_id: {
                      subdao_proposal_id: subdaoProposalId,
                      timelock_address: timelockAddress,
                    },
                  },
                },
              ],
            }),
          ])
        )

        const [proposalModules, proposal] = get(
          waitForAll([
            daoCoreProposalModulesSelector({
              chainId,
              coreAddress: dao,
            }),
            DaoProposalSingleV2Selectors.proposalSelector({
              chainId,
              contractAddress: proposalModuleAddress,
              params: [
                {
                  proposalId: overruleProposalId as number,
                },
              ],
            }),
          ])
        )

        const proposalModule = proposalModules.find(
          ({ address }) => address === proposalModuleAddress
        )
        if (!proposalModule) {
          throw new Error(
            `No proposal module found for address ${proposalModuleAddress} in DAO ${dao}`
          )
        }

        return {
          dao,
          proposalModulePrefix: proposalModule.prefix,
          proposal,
        }
      },
  })
