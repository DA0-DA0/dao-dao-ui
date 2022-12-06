import { useWallet } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state/recoil'
import {
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { AmountWithTimestampAndDenom, CosmosMsgFor_Empty } from '@dao-dao/types'
import {
  makeBankMessage,
  makeWasmMessage,
  nativeTokenDecimals,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { ProfileDisplay, SuspenseLoader } from '../../../../../components'
import {
  useCwdProposalSinglePublishProposal,
  useProfile,
} from '../../../../../hooks'
import { NewProposalData } from '../../../../../proposal-module-adapter/adapters/CwdProposalSingle/types'
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
import {
  ProposalCreationFormData,
  ProposalCreationForm as StatelessProposalCreationForm,
} from '../stateless/ProposalCreationForm'

export const ProposalCreationForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, chainId, bech32Prefix } = useDaoInfoContext()
  const { address: walletAddress = '', publicKey: walletPublicKey } =
    useWallet(chainId)

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

      const cosmosMsgs: CosmosMsgFor_Empty[] = contributions.flatMap(
        ({ contributor, compensation }) =>
          compensation.compensationPerAttribute.flatMap(
            ({ nativeTokens, cw20Tokens }): CosmosMsgFor_Empty[] => [
              ...nativeTokens.map(
                ({ amount, denom }): CosmosMsgFor_Empty => ({
                  bank: makeBankMessage(amount, contributor.address, denom),
                })
              ),
              ...cw20Tokens.map(
                ({ amount, address }): CosmosMsgFor_Empty =>
                  makeWasmMessage({
                    wasm: {
                      execute: {
                        contract_addr: address,
                        funds: [],
                        msg: {
                          transfer: {
                            recipient: contributor.address,
                            amount,
                          },
                        },
                      },
                    },
                  })
              ),
            ]
          )
      )

      const completeRatings: CompleteRatings = {
        contributions,
        ratings,
        cosmosMsgs,
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

  const publishProposal = useCwdProposalSinglePublishProposal()

  const onComplete = useCallback(
    async (formData: ProposalCreationFormData) => {
      if (!completeRatings) {
        toast.error(t('error.loadingData'))
        return
      }
      if (!publishProposal) {
        toast.error(t('error.noSingleChoiceProposalModule'))
        return
      }

      setLoading(true)

      try {
        // Propose.
        const data: NewProposalData = {
          ...formData,
          msgs: completeRatings.cosmosMsgs,
        }

        const { proposalId } = await publishProposal(data)
        toast.success(t('success.proposalCreatedCompleteCompensationCycle'))

        // Complete with proposal ID.
        await postRequest(`/${coreAddress}/complete`, { proposalId })
        toast.success(t('success.compensationCycleCompleted'))

        // Reload status on success.
        setRefreshStatus((id) => id + 1)

        // Navigate to proposal.
        router.push(`/dao/${coreAddress}/proposals/${proposalId}`)

        // Don't stop loading on success since we are now navigating.
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
        setLoading(false)
      }
    },
    [
      completeRatings,
      coreAddress,
      postRequest,
      publishProposal,
      router,
      setRefreshStatus,
      t,
    ]
  )

  const loadingCw20TokenInfos = useCachedLoadable(
    statusLoadable.state === 'hasValue' && statusLoadable.contents
      ? waitForAll(
          statusLoadable.contents.survey.attributes.flatMap(({ cw20Tokens }) =>
            cw20Tokens.map(({ address }) =>
              Cw20BaseSelectors.tokenInfoWithAddressAndLogoSelector({
                contractAddress: address,
                chainId,
                params: [],
              })
            )
          )
        )
      : undefined
  )

  const prices = useCachedLoadable(
    statusLoadable.state === 'hasValue' &&
      statusLoadable.contents &&
      loadingCw20TokenInfos.state === 'hasValue'
      ? waitForAll(
          statusLoadable.contents.survey.attributes.flatMap(
            ({ nativeTokens, cw20Tokens }) => [
              ...nativeTokens.map(({ denom }) => {
                const decimals = nativeTokenDecimals(denom)
                if (decimals === undefined) {
                  throw new Error(`Unknown denom: ${denom}`)
                }
                return usdcPerMacroTokenSelector({
                  denom,
                  decimals,
                })
              }),
              ...cw20Tokens.map(({ address }, cw20TokenIndex) =>
                usdcPerMacroTokenSelector({
                  denom: address,
                  decimals:
                    loadingCw20TokenInfos.contents[cw20TokenIndex].decimals,
                })
              ),
            ]
          )
        )
      : undefined
  )

  const profile = useProfile({
    address: walletAddress,
    chainId,
  })

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        statusLoadable.state === 'loading' ||
        loadingCw20TokenInfos.state === 'loading' ||
        prices.state === 'loading'
      }
    >
      {statusLoadable.state === 'hasValue' &&
        !!statusLoadable.contents &&
        loadingCw20TokenInfos.state === 'hasValue' &&
        prices.state === 'hasValue' && (
          <StatelessProposalCreationForm
            ProfileDisplay={ProfileDisplay}
            completeRatings={completeRatings}
            cw20TokenInfos={loadingCw20TokenInfos.contents}
            loadRatings={loadRatings}
            loading={loading || statusLoadable.updating}
            onComplete={onComplete}
            prices={
              prices.contents.filter(Boolean) as AmountWithTimestampAndDenom[]
            }
            profile={profile}
            status={statusLoadable.contents}
            walletAddress={walletAddress}
          />
        )}
    </SuspenseLoader>
  )
}
