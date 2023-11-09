import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { CommonNftSelectors } from '@dao-dao/state/recoil'
import {
  Button,
  HorizontalScroller,
  MarkdownRenderer,
  NftCard,
  Tooltip,
  useCachedLoadable,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { WidgetRendererProps } from '@dao-dao/types'
import { CHAIN_GAS_MULTIPLIER, processError } from '@dao-dao/utils'

import { useWallet } from '../../../hooks/useWallet'
import { nftCardInfoSelector } from '../../../recoil'
import { MintNftData } from './types'

export const MintNftRenderer = ({
  variables: {
    nftCollection,
    description,
    mint: { contract, msg, buttonLabel },
  },
}: WidgetRendererProps<MintNftData>) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const {
    address: walletAddress = '',
    getSigningCosmWasmClient,
    isWalletConnected,
  } = useWallet()

  const [minting, setMinting] = useState(false)

  const allTokensLoadable = useCachedLoadable(
    CommonNftSelectors.allTokensSelector({
      contractAddress: nftCollection,
      chainId,
    })
  )

  const first100Cards = useCachedLoading(
    allTokensLoadable.state === 'hasValue'
      ? waitForAll(
          allTokensLoadable.contents.slice(0, 100).map((tokenId) =>
            nftCardInfoSelector({
              collection: nftCollection,
              chainId,
              tokenId,
            })
          )
        )
      : undefined,
    []
  )

  const onClick = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setMinting(true)
    try {
      const signingCosmWasmClient = await getSigningCosmWasmClient()
      await signingCosmWasmClient.execute(
        walletAddress,
        contract,
        JSON.parse(msg.replaceAll('{{wallet}}', walletAddress)),
        CHAIN_GAS_MULTIPLIER
      )
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {description && (
        <MarkdownRenderer className="text-base" markdown={description} />
      )}

      {(first100Cards.loading || first100Cards.data.length > 0) && (
        <HorizontalScroller
          Component={NftCard}
          containerClassName="-mx-16 3xl:-mx-64 px-[1px]"
          itemClassName="w-64"
          items={first100Cards}
          shadowClassName="w-16 3xl:w-64"
        />
      )}

      <Tooltip
        title={isWalletConnected ? undefined : t('error.logInToContinue')}
      >
        <Button
          center
          disabled={!isWalletConnected}
          loading={minting}
          onClick={onClick}
          size="lg"
        >
          {buttonLabel}
        </Button>
      </Tooltip>
    </div>
  )
}
