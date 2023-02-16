import { fromBase64, toHex } from '@cosmjs/encoding'
import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, useSetRecoilState, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  cosmWasmClientForChainSelector,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state/recoil'
import {
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { AmountWithTimestampAndDenom } from '@dao-dao/types'
import { nativeTokenDecimals } from '@dao-dao/utils'

import {
  AddressInput,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../../components'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import { RatingsFormData } from '../../types'
import {
  ContributionRatingData,
  NominationForm,
  RatingForm as StatelessRatingForm,
} from '../stateless/RatingForm'

interface RatingFormProps {
  data: ContributionRatingData
  reloadData: () => Promise<void>
}

export const RatingForm = ({ data, reloadData }: RatingFormProps) => {
  const { t } = useTranslation()
  const { coreAddress, chainId } = useDaoInfoContext()
  const { publicKey: walletPublicKey } = useWallet(chainId)

  const client = useRecoilValue(cosmWasmClientForChainSelector(chainId))
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

  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const onSubmit = useCallback(
    async (data: RatingsFormData) => {
      setLoadingSubmit(true)

      try {
        await postRequest(`/${coreAddress}/rate`, { ...data })
        toast.success(t('success.ratingsSubmitted'))
        // Reload status on success.
        setRefreshStatus((id) => id + 1)
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoadingSubmit(false)
      }
    },
    [coreAddress, postRequest, setRefreshStatus, t]
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

  const [loadingNominate, setLoadingNominate] = useState(false)
  const onNominate = useCallback(
    async (formData: NominationForm) => {
      setLoadingNominate(true)

      try {
        // Get public key from address.
        const account = await client.getAccount(formData.contributor)
        if (!account?.pubkey?.value) {
          throw new Error(t('error.addressNotFoundOnChain'))
        }
        const contributorPublicKey = toHex(fromBase64(account.pubkey.value))

        // Nominate.
        await postRequest(`/${coreAddress}/nominate`, {
          ...formData,
          contributor: contributorPublicKey,
        })
        toast.success(t('success.nominationSubmitted'))

        // Reload data so nomination appears if data already loaded.
        if (data) {
          await reloadData()
        }
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoadingNominate(false)
      }
    },
    [client, coreAddress, data, postRequest, reloadData, t]
  )

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
          <StatelessRatingForm
            AddressInput={AddressInput}
            EntityDisplay={EntityDisplay}
            cw20TokenInfos={loadingCw20TokenInfos.contents}
            data={data}
            loadingNominate={loadingNominate}
            loadingSubmit={loadingSubmit || statusLoadable.updating}
            onNominate={onNominate}
            onSubmit={onSubmit}
            prices={
              prices.contents.filter(Boolean) as AmountWithTimestampAndDenom[]
            }
            status={statusLoadable.contents}
          />
        )}
    </SuspenseLoader>
  )
}
