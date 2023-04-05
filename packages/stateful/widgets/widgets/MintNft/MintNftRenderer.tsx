import { useWallet } from '@noahsaso/cosmodal'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { Cw721BaseSelectors } from '@dao-dao/state/recoil'
import {
  Button,
  HorizontalScroller,
  MarkdownRenderer,
  NftCard,
  Tooltip,
  useCachedLoadable,
  useCachedLoading,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { WidgetRendererProps } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

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
  const {
    address: walletAddress = '',
    signingCosmWasmClient,
    connected,
  } = useWallet()
  const { chainId } = useDaoInfoContext()

  const [minting, setMinting] = useState(false)

  const allTokensLoadable = useCachedLoadable(
    Cw721BaseSelectors.allTokensSelector({
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
    if (!signingCosmWasmClient || !walletAddress) {
      toast.error(t('error.connectWalletToContinue'))
      return
    }

    setMinting(true)
    try {
      await signingCosmWasmClient.execute(
        walletAddress,
        contract,
        JSON.parse(msg.replaceAll('{{wallet}}', walletAddress)),
        'auto'
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
        title={connected ? undefined : t('error.connectWalletToContinue')}
      >
        <Button
          center
          disabled={!connected}
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
