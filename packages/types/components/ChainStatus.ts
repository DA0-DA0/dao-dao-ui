import { IndexerUpStatus } from '../indexer'
import { LoadingDataWithError } from '../misc'

export type ChainStatusProps = {
  chainId: string
  upStatus: LoadingDataWithError<IndexerUpStatus>
}

export type StatefulChainStatusProps = Omit<ChainStatusProps, 'upStatus'>
