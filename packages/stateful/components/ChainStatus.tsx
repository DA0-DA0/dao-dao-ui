import { indexerUpStatusSelector } from '@dao-dao/state/recoil'
import {
  ChainStatus as StatelessChainStatus,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { StatefulChainStatusProps } from '@dao-dao/types'

export const ChainStatus = ({ chainId }: StatefulChainStatusProps) => {
  const upStatus = useCachedLoadingWithError(
    indexerUpStatusSelector({ chainId })
  )

  return <StatelessChainStatus chainId={chainId} upStatus={upStatus} />
}
