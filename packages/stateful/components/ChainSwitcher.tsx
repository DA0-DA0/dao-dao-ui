import { useRecoilState } from 'recoil'

import { walletChainIdAtom } from '@dao-dao/state/recoil'
import {
  ChainSwitcher as StatelessChainSwitcher,
  ChainSwitcherProps as StatelessChainSwitcherProps,
} from '@dao-dao/stateless'

export type ChainSwitcherProps = Pick<StatelessChainSwitcherProps, 'type'> & {
  chainId?: string
  onSelect?: (chainId: string) => void
  loading?: boolean
  excludeChainIds?: string[]
}

export const ChainSwitcher = ({
  chainId: overrideChainId,
  onSelect,
  loading,
  excludeChainIds,
  ...props
}: ChainSwitcherProps) => {
  const [chainId, setChainId] = useRecoilState(walletChainIdAtom)

  return (
    <StatelessChainSwitcher
      {...props}
      excludeChainIds={excludeChainIds}
      loading={loading}
      onSelect={(chain) =>
        chain &&
        (onSelect ? onSelect(chain.chain_id) : setChainId(chain.chain_id))
      }
      selected={overrideChainId || chainId}
    />
  )
}

export const AllConfiguredChainSwitcher = (
  props: Omit<ChainSwitcherProps, 'type'>
) => <ChainSwitcher {...props} type="configured" />
