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
  Contribution,
  Rating,
  RatingsResponse,
} from '../../types'
import { ProposalCreationForm as StatelessProposalCreationForm } from '../stateless/ProposalCreationForm'
import { IdentityProfileDisplay } from './IdentityProfileDisplay'

export const ProposalCreationForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, chainId, bech32Prefix } = useDaoInfoContext()
  const { publicKey: walletPublicKey } = useWallet(chainId)

  const postRequest = usePostRequest()

  const statusLoadable = useCachedLoadable(
    statusSelector({
      daoAddress: coreAddress,
      walletPublicKey: walletPublicKey?.hex ?? '',
    })
  )
  const setRefreshStatus = useSetRecoilState(
    refreshStatusAtom({
      daoAddress: coreAddress,
      walletPublicKey: walletPublicKey?.hex ?? '',
    })
  )

  const [loading, setLoading] = useState(false)

  const [completeRatings, setCompleteRatings] = useState<CompleteRatings>()
  const loadRatings = useCallback(async () => {
    setLoading(true)

    try {
      // Fetch ratings.
      const response: RatingsResponse = await postRequest(
        `/${coreAddress}/ratings`
      )

      // Get addresses for contributor public keys.
      const contributions = await Promise.all(
        response.contributions.map(
          async ({
            contributor: publicKey,
            ...contribution
          }): Promise<Contribution> => {
            const address = await secp256k1PublicKeyToBech32Address(
              publicKey,
              bech32Prefix
            )

            return {
              ...contribution,
              contributor: {
                publicKey,
                address,
              },
            }
          }
        )
      )

      // Get addresses for rater public keys.
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
  }, [bech32Prefix, coreAddress, postRequest])

  const onComplete = useCallback(async () => {
    setLoading(true)

    try {
      // Propose.
      // TODO: Make proposal
      const proposalId = 'A1'

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
