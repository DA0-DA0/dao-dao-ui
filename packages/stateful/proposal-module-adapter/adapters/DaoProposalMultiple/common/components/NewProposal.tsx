import { FlagOutlined, Timelapse } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import {
  DaoCoreV2Selectors,
  blockHeightSelector,
  blocksPerYearSelector,
} from '@dao-dao/state'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  BaseNewProposalProps,
  IProposalModuleAdapterCommonOptions,
} from '@dao-dao/types'
import {
  convertExpirationToDate,
  dateToWdhms,
  processError,
} from '@dao-dao/utils'

import { useActionCategories, useLoadedActions } from '../../../../../actions'
import { SuspenseLoader } from '../../../../../components/SuspenseLoader'
import { useMembership } from '../../../../../hooks'
import { proposalSelector } from '../../contracts/DaoProposalMultiple.recoil'
import { makeGetProposalInfo } from '../../functions'
import {
  NewProposalData,
  NewProposalForm,
  UsePublishProposal,
} from '../../types'
import { useProcessQ } from '../hooks'
import { NewProposal as StatelessNewProposal } from '../ui/NewProposal'

export type NewProposalProps = BaseNewProposalProps<NewProposalForm> & {
  options: IProposalModuleAdapterCommonOptions
  usePublishProposal: UsePublishProposal
}

export const NewProposal = ({
  onCreateSuccess,
  options,
  usePublishProposal,
  ...props
}: NewProposalProps) => {
  const { t } = useTranslation()
  const {
    name: daoName,
    imageUrl: daoImageUrl,
    chainId,
    coreAddress,
  } = useDaoInfoContext()
  const { connected } = useWallet()

  const categories = useActionCategories()
  const loadedActions = useLoadedActions()

  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })

  const [loading, setLoading] = useState(false)

  // Info about if the DAO is paused. This selector depends on blockHeight,
  // which is refreshed periodically, so use a loadable to avoid unnecessary
  // re-renders.
  const pauseInfo = useCachedLoadable(
    DaoCoreV2Selectors.pauseInfoSelector({
      contractAddress: coreAddress,
      params: [],
    })
  )
  const isPaused =
    pauseInfo.state === 'hasValue' &&
    ('paused' in pauseInfo.contents || 'Paused' in pauseInfo.contents)

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const processQ = useProcessQ()

  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))

  const {
    publishProposal,
    anyoneCanPropose,
    depositUnsatisfied,
    simulationBypassExpiration,
  } = usePublishProposal()

  const createProposal = useRecoilCallback(
    ({ snapshot }) =>
      async (newProposalData: NewProposalData) => {
        if (!connected || blockHeight === undefined) {
          toast.error(t('error.loadingData'))
          return
        }

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
            ...options,
            proposalNumber,
            proposalId,
          })()
          const expirationDate =
            proposalInfo &&
            convertExpirationToDate(
              blocksPerYear,
              proposalInfo.expiration,
              blockHeight
            )

          const proposal = (
            await snapshot.getPromise(
              proposalSelector({
                contractAddress: options.proposalModule.address,
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
      blockHeight,
      blocksPerYear,
      coreAddress,
      daoImageUrl,
      onCreateSuccess,
      options,
      processQ,
      publishProposal,
      t,
      connected,
      daoName,
    ]
  )

  return (
    <StatelessNewProposal
      SuspenseLoader={SuspenseLoader}
      anyoneCanPropose={anyoneCanPropose}
      categories={categories}
      connected={connected}
      createProposal={createProposal}
      depositUnsatisfied={depositUnsatisfied}
      isMember={isMember}
      isPaused={isPaused}
      loadedActions={loadedActions}
      loading={loading}
      simulationBypassExpiration={simulationBypassExpiration}
      {...props}
    />
  )
}
