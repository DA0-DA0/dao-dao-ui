import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState, waitForAll } from 'recoil'

import { genericTokenWithUsdPriceSelector } from '@dao-dao/state/recoil'
import {
  EntityDisplay,
  Loader,
  useCachedLoadable,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'

import { ConnectWallet, SuspenseLoader } from '../../../../../../components'
import { useEntity } from '../../../../../../hooks'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import { ContributionForm as StatelessContributionForm } from '../stateless/ContributionForm'
import { ContributionFormData } from '../stateless/ContributionFormInput'

export const ContributionForm = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { coreAddress } = useDaoInfoContext()
  const {
    connected,
    address: walletAddress = '',
    publicKey: walletPublicKey,
  } = useWallet()
  const walletEntity = useEntity(walletAddress)

  const postRequest = usePostRequest()

  const statusLoadable = useCachedLoadable(
    statusSelector({
      daoAddress: coreAddress,
      walletPublicKey: walletPublicKey?.hex ?? '_',
    })
  )
  const setRefreshStatus = useSetRecoilState(
    refreshStatusAtom({
      daoAddress: coreAddress,
    })
  )

  const [loading, setLoading] = useState(false)
  const onSubmit = useCallback(
    async (data: ContributionFormData) => {
      setLoading(true)

      try {
        await postRequest(`/${coreAddress}/contribution`, data)
        toast.success(t('success.contributionSubmitted'))
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

  const tokenPrices = useCachedLoadable(
    statusLoadable.state === 'hasValue' && statusLoadable.contents
      ? waitForAll(
          statusLoadable.contents.survey.attributes.flatMap(
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

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        statusLoadable.state === 'loading' || tokenPrices.state === 'loading'
      }
    >
      {statusLoadable.state === 'hasValue' &&
        !!statusLoadable.contents &&
        tokenPrices.state === 'hasValue' && (
          <StatelessContributionForm
            ConnectWallet={ConnectWallet}
            EntityDisplay={() => (
              <EntityDisplay
                address={walletAddress}
                loadingEntity={walletEntity}
              />
            )}
            connected={connected}
            loading={loading || statusLoadable.updating}
            loadingEntity={walletEntity}
            onSubmit={onSubmit}
            status={statusLoadable.contents}
            tokenPrices={tokenPrices.contents}
          />
        )}
    </SuspenseLoader>
  )
}
