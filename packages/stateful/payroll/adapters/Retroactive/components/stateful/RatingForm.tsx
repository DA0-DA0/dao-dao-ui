import { useWallet } from '@noahsaso/cosmodal'
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
  Contribution,
  ContributionRating,
  ContributionResponse,
  RatingsFormData,
} from '../../types'
import {
  ContributionRatingData,
  RatingForm as StatelessRatingForm,
} from '../stateless/RatingForm'
import { IdentityProfileDisplay } from './IdentityProfileDisplay'

export const RatingForm = () => {
  const { t } = useTranslation()
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
  const [data, setData] = useState<ContributionRatingData>()

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // Fetch contributions.
      const response: {
        contributions: ContributionResponse[]
        ratings: ContributionRating[]
      } = await postRequest(`/${coreAddress}/contributions`)

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

      setData({
        contributions,
        existingRatings: response.ratings,
      })
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [bech32Prefix, coreAddress, postRequest])

  const onSubmit = useCallback(
    async (data: RatingsFormData) => {
      setLoading(true)

      try {
        await postRequest(`/${coreAddress}/rate`, { ...data })
        toast.success(t('success.ratingsSubmitted'))
        // Reload status on success.
        setRefreshStatus((id) => id + 1)
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoading(false)
      }
    },
    [coreAddress, postRequest, setRefreshStatus, t]
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={statusLoadable.state === 'loading'}
    >
      {statusLoadable.state === 'hasValue' && !!statusLoadable.contents && (
        <StatelessRatingForm
          IdentityProfileDisplay={IdentityProfileDisplay}
          data={data}
          loadData={loadData}
          loading={loading || statusLoadable.updating}
          onSubmit={onSubmit}
          status={statusLoadable.contents}
        />
      )}
    </SuspenseLoader>
  )
}
