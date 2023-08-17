import { useRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import { ChainSwitcher as StatelessChainSwitcher } from '@dao-dao/stateless'

export type ChainSwitcherProps = {
  chainId?: string
  onSelect?: (chainId: string) => void
  loading?: boolean
}

export const ChainSwitcher = ({
  chainId: overrideChainId,
  onSelect,
  loading,
}: ChainSwitcherProps) => {
  const [chainId, setChainId] = useRecoilState(walletChainIdAtom)

  return (
    <StatelessChainSwitcher
      loading={loading}
      onSelect={({ chain_id }) =>
        onSelect ? onSelect(chain_id) : setChainId(chain_id)
      }
      selected={overrideChainId || chainId}
    />
  )
}
