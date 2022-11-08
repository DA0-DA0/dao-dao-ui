import { useWallet } from '@noahsaso/cosmodal'
import { useEffect } from 'react'

import {
  DaoCard as StatelessDaoCard,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { DaoCardInfo } from '@dao-dao/types/components/DaoCard'
import { CHAIN_ID, loadableToLoadingData } from '@dao-dao/utils'

import { usePinnedDaos } from '../../hooks'
import { daoCardInfoLazyDataSelector } from '../../recoil'
import { LinkWrapper } from '../LinkWrapper'

export const DaoCard = (props: DaoCardInfo) => {
  const { address: walletAddress } = useWallet()
  const { isPinned: isDaoPinned, setPinned, setUnpinned } = usePinnedDaos()

  const lazyDataLoadable = useCachedLoadable(
    daoCardInfoLazyDataSelector({
      coreAddress: props.coreAddress,
      chainId: props.chainId,
      walletAddress,
    })
  )

  //! Loadable errors.
  useEffect(() => {
    if (lazyDataLoadable.state === 'hasError') {
      console.error(lazyDataLoadable.contents)
    }
  }, [lazyDataLoadable.contents, lazyDataLoadable.state])

  return (
    <StatelessDaoCard
      {...props}
      LinkWrapper={LinkWrapper}
      hidePin={
        // Don't allow pinning if on different chain. This prevents pinning
        // featured mainnet DAOs on testnet.
        props.chainId !== CHAIN_ID
      }
      lazyData={loadableToLoadingData(lazyDataLoadable, {
        isMember: false,
        tokenBalance: NaN,
        proposalCount: NaN,
      })}
      onPin={() =>
        isDaoPinned(props.coreAddress)
          ? setUnpinned(props.coreAddress)
          : setPinned(props.coreAddress)
      }
      pinned={isDaoPinned(props.coreAddress)}
    />
  )
}
