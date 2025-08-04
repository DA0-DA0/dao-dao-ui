import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { nftQueries } from '@dao-dao/state/query'
import { CommonNftSelectors } from '@dao-dao/state/recoil'
import {
  Button,
  HorizontalScroller,
  MarkdownRenderer,
  NftCard,
  Tooltip,
  useCachedLoadable,
  useChain,
} from '@dao-dao/stateless'
import { ModuleRendererProps } from '@dao-dao/types'
import {
  executeSmartContract,
  makeCombineQueryResultsIntoLoadingData,
  processError,
} from '@dao-dao/utils'

import { useWallet } from '../../../hooks/useWallet'
import { MintNftData } from './types'

export const MintNftRenderer = ({
  variables: {
    nftCollection,
    description,
    mint: { contract, msg, buttonLabel },
  },
}: ModuleRendererProps<MintNftData>) => {
  const { t } = useTranslation()
  const { chainId } = useChain()
  const {
    address: walletAddress = '',
    getSigningClient,
    isWalletConnected,
  } = useWallet()

  const [minting, setMinting] = useState(false)

  const allTokensLoadable = useCachedLoadable(
    CommonNftSelectors.unpaginatedAllTokensSelector({
      contractAddress: nftCollection,
      chainId,
    })
  )

  const first100Cards = useQueries({
    queries:
      allTokensLoadable.state === 'hasValue'
        ? allTokensLoadable.contents.slice(0, 100).map((tokenId) =>
            nftQueries.cardInfo({
              collection: nftCollection,
              chainId,
              tokenId,
            })
          )
        : [],
    combine: makeCombineQueryResultsIntoLoadingData(),
  })

  const onClick = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setMinting(true)
    try {
      await executeSmartContract(
        getSigningClient,
        walletAddress,
        contract,
        JSON.parse(msg.replaceAll('{{wallet}}', walletAddress))
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
