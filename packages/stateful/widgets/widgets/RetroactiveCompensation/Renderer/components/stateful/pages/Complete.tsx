import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { genericTokenWithUsdPriceSelector } from '@dao-dao/state/recoil'
import {
  ErrorPage,
  Loader,
  useCachedLoadable,
  useChain,
  useDaoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'

import {
  EntityDisplay,
  ProposalList,
  SuspenseLoader,
} from '../../../../../../../components'
import {
  useDaoProposalSinglePublishProposal,
  useEntity,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../../../../../../hooks'
import { NewProposalData } from '../../../../../../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { usePostRequest } from '../../../hooks/usePostRequest'
import { retroactiveCompensationQueries } from '../../../queries'
import { CompleteRatings } from '../../../types'
import {
  ProposalCreationFormData,
  Complete as StatelessComplete,
} from '../../stateless/pages/Complete'

export const Complete = () => {
  const { t } = useTranslation()
  const { dao } = useDaoContext()
  const { daoSubpathComponents, goToDaoProposal } = useDaoNavHelpers()
  const { chain_id: chainId } = useChain()
  const { address: walletAddress = '', hexPublicKey } = useWallet({
    loadAccount: true,
  })
  const postRequest = usePostRequest()

  const surveyId = Number(daoSubpathComponents[2] || '-1')

  const queryClient = useQueryClient()
  const surveyQuery = retroactiveCompensationQueries.activeSurvey({
    daoAddress: dao.coreAddress,
    walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
    surveyId,
  })
  const loadingSurvey = useQueryLoadingDataWithError(surveyQuery)

  const publishProposal = useDaoProposalSinglePublishProposal()

  const [weightByVotingPower, setWeightByVotingPower] = useState<boolean>(true)
  const [data, setData] = useState<CompleteRatings>()

  const [loading, setLoading] = useState(false)
  const onComplete = async (formData: ProposalCreationFormData) => {
    if (!data) {
      toast.error(t('error.loadingData'))
      return
    }
    if (!publishProposal) {
      toast.error(t('error.noSingleChoiceProposalModule'))
      return
    }

    setLoading(true)

    try {
      let proposalId = ''
      if (formData.type === 'new') {
        // Propose.
        const proposalData: NewProposalData = {
          ...formData.newProposal,
          msgs: data.cosmosMsgs,
        }

        proposalId = (await publishProposal(proposalData)).proposalId
        toast.success(t('success.proposalCreatedCompleteCompensationCycle'))
      } else if (formData.type === 'existing') {
        proposalId = formData.existing
      }
      // 'none' will leave the proposal ID empty

      // Complete with proposal ID.
      await postRequest(`/${dao.coreAddress}/${surveyId}/complete`, {
        proposalId,
      })
      toast.success(
        t('success.compensationCycleCompleted', {
          context: proposalId ? 'withProposal' : 'noProposal',
        })
      )

      // Reload survey lists on success.
      await queryClient.refetchQueries({
        queryKey: retroactiveCompensationQueries.listActiveSurveys(
          queryClient,
          {
            daoAddress: dao.coreAddress,
            walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
          }
        ).queryKey,
      })
      await queryClient.refetchQueries({
        queryKey: retroactiveCompensationQueries.listCompletedSurveys({
          daoAddress: dao.coreAddress,
        }).queryKey,
      })

      // Navigate to proposal if set.
      if (proposalId) {
        goToDaoProposal(dao.coreAddress, proposalId)
        // Don't stop loading on success since we are now navigating.
      } else {
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      setLoading(false)
    }
  }

  const tokenPrices = useCachedLoadable(
    !loadingSurvey.loading && !loadingSurvey.errored
      ? waitForAll(
          loadingSurvey.data.survey.attributes.flatMap(
            ({ nativeTokens, cw20Tokens }) => [
              ...nativeTokens.map(({ denom }) =>
                genericTokenWithUsdPriceSelector({
                  chainId,
                  type: TokenType.Native,
                  denomOrAddress: denom,
                })
              ),
              ...cw20Tokens.map(({ address }) =>
                genericTokenWithUsdPriceSelector({
                  chainId,
                  type: TokenType.Cw20,
                  denomOrAddress: address,
                })
              ),
            ]
          )
        )
      : undefined
  )
  const { entity: walletEntity } = useEntity(walletAddress)

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingSurvey.loading || tokenPrices.state === 'loading'}
    >
      {loadingSurvey.loading ? null : loadingSurvey.errored ? (
        <ErrorPage error={loadingSurvey.error} />
      ) : (
        tokenPrices.state === 'hasValue' && (
          <StatelessComplete
            EntityDisplay={EntityDisplay}
            ProposalList={ProposalList}
            completeRatings={data}
            entity={walletEntity}
            loading={loading || !!loadingSurvey.updating}
            onComplete={onComplete}
            setWeightByVotingPower={setWeightByVotingPower}
            survey={loadingSurvey.data}
            tokenPrices={tokenPrices.contents}
            walletAddress={walletAddress}
            weightByVotingPower={weightByVotingPower}
          />
        )
      )}
    </SuspenseLoader>
  )
}
