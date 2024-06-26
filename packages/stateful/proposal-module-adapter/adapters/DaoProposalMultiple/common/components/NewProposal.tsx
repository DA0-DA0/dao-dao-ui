import { FlagOutlined, Timelapse } from '@mui/icons-material'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback, useRecoilValueLoadable } from 'recoil'

import {
  DaoCoreV2Selectors,
  DaoProposalMultipleSelectors,
  blocksPerYearSelector,
} from '@dao-dao/state'
import {
  NewProposalTitleDescriptionHeader,
  NewProposal as StatelessNewProposal,
  NewProposalProps as StatelessNewProposalProps,
  useCachedLoadable,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { BaseNewProposalProps, IProposalModuleBase } from '@dao-dao/types'
import {
  MAX_NUM_PROPOSAL_CHOICES,
  convertActionsToMessages,
  convertExpirationToDate,
  dateToWdhms,
  processError,
} from '@dao-dao/utils'

import { useLoadedActionsAndCategories } from '../../../../../actions'
import { useMembership, useWallet } from '../../../../../hooks'
import { makeGetProposalInfo } from '../../functions'
import {
  NewProposalData,
  NewProposalForm,
  SimulateProposal,
  UsePublishProposal,
} from '../../types'
import { useProcessQ } from '../hooks'
import { NewProposalMain } from './NewProposalMain'
import { NewProposalPreview } from './NewProposalPreview'

export type NewProposalProps = BaseNewProposalProps<NewProposalForm> & {
  proposalModule: IProposalModuleBase
  usePublishProposal: UsePublishProposal
}

export const NewProposal = ({
  onCreateSuccess,
  proposalModule,
  usePublishProposal,
  ...props
}: NewProposalProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const {
    name: daoName,
    imageUrl: daoImageUrl,
    coreAddress,
    isActive,
    activeThreshold,
  } = useDaoInfoContext()
  const { isWalletConnecting, isWalletConnected, getStargateClient } =
    useWallet()

  const { watch } = useFormContext<NewProposalForm>()
  const proposalTitle = watch('title')
  const choices = watch('choices') ?? []

  const { isMember = false, loading: membershipLoading } = useMembership({
    coreAddress,
  })

  const [loading, setLoading] = useState(false)

  // Info about if the DAO is paused. This selector depends on blockHeight,
  // which is refreshed periodically, so use a loadable to avoid unnecessary
  // re-renders.
  const pauseInfo = useCachedLoadable(
    DaoCoreV2Selectors.pauseInfoSelector({
      chainId,
      contractAddress: coreAddress,
      params: [],
    })
  )
  const isPaused =
    pauseInfo.state === 'hasValue' &&
    ('paused' in pauseInfo.contents || 'Paused' in pauseInfo.contents)

  const processQ = useProcessQ()

  const blocksPerYearLoadable = useRecoilValueLoadable(
    blocksPerYearSelector({
      chainId,
    })
  )

  const {
    simulateProposal: _simulateProposal,
    publishProposal,
    anyoneCanPropose,
    depositUnsatisfied,
    simulationBypassExpiration,
  } = usePublishProposal()

  const [simulating, setSimulating] = useState(false)
  const simulateProposal: SimulateProposal = useCallback(
    async (...params) => {
      setSimulating(true)
      try {
        await _simulateProposal(...params)
      } finally {
        setSimulating(false)
      }
    },
    [_simulateProposal]
  )

  const createProposal = useRecoilCallback(
    ({ snapshot }) =>
      async (newProposalData: NewProposalData) => {
        if (!isWalletConnected) {
          toast.error(t('error.logInToContinue'))
          return
        }

        if (blocksPerYearLoadable.state !== 'hasValue') {
          toast.error(t('error.loadingData'))
          return
        }
        const blocksPerYear = blocksPerYearLoadable.contents

        setLoading(true)
        try {
          const { proposalNumber, proposalId } = await publishProposal(
            newProposalData,
            {
              // On failed simulation, allow the user to bypass the simulation
              // and create the proposal anyway for 3 seconds.
              failedSimulationBypassSeconds: 3,
            }
          )

          const proposalInfo = await makeGetProposalInfo({
            chain: proposalModule.dao.chain,
            coreAddress: proposalModule.dao.coreAddress,
            proposalModule: proposalModule.info,
            proposalNumber,
            proposalId,
            isPreProposeApprovalProposal: false,
          })()
          const expirationDate =
            proposalInfo?.expiration &&
            convertExpirationToDate(
              blocksPerYear,
              proposalInfo.expiration,
              (await (await getStargateClient()).getBlock()).header.height
            )

          const proposal = (
            await snapshot.getPromise(
              DaoProposalMultipleSelectors.proposalSelector({
                chainId,
                contractAddress: proposalModule.address,
                params: [
                  {
                    proposalId: proposalNumber,
                  },
                ],
              })
            )
          ).proposal

          const { quorum } = processQ(proposal.voting_strategy)

          onCreateSuccess(
            proposalInfo
              ? {
                  id: proposalId,
                  title: newProposalData.title,
                  description: newProposalData.description,
                  info: [
                    {
                      Icon: FlagOutlined,
                      label: `${t('title.quorum')}: ${quorum.display}`,
                    },
                    ...(expirationDate
                      ? [
                          {
                            Icon: Timelapse,
                            label: dateToWdhms(expirationDate),
                          },
                        ]
                      : []),
                  ],
                  dao: {
                    name: daoName,
                    coreAddress,
                    imageUrl: daoImageUrl,
                  },
                }
              : {
                  id: proposalId,
                  title: newProposalData.title,
                  description: newProposalData.description,
                  info: [],
                  dao: {
                    name: daoName,
                    coreAddress,
                    imageUrl: daoImageUrl,
                  },
                }
          )
          // Don't stop loading indicator on success since we are navigating.
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
          setLoading(false)
        }
      },
    [
      isWalletConnected,
      t,
      publishProposal,
      proposalModule,
      blocksPerYearLoadable,
      getStargateClient,
      chainId,
      processQ,
      onCreateSuccess,
      daoName,
      coreAddress,
      daoImageUrl,
    ]
  )

  const { loadedActions } = useLoadedActionsAndCategories()

  const getProposalDataFromFormData: StatelessNewProposalProps<
    NewProposalForm,
    NewProposalData
  >['getProposalDataFromFormData'] = ({ title, description, choices }) => ({
    title,
    description,
    choices: {
      options: choices.map((option) => ({
        title: option.title,
        description: option.description,
        // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs. The
        // contract execution will fail if the messages are invalid, so this is
        // safe. The UI should ensure that the co rrect messages are used for
        // the given chain anyways.
        msgs: convertActionsToMessages(loadedActions, option.actionData) as any,
      })),
    },
  })

  return (
    <StatelessNewProposal<NewProposalForm, NewProposalData>
      activeThreshold={activeThreshold}
      additionalSubmitError={
        choices.length < 2
          ? t('error.tooFewChoices')
          : choices.length > MAX_NUM_PROPOSAL_CHOICES
          ? t('error.tooManyChoices', {
              count: MAX_NUM_PROPOSAL_CHOICES,
            })
          : undefined
      }
      anyoneCanPropose={anyoneCanPropose}
      connected={isWalletConnected}
      content={{
        Header: NewProposalTitleDescriptionHeader,
        Main: NewProposalMain,
        Preview: NewProposalPreview,
      }}
      createProposal={createProposal}
      depositUnsatisfied={depositUnsatisfied}
      getProposalDataFromFormData={getProposalDataFromFormData}
      isActive={isActive}
      isMember={
        membershipLoading
          ? { loading: true }
          : { loading: false, data: isMember }
      }
      isPaused={isPaused}
      isWalletConnecting={isWalletConnecting}
      loading={loading || simulating}
      proposalTitle={proposalTitle}
      simulateProposal={simulateProposal}
      simulationBypassExpiration={simulationBypassExpiration}
      {...props}
    />
  )
}
