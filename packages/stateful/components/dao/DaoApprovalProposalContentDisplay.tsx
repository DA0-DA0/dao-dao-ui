import { useRecoilValue } from 'recoil'

import { DaoPreProposeApproverSelectors } from '@dao-dao/state/recoil'
import {
  Loader,
  ProposalContentDisplay,
  ProposalContentDisplayProps,
  useChain,
} from '@dao-dao/stateless'
import {
  BasePreProposeApprovalInnerContentDisplayProps,
  CommonProposalInfo,
  PreProposeModuleType,
} from '@dao-dao/types'

import { useActionsForMatching } from '../../actions'
import { useEntity } from '../../hooks'
import {
  ProposalModuleAdapterProvider,
  useProposalModuleAdapter,
  useProposalModuleAdapterContext,
} from '../../proposal-module-adapter'
import { daoInfoSelector } from '../../recoil'
import { EntityDisplay } from '../EntityDisplay'
import { IconButtonLink } from '../IconButtonLink'
import { SuspenseLoader } from '../SuspenseLoader'
import { DaoProviders } from './DaoProviders'

export type DaoApprovalProposalContentDisplayProps = {
  proposalInfo: CommonProposalInfo
  setSeenAllActionPages: (() => void) | undefined
}

type InnerDaoApprovalProposalContentDisplayProps = Omit<
  ProposalContentDisplayProps,
  'EntityDisplay' | 'IconButtonLink' | 'approval'
>

type InnerDaoApprovalProposalContentDisplayWithInnerContentProps = Omit<
  InnerDaoApprovalProposalContentDisplayProps,
  'innerContentDisplay'
> &
  Omit<BasePreProposeApprovalInnerContentDisplayProps, 'actionsForMatching'>

export const DaoApprovalProposalContentDisplay = ({
  proposalInfo,
  ...props
}: DaoApprovalProposalContentDisplayProps) => {
  const {
    options: {
      proposalModule: { prePropose },
      proposalNumber,
    },
    adapter: {
      hooks: { useProposalRefreshers },
    },
  } = useProposalModuleAdapterContext()
  const { refreshProposal, refreshing } = useProposalRefreshers()

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

  const creatorAddress = proposalInfo.createdByAddress
  const entity = useEntity(creatorAddress)

  const innerProps: InnerDaoApprovalProposalContentDisplayProps = {
    creator: {
      address: creatorAddress,
      entity,
    },
    createdAt:
      proposalInfo.createdAtEpoch !== null
        ? new Date(proposalInfo.createdAtEpoch)
        : undefined,
    description: proposalInfo.description,
    duplicateUrl: undefined,
    onRefresh: refreshProposal,
    refreshing,
    title: proposalInfo.title,
    innerContentDisplay: <Loader />,
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
        <SuspenseLoader
          fallback={<InnerDaoApprovalProposalContentDisplay {...innerProps} />}
        >
          <InnerDaoApprovalProposalContentDisplayWithInnerContent
            {...innerProps}
            {...props}
          />
        </SuspenseLoader>
      </ProposalModuleAdapterProvider>
    </DaoProviders>
  )
}

const InnerDaoApprovalProposalContentDisplay = (
  props: InnerDaoApprovalProposalContentDisplayProps
) => (
  <ProposalContentDisplay
    EntityDisplay={EntityDisplay}
    IconButtonLink={IconButtonLink}
    approval
    {...props}
  />
)

const InnerDaoApprovalProposalContentDisplayWithInnerContent = ({
  setSeenAllActionPages,
  ...props
}: InnerDaoApprovalProposalContentDisplayWithInnerContentProps) => {
  const {
    hooks: { useLoadingPreProposeApprovalProposer },
    components: { PreProposeApprovalInnerContentDisplay },
  } = useProposalModuleAdapter()
  const actionsForMatching = useActionsForMatching()

  const loadingProposer = useLoadingPreProposeApprovalProposer()
  const creatorAddress =
    (!loadingProposer.loading && loadingProposer.data) ||
    // Fallback to approval proposal creator passed in from main component.
    props.creator?.address ||
    ''
  const entity = useEntity(creatorAddress)

  return (
    <InnerDaoApprovalProposalContentDisplay
      {...props}
      creator={{
        address: creatorAddress,
        entity,
      }}
      innerContentDisplay={
        <PreProposeApprovalInnerContentDisplay
          actionsForMatching={actionsForMatching}
          setSeenAllActionPages={setSeenAllActionPages}
        />
      }
    />
  )
}
