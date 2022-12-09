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
import { AmountWithTimestampAndDenom } from '@dao-dao/types'
import { nativeTokenDecimals } from '@dao-dao/utils'

import { ProfileDisplay, SuspenseLoader } from '../../../../../components'
import {
  useDaoProposalSinglePublishProposal,
  useProfile,
} from '../../../../../hooks'
import { NewProposalData } from '../../../../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import { CompleteRatings } from '../../types'
import {
  ProposalCreationFormData,
  ProposalCreationForm as StatelessProposalCreationForm,
} from '../stateless/ProposalCreationForm'

interface ProposalCreationFormProps {
  data: CompleteRatings
}

export const ProposalCreationForm = ({ data }: ProposalCreationFormProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { coreAddress, chainId } = useDaoInfoContext()
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

  const publishProposal = useDaoProposalSinglePublishProposal()

  const [loading, setLoading] = useState(false)
  const onComplete = useCallback(
    async (formData: ProposalCreationFormData) => {
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
        // Propose.
        const proposalData: NewProposalData = {
          ...formData,
          msgs: data.cosmosMsgs,
        }

        const { proposalId } = await publishProposal(proposalData)
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
      data,
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
    walletHexPublicKey: walletPublicKey?.hex,
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
            completeRatings={data}
            cw20TokenInfos={loadingCw20TokenInfos.contents}
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
