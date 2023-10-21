import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { walletHexPublicKeySelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  ErrorPage,
  PageLoader,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { getConfiguredChains } from '@dao-dao/utils'

import { ButtonLink } from '../ButtonLink'
import { LazyNftCard } from '../nft'
import { SuspenseLoader } from '../SuspenseLoader'
import { WalletBalances } from './WalletBalances'

export const Wallet: NextPage = () => {
  const { t } = useTranslation()
  const { query: { chain, address } = {} } = useRouter()

  const configuredChain = getConfiguredChains().find(
    ({ name }) => name === chain
  )
  const walletAddress = typeof address === 'string' ? address : undefined

  if (!configuredChain || !walletAddress) {
    throw new Error('Unsupported chain or address.')
  }

  const hexPublicKey = useCachedLoadingWithError(
    walletHexPublicKeySelector({
      chainId: configuredChain.chain.chain_id,
      walletAddress,
    })
  )

  return (
    <>
      {!hexPublicKey.loading && (hexPublicKey.errored || !hexPublicKey.data) ? (
        <ErrorPage title={t('error.couldntFindWallet')}>
          <ButtonLink href="/" variant="secondary">
            {t('button.returnHome')}
          </ButtonLink>
        </ErrorPage>
      ) : (
        <ChainProvider chainId={configuredChain.chain.chain_id}>
          <SuspenseLoader fallback={<PageLoader />}>
            <WalletBalances
              NftCard={LazyNftCard}
              address={walletAddress}
              chainId={configuredChain.chain.chain_id}
              hexPublicKey={
                hexPublicKey.loading ||
                hexPublicKey.errored ||
                !hexPublicKey.data
                  ? { loading: true }
                  : {
                      loading: false,
                      updating: hexPublicKey.updating,
                      data: hexPublicKey.data,
                    }
              }
            />
          </SuspenseLoader>
        </ChainProvider>
      )}
    </>
  )
}
