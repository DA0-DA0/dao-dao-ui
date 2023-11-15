import { useRecoilValue } from 'recoil'

import { DaoPreProposeApproverSelectors } from '@dao-dao/state/recoil'
import { useChain } from '@dao-dao/stateless'
import { PreProposeModuleType } from '@dao-dao/types'

import { useActionsForMatching } from '../../actions'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
  useProposalModuleAdapterOptions,
} from '../../proposal-module-adapter'
import { daoInfoSelector } from '../../recoil'
import { DaoProviders } from './DaoProviders'

const InnerDaoApprovalProposalContentDisplay = () => {
  const {
    components: { PreProposeApprovalInnerContentDisplay },
  } = useProposalModuleAdapter()
  const actionsForMatching = useActionsForMatching()

  return (
    <PreProposeApprovalInnerContentDisplay
      actionsForMatching={actionsForMatching}
    />
  )
}

export const DaoApprovalProposalContentDisplay = () => {
  const {
    proposalModule: { prePropose },
    proposalNumber,
  } = useProposalModuleAdapterOptions()

  if (prePropose?.type !== PreProposeModuleType.Approver) {
    throw new Error('Invalid pre-propose module type. Expected an approver.')
  }

  const { approvalDao, preProposeApprovalContract } = prePropose.config

  const { chain_id: chainId } = useChain()
  const daoInfo = useRecoilValue(
    daoInfoSelector({
      chainId,
      coreAddress: approvalDao,
    })
  )
  const preProposeApprovalProposalId = useRecoilValue(
    DaoPreProposeApproverSelectors.queryExtensionSelector({
      chainId,
      contractAddress: prePropose.address,
      params: [
        {
          msg: {
            // pending_proposal_id_for_approval_proposal_id: {
            pre_propose_approval_id_for_approver_proposal_id: {
              id: proposalNumber,
            },
          },
        },
      ],
    })
  ) as number

  const proposalModuleWithPreProposeApproval = daoInfo.proposalModules.find(
    ({ prePropose }) => prePropose?.address === preProposeApprovalContract
  )
  if (!proposalModuleWithPreProposeApproval?.prePropose) {
    throw new Error('Pre-propose approval contract not found.')
  }

  return (
    <DaoProviders info={daoInfo}>
      <ProposalModuleAdapterProvider
        initialOptions={{
          coreAddress: daoInfo.coreAddress,
        }}
        proposalId={
          // Add prefix of target proposal module so it matches.
          `${proposalModuleWithPreProposeApproval.prefix}${preProposeApprovalProposalId}`
        }
        proposalModules={[proposalModuleWithPreProposeApproval]}
      >
        <InnerDaoApprovalProposalContentDisplay />
      </ProposalModuleAdapterProvider>
    </DaoProviders>
  )
}
