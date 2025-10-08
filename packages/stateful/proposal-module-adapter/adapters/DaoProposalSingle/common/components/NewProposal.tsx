import { BookOutlined, FlagOutlined, Timelapse } from '@mui/icons-material'
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
  useProcessTQ,
} from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  IProposalModuleBase,
  PlausibleEvents,
  SingleChoiceNewProposalData,
  SingleChoiceNewProposalForm,
} from '@dao-dao/types'
import { Config } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
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
import { NewProposalMain } from './NewProposalMain'
import { NewProposalPreview } from './NewProposalPreview'

export type NewProposalProps =
  BaseNewProposalProps<SingleChoiceNewProposalForm> & {
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

  const { watch } = useFormContext<SingleChoiceNewProposalForm>()
  const proposalTitle = watch('title')

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

  const processTQ = useProcessTQ()

  const {
    simulateProposal,
    publishProposal,
    cannotProposeReason,
    depositUnsatisfied,
    simulationBypassExpiration,
  } = usePublishProposal()

  const plausible = usePlausible<PlausibleEvents>()
  const createProposal = useCallback(
    async (newProposalData: SingleChoiceNewProposalData) => {
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

        // Get proposal info to display card.
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

        const { threshold, quorum } = processTQ(config.threshold)

        onCreateSuccess(
          proposalInfo
            ? {
                id: proposalId,
                title: newProposalData.title,
                description: newProposalData.description,
                info: [
                  {
                    Icon: BookOutlined,
                    label: `${t('title.threshold')}: ${threshold.display}`,
                  },
                  ...(quorum
                    ? [
                        {
                          Icon: FlagOutlined,
                          label: `${t('title.quorum')}: ${quorum.display}`,
                        },
                      ]
                    : []),
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
      publishProposal,
      proposalModule,
      processTQ,
      onCreateSuccess,
      t,
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
    SingleChoiceNewProposalForm,
    SingleChoiceNewProposalData
  >['getProposalDataFromFormData'] = async ({
    title,
    description,
    actionData,
    metadata,
    vote,
  }) => ({
    title,
    description: descriptionWithPotentialProposalMetadata(
      description,
      metadata
    ),
    msgs: await encodeActions({
      actionMap,
      encodeContext,
      data: actionData,
    }),
    vote,
  })

  return (
    <StatelessNewProposal<
      SingleChoiceNewProposalForm,
      SingleChoiceNewProposalData
    >
      activeThreshold={activeThreshold}
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
