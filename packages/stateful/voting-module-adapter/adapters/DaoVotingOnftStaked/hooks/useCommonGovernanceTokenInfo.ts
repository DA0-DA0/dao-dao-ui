import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import {
  daoVotingOnftStakedQueries,
  omniflixQueries,
} from '@dao-dao/state/query'
import { GenericToken, TokenType } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export const useCommonGovernanceTokenInfo = (): GenericToken => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const queryClient = useQueryClient()
  const {
    data: { onft_collection_id },
  } = useSuspenseQuery(
    daoVotingOnftStakedQueries.config(queryClient, {
      chainId,
      contractAddress: votingModuleAddress,
    })
  )

  const {
    data: { symbol, previewUri },
  } = useSuspenseQuery(
    omniflixQueries.onftCollectionInfo({
      chainId,
      id: onft_collection_id,
    })
  )

  return {
    chainId,
    type: TokenType.Onft,
    denomOrAddress: onft_collection_id,
    symbol,
    decimals: 0,
    imageUrl: previewUri,
    source: {
      chainId,
      type: TokenType.Onft,
      denomOrAddress: onft_collection_id,
    },
  }
}
