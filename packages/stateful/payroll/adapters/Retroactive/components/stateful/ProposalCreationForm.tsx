import { useWallet } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { secp256k1PublicKeyToBech32Address } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import {
  CompleteRatings,
  ContributionWithCompensation,
  Rating,
  RatingsResponse,
} from '../../types'
import { computeCompensation } from '../../utils'
import { ProposalCreationForm as StatelessProposalCreationForm } from '../stateless/ProposalCreationForm'
import { IdentityProfileDisplay } from './IdentityProfileDisplay'

export const ProposalCreationForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, chainId, bech32Prefix } = useDaoInfoContext()
  const { publicKey: walletPublicKey } = useWallet(chainId)

  const postRequest = usePostRequest()

  const statusLoadable = useCachedLoadable(
    walletPublicKey?.hex
      ? statusSelector({
          daoAddress: coreAddress,
          walletPublicKey: walletPublicKey.hex,
        })
      : undefined
  )
  const setRefreshStatus = useSetRecoilState(
    refreshStatusAtom({
      daoAddress: coreAddress,
    })
  )

  const [loading, setLoading] = useState(false)

  const [completeRatings, setCompleteRatings] = useState<CompleteRatings>()
  const loadRatings = useCallback(async () => {
    // Need survey status to be loaded to compute compensation.
    if (statusLoadable.state !== 'hasValue' || !statusLoadable.contents) {
      return
    }

    setLoading(true)

    try {
      // Fetch ratings.
      const response: RatingsResponse = await postRequest(
        `/${coreAddress}/ratings`
      )

      // Compute compensation.
      const compensationPerContribution = computeCompensation(
        response.contributions.map(({ id }) => id),
        response.ratings.flatMap((rating) =>
          rating.contributions.map(({ id, attributes }) => ({
            contributionId: id,
            attributes,
          }))
        ),
        statusLoadable.contents.survey.attributes
      )

      // Get addresses for contributor public keys, and compute compensation.
      const contributions = await Promise.all(
        response.contributions.map(
          async (
            { contributor: publicKey, ...contribution },
            contributionIndex
          ): Promise<ContributionWithCompensation> => {
            const address = await secp256k1PublicKeyToBech32Address(
              publicKey,
              bech32Prefix
            )

            const compensation = compensationPerContribution[contributionIndex]

            return {
              ...contribution,
              contributor: {
                publicKey,
                address,
              },
              compensation,
            }
          }
        )
      )

      const ratings = await Promise.all(
        response.ratings.map(
          async ({ rater: publicKey, ...rating }): Promise<Rating> => {
            const address = await secp256k1PublicKeyToBech32Address(
              publicKey,
              bech32Prefix
            )

            return {
              ...rating,
              rater: {
                publicKey,
                address,
              },
            }
          }
        )
      )

      const completeRatings: CompleteRatings = {
        contributions,
        ratings,
      }

      setCompleteRatings(completeRatings)
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [
    bech32Prefix,
    coreAddress,
    postRequest,
    statusLoadable.contents,
    statusLoadable.state,
  ])

  const onComplete = useCallback(async () => {
    setLoading(true)

    try {
      // Propose.
      // TODO: Make proposal
      const proposalId = ''

      // Complete with proposal ID.
      await postRequest(`/${coreAddress}/complete`, { proposalId })
      toast.success(t('success.surveyCompleted'))

      // Reload status on success.
      setRefreshStatus((id) => id + 1)

      // Navigate to proposal.
      router.push(`/dao/${coreAddress}/proposals/${proposalId}`)
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [coreAddress, postRequest, router, setRefreshStatus, t])

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={statusLoadable.state === 'loading'}
    >
      {statusLoadable.state === 'hasValue' && !!statusLoadable.contents && (
        <StatelessProposalCreationForm
          IdentityProfileDisplay={IdentityProfileDisplay}
          completeRatings={completeRatings}
          loadRatings={loadRatings}
          loading={loading || statusLoadable.updating}
          onComplete={onComplete}
          status={statusLoadable.contents}
        />
      )}
    </SuspenseLoader>
  )
}
