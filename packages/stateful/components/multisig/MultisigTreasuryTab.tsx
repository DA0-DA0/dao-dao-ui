import { treasuryTokenCardInfosForDaoSelector } from '@dao-dao/state'
import {
  TreasuryTab as StatelessTreasuryTab,
  useCachedLoading,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { LazyNftCardInfo, TokenCardInfo } from '@dao-dao/types'

import { useWallet } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { DaoFiatDepositModal, DaoTokenLine } from '../dao'
import { LazyNftCard } from '../nft'
import { TreasuryHistoryGraph } from '../TreasuryHistoryGraph'

export const MultisigTreasuryTab = () => {
  const { chainId, coreAddress } = useDaoInfoContext()
  const { isWalletConnected } = useWallet()

  const tokens = useCachedLoading(
    treasuryTokenCardInfosForDaoSelector({
      chainId,
      coreAddress,
    }),
    {}
  )

  return (
    <StatelessTreasuryTab<TokenCardInfo, LazyNftCardInfo>
      ButtonLink={ButtonLink}
      FiatDepositModal={DaoFiatDepositModal}
      NftCard={LazyNftCard}
      TokenLine={DaoTokenLine}
      TreasuryHistoryGraph={TreasuryHistoryGraph}
      connected={isWalletConnected}
      nfts={{ loading: false, data: {} }}
      tokens={tokens.loading ? {} : tokens.data}
    />
  )
}
