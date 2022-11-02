import { BookOutlined, FlagOutlined, Timelapse } from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import {
  DaoCoreV2Selectors,
  blockHeightSelector,
  blocksPerYearSelector,
  cosmWasmClientForChainSelector,
} from '@dao-dao/state'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  ActionsWithData,
  BaseNewProposalProps,
  IProposalModuleAdapterCommonOptions,
} from '@dao-dao/types'
import {
  convertExpirationToDate,
  dateToWdhms,
  processError,
} from '@dao-dao/utils'

import { useCoreActions } from '../../../../../actions'
import { useMembership } from '../../../../../hooks'
import { useVotingModuleAdapter } from '../../../../../voting-module-adapter'
import { proposalSelector } from '../../contracts/DaoProposalSingle.common.recoil'
import { makeGetProposalInfo } from '../../functions'
import {
  NewProposalData,
  NewProposalForm,
  UsePublishProposal,
} from '../../types'
import {
  makeUseActions as makeUseProposalModuleActions,
  useProcessTQ,
} from '../hooks'
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
  const { name: daoName, imageUrl: daoImageUrl } = useDaoInfoContext()
  const { chainId, coreAddress, proposalModule } = options
  const { connected } = useWallet()
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

  const {
    hooks: { useActions: useVotingModuleActions },
  } = useVotingModuleAdapter()
  const votingModuleActions = useVotingModuleActions()
  const proposalModuleActions = makeUseProposalModuleActions(options)()
  const actions = useCoreActions(
    useMemo(
      () => [...votingModuleActions, ...proposalModuleActions],
      [proposalModuleActions, votingModuleActions]
    )
  )

  // Call relevant action hooks in the same order every time.
  const actionsWithData: ActionsWithData = actions.reduce(
    (acc, action) => ({
      ...acc,
      [action.key]: {
        action,
        transform: action.useTransformToCosmos(),
        defaults: action.useDefaults(),
      },
    }),
    {}
  )

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const processTQ = useProcessTQ()

  const blocksPerYear = useRecoilValue(blocksPerYearSelector({}))
  const cosmWasmClient = useRecoilValue(cosmWasmClientForChainSelector(chainId))

  const { publishProposal, depositUnsatisfied, simulationBypassExpiration } =
    usePublishProposal()

  const createProposal = useRecoilCallback(
    ({ snapshot }) =>
      async (newProposalData: NewProposalData) => {
        if (blockHeight === undefined) {
          toast.error(t('error.loadingData'))
          return
        }

        setLoading(true)
        try {
          const { proposalNumber, proposalId } = await publishProposal(
            newProposalData,
            {
              // On failed simulation, allow the user to bypass the simulation
              // and create the proposal anyway for 10 seconds.
              failedSimulationBypassSeconds: 10,
            }
          )

          // Get proposal info to display card.
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
                contractAddress: proposalModule.address,
                params: [
                  {
                    proposalId: proposalNumber,
                  },
                ],
              })
            )
          ).proposal

          const { threshold, quorum } = processTQ(proposal.threshold)

          onCreateSuccess(
            proposalInfo
              ? {
                  id: proposalId,
                  title: newProposalData.title,
                  description: newProposalData.description,
                  info: [
                    {
                      Icon: BookOutlined,
                      label: `${t('title.threshold')}: ${threshold?.display}`,
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
      cosmWasmClient,
      daoImageUrl,
      onCreateSuccess,
      options,
      processTQ,
      proposalModule.address,
      publishProposal,
      t,
    ]
  )

  return (
    <StatelessNewProposal
      actions={actions}
      actionsWithData={actionsWithData}
      connected={connected}
      createProposal={createProposal}
      depositUnsatisfied={depositUnsatisfied}
      isMember={isMember}
      isPaused={isPaused}
      loading={loading}
      simulationBypassExpiration={simulationBypassExpiration}
      {...props}
    />
  )
}
