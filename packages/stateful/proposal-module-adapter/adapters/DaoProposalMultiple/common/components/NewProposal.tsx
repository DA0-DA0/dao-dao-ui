import { FlagOutlined, Timelapse } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { usePlausible } from 'next-plausible'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { daoDaoCoreQueries } from '@dao-dao/state'
import {
  NewProposalTitleDescriptionHeader,
  NewProposal as StatelessNewProposal,
  NewProposalProps as StatelessNewProposalProps,
  useActionsContext,
  useDao,
} from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  IProposalModuleBase,
  MultipleChoiceNewProposalData,
  MultipleChoiceNewProposalForm,
  PlausibleEvents,
} from '@dao-dao/types'
import { Config } from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  MAX_NUM_PROPOSAL_CHOICES,
  dateToWdhms,
  descriptionWithPotentialProposalMetadata,
  encodeActions,
  humanReadableExpiration,
  processError,
} from '@dao-dao/utils'

import { useActionEncodeContext } from '../../../../../actions'
import {
  useMembership,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../../../../hooks'
import { makeGetProposalInfo } from '../../functions'
import { UsePublishProposal } from '../../types'
import { useProcessQ } from '../hooks'
import { NewProposalMain } from './NewProposalMain'
import { NewProposalPreview } from './NewProposalPreview'

export type NewProposalProps =
  BaseNewProposalProps<MultipleChoiceNewProposalForm> & {
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
  const {
    name: daoName,
    imageUrl: daoImageUrl,
    coreAddress,
    info: { isActive, activeThreshold },
  } = useDao()
  const { address, isWalletConnecting, isWalletConnected } = useWallet()
  const queryClient = useQueryClient()

  const { watch } = useFormContext<MultipleChoiceNewProposalForm>()
  const proposalTitle = watch('title')
  const choices = watch('choices') ?? []

  const { isMember = false, loading: membershipLoading } = useMembership()

  // Info about if the DAO is paused. This depends on blockHeight, which is
  // refreshed periodically, so use a loadable to avoid unnecessary re-renders.
  const pauseInfo = useQueryLoadingDataWithError(
    daoDaoCoreQueries.pauseInfo({
      chainId: proposalModule.chainId,
      contractAddress: coreAddress,
    })
  )
  const isPaused =
    !pauseInfo.loading &&
    !pauseInfo.errored &&
    ('paused' in pauseInfo.data || 'Paused' in pauseInfo.data)

  const processQ = useProcessQ()

  const {
    simulateProposal,
    publishProposal,
    cannotProposeReason,
    depositUnsatisfied,
    simulationBypassExpiration,
  } = usePublishProposal()

  const plausible = usePlausible<PlausibleEvents>()
  const createProposal = useCallback(
    async (newProposalData: MultipleChoiceNewProposalData) => {
      if (!isWalletConnected || !address) {
        toast.error(t('error.logInToContinue'))
        return
      }

      try {
        const {
          proposalNumber,
          proposalId,
          isApprovalProposal = false,
        } = await publishProposal(newProposalData, {
          // On failed simulation, allow the user to bypass the simulation
          // and create the proposal anyway for 3 seconds.
          failedSimulationBypassSeconds: 3,
        })

        plausible('daoProposalCreate', {
          props: {
            chainId: proposalModule.chainId,
            dao: proposalModule.dao.coreAddress,
            walletAddress: address,
            proposalModule: proposalModule.address,
            proposalModuleType: proposalModule.contractName,
            proposalNumber,
            proposalId,
            approval: isApprovalProposal,
          },
        })

        const proposalInfo = await makeGetProposalInfo({
          queryClient,
          chain: proposalModule.dao.chain,
          coreAddress: proposalModule.dao.coreAddress,
          proposalModule,
          proposalNumber,
          proposalId,
          isApprovalProposal,
        })()
        const expirationDate =
          proposalInfo?.expiration &&
          humanReadableExpiration(t, dateToWdhms, proposalInfo.expiration)

        const config: Config = await queryClient.fetchQuery(
          proposalModule.getConfigQuery()
        )

        const { quorum } = processQ(config.voting_strategy)

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
                          label: expirationDate,
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
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      }
    },
    [
      isWalletConnected,
      t,
      publishProposal,
      proposalModule,
      processQ,
      onCreateSuccess,
      daoName,
      coreAddress,
      daoImageUrl,
      plausible,
      address,
      queryClient,
    ]
  )

  const { actionMap } = useActionsContext()
  const encodeContext = useActionEncodeContext()

  const getProposalDataFromFormData: StatelessNewProposalProps<
    MultipleChoiceNewProposalForm,
    MultipleChoiceNewProposalData
  >['getProposalDataFromFormData'] = async ({
    title,
    description,
    choices,
    vote,
  }) => ({
    title,
    description,
    choices: {
      options: await Promise.all(
        choices.map(async (option) => ({
          title: option.title,
          description: descriptionWithPotentialProposalMetadata(
            option.description,
            option.metadata
          ),
          // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
          // The contract execution will fail if the messages are invalid, so
          // this is safe. The UI should ensure that the correct messages are
          // used for the given chain anyways.
          msgs: (await encodeActions({
            actionMap,
            encodeContext,
            data: option.actionData,
          })) as any,
        }))
      ),
    },
    vote,
  })

  return (
    <StatelessNewProposal<
      MultipleChoiceNewProposalForm,
      MultipleChoiceNewProposalData
    >
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
      cannotProposeReason={cannotProposeReason}
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
      proposalTitle={proposalTitle}
      simulateProposal={simulateProposal}
      simulationBypassExpiration={simulationBypassExpiration}
      {...props}
    />
  )
}
